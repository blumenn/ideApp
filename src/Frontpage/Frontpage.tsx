import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import './Frontpage.css';
import Header from '../Components/header';
import Background from '../Components/background';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Link, Typography } from '@mui/material';
import light_image from "../assets/light_frontpage.png";
import connections from "../assets/connections_frontpage.png";
import Footer from '../Components/footer';

const Frontpage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Header />
            <Background />
            <div className='card'>
            <Card sx={{ maxWidth: 1000, color: "#ee6c4d", backgroundColor: "#e0fbfc"}}>
                    <CardActionArea>
                        <CardMedia
                        component="img"
                        height="140"
                        image={connections}
                        alt="green iguana"
                        />
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Purpose
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            This app acts as tool to get you to the right information and help you need. It contains information specific to your situation,
                            and actions you can take to help yourself as well as ressources you can reach out to.
                            Please contact 
                            <Link href="https://danskstalkingcenter.dk/gratis-telefon-radgivning/?gclid=EAIaIQobChMIg7SyoMyKhgMVllKRBR2zowJEEAAYASAAEgL6M_D_BwE"> Dansk Stalking Center </Link>
                            if you need someone to talk to or the police if you are in immediate danger.
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                    </CardActions>
                </Card>
            </div>
            <div className='card'>
                <Card sx={{ maxWidth: 1000, color: "#ee6c4d", backgroundColor: "#e0fbfc"}}>
                    <CardActionArea>
                        <CardMedia
                        component="img"
                        height="140"
                        image={light_image}
                        alt="green iguana"
                        />
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            The guide
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            The guide is designed to help you on the right path towards information you would need specific to your situation.
                            As well as help you to take the right action that matches your situation.
                            Some of the questions might be triggering for some, so please be cautious.
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary" variant="contained" onClick={() => navigate('/quiz')}>Take the guide</Button>
                    </CardActions>
                </Card>
            </div>
            <Footer />
        </div>
    );
};


export default Frontpage;
