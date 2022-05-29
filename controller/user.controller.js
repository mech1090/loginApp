const userModel = require('../model/user')
const bcrypt = require('bcrypt')
const config = require('config')
const userService = require('../services/user.service')

const getLoginForm = (req,res)=>{
    res.render('login/layout')
}
const login = async(req,res)=>{
    const {email,password} = req.body
    const fields = {email,password}
    const findEmail = await userService.find({email})
//    const findEmail = await userModel.findOne({email})
    if(!findEmail){
        return res.render('signup/layout',{message:"Email not Found Please Register"})
    }
    const isAuthorized = await bcrypt.compare(password,findEmail.password)
    if(isAuthorized){
        return res.render('user/layout')
    }
    return res.render('login/layout',{message:'Email or Password Wrong'})

}
const getSignupForm = (req,res)=>{
    res.render('signup/layout')
}
const signup = async(req,res)=>{
    const {email,password} = req.body
    const fields = {email,password}
 //   const findUser = await userModel.findOne({email})
    const findUser = await userService.find({email})
    if(findUser){
        return res.render('login/layout',{message:'User already Exists'})
    }
    const hashedPassword = await bcrypt.hash(password,config.get('hashed.salt'))
    const createUser = await userService.create({email,password:hashedPassword})
    //const createUser = await userModel.create({email,password:hashedPassword})
    return res.render('signup/layout',{message:'user created'})

}

module.exports = {getLoginForm,login,getSignupForm,signup}