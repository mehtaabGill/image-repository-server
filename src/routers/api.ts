import { Router } from 'express';
import { Image } from '../types/images';
import { loadAllImages } from '../helpers/database';

const router = Router();

router.get('/fetch-all-images', (req, res) => {
    res.json(loadAllImages().map((image: Image) => image.fileName));
})

export default router;