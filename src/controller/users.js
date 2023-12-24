import asyncHandler from "./../util/asyncHandler.js";
import User from "./../models/User.js";

//for get all user
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});


//for add user
const createUser = asyncHandler(async (req, res, next) => {
  
  const payload = {
    ...req.body,
    profile_image: `${process.env.SERVER_DOMAIN}/uploads/${req.files.profile_image[0].filename}`,
    documents: req.files.documents.map(
      (res) => `${process.env.SERVER_DOMAIN}/uploads/${res.filename}`
    ),
  };
  await User.create(payload);
  res.status(200).json({ success: true, message: "user created successfully" });
});

export { getAllUsers, createUser };
