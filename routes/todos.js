const express = require('express');
const auth = require('../middleware/auth');

const { 
  getTodos, 
  createTodo, 
  getTodo, 
  deleteTodo, 
  updateTodo
} = require('../controllers/todos');

const router = express.Router();

router.get('/', auth, getTodos);

router.post('/', auth, createTodo);

router.get('/:id', auth, getTodo);

router.delete('/:id', auth, deleteTodo);

router.put('/:id', auth, updateTodo);

module.exports = router;
