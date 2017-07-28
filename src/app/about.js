import React from 'react';
import {Link} from 'react-router';
import {Helmet} from "react-helmet";

class About extends React.Component{
    render(){
        return(
            <div id="wrapperOne">
                <Helmet>
                    <title>About</title>
                </Helmet>
                <ul className="navMenu">
                    <li><Link to={'/'}>Home</Link></li>
                    <li><Link to={'/about'}>About</Link></li>
                </ul>
                <h2>All About Me</h2>
            </div>
        );
    }
};

export default About;