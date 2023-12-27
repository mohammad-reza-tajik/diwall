import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import InfoIcon from '@mui/icons-material/Info';
import HandshakeIcon from '@mui/icons-material/Handshake';
import SellIcon from '@mui/icons-material/Sell';

const navLinks = [
    {
        label : "صفحه نخست",
        href : "/",
        icon : HomeIcon
    },
    {
        label : "جدیدترین ها",
        href : "/products",
        icon : WhatshotIcon
    },
    {
        label : "پرفروش ترین ها",
        href : "/products?sortBy=2",
        icon : SellIcon
    },
    {
        label : "محبوب ترین ها",
        href : "/products?sortBy=3",
        icon : FavoriteIcon
    },
    {
        label : "درباره ما",
        href : "/about",
        icon : InfoIcon
    },
    {
        label : "همکاری با ما",
        href : "/collaboration",
        icon : HandshakeIcon
    },
];
export default navLinks;