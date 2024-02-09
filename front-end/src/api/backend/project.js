import * as URL from '../../constants/urls/urlBackEnd.js';
import apiBackend from "./api.Backend.js";

export function addProject(values, token){
    return apiBackend.post(URL.BACK_CREATE_PROJECT, values, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export function getAllProjects(token){
    return apiBackend.get(URL.BACK_PROJECTS,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export function getProject(idProject, token){
    return apiBackend.get(URL.BACK_PROJECTS+`/${idProject}`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export function updateProject(idProject, values, token){
    return apiBackend.put(URL.BACK_PROJECTS+`/update/${idProject}`, values,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export function deleteProject(idProject, token){
    return apiBackend.delete(URL.BACK_PROJECTS+`/delete/${idProject}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}