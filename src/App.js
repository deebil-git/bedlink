import { Typography } from '@mui/material';
import { MemoryRouter } from 'react-router-dom';
import Navigation from './pages/Navigation';

function App() {
  return (
    <>
      <MemoryRouter>
        <div className='main-container'>
          <Typography
            variant='button'
            sx={{ display: 'flex', alignSelf: 'center', fontWeight: 'bold', mb: 2, fontSize: '2rem' }}
          >
            BEDLINK
          </Typography>
          <Navigation />
        </div>
      </MemoryRouter>
    </>
  );
}

export default App;
