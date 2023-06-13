import { Schema, model } from 'mongoose'
import pag from 'mongoose-paginate-v2';

const userCollection = 'usuarios'

const UserSchema = Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    age: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required:true
    },
    role: { 
        type: String, 
        default: 'student',
        enum: ['student', 'admin'] 
    }

})

UserSchema.plugin(pag)

let UserModel = model(userCollection, UserSchema)

export default UserModel