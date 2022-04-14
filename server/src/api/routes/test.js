import { Router } from 'express'

const route = Router()

export default (app) => {
  app.use('/list', route)

  route.get('/', (req, res) => {
    res.json([
      { id: 'test1', name: '테스트1!!ddd' },
      { id: 'test2', name: '테스트2!!' },
      { id: 'test3', name: '테스트3!!' },
      { id: 'test4', name: '테스트4!!' },
    ])
  })
}
