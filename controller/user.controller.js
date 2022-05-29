const userModel = require('../model/user')
const bcrypt = require('bcrypt')
const config = require('config')

const getLoginForm = (req,res)=>{
    res.render('login/layout')
}
const login = (req,res)=>{}
const getSignupForm = (req,res)=>{
    res.render('signup/layout')
}
const signup = async(req,res)=>{
    const {email,password} = req.body
    const fields = {email,password}
    const findUser = await userModel.findOne({email})
    if(findUser){
        return res.render('login/layout',{message:'User already Exists'})
    }
    const hashedPassword = await bcrypt.hash(password,config.get('hashed.salt'))
    const createUser = await userModel.create({email,password:hashedPassword})
    return res.render('signup/layout',{message:'user created'})

}

module.exports = {getLoginForm,login,getSignupForm,signup}