const userService = require('../services/user.service')

async function getUser(req, res) {
    try{
        const user = await userService.getCurrentUser(req.user.id);
        res.json(user)
    } catch(err){
        res.status(500).json({error: err.message});
    }
}

async function updateUser(req, res) {
    try{
        const updatedUser = await userService.updateUser(req.user.id, req.body);
        res.json({id: updatedUser.id, name: updatedUser.name, email: updatedUser.email});
    }catch(err){
        res.status(500).json({error: err.message})
    }
}

module.exports = {getUser, updateUser};