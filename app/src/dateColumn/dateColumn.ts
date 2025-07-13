import { Column, Entity, PrimaryColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from "typeorm"

export class DateColumn{

	@CreateDateColumn()
	createdAt!: Date;
	@UpdateDateColumn()
	updatedAt!: Date;
	@DeleteDateColumn()
	deletedAt!: Date;
}