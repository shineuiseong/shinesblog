import { Router } from 'express'

import auth from './routes/auth.js'
import login from './routes/login.js'
import user from './routes/user.js'
import logout from './routes/logout.js'
import post from './routes/post.js'

export default () => {
  const app = Router()
  auth(app)
  login(app)
  logout(app)
  user(app)
  post(app)
  return app
}
