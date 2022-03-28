import { CustomError } from "../../../shared/Domain/Error/CustomError";

export class UserAlreadyExistsError extends CustomError {
    statusCode = 400;

    constructor() {
        super('User already exists');

        Object.setPrototypeOf(this, UserAlreadyExistsError.prototype);
    }

    serialize() {
        return [{
            message: 'User already exists'
        }]
    }
}