import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsEmail()
  @IsString()
  email: string;

  @Field()
  @IsString()
  fullName: string;

  @Field()
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  password: string;
}
