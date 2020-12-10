import { ConflictException, InternalServerErrorException } from '@nestjs/common'
import { EntityRepository, Repository } from 'typeorm'
import { AuthCredentialsDTO } from './dto/auth-credentials.dto'
import { User } from './user.entity'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDTO): Promise<string> {
    const { username, password } = authCredentialsDto

    const user = new User()

    user.username = username
    user.password = password

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
}
