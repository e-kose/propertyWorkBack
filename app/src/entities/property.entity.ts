import { IsString } from "class-validator";
import { DateColumn } from "../dateColumn/dateColumn";
import { Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Entity, NumericType, OneToOne, JoinColumn, ManyToMany, ManyToOne } from "typeorm";
import { PropertyFeature } from "./property-feature.entity";
import { User } from "./user.entity";
import { PropertyType } from "./property-type.entity";

@Entity()
export class Property extends DateColumn{

	@PrimaryGeneratedColumn()
	id : number;

	@IsString()
	@Column()
	name: string;

	@Column()
	@IsString()
	description : string;

	@Column({default : 0})
	price : number;	

	@OneToOne(()=> PropertyFeature, (propertyFeature) => propertyFeature.property, {cascade : true})
	propertyFeatue : PropertyFeature

	@ManyToOne(()=> User, (user)=> user.properties)
	@JoinColumn()
	user : User;

	@ManyToMany(()=> User, (user) => user.likedProperties)
	likedByUser : User[];

	@ManyToOne(()=>PropertyType)
	type : PropertyType;
}