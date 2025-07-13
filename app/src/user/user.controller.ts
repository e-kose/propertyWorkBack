import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, SetMetadata } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { Role } from 'src/auth/enums/role.enum';
import {Roles} from '../auth/decorators/role.decorator'
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';

@Controller('user')
@Roles(Role.USER)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  getProfile(@Request() req){
    return this.userService.findOne(req.user.id);
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
