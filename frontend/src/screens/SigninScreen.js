import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../actions/userActions';

function SigninScreen(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userSignin = useSelector(state => state.userSignin);
  const { loading, userInfo, error } = userSignin;
  const dispatch = useDispatch();
  const redirect = props.location.search ? props.location.search.split("=")[1] : '/';
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
    return () => {
      //
    };
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));

  }
  return <div className="form" >
    <form style={{ marginTop: '3%' }} onSubmit={submitHandler} >
      <ul className="form-container">
        <div class="avatar">
          <i class="fas fa-user fa-2x"></i>
        </div>
        <li>
          <h2 className="modal-title">Login</h2>
        </li>
        <li>
          {loading && <div>Loading...</div>}
          {error && <div className="alert-danger" style={{ color: 'red' }}>Tài khoản hoặc mật khẩu không đúng, vui lòng nhập lại</div>}
        </li>
        <li>
          <input class="form-control pl-3" placeholder="Username" required="required" type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}>
          </input>
        </li>
        <li>
          <input class="form-control pl-3" placeholder="Password" required="required" type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}>
          </input>
        </li>
        <li>
          <button type="submit" className=" btn btn-info btn-lg btn-block login-btn">Signin</button>
        </li>
        <li>
          New to Account?
        </li>
        <li>
          <Link to={redirect === "/" ? "register" : "register?redirect=" + redirect} className="btn btn-secondary text-center" >Create your user account</Link>
        </li>
      </ul>
    </form>
  </div>
}
export default SigninScreen;