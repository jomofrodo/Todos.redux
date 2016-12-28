export default {
  get: function(k) {
    try {
      return JSON.parse(localStorage.getItem(k));
    }
    catch(e) {
      return null;
    }
  },
  set: function(k, v, st) {
    //console.debug(st);
    localStorage.setItem(k, JSON.stringify(v));
  }
};