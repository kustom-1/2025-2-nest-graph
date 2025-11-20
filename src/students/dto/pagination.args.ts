import { InputType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

@InputType()
export class PaginationArgs {
  
  @Field(() => Int, { nullable: true, defaultValue: 10 })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit?: number;

  @Field(() => Int, { nullable: true, defaultValue: 0 })
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  offset?: number;
}
