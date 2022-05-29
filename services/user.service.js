const userModel = require('../model/user')

const find = async(field)=>{
    const findEmail = userModel.findOne(field)
    return findEmail
}

const create = async(field)=>{
    const createEntry = userModel.create(field)
    return createEntry
}

module.exports = {find,create}