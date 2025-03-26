import { Type } from '@angular/core';

export type NavRoutes = {
    id: number;
    label: string;
    href: string;
    active: boolean;
    icon?: Type<any>;
};
