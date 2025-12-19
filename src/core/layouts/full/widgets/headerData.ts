import type { notificationType, profileType, languageType, searchType } from '@/core/types/header.type';

//
// Notification
//
import userImg from '@/assets/images/profile/user.jpg';

const notifications: notificationType[] = [
    {
        avatar: userImg,
        title: 'Roman Joined the Team!',
        subtitle: 'Congratulate him'
    },
    {
        avatar: userImg,
        title: 'New message received',
        subtitle: 'Salma sent you new message'
    },
    {
        avatar: userImg,
        title: 'New Payment received',
        subtitle: 'Check your earnings'
    },
    {
        avatar: userImg,
        title: 'Jolly completed tasks',
        subtitle: 'Assign her new tasks'
    },
    {
        avatar: userImg,
        title: 'New Payment received',
        subtitle: 'Check your earnings'
    },
    {
        avatar: userImg,
        title: 'Roman Joined the Team!',
        subtitle: 'Congratulate him'
    }
];

//
// Profile
//
import iconAccount from '@/assets/images/icons/icon-account.svg';
const profileDD: profileType[] = [
    {
        avatar: iconAccount,
        title: 'My Profile',
        subtitle: 'Account settings',
        href: '/apps/profile'
    }
];

//
// Language
//
import flagEn from '@/assets/images/flags/flag-en.svg';
import flagFr from '@/assets/images/flags/flag-fr.svg';
import flagEs from '@/assets/images/flags/flag-es.svg';
import flagPt from '@/assets/images/flags/flag-pt.svg';

const languages: languageType[] = [
    { title: 'English', subtext: 'UK', value: 'en', avatar: flagEn },
    { title: 'français', subtext: 'French', value: 'fr', avatar: flagFr },
    { title: 'Español', subtext: 'Spanish', value: 'es', avatar: flagEs },
    { title: 'Português', subtext: 'Portuguese', value: 'pt', avatar: flagPt }
];

//
// Search Data
//
const searchSugg: searchType[] = [
    {
        title: 'Modern',
        href: '/dashboards/modern'
    },
    {
        title: 'eCommerce',
        href: '/dashboards/ecommerce'
    },
    {
        title: 'Contacts',
        href: '/apps/contacts'
    },
    {
        title: 'Shop',
        href: '/ecommerce/shop'
    },
    {
        title: 'Checkout',
        href: '/ecommerce/checkout'
    },
    {
        title: 'Chats',
        href: '/apps/chats'
    },
    {
        title: 'Notes',
        href: '/apps/notes'
    },
    {
        title: 'Pricing',
        href: '/pages/pricing'
    },
    {
        title: 'Account Setting',
        href: '/pages/account-settings'
    }
];

export { notifications, profileDD, languages, searchSugg };
