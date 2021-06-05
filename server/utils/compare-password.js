const bcrypt = require('bcrypt');

module.exports.comparePassword = async (userPass, dbPass) =>{
    const isPass = await bcrypt.compare(userPass, dbPass);

    return isPass;
}