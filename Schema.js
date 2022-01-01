const mongoose = require('mongoose')
const DB_Schema=mongoose.Schema;
const Student=new DB_Schema({
    id:{ 
        type:Number,
        required:true,
        unique: true
    },
    name:{ 
        type: String,
        min:4,
        max:26,
        required:true,
    },
    age:{ 
        type:Number,
        required:true
    }

})
module.exports=mongoose.model('Students',Student)