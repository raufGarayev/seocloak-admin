import type { MenuProps } from 'antd';
import { BiSolidBookContent } from 'react-icons/bi';
import { FaHandshake, FaMicroblog, FaToolbox} from 'react-icons/fa';
import { MdTextFields } from 'react-icons/md';


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

export const menus: MenuItem[] = [
    // getItem(`Slots`, '10', undefined, <FaHome />),
    // getItem(`Poker`, '11', undefined, <FaPhone />),
    getItem('Blogs', 200, undefined, <FaMicroblog />),
    getItem('Settings', 100, [
        getItem('Partners', 101, undefined, <FaHandshake />, ),
        getItem('Highlights', 102, undefined, <MdTextFields /> ),
        getItem('Contents', 103, undefined, <BiSolidBookContent />),
    ], <FaToolbox />, ),
];
