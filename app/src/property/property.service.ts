import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from '../entities/property.entity';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { PaginationDto } from './dto/pagination.dto';
import { DEFAULT_PAGE_SIZE } from 'src/utils/constants';

@Injectable()
export class PropertyService {

	constructor(@InjectRepository(Property) readonly repository :Repository<Property>) {}

	async findAll(dto : PaginationDto){
		return await this.repository.find({
			skip : dto.skip,
			take : dto.limit ?? DEFAULT_PAGE_SIZE
		});
	}

	async findOne(id : number){
		const prop =  await this.repository.findOne({
			where: {
				id
			}
		});
		if (prop) return prop;
		throw new NotFoundException()
	}

	async create(dto : CreatePropertyDto){
		return await this.repository.save(dto);
	}
	
	async update(id : number, dto : UpdatePropertyDto){
		return await this.repository.update({id}, dto);
	}

	async delete(id : number){
		return await this.repository.delete(id);
	}
}
