const bcrypt = require("bcrypt")

const authHelper ={
    hashPassword : async(password)=>{
        try {
            const saltRoundes = 10
            const hashedPassword = await bcrypt.hash(password,saltRoundes)
            return hashedPassword
        } catch (error) {
            console.log(error)
        }
    } ,
    comparePassword : (password,hashedPassword)=>{
        return bcrypt.compare(password,hashedPassword)
    }  
}


module.exports = authHelper