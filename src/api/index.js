const CLIENT_ID = '477913453165-sna3dpc2k0ab921m1iorpapvsjgrmqmj.apps.googleusercontent.com';
const SCOPES = ['https://www.googleapis.com/auth/tasks', 'https://www.googleapis.com/auth/plus.me'];

// авторизация пользователя
export default {
    authorize(params){
        return new Promise((resolve, reject) => {
            gapi.auth.authorize(
                {
                    'client_id': CLIENT_ID,
                    'scope': SCOPES,
                    'immediate': params.immediate,
                    'cookie_policy': 'single_host_origin'
                },
                authresult => {
                    if (authresult.error)
                        return reject(authresult.error);
                    return gapi.client.load('tasks', 'v1', () => gapi.client.load('plus', 'v1', () => resolve() ) );
                        
                }
            )
        })
    }
}