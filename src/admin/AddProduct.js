import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/index';
import { Link } from 'react-router-dom';
import { createProduct, getCategories } from './apiAdmin';

const AddProduct = () => {
    const { user, token } = isAuthenticated();
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        shipping: '',
        quantity: '',
        photo: '',
        loading: false,
        error: '',
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    });

    const {
        name,
        description,
        price,
        categories,
        category,
        shipping,
        quantity,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values;

    //load categories and set formdata
    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    categories: data,
                    formData: new FormData()
                });
            }
        });
    };

    useEffect(() => {
        init();
    }, [])
    //empty array doesnt change -> useEffect not re-run every render

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        //console.log(event.target.files)
        formData.set(name, value);
        setValues({ ...values, [name]: value });

    };

    // const newProduct = {
    //     name: name,
    //     price: price,
    //     description: description
    //     ....
    // };

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: '', loading: true });
        createProduct(user._id, token, formData)
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error })
                } else {
                    setValues({
                        ...values,
                        name: '',
                        description: '',
                        photo: '',
                        price: '',
                        quantity: '',
                        loading: false,
                        createdProduct: data.name,
                        formData: ''
                    });
                }
            })
    };

    const newPostForm = () => {
        //accept anything start with image
        return (
            <form className="mb-3" onSubmit={clickSubmit}>
                <h4>Post Photo</h4>
                <div className="form-group">
                    <label className="btn btn-secondary">
                        <input
                            onChange={handleChange('photo')}
                            type="file"
                            name='photo'
                            accept='image/*'
                        />
                    </label>
                </div>

                <div className="form-group">
                    <label className="text-muted">Name</label>
                    <input
                        onChange={handleChange('name')}
                        type="text"
                        className="form-control"
                        value={name}
                    />
                </div>

                <div className="form-group">
                    <label className="text-muted">Description</label>
                    <textarea
                        onChange={handleChange('description')}

                        className="form-control"
                        value={description}
                    />
                </div>

                <div className="form-group">
                    <label className="text-muted">Price</label>
                    <input
                        onChange={handleChange('price')}
                        type="number"
                        className="form-control"
                        value={price}
                    />
                </div>

                <div className="form-group">
                    <label for='category' className="text-muted">Category</label>
                    <select
                        id='category'
                        onChange={handleChange('category')}
                        className="form-control">
                        <option>Please select</option>
                        {categories && categories.map((cate, index) => (
                            <option key={index} value={cate._id}>{cate.name}</option>
                        ))}

                    </select>
                </div>

                <div className="form-group">
                    <label for='shipping' className="text-muted">Shipping</label>
                    <select
                        id='shipping'
                        onChange={handleChange('shipping')}
                        className="form-control">
                        <option>Please select</option>
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="text-muted">Quantity</label>
                    <input
                        onChange={handleChange('quantity')}
                        type="number"
                        className="form-control"
                        value={quantity}
                    />
                </div>

                <button className="btn btn-outline-primary">Create Product</button>
            </form>
        )
    }

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>{error}</div>
    )

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: createdProduct ? '' : 'none' }}>
            {createdProduct} is created
        </div>
    )

    const showLoading = () => (
        <div className="alert alert-success" style={{ display: loading ? '' : 'none' }}>
            <h2>Loading...</h2>
        </div>
    )

    return (
        <Layout title="Add a new product" description={`Hello ${user.name}`}  >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showLoading()}
                    {showError()}
                    {showSuccess()}
                    {newPostForm()}
                </div>
            </div>
        </Layout>
    )
}

export default AddProduct;