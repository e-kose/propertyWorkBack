import { IsBoolean, IsNumber, IsString } from "class-validator";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Property } from "./property.entity";

@Entity()
export class PropertyFeature{

	@PrimaryGeneratedColumn()
	id : number;

	@Column()
	@IsNumber()
	bedrooms : number

	@Column()
	@IsNumber()
	bathrooms : number

	@Column()
	@IsNumber()
	parkingStops : number

	@IsNumber()
	@Column()
	area : number

	@IsBoolean()
	@Column()
	hasSwimmingPool : boolean

	@IsBoolean()
	@Column()
	hasGardenYard : boolean

	@IsBoolean()
	@Column()
	hasBalcony : boolean

	@OneToOne(()=> Property, (property) => property.propertyFeatue)
	@JoinColumn()
	property: Property

}