import express from 'express';

import { deleteUser, getUser, searchUsers } from '../controllers/user.js';
import { addUser } from '../controllers/user.js';
import { updateUser } from '../controllers/user.js';

const router = express.Router();

router.get('/', getUser);
router.post('/add', addUser );
router.post('/update', updateUser);
router.post('/delete', deleteUser);
router.post('/search', searchUsers);
<<<<<<< HEAD

=======
>>>>>>> e61913c996bceda4a1bc749c8df87e17925056d3
export default router;