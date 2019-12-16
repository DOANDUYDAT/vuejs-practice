export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    if (user) {
        const tokenCreated = user.created;
        const currentDate = Date.now();
        // check nếu token quá hạn 1 ngày, tính theo milliseconds
        if ( currentDate - Date.parse(tokenCreated) >= 86400000) {
            localStorage.removeItem('user');
            return {};
        }
        return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }
}