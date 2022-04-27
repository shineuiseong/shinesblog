import mongoose from 'mongoose'
import { CustomError } from '../CustomError.js'

// 대댓글 스키마
const replySchema = mongoose.Schema(
  {
    content: String, // 댓글 내용
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // 댓글 등록자 정보
  },
  {
    versionKey: false,
    timestamps: true, // createdAt, updatedAt 컬럼 사용
  }
)

// 댓글 스키마
const commentSchema = mongoose.Schema(
  {
    content: String, // 댓글 내용
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // 댓글 등록자 정보
    replies: [replySchema],
  },
  {
    versionKey: false,
    timestamps: true, // createdAt, updatedAt 컬럼 사용
  }
)

// 게시글 스키마
const postSchema = mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // 글 등록자 정보
    topic: String, // 글 주제 (사용x)
    location: String, // 스터디 장소 (사용 x)
    position: [{ part: String, personnel: Number }], // 모집 인원 정보(사용 X)
    title: String, // 글 제목
    content: String, // 글 내용
    isDeleted: { type: Boolean, default: false }, // 글 삭제 여부
    isClosed: { type: Boolean, default: false }, // 글 마감 여부
    views: { type: Number, default: 0 }, // 글 조회수
    comments: [commentSchema], // 글 댓글 정보
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // 관심 등록한 사용자 리스트
    totalLikes: { type: Number, default: 0 }, // 관심 등록 수
  },
  {
    versionKey: false,
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
)

postSchema.statics.findPost = async (offset, limit, sort, language, period, isClosed) => {
  let offsetQuery = parseInt(offset) || 0
  let limitQuery = parseInt(limit) || 20
  let sortQuery = []

  //Sorting
  if (sort) {
    const sortableColumns = ['views', 'createdAt', 'totalLikes']
    sortQuery = sort.split(',').filter((value) => {
      return sortableColumns.indexOf(value.substr(1, value.length)) != -1 || sortableColumns.indexOf(value) != -1
    })
    sortQuery.push('-createdAt')
  } else {
    sortQuery.push('createdAt')
  }

  // Query
  let query = {}
  if (typeof language === 'string') query.language = { $in: language.split(',') }
  else if (typeof language === 'undefined') return []

  if (!isNaN(period)) {
    let today = new Date()
    query.createdAt = { $gte: today.setDate(today.getDate() - period) }
  }
  // 마감된 글 안보기 기능(false만 지원)
  if (typeof isClosed === 'string' && !(isClosed === 'true')) {
    query.isClosed = { $eq: isClosed === 'true' }
  }

  return await Post.find(query).where('isDeleted').equals(false).sort(sortQuery.join(' ')).skip(Number(offsetQuery)).limit(Number(limitQuery))
}

// 사용자에게 추천 조회
postSchema.statics.findPostRecommend = async function (sort, language, postId, userId, limit) {
  let sortQuery = []
  //Sorting
  if (sort) {
    const sortableColumns = ['views', 'createdAt', 'totalLikes']
    sortQuery = sort.split(',').filter((value) => {
      return sortableColumns.indexOf(value.substr(1, value.length)) != -1 || sortableColumns.indexOf(value) != -1
    })
  } else {
    sortQuery.push('createdAt')
  }
  // Query
  let query = {}
  if (typeof language == 'object' && language.length > 0) query.language = { $in: language }

  // 14일 이내 조회
  let today = new Date()
  query.createdAt = { $gte: today.setDate(today.getDate() - 14) }

  // 현재 읽고 있는 글은 제외하고 조회
  query._id = { $ne: postId }

  // 사용자가 작성한 글 제외하고 조회
  if (userId) query.author = { $ne: userId }

  let posties = await Post.find(query).where('isDeleted').equals(false).where('isClosed').equals(false).sort(sortQuery.join(' ')).limit(limit).select('-isDeleted')

  // 부족한 개수만큼 추가 조회
  if (posties.length < limit - 1) {
    let notInPostIdArr = posties.map((study) => {
      return study._id
    })
    notInPostIdArr.push(posties)
    query._id = { $nin: notInPostIdArr } // 이미 조회된 글들은 중복 x
    delete query.language
    let shortPosties = await Post.find(query)
      .where('isDeleted')
      .equals(false)
      .where('isClosed')
      .equals(false)
      .sort(sortQuery.join(' '))
      .limit(limit - postes.length)
      .select('-isDeleted')
    posties.push(...shortPosties)
  }
  return posties
}

postSchema.statics.deletePost = async (id) => {
  await Post.findByIdAndUpdate({ _id: id }, { isDeleted: true })
}

// 댓글 길이 get
postSchema.virtual('totalComments').get(() => {
  return this.comments.length
})

// 댓글 등록
postSchema.statics.registerComment = async (postId, content, author) => {
  let post
  let commentId = new mongoose.Types.ObjectId()
  // 제한자를 이용하여 데이터 추가
  post = await Post.findOneAndUpdate({ _id: postId }, { $push: { comments: { _id: commentId, content, author } } }, { new: true, upsert: true })
  return { post, commentId }
}

// 댓글 찾기
postSchema.statics.findComments = async (id) => {
  return await Post.findById(id).populate('comments.author', 'nickName image').populate('comments.replies.author', 'nickName image')
}

// 댓글 수정
postSchema.statics.modifyComment = async (comment) => {
  let commentRecord
  let { id, content } = comment

  commentRecord = await Post.findOneAndUpdate({ comments: { $elemMatch: { _id: id } } }, { $set: { 'comments.$.content': content } }, { new: true })
  return commentRecord
}
// 댓글 삭제
postSchema.statics.deleteComment = async (id) => {
  const commentRecord = await Post.findOneAndUpdate({ comments: { $elemMatch: { _id: id } } }, { $pull: { comments: { _id: id } } })
  return commentRecord
}

// 대댓글 등록
postSchema.statics.registerReply = async (postId, commentId, content, author) => {
  let post
  let replyId = new mongoose.Types.ObjectId()
  post = await Post.findByIdAndUpdate(
    { _id: postId, comments: { $elemMatch: { _id: commentId } } },
    { $push: { 'comments.$.replies': { _id: replyId, content, author } } },
    { new: true, upsert: true }
  )
  return { study, replyId }
}

// 대댓글 수정
postSchema.statics.modifyReply = async (comment) => {
  let commentRecord
  let { id, content, commentId } = comment
  commentRecord = await Post.findOneAndUpdate(
    {
      comments: { $elemMatch: { _id: commentId } },
    },
    {
      $set: { 'comments.$[].replies.$[i].content': content },
    },
    {
      arrayFilters: [{ 'i._id': id }],
      new: true,
    }
  )
  return commentRecord
}

// 대댓글 삭제
postSchema.statics.deleteReply = async (id) => {
  const commentRecord = await Post.findOneAndUpdate({ 'comments.replies': { $elemMatch: { _id: id } } }, { $pull: { 'comments.$.replies': { _id: id } } })
  return commentRecord
}

// 사용자 아이디 조회
// 댓글 등록한 사용자 아이디 조회
postSchema.statics.findAuthorByCommentId = async (commentId) => {
  // $elemMatch 쿼리 사용하여 _id와 commentId 같은데이터 찾기
  let post = await Post.findOne({ comments: { $elemMatch: { _id: commentId } } })
  if (post) {
    let { author } = post.comments[post.comments.length - 1]
    return author
  } else {
    return null
  }
}

// 대댓글 등록한 사용자 아이디 조회
postSchema.statics.findAuthorByReplyId = async (replyId) => {
  let post = await Post.findOne({ 'comments.replies': { $elemMatch: { _id: replyId } } })
  if (post) {
    let { author } = post.comments[post.comments.length - 1]
    return author
  } else {
    return null
  }
}

// 권한
// 게시글 수정 권한 체크
postSchema.statics.checkPostAuthorization = async (postId, tokenUserId) => {
  const post = await Post.findOne({ _id: postId, author: tokenUserId })
  if (!post) {
    throw new CustomError('NotAuthenticatedError', 401, 'User does not match')
  }
}

// 댓글 수정 권한 체크
postSchema.statics.checkCommentAuthorization = async (commentId, tokenUserId) => {
  const post = await Post.findOne({ comments: { $elemMatch: { _id: commentId, author: tokenUserId } } })
  if (!post) {
    throw new CustomError('NotAuthenticatedError', 401, 'User does not match')
  }
}
// 대댓글 수정 권한 체크
postSchema.statics.checkReplyAuthorization = async (replyId, tokenUserId) => {
  const post = await Post.findOne({ comments: { $elemMatch: { _id: replyId, author: tokenUserId } } })
  if (!post) {
    throw new CustomError('NotAuthenticatedError', 401, 'User does not match')
  }
}
const Post = mongoose.model('Post', postSchema)

export { Post }
