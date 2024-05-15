import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Quiz from './Quiz';
import Frontpage from './Frontpage/Frontpage';
import Acknowledgment from './ack/acknowledgment';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Frontpage />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/acknowledgement" element={<Acknowledgment />} />
            </Routes>
        </Router>
    );
}

export default App;