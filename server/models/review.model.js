import mongoose from "mongoose";
import Service from "./service.model.js"

const reviewSchema = new mongoose.Schema(
    {
      service: {
        type: mongoose.Types.ObjectId,
        ref: "Service",
      },
      user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
      reviewText: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
        default: 0,
      },
    },
    { timestamps: true }
  );
  
  reviewSchema.pre(/^find/, function(next){
  
    this.populate({
      path:"user",
      select: "username avatar",
    });
  
    next();
  });
  
  reviewSchema.statics.calcAverageRatings = async function(serviceId){

    //this points the current review
    const stats = await this.aggregate([
      {
        $match: { service: serviceId }
      },
      {
        $group: {
          _id: "$service",
          numOfRating: { $sum: 1 },
          avgRating: { $avg: "$rating" }
        }
      },
      {
        $project: {
          _id: 0,
          numOfRating: 1,
          avgRating: { $round: ["$avgRating", 1] }
        }
      }
    ]);
  
  await Service.findByIdAndUpdate(serviceId, {
    totalRating: stats[0].numOfRating,
    averageRating:stats[0].avgRating,
  });
  };
  
  reviewSchema.post('save', async function(){
    try {
      await this.constructor.calcAverageRatings(this.service);
    } catch (error) {
      console.error(error);
    }
  });
  
  export default mongoose.model("Review", reviewSchema);
  