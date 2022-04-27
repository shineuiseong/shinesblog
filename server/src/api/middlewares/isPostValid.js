import { body, validationResult } from 'express-validator'
import { asyncErrorWrapper } from '../../asyncErrorWrapper.js'
import { CustomError } from '../../CustomError.js'

const checkPost = [
  body('title').isString().withMessage('Invaild datatype(String)').optional({ nullable: true }),
  body('content').isString().withMessage('Invaild datatype(String)').optional({ nullable: true }),
]

const isPostValid = asyncErrorWrapper(async function (req, res, next) {
  console.log('22')
  const errors = await validationResult(req)
  if (!errors.isEmpty()) {
    throw new CustomError('ContentInvaildError', 400, errors.array()[0].msg)
  }
  console.log('33')
  next()
})
export { checkPost, isPostValid }
