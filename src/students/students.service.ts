import { Injectable, InternalServerErrorException, Logger, NotFoundException, ParseUUIDPipe } from '@nestjs/common';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { DataSource, Repository } from 'typeorm';
import { PaginationArgs } from './dto/pagination.args';
import { isUUID } from 'class-validator';
import { Grade } from './entities/grade.entity';

@Injectable()
export class StudentsService {
  private logger = new Logger('StudentsService')

  constructor(
    @InjectRepository(Grade)
    private readonly gradeRepository: Repository<Grade>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    private readonly dataSource: DataSource
  ){}

  async create(createStudentInput: CreateStudentInput) {
    try{
      const { grades = [], ...studentDetails} = createStudentInput;
      const student = this.studentRepository.create({
        ...studentDetails,
        grade: grades.map(grade => this.gradeRepository.create(grade))
      });
      await this.studentRepository.save(student);
      return student;
    }catch(error){
      this.handleException(error);
    }
  }

  async findAll(paginationArgs: PaginationArgs) {
    try{
      const {limit = 10, offset = 0} = paginationArgs;
      return await this.studentRepository.find({
        take: limit,
        skip: offset
      });
    }catch(error){
      this.handleException(error);
    }
  }

  async findOne(term: string) {
    let student : Student | null;

    if(isUUID(term)){
      student = await this.studentRepository.findOneBy({id: term})
    }else{
      const queryBuilder = this.studentRepository.createQueryBuilder('student');
      student = await queryBuilder.where('UPPER(name)=:name or nickname=:nickname',{
        name: term.toUpperCase(),
        nickname: term.toLowerCase()
      })
      .leftJoinAndSelect('student.grade', 'studentGrades')
      .getOne()
    }

    if(!student)
      throw new NotFoundException(`Student with ${term} not found`);

    return student;
  }

  async update(id: string, updateStudentInput: Partial<UpdateStudentInput>) {

    const {grades, ...studentDetails} = updateStudentInput;

    // Buscar el estudiante primero
    const student = await this.studentRepository.findOne({
      where: { id },
      relations: ['grade']
    });

    if(!student) throw new NotFoundException(`Student with id ${id} not found`);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try{
      // Actualizar los campos del estudiante
      Object.assign(student, studentDetails);

      if(grades){
        await queryRunner.manager.delete(Grade, {student:{id}});
        student.grade = grades.map(grade => this.gradeRepository.create(grade))
      }

      await queryRunner.manager.save(student);
      await queryRunner.commitTransaction();
      await queryRunner.release();

      // Retornar el estudiante actualizado directamente
      return await this.studentRepository.findOne({
        where: { id },
        relations: ['grade']
      });
      
    }catch(error){
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleException(error);
    }
  }

  async remove(id: string) {
    const student = await this.findOne(id);
    await this.studentRepository.remove(student);
  }

  deleteAllStudents(){
    const query = this.studentRepository.createQueryBuilder();
    try{
      return query.delete()
                        .where({})
                        .execute();
    }catch(error){
      this.handleException(error);
    }
  }

  private handleException(error){
    this.logger.error(error);
    if(error.code === '23505')
        throw new InternalServerErrorException(error.detail)
  }
}
