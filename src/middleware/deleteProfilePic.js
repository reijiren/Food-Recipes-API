const fs = require("fs");
const userModel = require("../model/user.model");

const removeProfileImg = async (req, res, next) => {
  const email = req.params.email;
  const data = await userModel.findUser(email);
  if (data.rows[0].image) {
    const img = data.rows[0].image;
    console.log(img);
    fs.unlink(`./assets/profile/${img}`, (err) => {
      if (err) {
        res.json({
            message: 'err',
            error: err,
        })
      }
    });
    next();
  } else {
    res.json("There is no image");
  }
};

module.exports = removeProfileImg;