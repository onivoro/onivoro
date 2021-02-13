import { INavigable } from '../type/navigable.interface';

export const about: INavigable = {
    icon: 'people',
    label: 'About',
    slug: 'about',
};

export const admin: INavigable = {
    icon: 'admin_panel_settings',
    label: 'Admin',
    slug: 'admin',
};

export const contact: INavigable = {
    icon: 'contact_page',
    label: 'Contact Us',
    slug: 'contact',
};

export const home: INavigable = {
    icon: 'home',
    label: 'Home',
    slug: 'home',
};

export const packages: INavigable = {
    icon: 'card_giftcard',
    label: 'Packages',
    slug: 'packages',
};

export const resources: INavigable = {
    icon: 'info',
    label: 'Resources',
    slug: 'resources',
};

export const links: INavigable[] = [
    home,
    about,
    contact,
    packages,
    resources
];