const projectService = require('../services/project.service')

async function create(req, res) {
    try{
        const project = await projectService.createProject(req.user.id, req.body);
        res.status(201).json(project);
    } catch (err){
        res.status(500).json({error: err.message});
    }
}

async function list(req, res) {
    try{
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const projects = await projectService.listProjects(req.user.id, page, limit);
        res.json(projects);
    } catch (err){
        res.status(500).json({error: err.message});
    }
}

async function update(req, res) {
    try{
        const updated = await projectService.updateProject(parseInt(req.params.id), req.user.id, req.body);
        if(updated.count === 0) return res.status(404).json({error: "Project not found"});
        res.json({message: "Updated successfully"});
    } catch (err){
        res.status(500).json({error: err.message});
    }
}

async function remove(req, res) {
    try{
        const deleted = await projectService.deleteProject(parseInt(req.params.id), req.user.id);
        if(deleted.count === 0) return res.status(404).json({error: "Project not found"});
        res.json({message: "Deleted successfully"});
    } catch (err){
        res.status(500).json({error: err.message});
    }
}

module.exports = {create, list, update, remove}