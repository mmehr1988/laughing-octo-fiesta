// JWT PACKAGE TO DECODE THE TOKEN & RETRIEVE USER INFORMATION
import decode from 'jwt-decode';

// CREATING A CLASS TO INSTANTIATE FOR A USER
class AuthService {
  // TO GET USER DATA
  getProfile() {
    return decode(this.getToken());
  }

  // TO CHECK IF USER IS LOGGED IN
  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // TO CHECK IF USER TOKEN HAS EXPIRED
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    // TO RETRIEVE THE USER TOKEN FROM LOCAL STORAGE
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    // TO SAVE TOKEN TO LOCAL STORAGE
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    // this will reload the page and reset the state of the application
    window.location.assign('/');
  }
}

export default new AuthService();
