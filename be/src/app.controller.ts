import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('data')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAll() {
    return this.appService.getAll();
  }

  @Get(':id') get(@Param('id') id: string) {
    return this.appService.get(id);
  }

  @Post('create') create(@Body() data: { companyName: string; notes: string }) {
    return this.appService.create(data);
  }

  @Delete('delete/:id') delete(@Param('id') id: string) {
    return this.appService.delete(id);
  }

  // consider using put or patch instead of post
  @Post('update/:id') update(id: string) {
    return this.appService.update(id, { data: 'test' });
  }
}
