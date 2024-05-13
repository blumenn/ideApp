import { useNavigate } from 'react-router-dom';

const Frontpage: React.FC = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        console.log('Button clicked!');
        // Redirect to another component
        navigate('/quiz');
    };

    return (
        <div>
            <h1>Frontpage</h1>
            <button onClick={handleClick}>Questionaire</button>
        </div>
    );
}

export default Frontpage;
