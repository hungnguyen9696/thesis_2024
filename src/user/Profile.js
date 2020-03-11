import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/index';
import { Link, Redirect } from 'react-router-dom';
import { readUserInfo, updateUserInfo, updateUser } from './apiUser';

const Profile = (props) => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: false,
        success: false
    });

    const { name, email, password, error, success } = values;
    const { user, token } = isAuthenticated();
    const userId = props.match.params.userId;

    const init = (userId) => {
        readUserInfo(userId, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: true })
            } else {
                setValues({ ...values, name: data.name, email: data.email })
            }
        })
    }

    useEffect(() => {

        init(userId);
    }, [])

    const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value, error: false })
    }

    const clickSubmit = (event) => {
        event.preventDefault();
        updateUserInfo(userId, token, { name, email, password }).then(data => {
            if (data.error) {
                // console.log(data.error);
                alert(data.error);
            } else {
                updateUser(data, () => {
                    setValues({
                        ...values,
                        name: data.name,
                        email: data.email,
                        success: true
                    });
                });
            }
        });
    };

    const redirectUser = (success) => {
        if (success) {
            return <Redirect to="/cart" />;
        }
    };

    const profileUpdate = (name, email, password) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" onChange={handleChange('name')} className="form-control" value={name} />
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input type="email" onChange={handleChange('email')} className="form-control" value={email} />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input type="password" onChange={handleChange('password')} className="form-control" value={password} />
            </div>

            <button onClick={clickSubmit} className="btn btn-primary">
                Submit
            </button>
        </form>
    );



    return (
        <Layout title="Profile " description="Update your profile" className='container-fluid' >

            <h2 className='mb-4'>Profile update </h2>
            {profileUpdate(name, email, password)}
            {redirectUser(success)}
        </Layout>
    )
};

export default Profile;