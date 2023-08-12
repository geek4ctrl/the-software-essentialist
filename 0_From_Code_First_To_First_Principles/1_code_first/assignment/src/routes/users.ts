import express from 'express';
import controller from '../controllers/users'
const router = express.Router();

router.get('/users', controller.getUsers);
router.get('/users/:email', controller.getUser);
router.get('/users/:id', controller.editUser);
router.get('/users', controller.createUser);

export = router;