import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Typography, Divider, CircularProgress,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';

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

  const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // height: '100vh',
    // width: '100vw',
  });

  const FormContainer = styled(Card)({
    width: '60%',
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

  return (
    <Container>
      <FormContainer>
        <FormHeader title='Confirm your order'></FormHeader>
        <FormContent>
          <div style={{ marginBottom: '16px' }}>
            <Typography variant='h6' align='left' gutterBottom style={{ fontWeight: 'bold', color: '#333', opacity: 0.5,}}>Your Order Summary</Typography>
            {/* <Divider style={{ margin: '16px 0' }} /> */}
            {/* <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '16px' }}> */}
              {listOrders.map((order, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <Typography variant='subtitle2' align='left' style={{ fontWeight: 'bold',minWidth: '120px', color: '#555' }}>
                    {order}
                  </Typography>
                  <Typography variant='body1' align='left' style={{ fontFamily: 'Arial', marginLeft: '8px', color: '#333'}}>{order.value}</Typography>
                </div>
              ))}
            {/* </div> */}
          </div>
          <div style={{ marginBottom: '16px' }}>
            <Typography variant='h6' align='left' gutterBottom style={{ fontWeight: 'bold', color: '#333', opacity: 0.5, }}>Name</Typography>
            {/* <Divider style={{ margin: '16px 0' }} /> */}
            <Typography variant='body1' align='left' gutterBottom style={{ fontWeight: 'bold',fontFamily: 'Arial', color: '#555' }}>
              {state['First Name']} <span style={{ fontWeight: 'bold' }}>{state['Surname']}</span>
            </Typography>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <Typography variant='h6' align='left' gutterBottom style={{ fontWeight: 'bold', marginBottom: '16px', color: '#333', opacity: 0.5, }}>Address</Typography>
            {/* <Divider style={{ margin: '16px 0' }} /> */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant='body1' align='left' gutterBottom style={{ fontWeight: 'bold',fontFamily: 'Arial', marginBottom: '8px', color: '#555' }}>
                {state['Address 1']} {state['Address 2']} {state['Address 3']} {state['Address 4']} {state['Postcode']}
              </Typography>
            </div>
          </div>
        </FormContent>
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
      </FormContainer>
    </Container>

  );
}

export default OrderNumberConfirmation;
