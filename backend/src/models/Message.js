import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    text: {
        type: String
    },
    image: {
        type: String
    }
}, {timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            delete ret.__v;
        }
    }
});

messageSchema.virtual('imageLink').get(function () {
    return `${process.env.APP_URI}/public/image/${this.image}`;
})

const Message = mongoose.model('Message', messageSchema);

export default Message;