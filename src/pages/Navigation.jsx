import { Route, Routes } from 'react-router-dom';
import DateOrderConfirmation from './DateOrderConfirmation/DateOrderConfirmation';
import PremiumDateOrderConfirmation from './DateOrderConfirmation/PremiumDateOrderConfirmation';
import OrderConfirmation from './OrderConfirmation/OrderConfirmation';
import OrderNumberConfirmation from './OrderNumberConfirmation/OrderNumberConfirmation';
import ProvideDeliveryReference from './ProvideDeliveryReference/ProvideDeliveryReference';
import DirectBookingPage from './DirectBookingLink/DirectBookingLink';

function Navigation() {
  return (
    <Routes>
      <Route path='/' element={<ProvideDeliveryReference />} />
      {/* <Route path='/bedlink' element={<ProvideDeliveryReference />} /> */}
      <Route
        path='/order_number_confirmation'
        element={<OrderNumberConfirmation />}
      />
      <Route
        path='/date_order_confirmation'
        element={<DateOrderConfirmation />}
      />
      <Route
        path='/premium_date_order_confirmation'
        element={<PremiumDateOrderConfirmation />}
      />
      <Route path='/order_confirmation' element={<OrderConfirmation />} />
      <Route path='/BookDeliveryDate/:id' element={<DirectBookingPage />} />
      <Route path='/bedlink/BookDeliveryDate/:id' element={<DirectBookingPage />} />
    </Routes>
  );
}

export default Navigation;
