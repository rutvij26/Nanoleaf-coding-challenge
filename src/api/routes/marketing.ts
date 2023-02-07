import { Router } from 'express'

const marketingRouter = Router()
marketingRouter.get('/', (req, res) => {
    // get marketing
    res.status(200).send('Marketing reached!');
})
marketingRouter.get('/:id', () => {
    // get marketing
})
marketingRouter.put('/:id', () => {
    // update marketing
})
marketingRouter.delete('/:id', () => {
    // delete marketing
})
marketingRouter.post('/', () => {
    // create marketing
})

export default marketingRouter