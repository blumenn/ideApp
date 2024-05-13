import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import './Frontpage.css';
import Header from '../header';
import Background from '../background';

const Frontpage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Header />
            <Background />
            <Button variant="contained" onClick={() => navigate('/quiz')}>Questionaire</Button>
        </div>
    );
};


export default Frontpage;
