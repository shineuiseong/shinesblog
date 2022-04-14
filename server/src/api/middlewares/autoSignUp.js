import { User } from '../../models/User.js'
import { asyncErrorWrapper } from '../../asyncErrorWrapper.js'

// 로그인 시 회원가입 여부를 판단한다.
// loginSuccess
// true: 로그인 완료
// false: 로그인 실패. 회원 가입 필요.
const autoSignUp = asyncErrorWrapper(async (req, res, next) => {
  try {
    // 유저 토큰찾기
    const user = await User.findByIdToken(req.user.idToken)
    // 토큰이 없으면
    if (!user) {
      // DB에 유저 만들기
      const newUser = await User.create(req.user)
      // 만들었음 클라에 정보 보내주기
      // _id와 loginSuccess (로그인끝난게아님) , message

      return res.status(200).json({
        _id: newUser._id,
        loginSuccess: false,
        message: '회원 가입을 진행해야 합니다.',
      })
      // 닉네임을 정하지 않았으면
    } else if (!user.nickName) {
      // 아직 로그인 끝난게 아니다라고 보내줌
      return res.status(200).json({
        _id: user._id,
        loginSuccess: false,
        message: '회원 가입을 진행해야 합니다.',
      })
    } else {
      next()
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
})

export { autoSignUp }
