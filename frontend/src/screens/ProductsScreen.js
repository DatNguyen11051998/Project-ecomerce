import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {
  saveProduct,
  listProducts,
  deleteProdcut,
} from '../actions/productActions';

function ProductsScreen(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;

  const productSave = useSelector((state) => state.productSave);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = productSave;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete;
  const dispatch = useDispatch();

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }
    dispatch(listProducts());
    return () => {
      //
    };
  }, [successSave, successDelete]);

  const openModal = (product) => {
    setModalVisible(true);
    setId(product._id);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
    setImage(product.image);
    setBrand(product.brand);
    setCategory(product.category);
    setCountInStock(product.countInStock);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveProduct({
        _id: id,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      })
    );
  };
  const deleteHandler = (product) => {
    dispatch(deleteProdcut(product._id));
  };
  const uploadFileHandler = (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setUploading(true);
    axios
      .post('/api/uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        setImage(response.data);
        setUploading(false);
      })
      .catch((err) => {
        console.log(err);
        setUploading(false);
      });
  };
  return (
    <div className="content content-margined">
      <div className="product-header">
        <h3>Products</h3>
        <button style={{ border: 'none', width: '10%' }} className="button btn-success" onClick={() => openModal({})}>
          Thêm mới
        </button>
      </div>

      {modalVisible && (
        <div className="form">
          <form onSubmit={submitHandler}>
            <ul className="form-container">
              <li>
                <h2>Create Product</h2>
              </li>
              <li>
                {loadingSave && <div>Loading...</div>}
                {errorSave && <div>{errorSave}</div>}
              </li>

              <li>
                <label htmlFor="name">Name</label>
                <input
                  className="pl-2"
                  type="text"
                  name="name"
                  value={name}
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="price">Price</label>
                <input
                  className="pl-2"
                  type="text"
                  name="price"
                  value={price}
                  id="price"
                  onChange={(e) => setPrice(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="image">Image</label>
                <input
                  className="pl-2"
                  type="text"
                  name="image"
                  value={image}
                  id="image"
                  onChange={(e) => setImage(e.target.value)}
                ></input>
                <input pl-2 type="file" onChange={uploadFileHandler}></input>
                {uploading && <div>Uploading...</div>}
              </li>
              <li>
                <label htmlFor="brand">Brand</label>
                <input
                  className="pl-2"
                  type="text"
                  name="brand"
                  value={brand}
                  id="brand"
                  onChange={(e) => setBrand(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="countInStock">CountInStock</label>
                <input
                  className="pl-2"
                  type="text"
                  name="countInStock"
                  value={countInStock}
                  id="countInStock"
                  onChange={(e) => setCountInStock(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="name">Category</label>
                <input
                  className="pl-2"
                  type="text"
                  name="category"
                  value={category}
                  id="category"
                  onChange={(e) => setCategory(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="description">Description</label>
                <textarea
                  className="pl-2"
                  name="description"
                  value={description}
                  id="description"
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </li>
              <li>
                <button type="submit" className="button btn-primary">
                  {id ? 'Update' : 'Create'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setModalVisible(false)}
                  className="button secondary"
                >
                  Back
                </button>
              </li>
            </ul>
          </form>
        </div>
      )}
      <div style={{ color: "red", display: 'flex', justifyContent: 'space-around', margin: '3%' }}>
        <div>Tổng số sách: {products.length}</div>
        <div>Sách bán chạy: </div>
        <div>Tổng số sách đã bán: </div>
      </div>
      <div className="product-hihi">Truyện tranh</div>
      <div className="product-list">
        <table className="table">
          <thead>
            <tr>
              <th>Tên</th>
              <th>Kho</th>
              <th>Đã bán</th>
              <th>Giá</th>
              <th>Thể loại</th>
              <th>Tác giả</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.filter(product => product.category === 'truyen-tranh').map((product) => (
              <tr key={product._id}>

                <td >{product.name}</td>
                <td>{product.countInStock}</td>
                <td>{product.sold}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <button className="button" onClick={() => openModal(product)}>
                    <i style={{ color: 'blue' }} class="fas fa-edit"></i>
                  </button>{' '}
                  <button
                    className="button"
                    onClick={() => deleteHandler(product)}
                  >
                    <i style={{ color: 'red' }} class="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="product-hihi">Sách quốc tế</div>
      <div className="product-list">
        <table className="table">
          <thead>
            <tr>
              <th>Tên</th>
              <th>Kho</th>
              <th>Đã bán</th>
              <th>Giá</th>
              <th>Thể loại</th>
              <th>Tác giả</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.filter(product => product.category === 'sach-quoc-te').map((product) => (
              <tr key={product._id}>

                <td >{product.name}</td>
                <td>{product.countInStock}</td>
                <td>{product.sold}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <button className="button" onClick={() => openModal(product)}>
                    <i style={{ color: 'blue' }} class="fas fa-edit"></i>
                  </button>{' '}
                  <button
                    className="button"
                    onClick={() => deleteHandler(product)}
                  >
                    <i style={{ color: 'red' }} class="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="product-hihi">Sách văn học</div>
      <div className="product-list">
        <table className="table">
          <thead>
            <tr>
              <th>Tên</th>
              <th>Kho</th>
              <th>Đã bán</th>
              <th>Giá</th>
              <th>Thể loại</th>
              <th>Tác giả</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.filter(product => product.category === 'sach-van-hoc').map((product) => (
              <tr key={product._id}>

                <td >{product.name}</td>
                <td>{product.countInStock}</td>
                <td>{product.sold}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <button className="button" onClick={() => openModal(product)}>
                    <i style={{ color: 'blue' }} class="fas fa-edit"></i>
                  </button>{' '}
                  <button
                    className="button"
                    onClick={() => deleteHandler(product)}
                  >
                    <i style={{ color: 'red' }} class="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="product-hihi">Sách kĩ năng sống</div>
      <div className="product-list">
        <table className="table">
          <thead>
            <tr>
              <th>Tên</th>
              <th>Kho</th>
              <th>Đã bán</th>
              <th>Giá</th>
              <th>Thể loại</th>
              <th>Tác giả</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.filter(product => product.category === 'ki-nang-song').map((product) => (
              <tr key={product._id}>

                <td >{product.name}</td>
                <td>{product.countInStock}</td>
                <td>{product.sold}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <button className="button" onClick={() => openModal(product)}>
                    <i style={{ color: 'blue' }} class="fas fa-edit"></i>
                  </button>{' '}
                  <button
                    className="button"
                    onClick={() => deleteHandler(product)}
                  >
                    <i style={{ color: 'red' }} class="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default ProductsScreen;
