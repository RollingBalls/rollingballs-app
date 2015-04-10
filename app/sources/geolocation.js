class Geolocation {
  constructor() {
  }

  success(callback, position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;
    callback(latitude, longitude);
  }

  error() {
    alert('Unable to retrieve your location! Please allow the GPS');
  }

  getPosition(callback) {
    if (!navigator.geolocation){
      this.error();
    }
    navigator.geolocation.getCurrentPosition(this.success.bind(null, callback), this.error);
  }
};

export default new Geolocation();
