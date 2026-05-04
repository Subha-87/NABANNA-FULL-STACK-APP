const {Schema,model, default: mongoose} = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var userAdminSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    rank:{
        type:String,
        required:true,
       
    },
    subdivision:{
        type:String,
        required:true,
        
    },
    mobile:{
        type:Number,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
});

//Export the model

const Admins = mongoose.models.admin || model("admin",userAdminSchema)

module.exports = Admins