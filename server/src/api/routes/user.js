import { Router } from 'express'
import { UserService } from '../../services/index.js'
import { User as userModel } from '../../models/User.js'
import { asyncErrorWrapper } from '../../asyncErrorWrapper.js'
import { nickNameDuplicationCheck, isAccessTokenValid, isUserIdValid } from '../middlewares/index.js'
const route = Router()

export default (app) => {
  app.use('/users', route)

  // 사용자 정보 조회
  route.get(
    '/',
    asyncErrorWrapper(async (req, res, next) => {
      const { nickName } = req.query
      let UserServiceInstance = new UserService({ userModel })
      const user = await UserServiceInstance.findByNickName(nickName)

      res.status(200).json(user)
    })
  )

  // 사용자 닉네임 중복 체크
  route.get(
    '/:id/exists',
    nickNameDuplicationCheck,
    asyncErrorWrapper(async (req, res, next) => {
      return res.status(200).json({
        isExists: false,
      })
    })
  )

  // 사용자 정보 수정
  route.patch(
    '/:id',
    isUserIdValid,
    isAccessTokenValid,
    nickNameDuplicationCheck,
    asyncErrorWrapper(async (req, res, next) => {
      const id = req.params.id
      const tokenUserId = req.user._id
      const userDTO = req.body
      let UserServiceInstance = new UserService({ userModel })
      const { userRecord, accessToken, refreshToken } = await UserServiceInstance.modifyUser(id, tokenUserId, userDTO)

      res.cookie('R_AUTH', refreshToken, {
        sameSite: 'none',
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 14, // 2 Week
      })

      return res.status(200).json({
        _id: userRecord._id,
        nickName: userRecord.nickName,
        accessToken: accessToken,
        isExists: false,
      })
    })
  )
}
