import {defineStore} from "pinia";
import {getAllProjects} from "../api/backend/project.js";

export const useProjectStore = defineStore('project', {
    state:() => ({
        projects: []
    }),
    actions: {
        setProjects(token) {
            (async() => {
                try{
                    const resp = await getAllProjects(token);
                    if(resp.status === 200){
                        const projects = resp.data;
                        this.projects = projects;
                    }
                }catch (e) {
                    return e
                }

            })()
        },
        clearProjects(){
            this.projects = []
        },
    },
    getters: {
        selectProjects: state => state.projects,
    }
})