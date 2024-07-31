import React, { Fragment, useState, useRef, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth/index';
import { itemTotal } from './cartHelpers';
//access props history

const isActive = (history, path) => {
    //current url
    if (history.location.pathname === path) {
        return { color: "#ff9900" };
    } else {
        return { color: "#ffffff" };
    }
};

const Menu = (props) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const closeDropdown = () => {
        setDropdownOpen(false);
    };

    return (
    <div>
        <ul className="nav nav-tabs bg-primary">
            <li className="nav-item">
                <Link className="nav-link" style={isActive(props.history, '/')} to="/">Home</Link>
            </li>

            <li className="nav-item">
                <Link className="nav-link" style={isActive(props.history, '/shop')} to="/shop">Shop</Link>
            </li>

            <li className="nav-item">
                <Link className="nav-link" style={isActive(props.history, '/cart')} to="/cart">
                    Cart
                    <sup>
                        <small className='cart-badge'>{itemTotal()}</small>
                    </sup>
                </Link>
            </li>

            {isAuthenticated() && isAuthenticated().user.role === 0 ?
                (<li className="nav-item">
                    <Link className="nav-link" style={isActive(props.history, '/user/dashboard')} to="/user/dashboard">Dashboard</Link>
                </li>) :
                (<li className="nav-item">
                    <Link className="nav-link" style={isActive(props.history, '/admin/dashboard')} to="/admin/dashboard">Dashboard</Link>
                </li>)
            }

            {/* Hover Dropdown Menu for Customer Service */}
            {/* <li 
                    role="navigation"
                    className="nav-item dropdown"
                    onMouseEnter={toggleDropdown}
                    onMouseLeave={closeDropdown}
                    onBlur={closeDropdown}
                    ref={dropdownRef}
            >

                    <button
                        type="button" id="references-button" aria-controls="references-menu"

                        //className="nav-link dropdown-toggle"
                        className={`nav-link dropdown-toggle ${dropdownOpen ? 'show' : ''}`}
                        style={{ cursor: 'pointer', color: '#ffffff' }}
                        aria-haspopup="true"
                        aria-expanded={dropdownOpen}
                        data-toggle="dropdown"
                        onClick={toggleDropdown}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                toggleDropdown();
                            }
                        }}
                    >
                        Customer Service
                    </button>


                    <ul 
                        id="references-menu" 
                        aria-labelledby="references-button" 
                        className={`submenu dropdown-menu ${dropdownOpen ? 'show' : ''}`}

                    >
                        <li><Link className="dropdown-item" to="/help">Help</Link></li>
                        <li><Link className="dropdown-item" to="/order-tracking">Order tracking</Link></li>
                        <li><Link className="dropdown-item" to="/shipping-delivery">Shipping & Delivery</Link></li>
                        <li><Link className="dropdown-item" to="/returns">Returns</Link></li>
                        <li><Link className="dropdown-item" to="/contact-us">Contact us</Link></li>
                        <li><Link className="dropdown-item" to="/find-a-store">Find a store</Link></li>
                    </ul>
            </li> */}



            <li className="nav-item top-level-entry-container">
                    <button
                        type="button"
                        id="references-button"
                        className="top-level-entry menu-toggle"
                        aria-controls="references-menu"
                        aria-expanded={dropdownOpen}
                        onClick={toggleDropdown}

                    >
                        Customer Services
                    </button>
                    
                    <ul
                        id="references-menu"
                        className={`submenu references ${dropdownOpen ? 'show' : 'hidden'}`}
                        aria-labelledby="references-button"
                        onMouseEnter={toggleDropdown}
                        onMouseLeave={closeDropdown}
                    >
                        <li className="apis-link-container mobile-only">
                            <Link className="submenu-item" to="/help">

                                <div className="submenu-content-container">
                                    <div className="submenu-item-heading">Shipping & Delivery</div>
                                    
                                </div>
                            </Link>
                        </li>
                        <li className="html-link-container">
                            <Link className="submenu-item" to="/order-tracking">

                                <div className="submenu-content-container">
                                    <div className="submenu-item-heading">Returns</div>
                                    
                                </div>
                            </Link>
                        </li>
                        <li className="css-link-container">
                            <Link className="submenu-item" to="/shipping-delivery">
   
                                <div className="submenu-content-container">
                                    <div className="submenu-item-heading">Contact us</div>
                                    
                                </div>
                            </Link>
                        </li>
                        <li className="javascript-link-container">
                            <Link className="submenu-item" to="/returns">

                                <div className="submenu-content-container">
                                    <div className="submenu-item-heading">Find a store</div>
                                    
                                </div>
                            </Link>
                        </li>
                    </ul>
                </li>


            {/* <a href="" className="top-level-entry">Customer Services</a> */}

            {!isAuthenticated() && (
                <Fragment>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(props.history, '/signin')} to="/signin">Signin</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(props.history, '/signup')} to="/signup">Signup</Link>
                    </li>
                </Fragment>
            )}

            {/* {isAuthenticated() && (
                <li className="nav-item">
                    <span
                        className="nav-link"
                        style={{ cursor: 'pointer', color: '#ffffff' }}
                        onClick={() => signout(() => {
                            props.history.push("/");
                        })
                        }>
                        Signout
                    </span>
                </li>
            )} */}

            
            {isAuthenticated() && (
                <li className="nav-item">
                    <Link
                        className="nav-link"
                        style={{ cursor: 'pointer', color: '#ffffff' }}
                        to="/"
                        onClick={() => signout(() => {
                            props.history.push("/");
                        })}
                    >
                        Signout
                    </Link>
                </li>
            )}
        </ul>
    </div>
);
};

export default withRouter(Menu);
