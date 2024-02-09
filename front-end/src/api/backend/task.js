import * as URL from '../../constants/urls/urlBackEnd.js';
import apiBackend from "./api.Backend.js";

export function addTask(values, token){
    return apiBackend.post(URL.BACK_CREATE_TASK, values, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export function getAllTask(idProject, token){
    return apiBackend.get(URL.BACK_TASKS+`/project/${idProject}`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export function getTask(idTask, token){
    return apiBackend.get(URL.BACK_TASKS+`/${idTask}`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export function updateTask(idTask, values, token){
    return apiBackend.put(URL.BACK_TASKS+`/update/${idTask}`, values,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export function deleteTask(idTask, token){
    return apiBackend.delete(URL.BACK_TASKS+`/delete/${idTask}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}