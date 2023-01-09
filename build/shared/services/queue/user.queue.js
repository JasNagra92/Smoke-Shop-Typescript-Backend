"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userQueue = void 0;
const userWorker_1 = require("./../../workers/userWorker");
const base_queue_1 = require("./base.queue");
class UserQueue extends base_queue_1.BaseQueue {
    constructor() {
        super('user');
        this.processJob('addUserToDB', 5, userWorker_1.userWorker.addUserToQueue);
    }
    addUserJob(name, data) {
        this.addJob(name, data);
    }
}
exports.userQueue = new UserQueue();
//# sourceMappingURL=user.queue.js.map