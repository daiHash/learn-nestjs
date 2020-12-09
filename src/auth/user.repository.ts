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

    await user.save()
    return 'User was successfully signup'
  }
}
