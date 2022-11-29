const Todo = require('../models/Todo');

exports.getTodos = async(req, res) => {
  try {
    const todos = await Todo.find().sort({ date: -1 });
    res.status(200).json({
      message: "success",
      data: todos
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

exports.createTodo= async(req, res) => {   
  try {
    const todo = await Todo.create(req.body)
    res.status(200).json({
      message: "success",
      data: todo
    })
  }catch(err){
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getTodo = async(req, res) => {
  try {
    const todo= await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Not found " })
    }
    res.status(200).json({
      message: "success",
      data: todo
    })
  }catch(err){
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteTodo = async(req, res) => { 
  try {
    const todo= await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Not found " })
    }
    todo.remove();
    res.status(200).json({
      message: "success",
      data: {}
    })
  }catch(err){
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateTodo=async(req,res) => {
  try {
    let todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Not found " })
    }
    
    todo= await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      message: "success",
      data: todo
    })
  }catch(err){
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
