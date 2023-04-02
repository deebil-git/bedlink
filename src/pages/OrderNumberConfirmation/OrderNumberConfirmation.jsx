import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Typography, Divider,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

function OrderNumberConfirmation(props) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const listOrders = [];
  [1, 2, 3, 4].forEach((i) => {
    const productDescription = state[`Product Description ${i}`];
    if (productDescription) {
      listOrders.push(`${state['Quantity P1']} X ${productDescription}`);
    }
  });

  return (
    <Card>
      <CardHeader title='Confirm your order'></CardHeader>

      <CardContent>
        <Typography variant='h6' align='left' gutterBottom style={{ fontWeight: 'bold', color: '#333' }}>Your Product</Typography>
        <Divider style={{ margin: '16px 0' }} />
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '16px' }}>
          {listOrders.map((order, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <Typography variant='subtitle2' align='left' style={{ minWidth: '120px', color: '#555' }}>
                {order}
              </Typography>
              <Typography variant='body1' align='left' style={{ fontFamily: 'Arial', marginLeft: '8px', color: '#333' }}>{order.value}</Typography>
            </div>
          ))}
        </div>
        <div style={{ marginBottom: '16px' }}>
          <Typography variant='h6' align='left' gutterBottom style={{ fontWeight: 'bold', color: '#333' }}>Name</Typography>
          <Divider style={{ margin: '16px 0' }} />
          <Typography variant='body1' align='left' gutterBottom style={{ fontFamily: 'Arial', color: '#555' }}>
            {state['First Name']} <span style={{ fontWeight: 'bold' }}>{state['Surname']}</span>
          </Typography>
        </div>
        <div style={{ marginBottom: '16px' }}>
          <Typography variant='h6' align='left' gutterBottom style={{ fontWeight: 'bold', marginBottom: '16px', color: '#333' }}>Address</Typography>
          <Divider style={{ margin: '16px 0' }} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='body1' align='left' gutterBottom style={{ fontFamily: 'Arial', marginBottom: '8px', color: '#555' }}>
              {state['Address 1']} {state['Address 2']} {state['Address 3']} {state['Address 4']} {state['Postcode']}
            </Typography>
          </div>
        </div>
      </CardContent>
      <CardContent style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant='outlined'
          color='success'
          onClick={() => {
            navigate('/date_order_confirmation', { state });
          }}
        >
          BOOK DELIVERY SLOT
        </Button>
      </CardContent>
    </Card>
  );
}

export default OrderNumberConfirmation;
