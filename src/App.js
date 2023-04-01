import { MemoryRouter } from 'react-router-dom';
import Navigation from './pages/Navigation';
import { BrowserRouter } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';

function App() {
  return (
    <>
      <HashRouter>
          <Navigation />
      </HashRouter>
    </>
  );
}

export default App;
