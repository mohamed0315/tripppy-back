import { Test, TestingModule } from '@nestjs/testing';
import { S3Service } from './s3-service.service';

describe('S3ServiceService', () => {
  let service: S3Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [S3Service],
    }).compile();

    service = module.get<S3Service>(S3Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should upload file to S3 and return a key', async () => {
    const buffer = Buffer.from('test file content');
    const filename = 'test.txt';
    const mimetype = 'text/plain';

    const key = await service.uploadFile(buffer, filename, mimetype);

    expect(typeof key).toBe('string');
  });
});
