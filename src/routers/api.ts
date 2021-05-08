import { Router } from 'express';
import fileUpload from 'express-fileupload';

import { sendAllImageNames, addNewImage, getImagesBySearch } from '../controllers/api';

const router = Router();

router.use(fileUpload())

router.get('/fetch-all-images', sendAllImageNames)

router.post('/add-image', addNewImage)

router.get('/search-images', getImagesBySearch)

export default router;