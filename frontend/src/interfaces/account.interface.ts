export interface Account {
    id: string;
    nickname: string;
    username: string;
    // createdAt: Date;
    // updatedAt: Date;
}

export interface UserPassword {
    password: string;
    passwordConfirmation: string;
}