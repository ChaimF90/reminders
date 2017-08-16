interface User {
    username: string;
    email: string;
    tempToken?: string;
    password: string;
}

interface UserWithId extends User {
    id: number;
}

export {
    User,
    UserWithId
}