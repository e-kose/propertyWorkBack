import { IsEmail } from 'class-validator';
import { DateColumn } from 'src/dateColumn/dateColumn';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Property } from './property.entity';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/auth/enums/role.enum';

@Entity()
export class User extends DateColumn {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: '123' })
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  hashedRefreshedToken: string;

  @Column({ nullable: true })
  avatarUrl: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  @OneToMany(() => Property, (property) => property.user)
  properties: Property[];

  @ManyToMany(() => Property, (property) => property.likedByUser)
  @JoinTable({ name: 'user_liked_properties' })
  likedProperties: Property[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
