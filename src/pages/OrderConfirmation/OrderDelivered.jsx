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

function OrderDelivered() {
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

  if (state['Marketplace Code'] == '') {
    state['Marketplace Code'] = 'N/A'
  }

  const deliveryDateTime = new Date(state['DELIVERY_TIME_DATE']);
  const formattedDate = deliveryDateTime.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  const formattedTime = deliveryDateTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  
  return (
    <Box textAlign='center'>
      <Card>
        <FormHeader title='Order Delivered' />
          <FormContent>
            <Box sx={{ color: '#2596be' }}>
              <ReactSVG src={successSvg} />
            </Box>
            <CardHeader title='Your order has been delivered successfully!' />
            <CardContent variant='outlined'>
            <Typography variant='h6' align='left' gutterBottom style={{ fontWeight: 'bold', color: '#333', opacity: 0.5, }}>Name</Typography>
            {/* <Divider style={{ margin: '16px 0' }} /> */}
            <Typography variant='body1' align='left' gutterBottom style={{ fontWeight: 'bold',fontFamily: 'Arial', color: '#555' }}>
              {state['First Name']} <span style={{ fontWeight: 'bold' }}>{state['Surname']}</span>
            </Typography>
            <Typography variant='h6' align='left' gutterBottom style={{ fontWeight: 'bold', color: '#333', opacity: 0.5, }}>Address</Typography>
            {/* <Divider style={{ margin: '16px 0' }} /> */}
            <Typography variant='body1' align='left' gutterBottom style={{ fontWeight: 'bold',fontFamily: 'Arial', color: '#555' }}>
              {state['Address 1']} 
            </Typography>
            <Typography variant='h6' align='left' gutterBottom style={{ fontWeight: 'bold', color: '#333', opacity: 0.5, }}>Phone</Typography>
            {/* <Divider style={{ margin: '16px 0' }} /> */}
            <Typography variant='body1' align='left' gutterBottom style={{ fontWeight: 'bold',fontFamily: 'Arial', color: '#555' }}>
              {state['Phone']}
            </Typography>
            <Typography variant='h6' align='left' gutterBottom style={{ fontWeight: 'bold', color: '#333', opacity: 0.5, }}>Order Status</Typography>
            {/* <Divider style={{ margin: '16px 0' }} /> */}
            <Typography variant='body1' align='left' gutterBottom style={{ fontWeight: 'bold',fontFamily: 'Arial', color: '#555' }}>
              {state['STATUS']}
            </Typography>
            <Typography variant='h6' align='left' gutterBottom style={{ fontWeight: 'bold', color: '#333', opacity: 0.5, }}>Task Type</Typography>
            {/* <Divider style={{ margin: '16px 0' }} /> */}
            <Typography variant='body1' align='left' gutterBottom style={{ fontWeight: 'bold',fontFamily: 'Arial', color: '#555' }}>
              {state['Action Type']}
            </Typography>
            <Typography variant='h6' align='left' gutterBottom style={{ fontWeight: 'bold', color: '#333', opacity: 0.5, }}>Delivered By</Typography>
            {/* <Divider style={{ margin: '16px 0' }} /> */}
            <Typography variant='body1' align='left' gutterBottom style={{ fontWeight: 'bold',fontFamily: 'Arial', color: '#555' }}>
              {state['DELIVERY AGENT']}
            </Typography>
            <Typography variant='h6' align='left' gutterBottom style={{ fontWeight: 'bold', color: '#333', opacity: 0.5, }}>Delivered On</Typography>
            {/* <Divider style={{ margin: '16px 0' }} /> */}
            <Typography variant='body1' align='left' gutterBottom style={{ fontWeight: 'bold',fontFamily: 'Arial', color: '#555' }}>
            {/* {correcteddeliveryDateTime} */}
            {state['DELIVERY_TIME_DATE']}
            {/* {formattedDate} {formattedTime} */}
            </Typography>
            <Typography variant='h6' align='left' gutterBottom style={{ fontWeight: 'bold', color: '#333', opacity: 0.5, }}>Order Referance Number</Typography>
            {/* <Divider style={{ margin: '16px 0' }} /> */}
            <Typography variant='body1' align='left' gutterBottom style={{ fontWeight: 'bold',fontFamily: 'Arial', color: '#555' }}>
              {state['Unique Ref']}
            </Typography>
            <Typography variant='h6' align='left' gutterBottom style={{ fontWeight: 'bold', color: '#333', opacity: 0.5, }}>Marketplace</Typography>
            {/* <Divider style={{ margin: '16px 0' }} /> */}
            <Typography variant='body1' align='left' gutterBottom style={{ fontWeight: 'bold',fontFamily: 'Arial', color: '#555' }}>
              {state['Marketplace Type']}
            </Typography>
            <Typography variant='h6' align='left' gutterBottom style={{ fontWeight: 'bold', color: '#333', opacity: 0.5, }}>Marketplace Code</Typography>
            {/* <Divider style={{ margin: '16px 0' }} /> */}
            <Typography variant='body1' align='left' gutterBottom style={{ fontWeight: 'bold',fontFamily: 'Arial', color: '#555' }}>
              {state['Marketplace Code']}
            </Typography>
            <Typography variant='h6' align='left' gutterBottom style={{ fontWeight: 'bold', color: '#333', opacity: 0.5, }}>Store Name</Typography>
            {/* <Divider style={{ margin: '16px 0' }} /> */}
            <Typography variant='body1' align='left' gutterBottom style={{ fontWeight: 'bold',fontFamily: 'Arial', color: '#555' }}>
              {state['EBAY_STORE']}
            </Typography>
            <Typography variant='h6' align='left' gutterBottom style={{ fontWeight: 'bold', color: '#333', opacity: 0.5, }}>Delivery Snapshot</Typography>
            <Typography variant='h6' align='left' gutterBottom style={{ fontWeight: 'bold', color: '#333', opacity: 0.5, }}></Typography>
            {/* <Divider style={{ margin: '16px 0' }} /> */}
            <Typography variant='body1' align='left' gutterBottom style={{ fontWeight: 'bold',fontFamily: 'Arial', color: '#555' }}>
            <a href={state['Image URL']} target="_blank" rel="noopener noreferrer">Delivery Photo</a> | <a href={state['Signature URL']} target="_blank" rel="noopener noreferrer">Customer Signature</a>
            </Typography>
            </CardContent>
          </FormContent>       
        </Card>        
      </Box>
  );
}

export default OrderDelivered;
