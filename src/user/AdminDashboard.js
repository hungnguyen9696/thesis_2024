import React from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/index';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    const { user } = isAuthenticated();

    const AdminLinks = () => {
        return (
            <div className='card'>
                <h4 className="card-header">Admin Links</h4>
                <ul className='list-group'>
                    <li className='list-group-item'>
                        <Link className='nav-link' to='/create/category'>Create Category </Link>
                    </li>
                    <li className='list-group-item'>
                        <Link className='nav-link' to='/create/product'>Create Product </Link>
                    </li>

                    <li className='list-group-item'>
                        <Link className='nav-link' to='/admin/orders'>View orders  </Link>
                    </li>

                </ul>
            </div>
        )
    }

    const AdminInfo = () => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">Admin information </h3>
                <ul className='list-group'>
                    <li className='list-group-item'>{user.name}</li>
                    <li className='list-group-item'>{user.email}</li>
                    <li className='list-group-item'>{user.role === 1 ? 'admin' : 'registered user'}</li>
                </ul>
            </div>
        )
    }

    return (
        <Layout title="Dashboard" description={`Hello ${user.name}`} className='container-fluid' >
            <div className="row">
                <div className="col-3">
                    {AdminLinks()}
                </div>
                <div className="col-9">
                    {AdminInfo()}

                </div>
            </div>
        </Layout>
    )
};

export default AdminDashboard;