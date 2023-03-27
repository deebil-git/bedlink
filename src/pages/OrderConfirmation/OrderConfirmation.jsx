import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

function OrderConfirmation() {
  const { state } = useLocation();
  console.log(state['premium'])

  if (state['premium'] == 'Y'){
    return (
        <Card>
          <CardHeader title='Your delivery date confirmed' />
          <CardContent variant='outlined'>
            <Typography sx={{ mb: 2 }} variant='body1'>
              Premium delivery date confirmed!
            </Typography>
            <Typography variant='body1'>
              Our team will be in touch to collect payment for this Premium Paid Service and deliver your order at your convenience.<b>{state.date}</b>
            </Typography>
          </CardContent>
        </Card>
      );
    }
  return (
    <Card>
      <CardHeader title='Your delivery date confirmed' />
      <CardContent variant='outlined'>
        <Typography sx={{ mb: 2 }} variant='body1'>
          Thank you for confirming your delivery date.
        </Typography>
        <Typography variant='body1'>
          Your order will be delivered on this date: <b>{state.date}</b>
        </Typography>
      </CardContent>
    </Card>
  );
}

export default OrderConfirmation;
