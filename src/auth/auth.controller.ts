import { Body, Controller, Post, ValidationPipe } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthCredentialsDTO } from './dto/auth-credentials.dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDTO
  ): Promise<string> {
    return this.authService.signUp(authCredentialsDto)
  }
}
