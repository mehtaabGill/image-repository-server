import { Router } from 'express';
import fileUpload from 'express-fileupload';

import { sendAllImageNames, addNewImage } from '../controllers/api';

const router = Router();

router.use(fileUpload())

router.get('/fetch-all-images', sendAllImageNames)

router.post('/add-image', addNewImage)

export default router;