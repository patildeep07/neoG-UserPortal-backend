const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  email: {type:String, required:true, unique:true},
  username: {type:String, required:true, unique:true},
  password: {type:String, required:true},
  hashedPassword: String,
  phoneNumber: {type:Number, unique:true},
  address: String,
  profilePicture: {type:String, default: 'www.example.com/some_picture'}
},{timestamps:true})

const User = mongoose.model('User', userSchema)

// const addUser = async (userDetails) => {
//   try {
//     const newUser = await User(userDetails)

//     await newUser.save()

//     return newUser
//   } catch (error) {
//     throw error
//   }
// }

// addUser({
//   username:'testUser',
//   password:'123'
// })



module.exports = {User}