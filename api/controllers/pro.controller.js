import Pro from "../models/pro.model.js";

export const createPro = async (req, res, next) => {
  try {
    const pro = await Pro.create(req.body);
    return res.status(201).json(pro);
  } catch (error) {
    next(error);
  }
};
