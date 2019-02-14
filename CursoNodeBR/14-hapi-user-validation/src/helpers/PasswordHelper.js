const Bcrypt = require('bcrypt');

const { promisify } = require('util');

// Convertendo para promises
const hashAsync = promisify(Bcrypt.hash);
const compareAsync = promisify(Bcrypt.compare);
const SALT = 3;

class PasswordHelper {

    static hashPassword( password ) {
        return hashAsync(password, SALT);
    }

    static comparePassword( password, hash ) {
        return compareAsync(password, hash);
    }
}

module.exports = PasswordHelper;