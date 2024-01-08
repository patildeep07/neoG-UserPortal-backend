const {User} = require('../models/users.model')
const {Movie} = require('../models/movies.model')

const express = require('express')
const router = express.Router()

const bcrypt = require('bcrypt')

// 1. Create a Function for User Signup

const signup = async (userDetails) => {
  try {
    const {password} = userDetails
    
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    
    const newUser = await User({...userDetails, hashedPassword})

    await newUser.save()
    
    return newUser
  } catch (error) {
    throw error
  }
}

router.post('/signup', async (req, res) => {
  try {
    const newUser = await signup(req.body)

    if (newUser) {
      res.json({message:'New user created!', newUser})
    }
  } catch (error) {
    res.status(404).json({message:'Invalid details provided'})
  }
})

// 2. Create a Function for User Login

const login = async (userDetails) => {
  try {
    const {email, password} = userDetails

    const foundUser = await User.findOne({email})

    if (foundUser) {
      const passwordMatch = await bcrypt.compare( password, foundUser.hashedPassword)


      if (passwordMatch) {
        const {hashedPassword, ...rest} = foundUser
        
        return {message:'Successfully logged in', user:rest._doc}
      } else {
        return {message:'Incorrect password'}
      }
    } else {
      return {message:'Please check your email id!'}
    }
    
  } catch (error) {
    throw error
  }
}

router.post('/login', async (req, res) => {
  try {
    const loggedInUser = await login(req.body)

    if (loggedInUser.message === 'Successfully logged in') {
      res.json(loggedInUser)
    } else {
      res.status(404).json(loggedInUser)
    }
  } catch (error) {
    res.status(500).json({message:'Failed to fetch data'})
  }
})

// 3. Create a Function to Change Password

const changePassword = async (userDetails) => {
  try {
    const {email, currentPassword, newPassword} = userDetails

    const foundUser = await User.findOne({email})

    if (foundUser) {
      const passwordMatch = await bcrypt.compare( currentPassword, foundUser.hashedPassword)


      if (passwordMatch) {
        foundUser.password = newPassword

        const salt = await bcrypt.genSalt(10)
        foundUser.hashedPassword = await bcrypt.hash(newPassword, salt)

        await foundUser.save()

        return {message:'Password successfully updated', newPassword}
        
      } else {
        return {message:'Incorrect password'}
      }
    } else {
      return {message:'Please check your email id!'}
    }
    
  } catch (error) {
    throw error
  }
}

router.post('/:userId/password', async (req,res) => {
  try {
    const changePasswordResponse = await changePassword(req.body)

    if (changePasswordResponse.message === 'Password successfully updated' ) {
      res.json(changePasswordResponse)
    } else {
      res.status(404).json(changePasswordResponse)
    }
  } catch (error) {
    res.status(500).json({message:'Failed to fetch data'})
  }
})

// 4. Update Profile Picture API

const updateProfilePicture = async (userDetails) => {
  try {
    const {email, newProfilePictureUrl} = userDetails

    const foundUser = await User.findOneAndUpdate({email},{profilePicture:newProfilePictureUrl}, {returnOriginal: false})

    if (foundUser) {
      return {message:'Profile picture updated successfully!', newProfilePictureUrl: foundUser.profilePicture}
    } else {
      return {message:'Invalid email received!'}
    }
  } catch (error ) {
    throw error
  }
}

router.post('/:userId/profile', async (req,res )=> {
  try {
    const updatedUser = await updateProfilePicture(req.body)

    if (updatedUser.message === 'Profile picture updated successfully!') {
      res.json(updatedUser)
    } else {
      res.status(404).json(updatedUser)
    }
    
  } catch (error) {
    res.status(500).json({message:'Failed to fetch data'})
  }
}) 

// 5. Updating Contact Details

const updateContactDetails = async (email, contactDetails) => {
  try {
    const {phoneNumber, address} = contactDetails

    const updatedUser = await User.findOneAndUpdate({email},{
      phoneNumber,
      address
    }, {
      returnOriginal: false
    })

    if (updatedUser) {
      return {message:'Contact details updated!', updatedUser}
    } else {
      return {message:'Unable to find user with this email!'}
    }
  } catch (error) {
    throw error
  }
}

router.post('/update-contact/:email', async (req, res) => {
  try {
    const updatedUser = await updateContactDetails(req.params.email, req.body)

    if (updatedUser.message === 'Contact details updated!') {
      res.json(updatedUser)
    } else {
      res.status(404).json(updatedUser)
    }
  } catch (error) {
    res.status(500).json({message:'Failed to fetch data'})
  }
})

// 6. Finding User by Phone Number

const findUserByPhoneNumber = async (phoneNumber) => {
  try {
    const foundUser = await User.findOne({phoneNumber})

    if (foundUser) {
      return {message:'Found user!', foundUser}
    } else {
      return {message:'No user found!'}
    }
  } catch (error) {
    throw error
  }
}

router.get('/phone/:phoneNumber', async (req, res) => {
  try {
    const foundUser = await findUserByPhoneNumber(req.params.phoneNumber)

    if (foundUser.message === "Found user!") {
      res.json(foundUser)
    } else {
      res.status(404).json(foundUser)
    }
      
  } catch (error) {
    res.status(500).json({message:'Failed to fetch data'})
  }
})




// Exporting router
module.exports = router