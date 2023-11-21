import connectMongoDB from '@/lib/monodb'
import Tododata from '@/model/TodoModel';
import { NextResponse } from 'next/server';


export const GET=async(req,res)=>{
try{
    await connectMongoDB()
    const todos = await Tododata.find().sort('position');
    console.log("get data",todos)
    return NextResponse.json(todos , { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { message: "An error occurred while get the data." },
            { status: 500 }
          );
    }
}
export const POST = async (req, res) => {
  try {
    // Connect to MongoDB
    await connectMongoDB();

    // Parse JSON data from the request
    console.log("body",await req.body)
    const tododata = await req.json();
    console.log("add item", tododata);
    const {text,position,completed}=tododata
    // Create a new todo for each item in tododata
    const todos =await Tododata.create({text,position,completed})
    console.log("final data",todos)
    return NextResponse.json(todos, { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "An error occurred while posting data." },
      { status: 500 }
    );
  }
};

  
  