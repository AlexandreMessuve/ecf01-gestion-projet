const { Project } = require('../config/db');
module.exports = {
    getAllProject: async (req, res) => {
        const userId = req.auth.userId;
        try{
            const projects = await Project.findAll({where: {UserId: userId}});
            res.status(200).json(projects);
        }catch (e) {
            res.status(500).json(e);
        }
    },
    getProjectById: async (req, res) => {
        const userId = req.auth.userId;
        const projectId = req.params.id;
        try {
            const project = await Project.findOne({where: {id: projectId}});
            if(userId === project.UserId){
                res.status(200).json(project);
            }else{
                res.status(401).json({message: 'Ce projet ne vous appartient pas'})
            }
        }catch (e) {
            res.status(500).json(e);
        }
    },
    createProject: async (req, res) => {
        const userId = req.auth.userId;
        const {name, description} = req.body;
        try {
            if(name && description){
                await Project.create({name: name, description: description, UserId: userId});
                res.status(201).json({message: 'Project create success !'});
            }else{
                res.status(400).json({message: 'Tous les champs sont requis !'});
            }
        }catch (e) {
            res.status(500).json(e);
        }
    },
    updateProject: async (req, res) => {
        const userId = req.auth.userId;
        const projectId = req.params.id;
        const {name, description} = req.body;
        try {
            if(name && description){
                const project = await Project.findOne({where: {id: projectId}});
                if(userId === project.UserId){
                    const status = await Project.update({name: name, description: description}, {where:{id: projectId}});
                    if(!status[1]){
                        res.status(200).json({message: 'Update success'});
                    }else{
                        res.status(500).json({message: 'Error update project'});
                    }
                }else{
                    res.status(401).json({message: "Is not your project, update failed"});
                }
            }else {
                res.status(400).json({message: 'Tous les champs sont requis !'})
            }
        }catch (e) {
            res.status(500).json(e);
        }
    },
    deleteProject: async (req, res) => {
        const userId = req.auth.userId;
        const projectId = req.params.id;
        try {
                const project = await Project.findOne({where: {id: projectId}});
                if(userId === project.UserId){
                    const status = await Project.destroy({where:{id: projectId}});
                    if(!status[1]){
                        res.status(200).json({message: 'Project delete with success'});
                    }else{
                        res.status(500).json({message: 'Error delete project'});
                    }
                }else{
                    res.status(401).json({message: "Is not your project, delete failed"});
                }
        }catch (e) {
            res.status(500).json(e);
        }
    }
}