export type ValidateMessage = {
    error: {
        email: string;
        password: string;
        response: string;
        username?: string;
    };
    success: {
        response: string;
    };
};

export type RegisterValues = {
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null | undefined;
    password?: string | null | undefined;
};
