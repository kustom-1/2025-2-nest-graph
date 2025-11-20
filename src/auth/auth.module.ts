import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports:[TypeOrmModule.forFeature([User]),
          PassportModule.register({defaultStrategy: 'jwt'}),
          JwtModule.registerAsync({
              imports: [ConfigModule],
              inject: [ConfigService],
              useFactory: (configService: ConfigService) =>{
                return{
                  secret: configService.get('JWT_SECRET'),
                  signOptions:{
                    expiresIn: '1h'
                  }
                }
              }
            })],
  providers: [AuthService, AuthResolver, JwtStrategy, ConfigService],
  exports: [TypeOrmModule, PassportModule, JwtModule, JwtStrategy]
})
export class AuthModule {}
