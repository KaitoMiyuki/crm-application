import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  callBackend() {
    console.log('Calling backend API...');

    return { message: "message from backend API" };
  }
}
