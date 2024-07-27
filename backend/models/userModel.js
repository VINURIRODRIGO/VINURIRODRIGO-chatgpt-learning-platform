const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const CustomErrorHandler = require("../utils/customErrorHandler");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["student", "instructor"],
    default: "student",
  },
  teachingExperience: {
    type: String,
    required: function () {
      return this.role === "instructor";
    },
  },
});

// static signup method for students
userSchema.statics.signupStudent = async function (
  firstName,
  lastName,
  email,
  password
) {
  // validation
  if (!firstName || !lastName || !email || !password) {
    throw new CustomErrorHandler("All fields must be filled", 400);
  }
  if (!validator.isEmail(email)) {
    throw new CustomErrorHandler("Email not valid", 400);
  }
  if (!validator.isStrongPassword(password)) {
    throw new CustomErrorHandler("Password not strong enough", 400);
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw new CustomErrorHandler(
      "Email already exists. Use a different email or log in.",
      400
    );
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    firstName,
    lastName,
    email,
    password: hash,
    role: "student",
  });

  return user;
};

// static signup method for instructors
userSchema.statics.signupInstructor = async function (
  firstName,
  lastName,
  email,
  password,
  teachingExperience
) {
  if (!firstName || !lastName || !email || !password || !teachingExperience) {
    throw new CustomErrorHandler("All fields must be filled", 400);
  }
  if (!validator.isEmail(email)) {
    throw new CustomErrorHandler("Email not valid", 400);
  }
  if (!validator.isStrongPassword(password)) {
    throw new CustomErrorHandler("Password not strong enough", 400);
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw new CustomErrorHandler("Email already in use", 400);
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    firstName,
    lastName,
    email,
    password: hash,
    role: "instructor",
    teachingExperience,
  });

  return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new CustomErrorHandler("All fields must be filled", 400);
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw new CustomErrorHandler("Incorrect email or password", 400);
  }

  const passMatch = await bcrypt.compare(password, user.password);
  if (!passMatch) {
    throw new CustomErrorHandler("Incorrect email or password", 400);
  }

  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
