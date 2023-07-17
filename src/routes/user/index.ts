/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';

import { deleteUser, getUser, updateUserPassword, updateUserProfile, uploadPicture } from '../../controllers/user';
import { auth } from '../../middleware/authMiddleware';
import upload from '../../middleware/multerMiddleware';

const router = express.Router();

router.route('/').get(auth, getUser).patch(auth, updateUserProfile).put(auth, updateUserPassword).delete(auth, deleteUser);
router.route('/picture').patch(auth, upload.single('profile_picture'), uploadPicture);

export default router;
