
export default class Message {
    constructor(message = 'Test Message', user = ''){
        this.user = user ==='' ? 'Anonymous' : user;
        this.body = message;
        this.datetime = Date.now();
    }

}