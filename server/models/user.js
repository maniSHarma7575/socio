const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    oauthProvider:{
        type: String,
        default:undefined
    },
    resetToken:String,
    expireToken:Date,
    avatar:{
        type:String,
        default:"https://res.cloudinary.com/socio/image/upload/v1590489444/nophoto_zuge3f.jpg"
    },
    designation:{
        type:String,
        default:''
    },
    followers:[{type:ObjectId,ref:"User"}],
    following:[{type:ObjectId,ref:"User"}],
    cover:{
        type:String,
        default:"https://res.cloudinary.com/socio/image/upload/v1591190678/wdqoycadcgjxlxtnxmmn.png"
    },
    profileProgress:{
        type:Number,
        default:0
    },
    quote:{
        type:String,
        default:''
    },
    previousJob:{
        company:{
        type:String,
        default:''
        },
        title:{
            type:String,
            default:''
        }
    },
    currentJob:{
        company:{
        type:String,
        default:''
        },
        title:{
            type:String,
            default:''
        }
    },
    currentCity:{
        type:String,
        default:''
    },
    state:{
        type:String,
        default:''
    },
    country:{
        type:String,
        default:''
    },
    originCity:{
        type:String,
        default:''
    },
    phone:{
        type:String,
        default:''
    },
    socketId:{
        type:String,
        default:null
    }
})

mongoose.model("User", userSchema)