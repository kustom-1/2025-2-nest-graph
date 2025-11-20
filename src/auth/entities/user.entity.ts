import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class User {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Field()
    @Column({
        type: 'text',
        unique: true
    })
    email:string;

    @Field()
    @Column('text')
    fullName:string;

    @Column('text')
    password?:string;

    @Field()
    @Column('bool', {default: true})
    isActive: boolean;

    @Field(() => [String])
    @Column({
        type: 'text',
        array: true,
        default: ['teacher']
    })
    roles: string[];

    @BeforeInsert()
    @BeforeUpdate()
    checkFieldsBeforeChanges(){
        this.email = this.email.toLowerCase().trim();
    }

}
