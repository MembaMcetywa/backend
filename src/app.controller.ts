import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('validate-phone-numbers')
  validatePhoneNumbers(@Body() phoneNumbers: string[]) {
    try {
      const validationResults =
        this.appService.validatePhoneNumbers(phoneNumbers);

      return validationResults;
    } catch (error) {
      console.error('Validation failed:', error.message);
      throw new HttpException('Validation failed', HttpStatus.BAD_REQUEST);
    }
  }
}
