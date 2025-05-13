export class Users {
  constructor() {
    this.users = {};
  }
  getId(publicKey) {
    return this.users[publicKey];
  }
  setUser(publicKey, socketId) {
    this.users[publicKey] = socketId;
  }
}
