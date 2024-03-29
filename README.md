# Application de gestion de projets

## 01- L'installation de l'api rest

### 01- Pour installer l'api rest :

```shell
cd ./api-rest
npm install
npm run dev
```

### 02- Configuration

Pour configurer l'api veuillez renommer `.env.exemple` en `.env`.

N'oubliez pas de changer les `change_me` par vos paramètres.

### 03- EndPoint

Autentification:
- Pour se creer un compte : **POST** `/register`
  - ```json
    {
      "username" : "username",
      "password" : "password",
      "firstname" : "firstname", //optionnel
      "lastname" : "lastname" //optionnel
    }
    ```
- Pour se connecter: **POST** `/auth`
    ```json
    {
      "username" : "username",
      "password" : "password"
    }
    ```
    - retourne le token: 
        ```json
        {
          "token": "token"
        }
        ```

**Token requis:**     
**Project**:
- Pour creer un projet: **POST** `/api/projects/add`
```json
{
  "name":  "name",
  "description": "description"
}
```
- Pour avoir la liste des projets: **GET** `/api/projects`
- Pour avoir un seul projet: **GET** `/api/projects/idProject`
- Pour modifier un projet: **PUT** `/api/projects/update/idProject`
```json
{
  "name": "name",
  "description":"description" 
}
```
- Pour supprimer un projet: **DELETE** `/api/projects/delete/idProject`



**Task**:
- Pour creer une tache: **POST** `/api/tasks/add`
```json
{
  "title":  "title",
  "description": "description",
  "priority": true,
  "end_date": "2024-02-20",
  "projectId": 2
}
 ```
- Pour avoir la liste des tâches par projet: **GET** `/api/tasks/project/id`
- Pour avoir une seul tache: **GET** `/api/tasks/id`
- Pour modifier une tache **PUT** `/api/tasks/update/id`
```json
{
  "title":  "title",
  "description": "description",
  "priority": false,
  "end_date": "2024-02-12",
  "projectId": 2
}
```
- Pour supprimer une tache: **DELETE** `/api/tasks/delete/id`

## 02 - Front Vue.js

```shell
cd ./front-end
npm install
npm run dev
```

