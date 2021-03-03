import { Router } from 'express'

const router = Router()
const list = async (req, res) => {
  res.json('hello world!')
}
router.get('/', list)

router.get('/:id', list)

router.post('/', list)

router.put('/:id', list)

router.delete('/:id', list)

export default router
