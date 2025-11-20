import { InputType, Field, PartialType, ID, Int } from '@nestjs/graphql';
import { CreateStudentInput } from './create-student.input';
import { IsString, IsNumber, IsEmail, IsIn, IsArray, IsPositive, IsOptional } from 'class-validator';
import { CreateGradeInput } from './create-grade.input';

@InputType()
export class UpdateStudentInput {
  
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  name?: string;

  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  age?: number;

  @Field({ nullable: true })
  @IsString()
  @IsEmail()
  @IsOptional()
  email?: string;

  @Field({ nullable: true })
  @IsString()
  @IsIn(['Male', 'Female', 'Other'])
  @IsOptional()
  gender?: string;

  @Field(() => [String], { nullable: true })
  @IsArray()
  @IsOptional()
  subjects?: string[];

  @Field(() => [CreateGradeInput], { nullable: true })
  @IsArray()
  @IsOptional()
  grades?: CreateGradeInput[];
}

