const fs = require("fs");
const userModel = require("../model/user.model");

const removeProfileImg = async (req, res, next) => {
  const id = req.params.id;
  const data = await userModel.findUser(id);
  if (data.rows[0]) {
    const img = data.rows[0].image;
    if(img !== "default.png"){
      fs.unlink(`./assets/profile/${img}`, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
    next();
  } else {
    res.json("User not found");
  }
};

module.exports = removeProfileImg;