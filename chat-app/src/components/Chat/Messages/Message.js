
export default class Message {
    constructor(message = 'Test Message', user = '',isUserMessage = true){
        this.user = user ==='' ? 'Anonymous' : user;
        this.body = message;
        this.datetime = Date.now();
        this.isUserMessage = isUserMessage;
    }

}