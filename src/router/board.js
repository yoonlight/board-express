import { Router } from 'express'
import { board } from '../model'

const router = Router()
const list = async (req, res) => {
  const { offset, limit, complete, search, field } = req.query
  const perPage = parseInt(limit)
  const pageNum = (parseInt(offset) - 1) * perPage
  let result = board.find().sort({ date: -1 }).skip(pageNum).limit(perPage)
  let count = board.countDocuments()

  if (complete != undefined) {
    count.where('complete').equals(complete)
    result.where('complete').equals(complete)
    if (search != undefined && field != undefined) {
      count.where(field).regex(search)
      result.where(field).regex(search)
    }
  }

  if (search != undefined && complete == undefined && field != undefined) {
    count.where(field).regex(search)
    result.where(field).regex(search)
  }

  try {
    const pageCount = await count.exec()
    const page = Math.ceil(pageCount / perPage)
    await result.exec((err, result) => {
      if (err) res.status(400).send(err)
      if (result == []) res.status(404)
      res.json({ pagination: { pageCount, page }, query: result })
    })
  } catch (error) {
    res.json(error)
  }
}

const detail = async (req, res) => {
  await board.findOne({ _id: req.params.id }).exec((err, result) => {
    if (err) return res.status(404).send(err)
    res.send(result)
  })
}

const create = async (req, res) => {
  await board.create(req.body, (err) => {
    if (err) res.status(404).send(err)
  })
  res.status(201).json('create board')
}

const update = async (req, res) => {
  await board.updateOne({ _id: req.params.id }, req.body).exec(() => {
    res.status(200).json({ message: 'success to update board' })
  })
}

const deleteBoard = async (req, res) => {
  await board.findOneAndRemove({ _id: req.params.id }).exec(() => {
    res.status(200).json({ message: 'success to delete board' })
  })
}

const deleteComment = async (req, res) => {
  await board
    .updateOne(
      { _id: req.params.id },
      { $pull: { comments: { _id: req.params.commentId } } }
    )
    .exec((err, result) => {
      if (err) res.send(err)
      else res.send(result)
    })
}

const addComment = async (req, res) => {
  await board
    .updateOne({ _id: req.params.id }, { $push: { comments: [req.body] } })
    .exec((err, result) => {
      if (err) res.status(400).send(err)
      else res.send(result)
    })
}

// update 예정
const updateComment = async (req, res) => {
  await board
    .updateOne(
      { 'comments._id': req.params.commentId },
      { $set: { 'comments.$[]': req.body } }
    )
    .exec((err, result) => {
      if (err) res.send(err)
      else res.send(result)
    })
}

router.get('/', list)

router.get('/:id', detail)

router.post('/', create)

router.post('/:id/comments', addComment)

router.put('/:id', update)

router.put('/:id/comments/:commentId', updateComment)

router.delete('/:id', deleteBoard)

router.delete('/:id/comments/:commentId', deleteComment)

export default router
