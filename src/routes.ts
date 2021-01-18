import Router from '@koa/router'

import AuthController from './controllers/auth'
import UserController from './controllers/user'

const unProtectedRouter = new Router({
  prefix: '/api'
})

unProtectedRouter.post('/auth/login', AuthController.login)
unProtectedRouter.post('/auth/register', AuthController.register)
unProtectedRouter.post('/auth/validate', AuthController.validate)

const protectedRouter = new Router({
  prefix: '/api'
})
protectedRouter.get('/user/list', UserController.listUsers)
protectedRouter.post('/user/detail/:id', UserController.showUserDetail)
protectedRouter.put('/user/update/:id', UserController.updateUser)
protectedRouter.delete('/user/delete/:id', UserController.deleteUser)

export {
  unProtectedRouter,
  protectedRouter
}


