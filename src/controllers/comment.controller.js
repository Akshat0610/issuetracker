const commentService = require('../services/comment.service')

async function create(req, res) {
    try{
        const {content} = req.body
        const comment = await commentService.addComment(parseInt(req.params.id), req.user.id, content);
        res.status(201).json(comment);
    } catch (err){
        res.status(500).json({error: err.message});
    }
}

async function list(req, res) {
    try{
        const comments = await commentService.listComments(parseInt(req.params.id));
        res.json(comments);
    } catch (err){
        res.status(500).json({error: err.message});
    }
}
module.exports = {create, list}