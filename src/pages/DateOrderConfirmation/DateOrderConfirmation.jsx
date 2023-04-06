import { useState, useEffect } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import {
  TextField,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { getDayAvailabilityForPostcode, updateDayDelivery } from '../../API';
import { LoadingButton } from '@mui/lab';
import { Button,
  CircularProgress,
  Card,
  CardHeader,
  CardContent, } from '@mui/material';
import Box from '@mui/material/Box';
import styled from '@emotion/styled';

function DateOrderConfirmation() {
  const [value, setValue] = useState('');
  const [deliveryAvailability, setDeliveryAvailability] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();

  console.log(state)

  useEffect(() => {
    getDayAvailabilityForPostcode(state['Postcode']).then(
      (availabilities) => {
        // console.log(availabilities)
        setDeliveryAvailability(availabilities);
      }
    );
  }, [state]);

  const onSubmitDay = () => {
    setIsLoading(true);    
    const chosenDay = value.format('DD/MM/YY');
    const order_id = state['Unique Ref'] ;
    updateDayDelivery(state['Unique Ref'], chosenDay, 'N')
      .then(() => {
        navigate('/order_confirmation', { state: { date: chosenDay , premium: 'N', order_id: order_id } });
      })
      .finally(() => setIsLoading(false));
  };

  const isDeliveryDayAvailable = (date) => {
    return !deliveryAvailability[date.format('DD/MM/YY')];
  };

  const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // height: '100vh',
    // width: '100vw',
  });

  const FormContainer = styled(Card)({
    width: '100%',
    minWidth: 400,
  });

  const FormHeader = styled(CardHeader)({
    backgroundColor: '#4caf50',
    color: '#fff',
  });

  const FormContent = styled(CardContent)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
  });

  const LoadingSpinner = styled(CircularProgress)({
    color: '#4caf50',
    marginRight: '8px',
  });
  

  return (
    <Container>
    <FormContainer>
      <FormHeader title='Confirm Your Standard Delivery Date' />
      <FormContent>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StaticDatePicker
            orientation='landscape'
            openTo='day'
            value={value}
            shouldDisableDate={isDeliveryDayAvailable}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            showToolbar={false}
            renderInput={(params) => <TextField {...params} />}
            components={{
              ActionBar: () => null,
            }}
          />
        </LocalizationProvider>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}> 
          <Button
              variant='contained'
              color='primary'
              sx={{ bgcolor: '#2596be',
              color: 'white',
              '&:hover': {
                bgcolor: '#005074',
              }, fontWeight: 'bold'}}
              onClick={() => navigate('/premium_date_order_confirmation', { state })}
            >
            Can't see an ideal date? Book a Premium Paid Dedicated Delivery
          </Button>
          <Button
          variant='outlined'
          color='success'
          onClick={onSubmitDay}
          sx={{ color: '#2596be' }}
          disabled={!value || isLoading}
          >
          {isLoading && <LoadingSpinner size={20} />}
          Confirm Premium Slot
        </Button>
        </Box>
      </FormContent>
    </FormContainer>
    </Container>
  );
}

export default DateOrderConfirmation;
