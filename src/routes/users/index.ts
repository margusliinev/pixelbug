/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';

import { deleteUser, getAllUsers, getUser, updateUserPassword, updateUserProfile, uploadUserPicture } from '../../controllers/users';
import { auth, checkForTestUser } from '../../middleware/authMiddleware';
import upload from '../../middleware/multerMiddleware';

const router = express.Router();

router.route('/').get(auth, getAllUsers);
router
    .route('/me')
    .get(auth, getUser)
    .patch(auth, updateUserProfile)
    .put(auth, checkForTestUser, updateUserPassword)
    .delete(auth, checkForTestUser, deleteUser);
router.route('/me/picture').patch(auth, checkForTestUser, upload.single('profile_picture'), uploadUserPicture);

export default router;
