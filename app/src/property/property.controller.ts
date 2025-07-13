import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { ApiTags } from '@nestjs/swagger';
import { PaginationDto } from './dto/pagination.dto';

@Controller('property')
@ApiTags('Property')
export class PropertyController {
	constructor (private readonly propertyService : PropertyService){}

	@Get()
	findAll(@Query() dto: PaginationDto){
		return this.propertyService.findAll(dto);
	}

	@Get(":id")
	findOne(@Param("id", ParseIntPipe) id: number){
		return this.propertyService.findOne(id);
	}

	@Post()
	create(@Body() dto : CreatePropertyDto){
		return this.propertyService.create(dto);
	}

	@Patch(":id")
	update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePropertyDto){
		return this.propertyService.update(id, dto);
	}

	@Delete(":id")
	delete(@Param('id', ParseIntPipe) id:number){
		return this.propertyService.delete(id);
	}
}
