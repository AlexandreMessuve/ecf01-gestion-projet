const { Task, Project } = require('../config/db');
module.exports = {
    getAllTaskByProjectId: async (req, res) => {
        const userId = req.auth.userId;
        const projectId = req.params.id;
        try{
            const project = await Project.findOne({where: {id: projectId}});
            const tasks = await Task.findAll({where: {ProjectId: projectId}});
            if(userId === project.UserId){
                res.status(200).json(tasks);
            }else {
                res.status(401).json({message: 'Not authorized to show project tasks'});
            }
        }catch (e) {
            res.status(500).json(e);
        }
    },
    getTaskById: async (req, res) => {
        const userId = req.auth.userId;
        const taskId = req.params.id;
        try {
            const task = await Task.findOne({where: {id: taskId}});
            const project = await Project.findOne({where:{id: task.ProjectId}});
            if(userId === project.UserId){
                res.status(200).json(task);
            }else{
                res.status(401).json({message: 'Cette tâche ne vous appartient pas'})
            }
        }catch (e) {
            res.status(500).json(e);
        }
    },
    createTask: async (req, res) => {
        const userId = req.auth.userId;
        const {title, description, priority, end_date, projectId} = req.body;
        try {
            if(title && description && end_date && projectId){
                const project = await Project.findOne({where: {id: projectId}});
                if (userId === project.UserId){
                    await Task.create({title: title, description: description,priority: priority, end_date: end_date, ProjectId: projectId});
                    res.status(201).json({message: 'Task create success !'});
                }else {
                    res.status(401).json({message: 'Failed create task not authorized with this project'})
                }

            }else{
                res.status(400).json({message: 'Tous les champs sont requis !'});
            }
        }catch (e) {
            res.status(500).json(e);
        }
    },
    updateTask: async (req, res) => {
        const userId = req.auth.userId;
        const taskId = req.params.id;
        const {title, description, priority, end_date} = req.body;
        try {
            if(title && description  && end_date){
                const task = await Task.findOne({where: {id: taskId}});
                const project = await Project.findOne({where: {id: task.ProjectId}})
                if(userId === project.UserId){
                    const status = await Task.update({title: title, description: description,priority: priority, end_date: end_date}, {where:{id: taskId}});
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
    deleteTask: async (req, res) => {
        const userId = req.auth.userId;
        const taskId = req.params.id;
        try {
            const task = await Task.findOne({where: {id: taskId}});
            const project = await Project.findOne({where: {id: task.ProjectId}});
            if(userId === project.UserId){
                const status = await Project.destroy({where:{id: taskId}});
                if(!status[1]){
                    res.status(200).json({message: 'Task delete with success'});
                }else{
                    res.status(500).json({message: 'Error delete Task'});
                }
            }else{
                res.status(401).json({message: "Is not your project, delete task failed"});
            }
        }catch (e) {
            res.status(500).json(e);
        }
    }
}