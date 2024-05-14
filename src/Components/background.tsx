import background from '../assets/background.png'; // Import the image

const Background: React.FC = () => {
    return (
        <div
            className='background'
            style={{
                zIndex: -1, // Behind everything else
                position: 'fixed', // Fixed position so it doesn't scroll with the page
                backgroundImage: `url(${background})`,
                backgroundSize: 'cover', // Cover the entire div
                backgroundPosition: 'center', // Center the background image
                height: '100vh', // Full viewport height
                width: '100vw', // Full width
                opacity: 0.5, // 50% opacity
            }}
        ></div>
    );
}

export default Background;