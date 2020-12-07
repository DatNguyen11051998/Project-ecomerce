import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Rating from '../components/Rating';

function SearchScreen(props) {
    const searchKeyword = props.match.params.key ? props.match.params.key : '';
    console.log('hhi' + searchKeyword)
    const productList = useSelector((state) => state.productList);
    const { products, loading, error } = productList;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listProducts('', searchKeyword, ''));

        return () => {
            //
        };
    }, []);
    //   const submitHandler = (e) => {
    //     e.preventDefault();
    //     dispatch(listProducts(category, searchKeyword, sortOrder));
    //   };
    //   const sortHandler = (e) => {
    //     setSortOrder(e.target.value);
    //     dispatch(listProducts(category, searchKeyword, sortOrder));
    //   };

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>{error}</div>
            ) : (
                        <div className="container" >
                            {searchKeyword && <h4 style={{paddingTop:'4%'}}>Kết quả tìm kiếm: {searchKeyword}</h4>}
                            <div className="row products">
                                {products.map((product, index) => (

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

                            </div>
                        </div>
                    )}
        </>
    );
}
export default SearchScreen;
