import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Quiz from './Quiz';
import Frontpage from './Frontpage/Frontpage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Frontpage />} />
                <Route path="/quiz" element={<Quiz />} />
            </Routes>
        </Router>
    );
}

export default App;