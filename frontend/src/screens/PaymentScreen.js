import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { savePayment } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

function PaymentScreen(props) {
  const [paymentMethod, setPaymentMethod] = useState('');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePayment({ paymentMethod }));
    props.history.push('placeorder');
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className="form">
        <form onSubmit={submitHandler}>
          <ul className="form-container">
            <li>
              <h3>Phương thức thanh toán</h3>
            </li>

            <li>
              {/* <div>
                <input
                  type="radio"
                  name="paymentMethod"
                  id="paymentMethod"
                  value="Paypal"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></input>
                <label className="pl-2" for="paymentMethod"> Paypal</label>
              </div> */}
              <div>
                <input
                  type="radio"
                  name="paymentMethod"
                  id="paymentMethod"
                  value="Momo"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></input>
                <label className="pl-2" for="paymentMethod"> Momo</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="paymentMethod"
                  id="paymentMethod"
                  value="Thanh toan khi nhan hang"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></input>
                <label className="pl-2" for="paymentMethod"> Thanh toán khi nhận hàng</label>
              </div>
            </li>

            <li>
              <button type="submit" className="button btn-primary">
                Tiếp tục
              </button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
}
export default PaymentScreen;
