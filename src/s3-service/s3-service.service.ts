import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { GetObjectCommand, PutObjectCommandInput, S3 } from "@aws-sdk/client-s3";
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Upload } from '@aws-sdk/lib-storage';

@Injectable()
export class S3Service {
  private client: S3;

  constructor() {
    this.client = new S3({
      credentials: {
        accessKeyId: 'AKIARNLF7ZYCSDVG56EV',
        secretAccessKey: '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',
      },
      region: 'eu-west-3',
    });
  }

  async uploadFile(buffer: Buffer, filename: string, mimtype: string) {
    const key = uuid();
    const params: PutObjectCommandInput = {
      Bucket: 'tripppy',
      Key: key,
      Body: buffer,
      ContentType: mimtype,
    };

    const upload = await new Upload({
      client: this.client,
      params: params,
    }).done();

    return key;
  }

  async uploadFileActivity(buffer: Buffer, filename: string, mimtype: string) {
    const key = uuid();
    const params: PutObjectCommandInput = {
      Bucket: 'tripppy',
      Key: `activity/${uuid()}`,
      Body: buffer,
      ContentType: mimtype,
    };

    const upload = await new Upload({
      client: this.client,
      params: params,
    }).done();

    return key;
  }

  async downloadLink(key: string) {
    const getObjectCommand = new GetObjectCommand({
      Bucket: 'tripppy',
      Key: key,
      //ResponseContentDisposition: `attachment; filename="${fileName}"`,
    });
    const link = await getSignedUrl(this.client, getObjectCommand, {
      expiresIn: 3600, //expiration ?? 900,
    });

    return link;
  }
}
