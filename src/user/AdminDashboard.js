import React, { useState, useRef, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/index';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    const { user } = isAuthenticated();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const firstInputRef = useRef(null);
    const addButtonRef = useRef(null);
    const modalRef = useRef(null);


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

                    <li className='list-group-item'>
                        <Link className='nav-link' to='/admin/products'>Manage products  </Link>
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

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        if (addButtonRef.current) {
            addButtonRef.current.focus();
        }
    };

    useEffect(() => {
        if (isModalOpen && firstInputRef.current) {
            firstInputRef.current.focus();
        }
    }, [isModalOpen]);

    useEffect(() => {
        const trapFocus = (e) => {
            if (e.key === 'Tab' && isModalOpen && modalRef.current) {
                const focusableElements = modalRef.current.querySelectorAll(
                    'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
                );
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                if (e.shiftKey) {
                    // Shift + Tab
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    // Tab
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        };

        document.addEventListener('keydown', trapFocus);
        return () => {
            document.removeEventListener('keydown', trapFocus);
        };
    }, [isModalOpen]);


    return (
        <Layout title="Dashboard" description={`Hello ${user.name}`} className="container-fluid">
            <div className="row">
                <div className="col-3">
                    {AdminLinks()}
                </div>
                <div className="col-9">
                    {AdminInfo()}
                    <button
                        type="button"
                        onClick={openModal}
                        ref={addButtonRef}
                        className="dialog_form_actions"
                    >
                        Add Product
                    </button>
                </div>
            </div>

            {isModalOpen && (
                <div id="dialog_layer" className="dialogs">
                    <div className="dialog-backdrop">
                        <div
                            role="dialog"
                            id="dialog1"
                            aria-labelledby="dialog1_label"
                            aria-modal="true"
                            ref={modalRef}
                        >
                            <h2 id="dialog1_label" className="dialog_label">Add a product</h2>
                            <div className="dialog_form">
                                <div className="dialog_form_item">
                                    <label>
                                        <span className="label_text">Name:</span>
                                        <input type="text" ref={firstInputRef} />
                                    </label>
                                </div>
                                <div className="dialog_form_item">
                                    <label>
                                        <span className="label_text">Category:</span>
                                        <input type="text" />
                                    </label>
                                </div>
                                <div className="dialog_form_item">
                                    <label>
                                        <span className="label_text">Description:</span>
                                        <input type="text" />
                                    </label>
                                </div>
                                <div className="dialog_form_item">
                                    <label>
                                        <span className="label_text">Price:</span>
                                        <input type="text" />
                                    </label>
                                </div>
                            </div>
                            <div className="dialog_form_actions">
                                <button type="button" onClick={closeModal} className="button-focused">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default AdminDashboard;
