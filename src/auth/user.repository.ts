import { ConflictException, InternalServerErrorException } from '@nestjs/common'
import { EntityRepository, Repository } from 'typeorm'
import { AuthCredentialsDTO } from './dto/auth-credentials.dto'
import { User } from './user.entity'
import * as bcrypt from 'bcrypt'
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDTO): Promise<string> {
    const { username, password } = authCredentialsDto

    const user = new User()

    user.username = username
    user.salt = await bcrypt.genSalt()
    user.password = await this.hashPassword(password, salt)

    try {
      await user.save()
      return 'User was successfully signup'
    } catch (error) {
      if (error.code === '23505') {
        // Duplicate user key
        throw new ConflictException('Username already exists')
      } else {
        throw new InternalServerErrorException()
      }
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt)
  }
}
