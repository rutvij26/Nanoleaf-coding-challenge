import { Router } from 'express'
import marketingRouter from './marketing'
import salesRouter from './sales'

const router = Router()

router.use('/marketing', marketingRouter);
router.use('/sales', salesRouter);

export default router