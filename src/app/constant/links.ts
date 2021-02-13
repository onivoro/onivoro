import { INavigable } from '../type/navigable.interface';
// import { Category } from '../enum/category.enum';
// import { Offering } from '../enum/offering.enum';

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

export const hvac: INavigable = {
    icon: 'hvac',
    label: 'HVAC Heating and Cooling',
    slug: 'hvac',
};

export const login: INavigable = {
    icon: 'login',
    label: 'Login',
    slug: 'login',
};

export const resources: INavigable = {
    icon: 'info',
    label: 'Resources',
    slug: 'resources',
};

export const promotions: INavigable = {
    icon: 'campaign',
    label: 'Promotions',
    slug: 'promotions',
};

export const reviews: INavigable = {
    icon: 'stars',
    label: 'Reviews',
    slug: 'reviews',
};

export const scheduling: INavigable = {
    icon: 'calendar_today',
    label: 'Scheduling',
    slug: 'scheduling',
};

export const services: INavigable = {
    icon: 'handyman',
    label: 'Services',
    slug: 'services',
};

export const completed: INavigable = {
    icon: 'camera_alt',
    label: 'Featured Work',
    slug: 'featured',
};

export const links: INavigable[] = [
    home,
    about,
    services,
    contact,
    scheduling,
    resources,
    completed,
    admin
];