import mongoose from 'mongoose';
import {uuid} from 'uuidv4';
import crypto from 'crypto';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    hash_password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        default: ""
    },
    salt: String,
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            delete ret.hash_password;
            delete ret.salt;
            delete ret.__v;
        }
    }
});

userSchema.virtual('imageLink').get(function() {
    return `http://localhost:8000/public/profilePic/${this.profilePic}`
})

userSchema.virtual('password')
.set(function (password) {
    this._password = password;
    this.salt = uuid();
    this.hash_password = this.encryptPassword(password);
})
.get( function () {
    return this._password;
});

userSchema.methods = {
    authenticate: function (password) {
        return this.encryptPassword(password) === this.hash_password;        
    },
    encryptPassword: function(password) {
        try {
            return crypto.createHmac('sha1', this.salt).update(password).digest('hex');            
        } catch (error) {
            console.log('error in creating hmac');
            return error;
        }
    }
}

const User = mongoose.model('User', userSchema);

export default User;