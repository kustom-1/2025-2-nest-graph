import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Student } from "./student.entity";
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Grade{

    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id?:string;

    @Field()
    @Column('text')
    subject:string;

    @Field()
    @Column('text')
    grade:number;

    @Field(() => Student, { nullable: true })
    @ManyToOne(
        () => Student,
        (student)=> student.grade,
        { onDelete: 'CASCADE'}
    )
    student?:Student;
}