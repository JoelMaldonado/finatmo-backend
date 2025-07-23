import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/model/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll() {
    return this.userRepository.find();
  }

  async findByEmail(email: string) {
    const item = await this.userRepository.findOne({ where: { email } });
    if (!item) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return item;
  }
}
