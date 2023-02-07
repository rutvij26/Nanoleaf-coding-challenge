import { Router } from 'express'

const salesRouter = Router()
salesRouter.get('/', (req, res) => {
    // get sales
    res.status(200).send('Sales reached!');
})
salesRouter.get('/:id', () => {
    // get sales
})
salesRouter.put('/:id', () => {
    // update sales
})
salesRouter.delete('/:id', () => {
    // delete sales
})
salesRouter.post('/', () => {
    // create sales
})

export default salesRouter