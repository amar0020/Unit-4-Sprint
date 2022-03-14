const express= require("express");
const mongoose= require("mongoose");

const app = express();

const connect= ()=>{
    return mongoose.connect("mongodb://127.0.0.1:27017/exam")
}

app.use(express.json())


const userSchema= new mongoose.Schema(
    {
        firstName:{type:String,required:true},
        middleName:{type:String,required:true},
        lastName:{type:String, required:true},
        age:{type:Number, required:true},
        email:{type:String, required:true},
        address:{type:String,required:true},
        gender:{type:String,required:false,default:"Female"}
    },
    {
        timestamps:true
    });

const branchSchema= new mongoose.Schema(
    {
        name:{type:String,required:true},
        address:{type:String,required:true},
        IFSC:{type:String,required:true},
        MICR:{type:String,required:true},
    },
    {
        timestamps:true
    })

const masterSchema= new mongoose.Schema(
    {
        balance:{type:Number,required:true},

        fixed:{type:mongoose.Types.Schema.ObjectId, ref:"fixedSchema"},
        fixed:{type:mongoose.Types.Schema.ObjectId, ref:"savingSchema"}
    },
    {
        timestamps:true
    });

const savingSchema= new mongoose.Schema({
        account_number:{type:Number,required:true,unique:true},
        balance:{type:Number, required:true},
        interestRate:{type:Number,required:true},
        user:{type:mongoose.Types.Schema,ObjectId,ref:"userSchema"}

},
{
    timestamps:true
})

const fixedSchema= new mongoose.Schema({
        account_number:{type:Number,required:true,unique:true},
        balance:{type:Number, required:true},
        interestRate:{type:Number,required:true},
        startDate:{type:Date,required:true},
        maturityDate:{type:Date,required:true},
        user:{type:mongoose.Types.Schema,ObjectId,ref:"userSchema"}
},
{
    timestamps:true
}
)



app.listen(7001,async ()=>{

    try
    {
        await connect();
    }
    catch(err){
        console.log(err)
    }
    

})