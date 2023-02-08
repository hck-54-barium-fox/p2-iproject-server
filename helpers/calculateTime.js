function calculateTime(carbon) {
    console.log(carbon);
    if (carbon <= 8) {
      return 1;
    } else if (carbon > 8) {
      return Math.round(carbon / 8);
    }
  }

  module.exports = calculateTime