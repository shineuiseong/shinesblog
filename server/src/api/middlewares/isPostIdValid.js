import { Post } from '../../models/Post.js'
import { asyncErrorWrapper } from '../../asyncErrorWrapper.js'
import { CustomError } from '../../CustomError.js'
import mongoose from 'mongoose'

const isPostIdValid = asyncErrorWrapper(async (req, res, next) => {
  console.log('44')
  const postId = req.params.id
  const { ObjectId } = mongoose.Types
  console.log('55')
  if (!postId || !ObjectId.isValid(postId)) throw new CustomError('NotFoundError', 404, 'Post not found')
  const post = await Post.findById(postId)
  if (!post) throw new CustomError('NotFoundError', 404, 'Study not found')

  next()
})

export { isPostIdValid }
