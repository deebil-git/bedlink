import { Route, Routes } from 'react-router-dom';
import DateOrderConfirmation from './DateOrderConfirmation/DateOrderConfirmation';
import PremiumDateOrderConfirmation from './DateOrderConfirmation/PremiumDateOrderConfirmation';
import OrderConfirmation from './OrderConfirmation/OrderConfirmation';
import OrderNumberConfirmation from './OrderNumberConfirmation/OrderNumberConfirmation';
import ProvideDeliveryReference from './ProvideDeliveryReference/ProvideDeliveryReference';
import DirectBookingPage from './DirectBookingLink/DirectBookingLink';
import { Link } from 'react-router-dom';

function NotFound() {
  console.log('error page')
  return (
    <div>
      <h1>404 - Page not found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/">Go back to the homepage</Link>
    </div>
  );
}

function Navigation() {
  return (
    <Routes>
      <Route path='/' element={<ProvideDeliveryReference />} />
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
      {/* <Route path="*" element={<ProvideDeliveryReference />} /> */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Navigation;
