import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'First step';
  };

  profile(): string {
    return '2+2';
  };


}
