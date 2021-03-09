import { Router } from 'express'
import { board } from '../model'

const router = Router()
const list = async (req, res) => {
  res.json('hello world!')
}

const detail = async (req, res) => {
  await board.findOne({ _id: req.params.id }).exec((err, result) => {
    if (err) return res.status(404).send(err)
    res.send(result)
  })
}
router.get('/', list)

router.get('/:id', detail)

router.post('/', list)

router.post('/:id/comments', list)

router.put('/:id', list)

router.put('/:id/comments/:id', list)

router.delete('/:id', list)

router.delete('/:id/comments/:id', list)

export default router
