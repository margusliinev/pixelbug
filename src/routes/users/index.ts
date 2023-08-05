/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';

import { deleteUser, getUser, updateUserPassword, updateUserProfile, uploadUserPicture } from '../../controllers/users';
import { auth } from '../../middleware/authMiddleware';
import upload from '../../middleware/multerMiddleware';

const router = express.Router();

router.route('/me').get(auth, getUser).patch(auth, updateUserProfile).put(auth, updateUserPassword).delete(auth, deleteUser);
router.route('/me/picture').patch(auth, upload.single('profile_picture'), uploadUserPicture);

export default router;
