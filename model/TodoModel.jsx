import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  text: String,
  completed: Boolean,
  position: Number,
});

const Tododata = mongoose.models.Tododata || mongoose.model('Tododata', todoSchema);

export default Tododata;