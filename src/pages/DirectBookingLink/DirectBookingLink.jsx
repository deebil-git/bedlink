import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom';
import { getOrderByDeliveryReference } from '../../API';
import { useState, useEffect } from 'react';
import React, { useCallback } from 'react';

function DirectBookingPage(props) {
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState('');
  const [messageText, setMessageText] = useState('');
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();

  const validateIsEmpty = useCallback((v) => {
    if (!v) {
      setErrorText('Field cannot be empty');
      return false;
    }
    return true;
  }, [setErrorText]);

  const handleChange = (event) => {
    setValue(event.target.value);
    setErrorText('');
    setMessageText('')
  };

  const LoadingSpinner = styled(CircularProgress)({
    color: '#4caf50',
    marginRight: '8px',
  });

  const onSubmit = useCallback(() => {
    if (validateIsEmpty(id)) {
      console.log(id)
      setIsLoading(true);
      getOrderByDeliveryReference(id.trim())
        .then((result) => {
          if (result) {
            // console.log(result['DeliveryLock'])
            if (result['DeliveryLock']) {
              const sd = new Date(result['Customer Confirmed Delivery Date']);
              const df = sd.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
              const email = 'hello@bedlink.co.uk';
              if(result['PremiumDelivery'] === true){
                setMessageText(`Amazing news, your Premium Paid Delivery has already been booked in for ${df}. You do not need to do anything else at this stage. If you want this date changed, please email ${email} and the team can update this for you.`);
              }
              else{
                setMessageText(`Great news, your delivery has already been booked in for ${df}. You do not need to do anything else at this stage. If you want this date changed, please email ${email} and the team can update this for you.`);
              }
            }
            
            // else if (result['available_delivery_dates'] == null || Object.values(result['available_delivery_dates']).every(val => !val)) {
            //   setErrorText("We're sorry, but there are no delivery schedules available for your location at this time. Please try again later, or contact our customer care team for further assistance.");
            // }
            else{
              navigate('/order_number_confirmation', {
                state: result,
              });
            }
            
          } else {
            setErrorText('Your reference number does not belong to our system, please can you check your order and delivery reference and try again. Thank you.');
          }
        })
        .finally(() => setIsLoading(false));
    }
  },[id, navigate, validateIsEmpty]);

  useEffect(() => {
    setValue(id);
    onSubmit();
  }, [id, onSubmit]);

  return (
    <Card>
      <CardHeader title='Provide delivery reference' />
      <CardContent sx={{pt:1}}>
        <Typography sx={{ mb: 2 }}>
          Please enter your delivery reference to book your delivery slot:
        </Typography>
        <TextField
          // error={!!errorText}
          // helperText={errorText}
          fullWidth
          variant='outlined'
          color='success'
          size='me'
          value={value}
          onChange={(v) => handleChange(v)}
          // sx={{ fontSize: '1.2rem' }}
        />
      </CardContent>
      <CardContent>
        {messageText && (
          <Typography sx={{ fontWeight: 'bold', color: '#4caf50' }}>
            {messageText}
          </Typography>
        )}
        {errorText && (
          <Typography sx={{ fontWeight: 'bold', color: 'red' }}>
            {errorText}
          </Typography>
        )}
      </CardContent>
      <CardContent style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button
            variant='outlined'
            color='success'
            disabled={isLoading}
            onClick={onSubmit}
          >
            {isLoading && <LoadingSpinner size={40} />}
            Loading Order Details
          </Button>
      </CardContent>
    </Card>
  );
}

export default DirectBookingPage;
