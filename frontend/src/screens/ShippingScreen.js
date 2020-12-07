import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { saveShipping } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

function ShippingScreen(props) {

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShipping({ address, city, postalCode, country, phone }));
    props.history.push('placeorder');
  }
  return <div>
    <CheckoutSteps step1 step2 ></CheckoutSteps>
    <div className="form">
      <form onSubmit={submitHandler} >
        <ul className="form-container">
          <li>
            <h2>Shipping</h2>
          </li>

          <li>
            <label htmlFor="address">
              Địa chỉ
          </label>
            <input className="pl-3" type="text" name="address" id="address" onChange={(e) => setAddress(e.target.value)}>
            </input>
          </li>
          <li>
            <label htmlFor="city">
              Thành phố
          </label>
            <input className="pl-3" type="text" name="city" id="city" onChange={(e) => setCity(e.target.value)}>
            </input>
          </li>
          <li>
            <label htmlFor="phone">
              Điện thoại
          </label>
            <input className="pl-3" type="text" name="phone" id="phone" onChange={(e) => setPhone(e.target.value)}>
            </input>
          </li>
          <li>
            <label htmlFor="country">
              Quốc gia
          </label>
            <input className="pl-3" type="text" name="country" id="country" onChange={(e) => setCountry(e.target.value)}>
            </input>
          </li>


          <li>
            <button type="submit" className="button btn-primary">Continue</button>
          </li>

        </ul>
      </form>
    </div>
  </div>

}
export default ShippingScreen;