import { Injectable, InternalServerErrorException, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginInput } from './dto/login.input';
import { Jwt } from './interfaces/jwt.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService')

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ){}

  async create(createUserInput: CreateUserInput) {
    const {password, ...userData }= createUserInput;
    try{
      const user = this.userRepository.create({
        ...userData,
        password: this.encryptPassword(password)
      });
      await this.userRepository.save(user);
      delete user.password;
      
      return {
        user,
        token: this.getJwtToken(
          {id: user.id, 
            email: user.email
          })
      };
    }catch(error){
      this.handleException(error);
    }
  }

  async login(loginInput: LoginInput){
    const {email, password} = loginInput;
    const user = await this.userRepository.findOne({
      where: {email},
      select: {
        id: true,
        email: true,
        password: true,
        fullName: true,
        isActive: true,
        roles: true
      }
    })

    if(!user) throw new NotFoundException(`User ${email} not found`)
    
      if(!bcrypt.compareSync(password, user.password!))
        throw new UnauthorizedException(`Email or password incorrect`);

    delete user.password;
    return {
      user,
      token: this.getJwtToken(
        {id: user.id, 
          email: user.email
        })
    };
  }   

  encryptPassword(password){
    return bcrypt.hashSync(password, 10)
  }

  private getJwtToken(payload: Jwt){
    const token = this.jwtService.sign(payload);
    return token;
  }
  
  private handleException(error){
      this.logger.error(error);
      if(error.code === '23505')
          throw new InternalServerErrorException(error.detail)
    }
}
