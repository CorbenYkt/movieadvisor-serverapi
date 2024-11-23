import LikeModel from '../models/Like.js';

export const getAll = async (req, res) => {
    try {
        const likes = await LikeModel.find().populate('userid').exec();

        res.json(likes)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Error fetching all likes'
        })
    }
};
export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await PostModel.findById({
            _id: postId
        }).populate('user').exec();

        res.json(post)

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Error fetching one post'
        })
    }
};

export const doLike = async (req, res) => {
    try {
        const movieid = req.query.movieid;
        const userid = req.query.userid;

        const like = await LikeModel.find({
            movieid: movieid,
            userid: userid
        }).exec();

        res.json(like)

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Error fetching does user like'
        })
    }
};

export const remove = async (req, res) => {
    try {
        const movieid = req.query.movieid;
        const userid = req.query.userid;


        LikeModel.findOneAndDelete({
            movieid: movieid,
            userid: userid
        })
            .then(deletedLike => {
                if (deletedLike) {
                    res.json({
                        success: true,
                    })
                } else {
                    res.status(500).json({
                        message: 'Like not found'
                    })
                }
            })
            .catch(error => {
                console.log(error)
                res.status(500).json({
                    message: 'Error removing Like'
                })
            });

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Error removing post'
        })
    }
};

export const create = async (req, res) => {
    try {
        const doc = new LikeModel({
            movieid: req.body.movieid,
            userid: req.body.userid
        })
        const like = await doc.save();
        res.json(like);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Error creating like to movie'
        })
    }
};
