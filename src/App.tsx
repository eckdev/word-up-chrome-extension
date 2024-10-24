import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Analytics from './pages/Analytics';
import Misremembers from './pages/Misremembers';
import Words from './pages/Words';
import Passaparola from './pages/Passaparolla';

const App = () => {
 return (
    <>
       <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/words" element={<Words />} />
          <Route path="/passaparola" element={<Passaparola />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/misremember" element={<Misremembers />} />
       </Routes>
    </>
 );
};

export default App;