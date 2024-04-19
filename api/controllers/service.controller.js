import Service from "../models/service.model.js";
import { errorHandler } from "../utils/error.js";

export const createService = async (req, res, next) => {
  try {
    const service = await Service.create(req.body);
    return res.status(201).json(service);
  } catch (error) {
    next(error);
  }
};

export const deleteService = async (req, res, next) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    return next(errorHandler(404, "Service not found"));
  }

  if (req.user.id !== service.userRef) {
    return next(errorHandler(401, "You can only delete your own services!"));
  }

  try {
    await Service.findByIdAndDelete(req.params.id);
    res.status(200).json("Service has been deleted");
  } catch (error) {
    next(error);
  }
};
