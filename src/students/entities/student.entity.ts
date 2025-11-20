import {BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { Grade } from './grade.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('students')
export class Student {

    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column('text')
    name: string;

    @Field(() => Number, { nullable: true })
    @Column({
        type: 'int',
        nullable: true
    })
    age: number;

    @Field()
    @Column({
        type: 'text',
        unique: true
    })
    email:string;

    @Field()
    @Column('text')
    nickname: string;

    @Field()
    @Column('text')
    gender: string;

    @Field(() => [String])
    @Column({
        type: 'text',
        array: true
    })
    subjects: string[]

    @Field(() => [Grade])
    @OneToMany(
        ()=> Grade,
        (grade) => grade.student,
        {cascade: true, eager: true}
    )
    grade?: Grade[]

    
    @BeforeInsert()
    checkNicknameInsert(){
        if(!this.nickname){
            this.nickname = this.name
        }

        this.nickname = this.nickname.toLowerCase()
                        .replace(" ", "_")
                        +this.age;
    }

    @BeforeUpdate()
    checkNicknameUpdate(){
        this.nickname = this.nickname.toLowerCase()
                        .replace(" ", "_")
                        +this.age;
    }

}
