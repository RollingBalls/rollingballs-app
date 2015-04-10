class Storage {
  generateUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
  }

  setUserId(userId) {
    localStorage.setItem('userId', userId);
  }

  unsetUserId() {
    localStorage.removeItem('userId');
  }

  userId() {
    if (!localStorage.getItem('userId')) {
      this.setUserId(this.generateUID());
    }
    return localStorage.getItem('userId');
  }

  clear() {
    this.unsetUserId();
  }
}

export default new Storage();
