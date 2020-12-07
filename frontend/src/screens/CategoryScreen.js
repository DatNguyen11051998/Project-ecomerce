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

function CategoryScreen(props) {
    const [moreTt, setMoreTt] = useState(4);
    const [categoryName, setCategoryName] = useState('');
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
        if (category === 'sach-van-hoc') {
            setCategoryName(t('sách văn học'))
        }else if(category === 'truyen-tranh'){
            setCategoryName(t('truyện tranh'))
        }
        else if(category === 'sach-quoc-te'){
            setCategoryName(t('sách quốc tế'))
        }
        else if(category === 'ki-nang-song'){
            setCategoryName(t('sách kĩ năng sống'))
        }
        else{
            setCategoryName(t('sách kinh doanh'))
        }
        return () => {
            //
        };
    }, [category, t]);
    const handerClick = (e) => {
        console.log(45, e.target.value)
        i18n.changeLanguage(e.target.value);
    };
    const onLoadMore = () => {
        setMoreTt(moreTt + 4)
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
            <div className="filter">
                <li>
                    <form class="navbar navbar-light form-inline my-2 my-lg-0" onSubmit={submitHandler}>
                        <input
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            className="form-control mr-sm-2"
                            name="searchKeyword"
                            onChange={(e) => setSearchKeyword(e.target.value)}
                        />
                        <button type="submit" className="btn btn-outline-info my-2 my-sm-0"><Link to={'/search/q=' + searchKeyword}>{t('Tìm kiếm')}</Link></button>
                    </form>
                </li>

                <li>
                    Sort By {' '}
                    <select name="sortOrder" onChange={sortHandler}>
                        <option value="">{t('Mới nhất')}</option>
                        <option value="lowest">{t('Từ cao đến thấp')}</option>
                        <option value="highest">{t('Từ thấp đến cao')}</option>
                    </select>
                </li>
                <li>
                    Language: {' '}
                    <select onChange={handerClick}>
                        <option value="vi">VI</option>
                        <option value="en">EN</option>
                    </select>
                </li>
            </div>
            <div className="banner container">
                <div className="row">
                    <div className="col-md-3 col-sm-4 sidebar1 ">
                        <div className="left-navigation">
                            <ul className="list">
                                <h5><strong>{t('danh mục sản phẩm')}</strong></h5>
                                <li><Link to="/category/truyen-tranh">{t('truyện tranh')}</Link></li>
                                <li><Link to="/category/sach-quoc-te">{t('sách quốc tế')}</Link></li>
                                <li><Link to="/category/sach-van-hoc">{t('sách văn học')}</Link></li>
                                <li><Link to="/category/ki-nang-song">{t('sách kĩ năng sống')}</Link></li>
                                <li><Link to="/category/sach-kinh-doanh">{t('sách kinh doanh')}</Link></li>
                            </ul>
                        </div>

                    </div>
                    <div className="col-md-9 col-sm-8">
                        <Carousel className="caro" >
                            <Carousel.Item>
                                <a href="#">
                                    <img
                                        className="d-block w-100"
                                        src="https://cdn0.fahasa.com/media/magentothem/banner7/TrangKinhTe_main_920x420.jpg"
                                        alt="First slide"
                                    />
                                </a>
                            </Carousel.Item>
                            <Carousel.Item>
                                <a href="#">
                                    <img
                                        className="d-block w-100"
                                        src="https://cdn0.fahasa.com/media/magentothem/banner7/rs-920x420.png"
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
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>{error}</div>
            ) : (

                        <div className="container">
                            {category && <h4 style={{ paddingTop: '3%' }}>Phân loại theo: {categoryName}</h4>}

                            <div className="row products">
                                {products.filter(product => product.category).slice(0, moreTt).map((product, index) => (

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
                                {products.filter(product => product.category).length <= moreTt ? '' : <div style={{ display: 'flex', justifyContent: 'center', margin: '5%', color: 'blue', cursor: 'pointer' }}>
                                    <div onClick={() => onLoadMore()}>Xem thêm</div>
                                </div>}
                            </div>

                        </div>
                    )}
        </>
    );
}
export default CategoryScreen;
