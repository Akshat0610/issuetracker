const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwt');

async function signup(name, email, password) {
    const isExistingUser = await prisma.user.findUnique({where: {email}});
    if(isExistingUser) throw new Error("Email already in use");
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ data : {name, email, password: hashedPassword}});
    return generateToken(user);
}

async function login(email,password) {
    const user = await prisma.user.findUnique({where: {email}});
    if(!user) throw new Error("Invalid credentials.")
    
    const isValidPass = await bcrypt.compare(password, user.password);
    if(!isValidPass) throw new Error("Invalid credentials.");
    return generateToken(user);
}

module.exports = {signup, login}