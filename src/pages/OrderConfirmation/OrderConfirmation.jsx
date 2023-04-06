import {
  Card, CardContent, CardHeader, Typography,
  Button
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import successSvg from './success.svg';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useHistory } from 'react-router-dom';

function OrderConfirmation() {
  const { state } = useLocation();
  const premium = state['premium']
  // console.log(state['premium'])

  const booked_date = state.date
  const order_id = state.order_id

  const FormHeader = styled(CardHeader)({
    backgroundColor: '#4caf50',
    color: '#fff',
    fontWeight: 'bold',
  });

  const FormContent = styled(CardContent)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  });


  if (premium === 'Y') {
    const FormHeader = styled(CardHeader)({
      backgroundColor: '#2596be',
      color: '#fff',
    });
    return (
      <Box textAlign='center'>
        <Card>
        <FormHeader title='Confirmation Successful' />
          <FormContent>
            <Box sx={{ color: '#2596be' }}>
              <ReactSVG src={successSvg} />
            </Box>
            <CardHeader title='Your Premium Delivery Date has been confirmed!' />
            <CardContent variant='outlined'>
              <Typography sx={{ mb: 2 }} variant='body1' align='center'>
                Thank you for choosing BedLink! Your delivery for order <strong>{order_id}</strong> has been confirmed for:
              </Typography>
              <Typography sx={{ mb: 2, fontWeight: 'bold', color: '#005074', fontSize: '1rem' }} variant='body1' align='center'>
              {booked_date}
              </Typography>
              <Typography sx={{ mb: 2 }} variant='body1' align='center'>
              You'll receive your order on this date at your convenience. Please ensure that someone is available to receive the delivery and provide any specific delivery instructions to our team.
              </Typography>
            </CardContent>
          </FormContent>
        </Card>
      </Box>

    )
  }
  return (
    <Box textAlign='center'>
      <Card>
        <FormHeader title='Confirmation Successful' />
          <FormContent>
            <Box sx={{ color: '#2596be' }}>
              <ReactSVG src={successSvg} />
            </Box>
            <CardHeader title='Your Delivery Date has been confirmed!' />
            <CardContent variant='outlined'>
              <Typography sx={{ mb: 2 }} variant='body1' align='center'>
                Thank you for choosing BedLink! Your delivery for order <strong>{order_id}</strong> has been confirmed for:
              </Typography>
              <Typography sx={{ mb: 2, fontWeight: 'bold', color: '#4caf50', fontSize: '1rem' }} variant='body1' align='center'>
              {booked_date}
              </Typography>
              <Typography sx={{ mb: 2 }} variant='body1' align='center'>
                You'll receive your order on this date at your convenience. Please ensure that someone is available to receive the delivery and provide any specific delivery instructions to our team.
              </Typography>
            </CardContent>
          </FormContent>
        </Card>
      </Box>
  );
}

export default OrderConfirmation;
