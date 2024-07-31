import React from "react";
import Menu from "./Menu";
import '../style.css';

//if props are not given then use default
const Layout = ({ title = "Title", description = "Description", className, children }) => (
    <div>
        <a href="#main" class="skip-to-main-content-link">Skip to main content</a>
        <Menu />

        <main id="main">
 
            <div className="jumbotron">
                <h2>{title}</h2>
                <p className="lead">{description}</p>
            </div>
            <div className={className}>{children}</div>

      
        </main>


    </div>
);

export default Layout;
