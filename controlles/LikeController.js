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
        const movieid = req.params.movieid;
        const like = await LikeModel.findById({
            _id: movieid
        }).populate('userid').exec();

        res.json(like)

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Error fetching one like'
        })
    }
};
export const remove = async (req, res) => {
    try {
        const likeId = req.params.id;

        LikeModel.findByIdAndDelete(likeId)
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
