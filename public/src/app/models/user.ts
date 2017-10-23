export class User {
    username: string;
    password: string;
    logout: boolean;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
