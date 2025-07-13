import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async updateHashedRefreshToken(userId : number, hashedRefreshedToken: string){
    return await this.userRepo.update({id: userId}, {hashedRefreshedToken});
  }
  
  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepo.create(createUserDto);
    await this.userRepo.save(user);
  }
  
  async findByMail(email: string) {
    return await this.userRepo.findOne({
      where: {
        email,
      },
    });
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number) {
    return await this.userRepo.findOne({
      where : {
        id
      },
      select : ["firstName", "lastName", "avatarUrl", "password", "hashedRefreshedToken", "role"]
    })
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
