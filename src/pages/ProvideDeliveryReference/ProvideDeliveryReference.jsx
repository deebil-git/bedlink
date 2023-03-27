import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Typography,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate } from 'react-router-dom';
import { getOrderByDeliveryReference } from '../../API';
import { useState } from 'react';

function ProvideDeliveryReference(props) {
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState('');
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateIsEmpty = (v) => {
    if (!v) {
      setErrorText('Field cannot be empty');
      return false;
    }
    return true;
  };

  const handleChange = (event) => {
    setValue(event.target.value);
    setErrorText('');
  };

  const onSubmit = () => {
    if (validateIsEmpty(value)) {
      setIsLoading(true);
      getOrderByDeliveryReference(value.trim())
        .then((result) => {
          if (result) {
            console.log(result['DeliveryLock'])
            if(result['DeliveryLock'] == true){
              setErrorText("We're sorry, but it appears that you have already booked a delivery date for this order. If you need to make changes to your existing order, please contact our customer care team for assistance.");
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
            setErrorText('Delivery Reference does not exist');
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <Card>
      <CardHeader title='Provide delivery reference' />
      <CardContent sx={{pt:1}}>
        <Typography sx={{ mb: 2 }}>
          Please enter your delivery reference to book your delivery slot:
        </Typography>
        <TextField
          error={!!errorText}
          helperText={errorText}
          fullWidth
          variant='outlined'
          color='success'
          size='small'
          value={value}
          onChange={(v) => handleChange(v)}
        />
      </CardContent>
      <CardContent style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <LoadingButton
          loading={isLoading}
          variant='outlined'
          color='success'
          onClick={onSubmit}
        >
          Continue
        </LoadingButton>
      </CardContent>
    </Card>
  );
}

export default ProvideDeliveryReference;
