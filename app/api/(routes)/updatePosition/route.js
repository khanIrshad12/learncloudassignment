
import connectMongoDB from '@/lib/monodb';
import Tododata from '@/model/TodoModel';
import { NextResponse } from 'next/server';


export const PUT=async(req,res)=>{
  try{
    
    await connectMongoDB();
    const positionsData  =await req.json();
    const updatedTodos = await Promise.all(
        positionsData.map(async ({ id, position }) => {
            console.log("drag",id,position )
          const todo = await Tododata.findByIdAndUpdate(id, { position }, { new: true });
          return todo;
        })
      );
    console.log('upated data',updatedTodos)

    return NextResponse.json(updatedTodos,{status:201});
  }catch(error){
    console.error('Error updating position todo:', error);
    return NextResponse.json( {message: "internal error 500" })
  }
}

