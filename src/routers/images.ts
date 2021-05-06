import { Router } from 'express';
import { sendImageByName } from '../controllers/images';

const router = Router();

router.get('/:imageName', sendImageByName)

export default router;