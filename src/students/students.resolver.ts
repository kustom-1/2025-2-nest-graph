import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { StudentsService } from './students.service';
import { Student } from './entities/student.entity';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';
import { PaginationArgs } from './dto/pagination.args';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Resolver(() => Student)
export class StudentsResolver {
  constructor(private readonly studentsService: StudentsService) {}

  @Mutation(() => Student, { name: 'createStudent' })
  createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ) {
    return this.studentsService.create(createStudentInput);
  }

  @Query(() => [Student], { name: 'students' })
  findAll(
    @Args('paginationArgs', { nullable: true }) paginationArgs?: PaginationArgs,
  ) {
    return this.studentsService.findAll(paginationArgs || { limit: 10, offset: 0 });
  }

  @Query(() => Student, { name: 'student' })
  findOne(@Args('term', { type: () => String }) term: string) {
    return this.studentsService.findOne(term);
  }

  @Mutation(() => Student, { name: 'updateStudent' })
  @UseGuards(JwtAuthGuard)
  updateStudent(
    @Args('updateStudentInput') updateStudentInput: UpdateStudentInput,
  ) {
    const { id, ...updateData } = updateStudentInput;
    return this.studentsService.update(id, updateData);
  }

  @Mutation(() => Boolean, { name: 'removeStudent' })
  async removeStudent(@Args('id', { type: () => ID }) id: string) {
    await this.studentsService.remove(id);
    return true;
  }
}
