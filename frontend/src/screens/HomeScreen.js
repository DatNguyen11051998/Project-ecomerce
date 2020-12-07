import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Rating from '../components/Rating';
import { Button } from 'react-bootstrap';
import $ from "jquery";
import Carousel from 'react-bootstrap/Carousel';
import { useTranslation } from 'react-i18next';
import { set } from 'mongoose';

function HomeScreen(props) {
  const [more, setMore] = useState(8);
  const [moreQt, setMoreQt] = useState(4);
  const [moreVh, setMoreVh] = useState(4);
  const [moreTt, setMoreTt] = useState(4);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [limit, setlimit] = useState(8);
  const [skip, setSkip] = useState(0);
  const category = props.match.params.id ? props.match.params.id : '';
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    dispatch(listProducts(category));

    return () => {
      //
    };
  }, [category]);
  const handerClick = (e) => {
    console.log(45, e.target.value)
    i18n.changeLanguage(e.target.value);
  };
  const onLoadMore = (key) => {
    if (key === "sachquocte") {
      setMoreQt(moreQt + 4)
    }
    if (key === "sachvanhoc") {
      setMoreVh(moreVh + 4)
    }
    if (key === "tatca") {
      setMore(more + 8)
    }
    if (key === "truyentranh") {
      setMoreTt(moreTt + 4)
    }

  }
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };
  const sortHandler = (e) => {
    setSortOrder(e.target.value);
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };

  return (
    <>
      <div className="filter row">
        <div className=" filter_main col-md-4 col-sm-4 col-12">
          <form class="navbar navbar-light form-inline my-2 my-lg-0" onSubmit={submitHandler}>
            <input
              type="search"
              placeholder="Search"
              aria-label="Search"
              className="form-control mr-sm-2"
              name="searchKeyword"
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button type="submit" className="btn btn-outline-info my-2 my-sm-0"><Link to={'/search/q=' + searchKeyword} >{t('Tìm kiếm')}</Link></button>
          </form>
        </div>
        <div className="filter_main col-md-4 col-sm-4 col-12">
          {t('Lọc theo')}: {' '}
          <select name="sortOrder" onChange={sortHandler}>
            <option value="">{t(' Mới nhất')}</option>
            <option value="lowest">{t('Từ cao đến thấp')}</option>
            <option value="highest">{t('Từ thấp đến cao')}</option>
          </select>
        </div>
        <div className="filter_main col-md-4 col-sm-4 col-12">
          {t('Ngôn ngữ')}: {' '}
          <select onChange={handerClick}>
            <option value="vi">VI</option>
            <option value="en">EN</option>
          </select>
        </div>

      </div>
      <div className="banner container">
        <div className="row">
          <div className="col-md-3 col-sm-4 sidebar1 col-12 ">
            <div className="left-navigation">
              <ul className="list">
                <h5><strong style={{ color: 'white' }}>{t('danh mục sản phẩm')}</strong></h5>
                <li><Link to="/category/truyen-tranh">{t('truyện tranh')}</Link></li>
                <li><Link to="/category/sach-quoc-te">{t('sách quốc tế')}</Link></li>
                <li><Link to="/category/sach-van-hoc">{t('sách văn học')}</Link></li>
                <li><Link to="/category/ki-nang-song">{t('sách kĩ năng sống')}</Link></li>
                <li><Link to="/category/sach-kinh-doanh">{t('sách kinh doanh')}</Link></li>
              </ul>
            </div>

          </div>
          <div className="col-md-9 col-sm-8 ">
            <Carousel className="caro" >
              <Carousel.Item>
                <a href="#">
                  <img
                    className="d-block w-100"

                    src="https://cdn0.fahasa.com/media/magentothem/banner7/rs-920x420.png"
                    alt="First slide"
                  />
                </a>
              </Carousel.Item>
              <Carousel.Item>
                <a href="#">
                  <img
                    className="d-block w-100"
                    src="https://cdn0.fahasa.com/media/magentothem/banner7/TrangKinhTe_main_920x420.jpg"
                    alt="Third slide"
                  />
                </a>


              </Carousel.Item>
              <Carousel.Item>
                <a href="#">
                  <img
                    className="d-block w-100"
                    src="https://cdn0.fahasa.com/media/magentothem/banner7/KC_Megabook920x420.jpg"
                    alt="Third slide"
                  />
                </a>

              </Carousel.Item>
            </Carousel>
          </div>
        </div>
      </div>
      {!category && <div className="container">
        <div className="row book-tac-gia">
          <div className="col-md-8 col-sm-8 col-12">
            <div className="row">
              <div className="col-md-4 col-sm-4 col-4 img-thumb">
                <h4>{t('Tác giả nổi bật')}</h4>
                <img src="https://www.vinabook.com/images/thumbnails/author/210x/360353_129910542144506789460598800290180602601678n1.jpg"></img>

              </div>
              <div className="col-md-8 col-sm-8 col-8 text-info-tac-gia">
                <div className="name">Nguyên Phong</div>
                <hr className="new1" />
                <div>
                  <p>              Nguyên Phong tên thật là Vũ Văn Du, sinh năm 1950 tại Hà Nội. Năm 1968, ông rời khỏi Việt Nam, sang Hoa Kỳ du học hai nghành Sinh vật học và Điện toán, sau đó ông sống và làm việc tại Hoa Kỳ cho đến nay.Bên cạnh vai trò là một nhà khoa học, Nguyên Phong còn là dịch giả của hàng loạt sách về văn hóa và tâm linh phương Đông rất nổi tiếng. Trong số đó, có thể kể đến: Hành Trình Về Phương Đông, Ngọc Sáng Trong Hoa Sen, Bên Rặng Tuyết Sơn, Hoa Sen Trên Tuyết, Hoa Trôi Trên Sóng Nước, Trở Về Từ Xứ Tuyết, Minh Triết Trong Đời Sống Ăn Uống, Đường Mây Qua Xứ Tuyết…
</p>
                </div>
              </div>
            </div>
            <hr className="new2" />
            <div className="row">
              <div className="col-md-4 col-sm-4 col-4 span-4">
                <div className="image-tac-gia">
                  <a href="#">
                    <img src="https://www.vinabook.com/images/thumbnails/product/115x/360571_dau-chan-tren-cat-tai-ban-2020.jpg" />
                  </a>
                </div>
                <div className="thumb-tac-gia">
                  <a href="#">Dấu chân trên cát ( xuất bản 2020)</a>
                </div>
              </div>
              <div className="col-md-4 col-sm-4 col-4 span-4">
                <div className="image-tac-gia">
                  <a href="#">
                    <img src="https://www.vinabook.com/images/thumbnails/product/115x/360356_combo-sach-minh-triet-cua-dich-gia-nguyen-phong-bo-14-cuon.jpg" />
                  </a>
                </div>
                <div className="thumb-tac-gia">
                  <a href="#">Combo sách của dịch giả Nguyên Phong</a>
                </div>
              </div>
              <div className="col-md-4 col-sm-4 col-4 span-4">
                <div className="image-tac-gia">
                  <a href="#">
                    <img src="https://www.vinabook.com/images/thumbnails/product/115x/358867_hanh-trinh-ve-phuong-dong-sach-bo-tui-tai-ban-2020.jpg" />
                  </a>
                </div>
                <div className="thumb-tac-gia">
                  <a href="#">Hành trình về phương đông </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-4">
            <h4>{t('Vouncher mua sách giảm giá')}</h4>
            <div className="row sidebar-vouncher">
              <div className="col-md-4 col-sm-4 col-4 vouncher">
                <img src="https://innhatnam68.com/wp-content/uploads/2019/06/in-voucher-gia-re-dep.jpg" />
              </div>
              <div className="col-md-8 col-sm-8 col-8">
                <p>PMH trị giá 300k trên webbook</p>
              </div>
            </div>
            <div className="row sidebar-vouncher">
              <div className="col-md-4 col-sm-4 col-4 vouncher">
                <img src="https://innhatnam68.com/wp-content/uploads/2019/06/in-voucher-gia-re-dep.jpg" />
              </div>
              <div className="col-md-8 col-sm-8 col-8">
                <p>PMH trị giá 300k trên webbook</p>
              </div>
            </div>
            <div className="row sidebar-vouncher">
              <div className="col-md-4 col-sm-4 col-4 vouncher">
                <img src="https://innhatnam68.com/wp-content/uploads/2019/06/in-voucher-gia-re-dep.jpg" />
              </div>
              <div className="col-md-8 col-sm-8 col-8">
                <p>PMH trị giá 300k trên webbook</p>
              </div>
            </div>
          </div>

        </div>
      </div>}
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (

            <div className="container">
              {category && <h4 style={{ paddingTop: '3%' }}>Phân loại theo: {category}</h4>}
              {searchKeyword && <h4>Kết quả tìm kiếm: {searchKeyword}</h4>}
              <div className="all-products">
                <div className="home-header"><h4>{t('truyện tranh')}</h4></div>
              </div>
              <div className="row products">
                {products.filter(product => product.category === 'truyen-tranh').slice(0, moreTt).map((product, index) => (

                  <div key={product.index} className="product col-sm-4 col-md-3 col-12">
                    <Link to={'/product/' + product._id}>
                      <img
                        className="product-image"
                        src={product.image}
                        alt="product"
                      />
                    </Link>
                    <div className="product-name">
                      <Link to={'/product/' + product._id}>{product.name}</Link>
                    </div>
                    <div className="product-brand">{product.brand}</div>
                    <div className="product-price">${product.price}</div>
                    <div className="product-rating">
                      <Rating
                        value={product.rating}
                        text={product.numReviews + ' reviews'}
                      />
                    </div>
                  </div>
                ))}
                {products.filter(product => product.category === 'truyen-tranh').length <= moreTt ? '' : <div style={{ display: 'flex', justifyContent: 'center', margin: '2% 0', color: 'blue', cursor: 'pointer' }}>
                  <button type="button" class="btn btn-outline-primary" onClick={() => onLoadMore('truyentranh')}>{t('Xem thêm')}</button>
                </div>}
              </div>
              <div className="all-products">
                <div className="home-header"><h4>{t('sách quốc tế')}</h4></div>

              </div>
              <div className="row products">
                {products.filter(product => product.category === 'sach-quoc-te').slice(0, moreQt).map((product, index) => (

                  <div key={product.index} className="product col-sm-4 col-md-3 col-12">
                    <Link to={'/product/' + product._id}>
                      <img
                        className="product-image"
                        src={product.image}
                        alt="product"
                      />
                    </Link>
                    <div className="product-name">
                      <Link to={'/product/' + product._id}>{product.name}</Link>
                    </div>
                    <div className="product-brand">{product.brand}</div>
                    <div className="product-price">${product.price}</div>
                    <div className="product-rating">
                      <Rating
                        value={product.rating}
                        text={product.numReviews + ' reviews'}
                      />
                    </div>
                  </div>

                ))}
                {products.filter(product => product.category === 'sach-quoc-te').length <= moreQt ? '' : <div style={{ display: 'flex', justifyContent: 'center', margin: '2% 0', color: 'blue', cursor: 'pointer' }}>
                  <button type="button" class="btn btn-outline-primary" onClick={() => onLoadMore('sachquocte')}>{t('Xem thêm')}</button>
                </div>}
              </div>

              <div className="all-products">
                <div className="home-header"><h4>{t('sách văn học')}</h4></div>

              </div>
              <div className="row products">
                {products.filter(product => product.category === 'sach-van-hoc').slice(0, moreVh).map((product, index) => (

                  <div key={product.index} className="product col-sm-4 col-md-3 col-12">
                    <Link to={'/product/' + product._id}>
                      <img
                        className="product-image"
                        src={product.image}
                        alt="product"
                      />
                    </Link>
                    <div className="product-name">
                      <Link to={'/product/' + product._id}>{product.name}</Link>
                    </div>
                    <div className="product-brand">{product.brand}</div>
                    <div className="product-price">${product.price}</div>
                    <div className="product-rating">
                      <Rating
                        value={product.rating}
                        text={product.numReviews + ' reviews'}
                      />
                    </div>
                  </div>

                ))}
                {products.filter(product => product.category === 'sach-van-hoc').length <= moreVh ? '' : <div style={{ display: 'flex', justifyContent: 'center', margin: '2% 0', color: 'blue', cursor: 'pointer' }}>
                  <button type="button" class="btn btn-outline-primary" onClick={() => onLoadMore('sachvanhoc')}>{t('Xem thêm')}</button>
                </div>}
              </div>
              <div className="all-products">
                <div className="home-header"><h4>{t('Tất cả sản phẩm')}</h4></div>

              </div>
              <div className="row products">
                {products.slice(0, more).map((product, index) => (

                  <div key={product.index} className="product col-sm-4 col-md-3 col-12">
                    <Link to={'/product/' + product._id}>
                      <img
                        className="product-image"
                        src={product.image}
                        alt="product"
                      />
                    </Link>
                    <div className="product-name">
                      <Link to={'/product/' + product._id}>{product.name}</Link>
                    </div>
                    <div className="product-brand">{product.brand}</div>
                    <div className="product-price">${product.price}</div>
                    <div className="product-rating">
                      <Rating
                        value={product.rating}
                        text={product.numReviews + ' reviews'}
                      />
                    </div>
                  </div>

                ))}
                {products.filter(product => product.category).length <= more ? '' : <div style={{ display: 'flex', justifyContent: 'center', margin: '2% 0', color: 'blue', cursor: 'pointer' }}>
                  <button type="button" class="btn btn-outline-primary" onClick={() => onLoadMore('tatca')}>{t('Xem thêm')}</button>
                </div>}
              </div>
            </div>
          )}
    </>
  );
}
export default HomeScreen;
