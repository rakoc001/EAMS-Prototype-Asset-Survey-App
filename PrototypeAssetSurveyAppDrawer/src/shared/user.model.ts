const validator = require("email-validator");

export class User {
    userID: number;
    email: string;
    password: string;
    isValidEmail() {
        return validator.validate(this.email);
    }
}
