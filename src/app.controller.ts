import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  root(): object {
    return { message: 'hello blaze ' };
  }
}
