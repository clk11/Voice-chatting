class Chat {
    constructor() {
        this.rooms = new Map();
        this.users = new Map();
    }
    addMessage(room, username, message) {
        if (this.rooms.get(room) == undefined) this.rooms.set(room, []);
        let messages = this.rooms.get(room);
        messages.push({ username, message });
        this.rooms.set(room, messages);
    }
    logoff(username, room) {
        this.users.get(room).set(username, 0);
        let result = false;
        this.users.get(room).forEach(function f(item) {
            if (result) return;
            if (item == 1) result = true;
        });
        if (!result) {
            this.rooms.delete(room);
            this.users.delete(room);
        }
    }
}


module.exports = {
    context: new Chat()
}