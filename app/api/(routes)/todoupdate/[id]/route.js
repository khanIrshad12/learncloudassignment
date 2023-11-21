
import connectMongoDB from '@/lib/monodb';
import Tododata from '@/model/TodoModel';
import { NextResponse } from 'next/server';


export const PUT=async(req,{params})=>{
  try{
    
    await connectMongoDB();
    const {id}=params
    const {completed}  =await req.json();
    console.log(id,completed)
    const updatedTodo = await Tododata.findByIdAndUpdate(
      id,
      { completed },
      { new: true } // Return the updated document
    );

    if (!updatedTodo) {
      return NextResponse.json( { message: "An error occurred while update the completed." },
      { status: 500 })
    }
    console.log('upated data',updatedTodo)

    return NextResponse.json({message:'upated'},{status:201});
  }catch(error){
    console.error('Error updating todo:', error);
    return NextResponse.json( {message: "internal error 500" })
  }
}

