export type CurrentUser = {
    email?: string | null | undefined;
    address?: string | null | undefined;
    firstName?: string | null;
    lastName?: string | null;
    phoneNumber?: string | null | undefined | number;
    role?: string | null | undefined;
    username?: string | null | undefined;
    gender?: string | null | undefined;
    oldPassword?: string | null | undefined;
    newPassword?: string | null | undefined;
};
