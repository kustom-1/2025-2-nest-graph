import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsNumber, IsEmail, IsIn, IsArray, IsPositive, IsOptional } from 'class-validator';
import { CreateGradeInput } from './create-grade.input';

@InputType()
export class CreateStudentInput {
   
  @Field()
  @IsString()
  name: string;

  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  age?: number;

  @Field()
  @IsString()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  @IsIn(['Male', 'Female', 'Other'])
  gender: string;

  @Field(() => [String])
  @IsArray()
  subjects: string[];

  @Field(() => [CreateGradeInput], { nullable: true })
  @IsArray()
  @IsOptional()
  grades?: CreateGradeInput[];
}
