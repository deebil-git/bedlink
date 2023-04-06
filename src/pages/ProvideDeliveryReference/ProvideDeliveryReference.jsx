import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Typography,
  Button,
  CircularProgress,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate, useParams } from 'react-router-dom';
import { getOrderByDeliveryReference } from '../../API';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import React, { useCallback } from 'react';

function ProvideDeliveryReference(props) {
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState('');
  const [messageText, setMessageText] = useState('');
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();
  try {
  } catch (error) {
    console.error(error);
    // Handle error
  }
  // console.log(id)

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

  const onSubmit = useCallback(() => {
    if (validateIsEmpty(value)) {
      setIsLoading(true);
      getOrderByDeliveryReference(value.trim())
        .then((result) => {
          if (result) {
            // console.log(result['DeliveryLock'])
            if (result['DeliveryLock']) {
              const sd = new Date(result['Customer Confirmed Delivery Date']);
              const df = sd.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
              const email = 'hello@bedlink.co.uk';
              if (result['PremiumDelivery'] === true) {
                setMessageText(`Great news! Your Premium Paid Delivery has been booked for  ${df}. No further action is required at this time. If you need to make changes to the delivery date, please reach out to us at hello@bedlink.co.uk and our team will assist you.`);
              }
              else {
                setMessageText(`Great news! Your Delivery has been booked for  ${df}. No further action is required at this time. If you need to make changes to the delivery date, please reach out to us at hello@bedlink.co.uk and our team will assist you.`);
                // setMessageText(`Great news, your delivery has already been booked in for ${df}. You do not need to do anything else at this stage. If you want this date changed, please email ${email} and the team can update this for you.`);
              }
            }

            // else if (result['available_delivery_dates'] == null || Object.values(result['available_delivery_dates']).every(val => !val)) {
            //   setErrorText("We're sorry, but there are no delivery schedules available for your location at this time. Please try again later, or contact our customer care team for further assistance.");
            // }
            else {
              navigate('/order_number_confirmation', {
                state: result,
              });
            }

          } else {
            setErrorText(`We're sorry, but the reference number you entered does not match any orders in our system. Please double-check your delivery reference and try again. If you continue to experience issues, please contact our support team for assistance. Thank you for choosing BedLink.`);
            // setErrorText('Your reference number does not belong to our system, please can you check your order and delivery reference and try again. Thank you.');
          }
        })
        .finally(() => setIsLoading(false));
    }
  }, [value, navigate, validateIsEmpty]);


  const LoadingSpinner = styled(CircularProgress)({
    color: '#4caf50',
    marginRight: '8px',
  });

  try {
    useEffect(() => {
      console.log(id)
      if (id) {
        setValue(id);
        onSubmit();
        setErrorText('');
        setMessageText('');
      }
    }, [id, onSubmit]);
  } catch (error) {
    console.error(error);
    // Handle error
  }

  return (
    <Card
      sx={{
        width: '100%',
        minWidth: 400,
      }}>
      <CardHeader
        title='Provide Delivery Reference'
        sx={{
          backgroundColor: '#4caf50',
          color: '#fff',
        }} />
      <CardContent
        sx={{
          pt: 1,
          display: 'flex',
          flexDirection: 'column',
          // alignItems: 'center',
          textAlign: 'left'
        }}>
        <Typography sx={{ mb: 1 }}>
          Please enter your delivery reference to book your delivery slot.
        </Typography>
        <TextField
          // error={!!errorText}
          // helperText={errorText}
          fullWidth
          variant='outlined'
          color='success'
          size='me'
          value={value}
          disabled={!!id}
          onChange={(v) => handleChange(v)}
        // sx={{ fontSize: '1.2rem', mb: 2}}
        />
        {/* </CardContent> */}
        {/* <CardContent sx={{ mt: 2, textAlign: 'left'   }}> */}
        {messageText && (
          <Typography sx={{ color: '#0072C6', textAlign: 'justify', mt: 2 }}>
            {messageText}
          </Typography>
        )}
        {errorText && (
          <Typography sx={{ color: '#b71c1c', textAlign: 'justify', mt: 2 }}>
            {errorText}
          </Typography>
        )}
      </CardContent>
      <CardContent style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <Button
          variant='outlined'
          color='success'
          disabled={isLoading}
          onClick={onSubmit}
        >
          {isLoading && <LoadingSpinner size={20} />}
          Continue
        </Button>
      </CardContent>
    </Card>
  );
}

export default ProvideDeliveryReference;
