import { MemoryRouter } from 'react-router-dom';
import Navigation from './pages/Navigation';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
          <Navigation />
      </BrowserRouter>
    </>
  );
}

export default App;
