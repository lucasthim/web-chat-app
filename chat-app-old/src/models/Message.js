
export default class Message {
    constructor(message = '', user = '',isUserMessage = true){
        this.user = user ==='' ? 'Anonymous' : user;
        this.body = message;
        this.datetime = Date.now();
        this.isUserMessage = isUserMessage;
    }

}