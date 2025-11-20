import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { CreateUserInput } from './dto/create-user.input';
import { LoginInput } from './dto/login.input';
import { AuthResponse } from './types/auth-response.type';
import { Auth } from './decorators/auth.decorator';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './entities/user.entity';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse, { name: 'register' })
  async register(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.authService.create(createUserInput);
  }

  @Mutation(() => AuthResponse, { name: 'login' })
  async login(@Args('loginInput') loginInput: LoginInput) {
    return this.authService.login(loginInput);
  }

  @Query(() => User, { name: 'me' })
  @Auth()
  async me(@GetUser() user: User) {
    return user;
  }
}
