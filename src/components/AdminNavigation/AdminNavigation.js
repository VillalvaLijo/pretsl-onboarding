import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
// import './Nav.css';

const AdminNavigation = (props) => (
  <div className="nav">
    <Link to="/home"><h2 className="nav-title">Admin Nav Bar</h2>
    </Link>
    <div className="nav-right">
      <Link className="nav-link" to="/home">
        {/* Show this link if they are logged in or not,
        but call this link 'Home' if they are logged in,
        and call this link 'Login / Register' if they are not */}
        {props.user.id ? 'Home' : 'Login / Register'}
      </Link>
      {/* Show the link to the info page and the logout button if the user is logged in */}
      {props.user.id && (
        <>
          <Link className="nav-link" to="/info">Info Page</Link>
          <LogOutButton className="nav-link"/>
        </>
      )}
      {/* Always show this link since the about page is not protected */}
      
      <Link className="nav-link" to="/AdminDashboard">Dashboard</Link>
      <Link className="nav-link" to="/Onboarding">Onboarding</Link>
      <Link className="nav-link" to="/AdminSupport">Support</Link>
      <Link className="nav-link" to="/about">About</Link>
    </div>
  </div>
);

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(AdminNavigation);