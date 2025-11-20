import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNumber } from 'class-validator';

@InputType()
export class CreateGradeInput {
  
  @Field()
  @IsString()
  subject: string;

  @Field()
  @IsNumber()
  grade: number;
}
