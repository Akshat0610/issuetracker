const authService = require('../services/auth.service')

async function signup(req, res) {
    try {
        const {name, email, password} = req.body;
        const token = await authService.signup(name, email, password);
        res.status(201).json({token});
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

async function login(req, res) {
    try {
        const {email, password} = req.body;
        const token = await authService.login(email, password);
        res.json({token});
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {signup, login};