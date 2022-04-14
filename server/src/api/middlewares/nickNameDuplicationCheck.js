import { User } from '../../models/User.js'
import { asyncErrorWrapper } from '../../asyncErrorWrapper.js'

// 회원 정보 수정 시 닉네임이 중복되었는지 체크한다.
const nickNameDuplicationCheck = asyncErrorWrapper(async (req, res, next) => {
  try {
    let nickName = req.query.nickName || req.body.nickName
    if (nickName) {
      const user = await User.findByNickName(nickName)
      if (user) {
        return res.status(200).json({
          message: `Nickname is duplicated.`,
          isExists: true,
        })
      }
    }
    next()
  } catch (error) {
    console.error(error)
    return res.status(400).json({
      message: 'error',
      isExists: false,
    })
    next(error)
  }
})

export { nickNameDuplicationCheck }
