const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();

async function getCurrentUser(userId) {
  return await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
    }
  });
}

async function updateUser(userId, data) {
    return prisma.user.update({
        where: {id: userId},
        data
    });
}

module.exports = {getCurrentUser, updateUser}