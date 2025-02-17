
// para que compruebe el token y si está caducado, que pida uno nuevo.

if (!token) {
navigate("/login");
} else {
const decodedToken = decodeToken(token);
const currentTime = Date.now() / 1000; // Convertir a segundos
if (decodedToken.exp < currentTime) {
setToken();
localStorage.removeItem("accessToken");
navigate("/login");
} else {
setUser(decodedToken.user);
}
}