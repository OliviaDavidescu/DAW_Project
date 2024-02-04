import HomeIcon from '@mui/icons-material/Home';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import CasesRoundedIcon from '@mui/icons-material/CasesRounded';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import FolderSharedIcon from '@mui/icons-material/FolderShared';

export const sideBarData = [
    {
        id: 0,
        icon: <HomeIcon/>,
        text: "Acasa",
        link: "/"
    },
    {
        id: 1,
        icon: <PeopleAltRoundedIcon/>,
        text: "User",
        link: "users"
    },
    {
        id: 2,
        icon: <CasesRoundedIcon/>,
        text: "Admin",
        link: "admins"
    },
    {
        id: 3,
        icon: <AutoStoriesIcon/>,
        text: "Carti",
        link: "books"
    },
    {
        id: 4,
        icon: <FolderSharedIcon/>,
        text: "Studenti",
        link: "students"
    },
]