class Utils {
  constructor() {
    this.processENV = process.env.NODE_ENV;
  }

  isProdProcessENV() {
    return this.processENV === 'production';
  }
}

module.exports = new Utils();
