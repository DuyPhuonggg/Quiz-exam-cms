import {
    AnalyticsIconComponent,
    BooksIconComponent,
    ExploreIconComponent,
    FileIconComponent,
    GearIconComponent,
    SignOutIconComponent,
    UserCircleIconComponent,
} from '@/app/shared/common/icon';

export const FULL_NAVIGATION = [
    {
        id: 0,
        label: 'Explore',
        href: 'admin',
        active: false,
        icon: ExploreIconComponent,
    },
    {
        id: 1,
        label: 'My library',
        href: 'admin',
        active: false,
        icon: BooksIconComponent,
    },
    {
        id: 2,
        label: 'Reports',
        href: 'admin',
        active: false,
        icon: AnalyticsIconComponent,
    },
    {
        id: 3,
        label: 'Settings',
        href: 'admin',
        active: true,
        icon: GearIconComponent,
    },
    {
        id: 4,
        label: 'Collections',
        href: 'admin',
        active: false,
        icon: FileIconComponent,
    },
    {
        id: 5,
        label: 'Profile',
        href: 'admin',
        active: false,
        icon: UserCircleIconComponent,
    },
    {
        id: 6,
        label: 'Logout',
        href: 'admin',
        active: false,
        icon: SignOutIconComponent,
    },
];
