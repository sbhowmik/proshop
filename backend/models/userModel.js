import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

//schema
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],    
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true        
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],    
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  }
}, 
{
  timestamps: true,
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt
//pre allows to do something before it saves to DB
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});


const User = mongoose.model('User', userSchema);

export default User;