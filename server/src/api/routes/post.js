import { Router } from 'express'
import { checkPost, isPostValid, isPostIdValid, isAccessTokenValid, getUserIdByAccessToken } from '../middlewares/index.js'
import { PostService } from '../../services/post.js'
import { asyncErrorWrapper } from '../../asyncErrorWrapper.js'
import { Post as postModel } from '../../models/Post.js'
import { User as userModel } from '../../models/User.js'
import { Notification as notificationModel } from '../../models/Notification.js'

const route = Router()
export default (app) => {
  app.use('/posts', route)

  // 게시글 리스트 조회
  route.get(
    '/',
    asyncErrorWrapper(async (req, res, next) => {
      const { offset, limit, sort, language, period, isClosed } = req.query
      let PostServiceInstance = new PostService({ postModel, userModel, notificationModel })
      const posties = await PostServiceInstance.findPost(offset, limit, sort, language, period, isClosed)

      res.status(200).json(posties)
    })
  )

  // 게시글 등록
  route.post(
    '/',
    checkPost,
    isPostValid,
    isAccessTokenValid,
    asyncErrorWrapper(async (req, res, next) => {
      try {
        console.log('11')
        const postDTO = req.body
        const userId = req.user._id

        console.log(postDTO)
        console.log(userId)
        let PostServiceInstance = new PostService({ postModel, userModel, notificationModel })
        console.log('44')
        const post = await PostServiceInstance.registerPost(userId, postDTO)
        console.log('55')
        res.status(201).json(post)
        console.log('66')
      } catch (error) {
        res.status(400).json({
          errors: [
            {
              location: 'body',
              param: 'name',
              error: 'TypeError',
              message: 'must be String',
            },
          ],
          error,
        })
      }
    })
  )
}
