"use strict";
exports.__esModule = true;
var users_1 = require("./users");
exports.handleAuthentication = function (req, resp) {
    var user = req.body; // o objeto que vem do body é um suer
    if (isValid(user)) {
        var dbUser = users_1.users[user.email];
        resp.json({ name: dbUser.name, email: dbUser.email });
    }
    else {
        resp.status(403).json({ message: 'Dados inválidos.' });
    }
};
function isValid(user) {
    if (!users_1.User) { // se o body não existir
        return false;
    }
    var dbUser = users_1.users[user.email]; // obtendo do objeto users o user.email
    return dbUser !== undefined && dbUser.matches(user); // criar o método matches dentro da classe no user.ts
}
