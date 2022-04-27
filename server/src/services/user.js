import config from '../config/index.js'
import AWS from 'aws-sdk'
import { CustomError } from '../CustomError.js'
export class UserService {
  constructor({ postModel, userModel, notificationModel }) {
    this.postModel = postModel
    this.userModel = userModel
    this.notificationModel = notificationModel
  }

  // S3 pre-sign url을 발급한다.
  async getPreSignUrl(fileName) {
    const s3 = new AWS.S3({
      accessKeyId: config.S3AccessKeyId,
      secretAccessKey: config.S3SecretAccessKey,
      region: config.S3BucketRegion,
    })

    const params = {
      Bucket: config.S3BucketName,
      Key: fileName,
      Expires: 60 * 60 * 3,
    }

    const signedUrlPut = await s3.getSignedUrlPromise('putObject', params)
    return signedUrlPut
  }

  // 닉네임을 사용하여 사용자 정보 조회
  async findByNickName(nickName) {
    const users = await this.userModel.findByNickName(nickName)
    return users
  }

  // id를 사용하여 사용자 정보 조회
  async findById(id) {
    const users = await this.userModel.findById(id)
    return users
  }

  // 사용자 정보 수정
  async modifyUser(id, tokenUser, user) {
    if (id != tokenUser) throw new CustomError('NotAuthenticatedError', 401, 'User does not match')

    console.log(id, tokenUser, user)
    const userRecord = await this.userModel.modifyUser(id, user)
    const accessToken = await userRecord.generateAccessToken()
    const refreshToken = await userRecord.generateRefreshToken()
    console.log(userRecord, accessToken, refreshToken)
    return { userRecord, accessToken, refreshToken }
  }

  //사용자 삭제
  async deleteUser(id, tokenUser) {
    if (id != tokenUserId) throw new CustomError('NotAuthenticatedError', 401, 'User does not match')

    // 사용자 작성한 글 제거
    await this.postModel.deleteMany({ author: id })

    // 사용자가 작성한 댓글 제거
    await this.postModel.findOneAndUpdate({ comments: { $elemMatch: { author: id } } }, { $pull: { comments: { author: id } } })

    // 사용자가 작성한 대댓글 제거
    await this.postModel.findOneAndUpdate({ 'comments.replies': { $elemMatch: { author: id } } }, { $pull: { 'comments.$.replies': { author: id } } })

    // 탈퇴 시 관련 알림 제거
    await this.notificationModel.deleteNotificationByUser(id)
    await this.userModel.deleteUser(id)
  }

  // 사용자의 작성 목록을 조회한다.
  async findMyPost(id) {
    const myPost = await this.userModel.find({ author: id, isDeleted: false }).sort('-createdAt')
    return myPost
  }
}
