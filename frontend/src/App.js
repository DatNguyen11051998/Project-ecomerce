import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import { useSelector } from 'react-redux';
import RegisterScreen from './screens/RegisterScreen';
import ProductsScreen from './screens/ProductsScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrdersScreen from './screens/OrdersScreen';
import UsersScreen from './screens/UsersScreen';
import SearchScreen from './screens/SearchScreen';
import CategoryScreen from './screens/CategoryScreen';
import PageNotFoundScreen from './screens/PageNotFoundScreen';

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const openMenu = () => {
    document.querySelector('.sidebar').classList.add('open');
  };
  const closeMenu = () => {
    document.querySelector('.sidebar').classList.remove('open');
  };
  const cart = useSelector(state => state.cart);

  const { cartItems } = cart;
  return (
    <BrowserRouter>
      <div className="container-fluid" style={{ background: '#f7f8f9', padding: '0' }}>
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}>&#9776;</button>
            <Link to="/">WebBook</Link>
          </div>
          <div className="header-links">
            {userInfo && !userInfo.isAdmin && (<Link to="/cart/:id?">
              <span><i class="fas fa-shopping-cart"></i>
              </span> &nbsp;
            Cart {cartItems.length === 0 ? "" : (<span style={{ padding: '0.3rem', color: 'white', background: 'red', fontSize: '0.8rem', fontWeight: 'bold' }}>{cartItems.length}</span>)}</Link>)}
            {userInfo ? (
              <Link to="/profile">{userInfo.name}</Link>
            ) : (
                <Link to="/signin">Sign In</Link>
              )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <a href="#">Admin</a>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/users">Users</Link>
                    <Link to="/profile">Profile</Link>
                    <Link to="/orders">Orders</Link>
                    <Link to="/products">Products</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <aside className="sidebar">
          <div className="top-main">Danh mục sản phẩm </div>
          <button className="sidebar-close-button" onClick={closeMenu}>
            x
          </button>
          <ul className="categories">
            <li onClick={closeMenu}><Link to="/category/truyen-tranh" className="hi">Truyện tranh</Link></li>

            <li onClick={closeMenu}><Link to="/category/sach-quoc-te">Sách quốc tế</Link></li>
            <li onClick={closeMenu}><Link to="/category/sach-van-hoc">Sách văn học</Link></li>
            <li onClick={closeMenu}><Link to="/category/ki-nang-song">Sách kĩ năng sống</Link></li>
            <li onClick={closeMenu}><Link to="/category/sach-kinh-doanh">Sách kinh doanh</Link></li>
          </ul>
        </aside>
        <div className="container" style={{ padding: '0' }}>

          <main className="main">
            <div className="content">
              <Route path="/users" component={UsersScreen} />
              <Route path="/orders" component={OrdersScreen} />
              <Route path="/profile" component={ProfileScreen} />
              <Route path="/order/:id" component={OrderScreen} />
              <Route path="/products" component={ProductsScreen} />
              <Route path="/shipping" component={ShippingScreen} />
              <Route path="/payment" component={PaymentScreen} />
              <Route path="/placeorder" component={PlaceOrderScreen} />
              <Route path="/signin" component={SigninScreen} />
              <Route path="/register" component={RegisterScreen} />
              <Route path="/product/:id" component={ProductScreen} />
              <Route path="/search/q=:key" component={SearchScreen} />
              <Route path="/cart/:id?" component={CartScreen} />
              <Route path="/category/:id" component={CategoryScreen} />
              <Route path="/" exact={true} component={HomeScreen} />
            </div>
          </main>

          <footer className="footer">
            <div className="container">
              <div className="row support">
                <div className="col-md-4 col-sm-4 col-4">
                  <ul>
                    <div className="support_name">Hỗ trợ khách hàng</div>
                    <p>Hotline chăm sóc khách hàng 1900-8198 (200d/1 phút)</p>
                    <li>Các câu hỏi thường gặp</li>
                    <li>Gửi yêu cầu hỗ trợ</li>
                    <li>Hướng dẫn đặt hàng</li>
                    <li>Phương thức vận chuyển</li>
                    <li>Chính sách đổi trả</li>
                    <li>Hướng dẫn mua trả góp</li>
                    <li>Hỗ trợ khách hàng: hotro@gmail.com</li>
                    <li>Báo lỗi bảo mật</li>
                  </ul>
                </div>
                <div className="col-md-4 col-sm-4 col-4">
                  <ul>
                    <div className="support_name">Về chúng tôi</div>
                    <li>Tuyển dụng</li>
                    <li>Chính sách bảo mật thanh toán</li>
                    <li>Chính sách bảo mật thông tin cá nhân</li>
                    <li>Chính sách giải quyết khiếu nại</li>
                    <li>Chính sách đổi trả</li>
                    <li>Điều khoản sử dụng</li>
                    <li>Báo lỗi bảo mật</li>
                  </ul>
                </div>
                <div className="col-md-4 col-sm-4 col-4">
                  <ul>
                    <div className="support_name">Kết nối với chúng tôi</div>
                    <span className="facebook"><i class="fab fa-facebook-square fa-3x"></i></span>
                    <span className="youtube"><i class="fab fa-youtube fa-3x"></i></span>
                    <span className="insta"><i class="fab fa-instagram-square fa-3x"></i></span>
                  </ul>
                  <ul>
                    <div className="support_name">tải ứng dụng trên điện thoại</div>
                    <span className="appstore"><i class="fab fa-app-store-ios fa-3x"></i></span>
                    <span className="chorm"><i class="fab fa-chrome fa-3x"></i></span>

                  </ul>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
