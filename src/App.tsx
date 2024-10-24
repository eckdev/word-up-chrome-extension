import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Analytics from './pages/Analytics';
import Misremembers from './pages/Misremembers';
import Words from './pages/Words';
import Passaparola from './pages/Passaparolla';
import PassaparollaAnalytics from './pages/PassaparollaAnalytics';

const App = () => {
 return (
    <>
       <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/words" element={<Words />} />
          <Route path="/passaparola" element={<Passaparola />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/misremember" element={<Misremembers />} />
          <Route path="/panalytics" element={<PassaparollaAnalytics />} />
       </Routes>
    </>
 );
};

export default App;