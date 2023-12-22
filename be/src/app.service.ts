import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DataDao } from './data.dao';

@Injectable()
export class AppService {
  constructor(private readonly dataDao: DataDao) {}

  async getAll() {
    return await this.dataDao.getAll();
  }

  async get(id: string) {
    return await this.dataDao.get(id);
  }

  async create(data: any) {
    return await this.dataDao.create(data);
  }

  async delete(id: string) {
    return await this.dataDao.delete(id);
  }

  async update(id: string, data: any) {
    return await this.dataDao.update(id, data);
  }
}
