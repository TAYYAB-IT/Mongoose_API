const express = require('express')
const app = express()
const monogo=require('./DB_connection')
const student=require('./Schema.js')
monogo('mongodb+srv://tybtest90:testing1122@cluster0.hqfbo.mongodb.net/test');
//Create a user
app.post("/student/:id/:name/:age",(req,res)=>{
const std=new student({id:req.params.id,name:req.params.name,age:req.params.age})

std.save().
then(data=>{
    console.log(" Saved.")
    res.send(data)
}).
catch(err=>{
    res.send(err)
})})
////////////////

//All Students List
app.get('/student',(req,res)=>{
    all_students=new student();
    student.find({},(err,all_students)=>{
        if(err){
            res.send(err);
        }
        else if(all_students.length==0){
            res.send("No Student record")
        }
        else{
            res.send(all_students.toString())
        }
    })
})
/////////////
//Search By one attribute,Here by ID
app.get('/student/:id([1-9])',(req,res)=>{
    all_searched=new student();
    student.find({id:req.params.id},(err,all_searched)=>{
        if(err){
            res.send(err)
        }
        else if(all_searched.length==0){
            res.send(`No Such Record Found with ID::${req.params.id}`)
        }
        else{
            res.send(all_searched.toString())
        }
    })
})
////////////////////////Search only first object
//student.findOne({id:req.params.id},(err,searched_Object))  

////Delete a single object/////
app.delete('/student/:id([1-9])',(req,res)=>{
 student.findOneAndDelete({id:req.params.id},(err,data)=>{
    if(err)
    res.send(err)
    else if(!data){res.send("No Such Record Exist")}
    else{
        res.send("Deleted Account ="+data)
    }
 })
})
/////////////Delete Many objects
app.delete('/student-:name',(req,res)=>{
student.deleteMany({name:req.params.name},(err,result)=>{
    if(err){
        console.log(err)
    }
    else if(result.deletedCount==0){res.send("No Record Found")}

else{
    res.send("Records deleted="+result.deletedCount)
}
})
})

///////Update an Object
app.patch('/student-:age',(req,res)=>{
    student.findOneAndUpdate({age:req.params.age},{name:"Updated"},(err,data)=>{
        if(err){
            console.log(err)
        }
        else if(!data){
            res.send("No Record Found")
        }
        else{
            res.send(data)
        }
    })
})
//Update many Objects
/* student.updateMany({age:req.params.age},{name:"Updated"},(err,result)=>{
    if(err){
        console.log(err)
    }
    else if(result.matchedCount==0){res.send("No Record Found")}

else{
    res.send("Records Updated="+result.matchedCount)
}
}) */

//Count Objects
/* student.count({name:'Qasim'},(err,count)=>{
    if(err){
        res.send(err)
    }
    else{
        res.send("Result Founds="+count)
    }
}) */
app.listen(3000,()=>{
    console.log("Server is Active")
})

//Comparison 
//{age:{$lte:19}} ,etc
//Logical Operators
//{$and[{name:" Ali"},{age:19}]} ,etc