import { useEffect, useState } from 'react';
import './footer.css';
import "@fontsource/roboto";

const Footer: React.FC = () => {

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
        <div className="footer">
            <footer>
                <div className='row'>
                    <div className='column'>
                        <p className='title'>Contact</p>
                        <p>our_mail@gmail.com</p>
                    </div>
                    {!isMobile && <div className='column'>
                        <p className='title'>About</p>
                        <p>We are team best of the rest. Our vision is to be the light for the right action</p>
                    </div>}
                    <div className='column'>
                        <p className='title'>Cvr</p>
                        <p>xxxxxxxxxx</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Footer;