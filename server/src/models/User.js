import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import config from '../config/index.js'

const userSchema = mongoose.Schema(
  {
    idToken: String,
    tokenType: String,
    email: {
      type: String,
      trim: true,
    },
    name: {
      type: String,
      maxlength: 50,
    },
    nickName: {
      type: String,
      maxlength: 100,
    },
    password: {
      type: String,
      minlength: 8,
    },
  },
  {
    timestamps: true,
  }
)

// 이메일찾기
userSchema.statics.findByEmail = async function (email) {
  return await User.findOne({ email: email })
}

// 닉네임찾기
userSchema.statics.findByNickName = async function (nickName) {
  return await User.findOne({ nickName: nickName })
}

// 토큰 찾기
userSchema.statics.findByIdToken = async function (idToken) {
  return await User.findOne({ idToken: idToken })
}

// 사용자 수정
userSchema.statics.modifyUser = async function (id, user) {
  const userRecord = await User.findByIdAndUpdate(id, user, {
    new: true,
  })
  return userRecord
}

// 사용자 삭제
userSchema.statics.deleteUser = async function (id) {
  await User.findByIdAndDelete({ _id: id })
}

// 토큰
userSchema.methods.generateAccessToken = async function () {
  const user = this
  const accessToken = await jwt.sign(
    {
      nickName: user.nickName,
      idToken: user.idToken,
    },
    config.jwtSecretKey,
    {
      expiresIn: '1h',
      issuer: config.issuer,
    }
  )
  return accessToken
}
// 토큰 재사용
userSchema.methods.generateRefreshToken = async function () {
  const user = this
  const refreshToken = await jwt.sign(
    {
      nickName: user.nickName,
    },
    config.jwtSecretKey,
    {
      expiresIn: '2w',
      issuer: config.issuer,
    }
  )
  return refreshToken
}

const User = mongoose.model('User', userSchema)

export { User }
