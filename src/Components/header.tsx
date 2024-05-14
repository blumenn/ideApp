import logo from '../assets/logo.png'; // Import the image
import * as React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import './header.css';
import "@fontsource/roboto";
import { useEffect, useState } from 'react';


const options = [
    'Home',
    'Acknowledgement',
    'Quiz',
];

const ITEM_HEIGHT = 48;

const Header: React.FC = () => {

    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleMenuClick = (option: string) => {
        if (option === 'Home') navigate('/');
        else navigate(`/${option.toLowerCase()}`);
    };

    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); // Assuming 768px as the breakpoint
        };

        window.addEventListener('resize', handleResize);

        // Initial check
        handleResize();

        // Cleanup on unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className={`header ${isMobile ? 'mobile-view' : ''}`}>
            <img className={`${isMobile ? 'mobile-v-image' : ''}`} src={logo} alt="Header Image" />
            {!isMobile && <h1 className="header-title">Lighthouse</h1>}
            <div>
                <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? 'long-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <MenuIcon className='menu-button' fontSize='large' />
                </IconButton>
                <Menu
                    id="long-menu"
                    MenuListProps={{
                        'aria-labelledby': 'long-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: '20ch',
                        },
                    }}
                >
                    {options.map((option) => (
                        <MenuItem key={option} selected={option === 'Pyxis'} onClick={() => handleMenuClick(option)}>
                            {option}
                        </MenuItem>
                    ))}
                </Menu>
            </div>
        </div>

    )
}

export default Header;