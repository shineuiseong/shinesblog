import { Router } from 'express'
import { AuthService } from '../../services/index.js'
import { isAccessTokenValid } from '../middlewares/index.js'
import { asyncErrorWrapper } from '../../asyncErrorWrapper.js'
import { CustomError } from '../../CustomError.js'
import { User as userModel } from '../../models/User.js'

const route = Router()

export default (app) => {
  app.use('/auth', route)

  //Refresh Token을 이용해 Access Token 발급

  route.get(
    '/',
    asyncErrorWrapper(async (req, res, next) => {
      if (!req.cookies.R_AUTH) {
        throw new CustomError('RefreshTokenError', 401, 'Refresh token not found.')
      }
      let AuthServiceInstance = new AuthService({ userModel })
      const { decodeSuccess, _id, nickName, email, accessToken } = await AuthServiceInstance.reissueAccessToken(req.cookies.R_AUTH)

      if (!decodeSuccess) {
        res.clearCookie('R_AUTH')
        throw new CustomError('RefreshTokenError', 401, 'Invalid refresh token')
      } else {
        return res.status(200).json({
          _id,
          email,
          nickName,
          accessToken,
        })
      }
    })
  )

  // Access Token이 유효한지 체크
  route.get('/isValid', isAccessTokenValid, async (req, res, next) => {
    return res.status(200).json({
      isValid: true,
    })
  })
}
