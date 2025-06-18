const issueService = require('../services/issue.service')

async function create(req, res) {
    try{
        const issue = await issueService.createIssue(req.body, req.user.id);
        res.status(201).json(issue);
    } catch (err){
        res.status(500).json({error: err.message});
    }
}

async function list(req, res) {
    try {
    const filters = {};
    const { projectId, assigneeId, status } = req.query;
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;

    if (projectId) filters.projectId = parseInt(projectId);
    if (assigneeId) filters.assigneeId = parseInt(assigneeId);
    if (status) filters.status = status;

    const issues = await issueService.listIssues(filters, page, limit);
    res.json(issues);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function update(req, res) {
    try{
        const updated = await issueService.updateIssue(parseInt(req.params.id), req.body);
        res.json(updated);
    } catch (err){
        res.status(500).json({error: err.message});
    }
}

async function remove(req, res) {
    try{
        await issueService.deleteIssue(parseInt(req.params.id));
        res.json({message: "Deleted successfully"});
    } catch (err){
        res.status(500).json({error: err.message});
    }
}

module.exports = {create, list, update, remove}