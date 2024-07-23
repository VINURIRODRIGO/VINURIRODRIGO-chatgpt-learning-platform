const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

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
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
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
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
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
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email");
  }

  const passMatch = await bcrypt.compare(password, user.password);
  if (!passMatch) {
    throw Error("Incorrect password");
  }

  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
