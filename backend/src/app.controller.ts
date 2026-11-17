import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  // GET / : só para conferir se a API está no ar
  @Get()
  status() {
    return 'API do projeto final no ar!';
  }
}
