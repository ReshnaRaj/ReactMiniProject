const AdminModel = require("../Model/AdminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const maxtime = 3 * 24 * 60 * 60;
const UserModel=require('../Model/UserModel')


const createToken = (id) => {
  return jwt.sign({ id }, "secret key", {
    expiresIn: maxtime,
  });
};

const handleError = (err) => {
  let errors = { email: "", password: "", name: "", phone: "" };

  if (err.code === 11000) {
    errors.email = "Email already exists";
    return errors;
  }

  if (err.message.includes("Users validation failed")) {
    Object.values(err.errors).forEach((properties) => {
      errors["message"] = properties.message;
    });
    return errors;
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await AdminModel.findOne({ email });
    if (admin) {
     
      const validatePassword = await bcrypt.compare(password, admin.password);
      if (validatePassword) {
        const token = createToken(admin._id);
        res.cookie("jwt", token, {
          withCredentials: true,
          httpOnly: false,
          maxtime: maxtime * 1000,
        });
        console.log(token,'token coming')
        res.status(200).json({ admin, token, created: true });
      } else {
        const errors = { email: "Incorrect email or password" };
        res.json({ errors, creted: false });
      }
    } else {
      const errors = { email: "No admin with this email" };
      res.json({ errors, created: false });
    }
  } catch (error) {
    console.log(error);
    const errors = { email: "Something gone wrong" };
    res.json({ errors, created: false });
  }
};
const allUsers = async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.json({ status: true, message: "success", users });
  } catch (err) {
    console.log(err, "o");
    // res.json({message:"error"})
  }
};
const deleteUser = (req, res) => {
  try {
    UserModel.deleteOne({ _id: req.params.userId }).then((response) => {
      res.json({ message: "User deleted", status: true });
    });
  } catch (error) {
    res.json({ message: "error", status: false });
  }
};
const editUser = (req, res) => {
  try {
    console.log(req.body, "user data editing");

    UserModel
      .updateOne(
        { _id: req.body.id },
        {
          $set: {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
          },
        }
      )
      .then(() => {
        res.status(200).json({ message: "User data updated", status: true });
        return;
      }).catch (err => {
        console.log("catch blocl working...");
        console.log(err,"catch err");
        res.json({err, message: "Something gone wrong", status: false });
      })
  } catch (err) {
    console.log(err,"teena");
    res.json({ message: "Something gone wrong", status: false });
  }
};
const addUser = (req, res) => {
  try {
    UserModel
      .create({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
      })
      .then((response) => {
        res.json({
          message: "User Created Successfully",
          status: true,
          created: true,
        });
      })
      .catch((error) => {
        const errors = handleError(error);

        res.json({ errors, status: false, created: false });
      });
  } catch (error) {
    res.json({ errors: { message: "Something gone wrong" }, status: false });
  }
};


module.exports = {
  adminLogin,
  allUsers,
  deleteUser,
  editUser,
  addUser,
 
};