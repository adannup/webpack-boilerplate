class Utils {
  constructor() {
    this.processProjectName = 'Document';
    this.processENV = process.env.NODE_ENV;

    this.setProjectName();
  }

  isProdProcessENV() {
    return this.processENV === 'production';
  }

  setProjectName() {
    if (process && process.env.NODE_NAME) {
      this.processProjectName = process.env.NODE_NAME;
    }
  }

  getProjectName() {
    return this.processProjectName;
  }
}

module.exports = new Utils();
