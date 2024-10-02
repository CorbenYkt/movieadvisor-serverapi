import mongoose from "mongoose";

const LikeSchema = new mongoose.Schema({
    movieid: {
        type: String,
        required: true,
    },
    userid: {
        type: String,
        required: true,
    },
},

    {
        timestamps: true,
    }
);

export default mongoose.model('Like', LikeSchema);