import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as argon2 from 'argon2'
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/types/type';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOne(email);
    const passwordIsMAtch = await argon2.verify(user.password, password)
    
    if (user && passwordIsMAtch) {
      return user
    }
    throw new UnauthorizedException('User or pass are incorrect!')
  }

  async login(user: IUser) {
    const { id, email } = user
    return {
      id, email, token: this.jwtService.sign({ id: user.id, email: user.email})
    }
    
  }

}
