class LocalStorage {
  static getAccessToken() {
    return localStorage.getItem('access_token');
  }
}

export default LocalStorage;
