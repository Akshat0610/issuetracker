const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();

async function createIssue(data, createdBy) {
    const { title, description, status, projectId, assigneeId } = data;
    return prisma.issue.create({
        data: {
            title,
            description,
            status,
            project: { connect: { id: projectId } },
            assignee: { connect: { id: assigneeId } },
            creator: { connect: { id: createdBy } },
        }
    });
}

async function listIssues(filters = {}, page = 1, limit = 10) {
  const skip = (page - 1) * limit;

  const [issues, total] = await Promise.all([
    prisma.issue.findMany({
      where: { ...filters },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' }
    }),
    prisma.issue.count({ where: { ...filters } })
  ]);

  return {
    data: issues,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
}

async function updateIssue(id, data) {
    return prisma.issue.update({
        where: {id},
        data
    })
}

async function deleteIssue(id) {
    return prisma.issue.delete({
        where: {id}
    })
}

module.exports = {createIssue, listIssues, updateIssue, deleteIssue}