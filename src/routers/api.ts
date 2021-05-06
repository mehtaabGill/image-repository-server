import { Router } from 'express';
import { readAllImageNames } from '../controllers/images';

const router = Router();

router.get('/fetch-all-images', (req, res) => {
    res.json(readAllImageNames());
})

export default router;