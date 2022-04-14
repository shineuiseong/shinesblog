import { Router } from 'express'
import { AuthService, UserService } from '../../services/index.js'
import { isUserIdValid, isTokenValidWithOauth, nickNameDuplicationCheck, autoSignUp } from '../middlewares/index.js'
import { asyncErrorWrapper } from '../../asyncErrorWrapper.js'
import { User as userModel } from '../../models/User.js'

const route = Router()

export default (app) => {
  app.use('/login', route)

  route.post(
    '/',
    isTokenValidWithOauth,
    autoSignUp,
    asyncErrorWrapper(async (req, res, next) => {
      try {
        const { idToken } = req.user
        let AuthServiceInstance = new AuthService({ userModel })

        const { _id, nickName, accessToken, refreshToken } = await AuthServiceInstance.SignIn(idToken)
        res.cookie('R_AUTH', refreshToken, {
          sameSite: 'none',
          httpOnly: true,
          secure: true,
          maxAge: 1000 * 60 * 60 * 24 * 14, // 2 Week
        })
        return res.status(200).json({
          loginSuccess: true,
          _id: _id,
          nickName: nickName,
          accessToken: accessToken,
        })
      } catch (error) {
        console.log(error)
      }
    })
  )

  //회원가입
  route.post(
    '/signup',
    nickNameDuplicationCheck,
    isUserIdValid,
    asyncErrorWrapper(async (req, res, next) => {
      const id = req.body.id
      const userDTO = req.body
      delete userDTO.id

      // 회원 정보 수정(등록)
      console.log('1')
      let UserServiceInstance = new UserService({ userModel })
      console.log('2')
      const { userRecord } = await UserServiceInstance.modifyUser(id, id, userDTO)
      console.log('3')
      // AccessToken, RefreshToken 발급
      let AuthServiceInstance = new AuthService({ userModel })
      console.log('4')
      const { accessToken, refreshToken } = await AuthServiceInstance.SignIn(userRecord.idToken)
      console.log('5')

      res.cookie('R_AUTH', refreshToken, {
        sameSite: 'none',
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 14, // 2 Week
      })

      return res.status(200).json({
        loginSuccess: true,
        _id: userRecord._id,
        nickName: userRecord.nickName,
        accessToken: accessToken,
      })
    })
  )
}
