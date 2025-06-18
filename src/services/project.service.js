const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();

async function createProject(userId, data) {
    return prisma.project.create({
        data: {
            ... data, ownerId: userId
        }
    })
}

async function listProjects(userId, page= 1, limit = 10) {
    const skip = (page-1) * limit;
    const [projects, total] = await Promise.all([
        prisma.project.findMany({
        where: {ownerId: userId},
        skip,
        take: limit
    }),
    prisma.project.count({where: {ownerId: userId}})
    ])
    return{
        data: projects,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
    }
}

async function updateProject(projectId, userId, data) {
    return prisma.project.updateMany({
        where: {id: projectId, ownerId: userId},
        data
    })
}

async function deleteProject(projectId, userId) {
    return prisma.project.deleteMany({
        where: {id: projectId, ownerId: userId}
    })
}

module.exports = {createProject, listProjects, updateProject, deleteProject}