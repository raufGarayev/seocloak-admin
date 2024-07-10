import type { MenuProps } from 'antd';
import { FaHandshake, FaHome, FaPhone, FaToolbox, FaUser } from 'react-icons/fa';


type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    children?: MenuItem[],
    icon?: React.ReactNode,
    badge?: React.ReactNode,
): MenuItem {
    return {
        key,
        children,
        label,
        icon,
        badge,
    } as MenuItem;
}
// badgeni hara qoyursan iconu import ele bura. iconsuz divnen elemek istiyirdim
export const menus: MenuItem[] = [
    // getItem(`Slots`, '10', undefined, <FaHome />),
    // getItem(`Poker`, '11', undefined, <FaPhone />),
    getItem('Settings', 100, [
        getItem('Partners', 101, undefined, <FaHandshake />, ),
        getItem('Tools', 102, undefined, <FaToolbox />, ),
    ], <FaToolbox />, ),
];
