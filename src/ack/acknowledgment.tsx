import Header from "../Components/header";
import Background from "../Components/background";
import Footer from "../Components/footer";
import stalking1 from "../assets/stalking1.png";
import stalking2 from "../assets/stalking2.png";
import stalking3 from "../assets/stalking3.png";
import { CSSProperties } from 'react';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Link, Typography } from "@mui/material";

interface ScrollableContentStyle extends CSSProperties {
    maxHeight?: string;
    overflowY?: 'visible' | 'hidden' | 'scroll' | 'auto'; // Specify the exact type for overflowY
}

const Ack: React.FC = () => {

    const scrollableContentStyle: ScrollableContentStyle = {
        maxHeight: "calc(100vh - 24vh)", // Adjust the value based on the combined heights of your Header and Footer
        overflowY: "auto", // Enable vertical scrolling
    };

    return (<div>
        <Header />
        <Background/>
        <div style={scrollableContentStyle}>
            {}
                <div className="card">
                    <Card sx={{ maxWidth: 1000, color: "#ee6c4d", backgroundColor: "#e0fbfc"}}>
                        <CardActionArea>
                            <CardMedia
                            component="img"
                            height="140"
                            image={stalking1}
                            alt="green iguana"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                What is stalking?
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Stalking is a particularly unwanted behavior and activities aimed at another person. Stalking can arise after a broken relationship, based on feelings of injustice or anger, and infatuation. 
                                <br></br>
                                For stalking to be considered, the contact must be unilateral. This means that the victim does not respond or reciprocate the contact. At the same time, there must be several attempts at contact and events such that there is a pattern of actions.
                                <br></br>
                                <br></br>
                                <i>”Stalking is a systematic series of contact attempts and behavior that is unwanted and persistent and experienced as boundary-crossing and intimidating for the victim."</i>
                                <br></br>
                                –Definition Dansk Stalking Center
                                <br></br>
                                <br></br>
                                Stalking can manifest in many different ways. Individually, each action may seem harmless, but viewed collectively, the contact attempts can be frightening and disruptive.
                                <br></br>
                                <b>Examples:</b>
                                    <li>Phonecalls and messages</li>
                                    <li>Contact through others</li>
                                    <li>Destruction of property and threats</li>
                                    <li>Digital stalking</li>
                                    <li>Gifts</li>
                                    <li>Surveillance</li>
                                <br></br> For more information, visit
                                <Link href="https://danskstalkingcenter.dk/hvad-er-stalking/?_gl=1*pxhgdp*_up*MQ..&gclid=CjwKCAjwl4yyBhAgEiwADSEjeHHxysHwmbCivPzjQvN3yZG3d3HUaRjjVNdQc10QJL7wevMaM231JhoCon8QAvD_BwE"> Dansk Stalking Center </Link>
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                        </CardActions>
                    </Card>
                </div>
                <div className="card">
                    <Card sx={{ maxWidth: 1000, color: "#ee6c4d", backgroundColor: "#e0fbfc"}}>
                        <CardActionArea>
                            <CardMedia
                            component="img"
                            height="140"
                            image={stalking2}
                            alt="green iguana"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Digital stalking
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            Digital stalking involves someone using the internet, apps, and other forms of technology and digital media for unwanted contact, surveillance, and harassment. Digital stalking can occur exclusively digitally—or it can be part of a stalking 
                            process that also includes physical surveillance, continuous contact attempts, vandalism, violence, and threats.
                            <br></br>
                            <br></br>
                            Experiencing digital stalking? <br></br>
                            Contact 
                                <Link href="https://danskstalkingcenter.dk/gratis-telefon-radgivning/?_gl=1*1reo0b2*_up*MQ..&gclid=CjwKCAjwl4yyBhAgEiwADSEjeHHxysHwmbCivPzjQvN3yZG3d3HUaRjjVNdQc10QJL7wevMaM231JhoCon8QAvD_BwE"> Dansk Stalking Center </Link>
                            for specialized advice on digital stalking
                            </Typography>
                            <Typography gutterBottom variant="h5" component="div">
                                <br></br>
                                What is it?
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            The technological development and increased use of social media mean that much stalking today occurs over the internet or through other digital tools. Digital stalking can be both extensive and intimidating. Therefore, it is important to take digital stalking seriously.
                            <br></br>
                            <br></br>
                            <b>Examples:</b>
                                    <li>Messages and contact, for example, via social media</li>
                                    <li>Digital surveillance, for example through hacking a mail, accounts to social media etc</li>
                                    <li>Unwanted sharing of personal information, for example pictures, revengeporn</li>
                                    <li>Identitytheft, for example ordering items in the exposeds name</li>

                            <br></br>
                            Another way digital stalking can occur is through the acquisition of information that is used, for example, to physically pursue the victim or harass the victim. This can involve information available on the internet. It can also concern information from, for example, a GPS indicating where one physically is located.
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                        </CardActions>
                    </Card>
                </div>
                <div className="card">
                    <Card sx={{ maxWidth: 1000, color: "#ee6c4d", backgroundColor: "#e0fbfc"}}>
                        <CardActionArea>
                            <CardMedia
                            component="img"
                            height="140"
                            image={stalking3}
                            alt="green iguana"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Premptive measures
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            <b>It's always good to be on the safe side, please keep these tips in mind</b>
                                    <li>Ensure that apps, software, and operating systems on your devices are always updated to the latest versions.</li>
                                    <li>Activate two-factor authentication on your online accounts and profiles. Learn more about two-factor authentication <Link href="https://www.sikkerdigital.dk/borger/tekniske-setup/guide-to-trins-login">here.</Link></li>
                                    <li>Use strong and unique passwords (e.g., for email, Facebook, etc.). Learn how to create strong passwords <Link href="https://taenk.dk/forbrugerliv/elektronik-og-digitale-tjenester/password-saadan-laver-du-et-sikkert-kodeord">here.</Link></li>
                                    <li>Be mindful of which Wi-Fi networks you connect to. Avoid connecting to open Wi-Fi networks where you don't need a password.</li>
                                    <li>Keep an eye on what apps/software are installed on your device – if there's something you don't recognize, remove it.</li>
                                    <li>Be aware of synchronization settings so your device does not sync with devices you do not know.</li>
                                    <li>Check which apps use location services and disable them. Note: If you use the Skytsengel app, remember to enable location services</li>
                                    <li>Review your privacy settings on social media profiles. It's a good idea not to have open profiles on social media like Facebook and Instagram. You can make them private under privacy settings – find a guide for Facebook <Link href="https://www.facebook.com/help/325807937506242">here</Link> and Instagram <Link href="https://www.facebook.com/help/instagram/196883487377501">here.</Link></li>

                            <br></br>
                            </Typography>
                            <Typography gutterBottom variant="h5" component="div">
                                <br></br>
                                How do i know if i am being stalked digitally?
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                When exposed to stalking, one often experiences a sense that their devices have been hacked. Often, it's not about deliberate hacking, but someone gaining access to your devices. It can be difficult to determine if you've been hacked. But there are a series of questions you can ask yourself to ascertain if another person has access to your devices:
                                <li>Is the perpetrator a former partner or friend with whom you have shared your logins? Or has he/she had physical access to your devices?</li>
                                <li>How technically skilled is the person you suspect has access to your devices?</li>
                                <li>Are there programs installed on your computer or phone that you do not recognize?</li>
                                <li>Do you feel that the perpetrator knows things about you that you haven't shared? For example, private information, your location, or access to files or pictures that you haven't shared.</li>
                                <br></br>
                                If you can nod affirmatively to one or more questions, there may be a possibility that someone has access to your devices. In these cases, it might be a good idea to do the following
                                <li>Be aware of synchronization settings, so your device doesn't synchronize with devices you don't recognize</li>
                                <li>Check which apps are using location services. Consider turning off location services if necessary.</li>
                                <li>Always update your systems and programs to the latest versions.</li>
                                <li>Use two-factor authentication and strong passwords (e.g., for email, Facebook, etc.).</li>
                                <br></br>
                                If you wish to report to the police, it's important to save information.<br></br>
                                Documentation of stalking is crucial, whether it's physical or digital. Therefore, save all documentation whenever possible.
                                Feel free to use screenshots of messages, call logs, unauthorized access to online accounts, etc., but ensure that there's a precise date visible on the image. Organize the documentation to make it clear and understandable. For more information and other good advice on documentation, refer to the logsheet page.
                                <br></br>
                                Please contact <Link href="https://danskstalkingcenter.dk/gratis-telefon-radgivning/?_gl=1*1reo0b2*_up*MQ..&gclid=CjwKCAjwl4yyBhAgEiwADSEjeHHxysHwmbCivPzjQvN3yZG3d3HUaRjjVNdQc10QJL7wevMaM231JhoCon8QAvD_BwE"> Dansk Stalking Center </Link> for specialized advice on digital stalking
                            </Typography>
                            <Typography gutterBottom variant="h5" component="div">
                                <br></br>
                                Did you know that..?
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <b>72%</b> experiences having recieved e-mails, text messages or some other form of written contact<br></br>
                                <b>29%</b> experiences harassment on social media<br></br>
                                <b>13%</b> experiences digital surveillance(for example through eavesdropping equipment or fake Facebook profiles)<br></br>
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                        </CardActions>
                    </Card>
                </div> 
            </div>
        <Footer />
    </div>)
}

export default Ack;