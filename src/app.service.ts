import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    @Inject('VALIDATION') private readonly validationClient: ClientProxy,
  ) {}

  validatePhoneNumbers(phoneNumbers: string[]) {
    try {
      const client = this.validationClient.send<string[], string[]>(
        { cmd: 'validate-phone-number' },
        phoneNumbers,
      );

      return lastValueFrom(client);
    } catch (error) {
      throw new Error('Validation failed');
    }
  }
}
