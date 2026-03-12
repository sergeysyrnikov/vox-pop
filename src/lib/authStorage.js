function saveAccessToken(token) {
  localStorage.setItem('access_token', token);
}

function saveRefreshToken(token) {
  localStorage.setItem('refresh_token', token);
}

function getAccessToken() {
  return localStorage.getItem('access_token');
}

function getRefreshToken() {
  return localStorage.getItem('refresh_token');
}

function removeAccessToken() {
  localStorage.removeItem('access_token');
}

function removeRefreshToken() {
  localStorage.removeItem('refresh_token');
}

export {
  saveAccessToken,
  saveRefreshToken,
  getAccessToken,
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
};
