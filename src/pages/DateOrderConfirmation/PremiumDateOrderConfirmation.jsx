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
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  CircularProgress,
} from '@mui/material';
import Box from '@mui/material/Box';
import styled from '@emotion/styled';


function DateOrderConfirmation() {
  const [value, setValue] = useState('');
  var [deliveryAvailability, setDeliveryAvailability] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  
  console.log(state)

  useEffect(() => {
    // getDayAvailabilityForPostcode(state['Postcode']).then(
    //   (availabilities) => {
    //     console.log(state['premium_dates'])
    setDeliveryAvailability(state['premium_dates']);
    //   }
    // );
  }, [state]);

  const onSubmitDay = () => {
    setIsLoading(true);
    const chosenDay = value.format('DD/MM/YY');
    const order_id = state['Unique Ref'] ;
    updateDayDelivery(state['Unique Ref'], chosenDay, 'Y')
      .then(() => {
        navigate('/order_confirmation', { state: { date: chosenDay, premium: 'Y' , order_id: order_id } });
      })
      .finally(() => setIsLoading(false));
  };

  const isDeliveryDayAvailable = (date) => {
    return !deliveryAvailability[date.format('DD/MM/YY')];
  };

  const FormContainer = styled(Card)({
    width: '100%',
    minWidth: 400,
  });

  const FormHeader = styled(CardHeader)({
    backgroundColor: '#2596be',
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
    <FormContainer>
  <FormHeader title='Confirm Your Premium Delivery Date' />
  <FormContent>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker
      sx={{
        '& .Mui-selected': {
          backgroundColor: 'violet',
        },
      }}
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
        style={{ "& .Mui-selected": { backgroundColor: "violet" } }}
        
      />
    </LocalizationProvider>
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button
          variant='contained'
          color='primary'
          sx={{ bgcolor: '#2596be',
          color: 'white',
          '&:hover': {
            bgcolor: '#005074',
          }, }}
          onClick={() => navigate('/date_order_confirmation', { state })}
        >
          BACK
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
    </CardContent>
  </FormContent>
</FormContainer>


  );
}

export default DateOrderConfirmation;

