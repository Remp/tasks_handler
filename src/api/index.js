const CLIENT_ID = '477913453165-sna3dpc2k0ab921m1iorpapvsjgrmqmj.apps.googleusercontent.com';
const SCOPES = ['https://www.googleapis.com/auth/tasks', 'https://www.googleapis.com/auth/plus.me'];


// авторизация пользователя
export default {
    authorize(params){
        return new Promise((resolve, reject) => {
            window.gapi.auth.authorize(
                {
                    'client_id': CLIENT_ID,
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
            status: task.status
        })
        return new Promise((resolve, reject) => {
            request.execute(resp => resolve(resp));
        })
    }
}