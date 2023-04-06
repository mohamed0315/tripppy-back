import { Test, TestingModule } from '@nestjs/testing';
import { AccommodationService } from './accommodation.service';

describe('AccommodationService', () => {
  let service: AccommodationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccommodationService,
        {
          provide: 'AccommodationModel',
          useValue: {
            /* mocked AccommodationModel instance */
          },
        },
        {
          provide: 'DestinationModel',
          useValue: {
            /* mocked DestinationModel instance */
          },
        },
        {
          provide: 'UserModel',
          useValue: {
            /* mocked UserModel instance */
          },
        },
        {
          provide: 'S3Service',
          useValue: {
            /* mocked S3Service instance */
          },
        },
      ],
    }).compile();

    service = module.get<AccommodationService>(AccommodationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
