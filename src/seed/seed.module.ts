import { Module } from '@nestjs/common';
import { SeedResolver } from './seed.resolver';
import { SeedService } from './seed.service';
import { StudentsModule } from 'src/students/students.module';

@Module({
  providers: [SeedService, SeedResolver],
  imports:[StudentsModule]
})
export class SeedModule {}
