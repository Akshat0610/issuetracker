const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

async function addComment(issueId, userId, content) {
    return prisma.comment.create({
        data: {
            content, 
            author: {connect: {id : userId}},
            issue: {connect : {id : issueId}}
        }
    })
}

async function listComments(issueId) {
    return prisma.comment.findMany({
        where: {issueId},
        orderBy: {createdAt : 'asc'}
    })
}

module.exports = {addComment, listComments}