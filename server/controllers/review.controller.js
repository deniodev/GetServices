import Review from '../models/review.model.js'
import Service from '../models/service.model.js'


//get all reviews
export const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find({});

        res
        .status(200)
        .json({success:true, message:'Succcessful', data:reviews});
    } catch (err) {        
        res.status(404).json({success:false, message:'Not Found!'});
    }
};

//create review
export const createReview = async(req,res) => {

    if(!req.body.service) req.body.service = req.params.serviceId
    if(!req.body.user) req.body.user = req.user.id

    const newReview = new Review(req.body)

    try {

        const savedReview = await newReview.save();

        await Service.findByIdAndUpdate(req.body.service, {
            $push:{reviews: savedReview._id}
        })

        res.status(200).json({ success:true, message:"Review submitted", data:savedReview });
        
    } catch (err) {
        res.status(500).json({ success:false, message: err.message });
    }

};
