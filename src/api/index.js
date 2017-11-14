import config from '../config';
const SCOPES = ['https://www.googleapis.com/auth/tasks', 'https://www.googleapis.com/auth/plus.me'];

// авторизация пользователя
export default {
    authorize(params){
        return new Promise((resolve, reject) => {
            let cl = config.CLIENT_ID;
            window.gapi.auth.authorize(
                {
                    'client_id': config.CLIENT_ID,
                    'scope': SCOPES,
                    'immediate': params.immediate,
                    'cookie_policy': 'single_host_origin'
                },
                authresult => {
                    if (authresult.error)
                        return reject(authresult.error);
                    return window.gapi.client.load('tasks', 'v1', () => window.gapi.client.load('plus', 'v1', () => resolve() ) );
                        
                }
            )
        })
    },
    getTaskList() {
        let request = window.gapi.client.tasks.tasklists.list();
        return new Promise((resolve, reject) => {
            request.execute(resp => resolve(resp));
        })
    },
    insertTasksList(text){
        let request = window.gapi.client.tasks.tasklists.insert({
            title: text
        });
        return new Promise((resolve, reject) => {
            request.execute(resp => resolve(resp));
        })
    },
    deleteTaskList(id){
        let request = window.gapi.client.tasks.tasklists.delete({
            tasklist: id
        });
        return new Promise((resolve, reject) => {
            request.execute(resp => resolve(resp));
        })
    },
    getTasks(taskListId){
        let request = window.gapi.client.tasks.tasks.list({
            tasklist: taskListId
        });
        return new Promise((resolve, reject) => {
            request.execute(resp => resolve(resp));
        })
    },
    insertTask(task){
        let request = window.gapi.client.tasks.tasks.insert({
            tasklist : task.id,
            title    : task.title
        });
        return new Promise((resolve, reject) => {
            request.execute(resp => resolve(resp));
        })
    },
    updateTask(task, listId){
        let request = window.gapi.client.tasks.tasks.update({
            task: task,
            id: task.id,
            tasklist: listId,
            status: task.status,
            title: task.title,
            notes: task.notes
        })
        return new Promise((resolve, reject) => {
            request.execute(resp => resolve(resp));
        })
    },
    deleteTask(task, listId){
        let request = window.gapi.client.tasks.tasks.delete({
            task: task.id,
            tasklist: listId
        })
        return new Promise((resolve, reject) => {
            request.execute(resp => resolve(resp));
        })
    }
}