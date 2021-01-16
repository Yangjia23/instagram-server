import { Context } from 'koa'
import * as argon2 from 'argon2'
import { getManager } from 'typeorm'
import jwt from 'jsonwebtoken'

import { User } from '../entity/user'
import { JWT_SECRET } from '../utils/constants'
import { UnauthorizedException } from '../utils/exceptions'

export default class AuthController{
  public static async login(ctx: Context) {
    const userRepository = getManager().getRepository(User)
    const {name, password} = ctx.request.body

    const user = await userRepository
      .createQueryBuilder()
      .where({name})
      .addSelect('User.password')
      .getOne();


    if(!user) {
      throw new UnauthorizedException('User does not exist!')
    } else if (await argon2.verify(user.password, password)) {
      ctx.status = 200
      ctx.body = {token: jwt.sign({id: user.id}, JWT_SECRET)}
    } else {
      throw new UnauthorizedException('password error')
    }

  }

  public static async register(ctx: Context) {
    const userRepository = getManager().getRepository(User)

    const newUser = new User
    const { name, email, password } = ctx.request.body
    newUser.name = name
    newUser.email = email
    newUser.password = await argon2.hash(password)

    const user = await userRepository.save(newUser)

    ctx.status = 201
    ctx.body = user
  }
}