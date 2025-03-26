export type ViewStep = {
    first: boolean;
};

export type Toast = {
    message: string;
    active: boolean | any;
    type: string;
    timer?: number;
};
