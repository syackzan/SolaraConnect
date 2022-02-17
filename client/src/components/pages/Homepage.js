import React from 'react';
import { Link } from 'react-router-dom'

const Homepage = () => {
    return (
        <div>
            <h1 className="headerText d-flex justify-content-center m-5">Phantom Hub</h1>
            <div>
                <Link to="/testing" className="netLinks">Testing Net</Link>
                <Link to="/development" className="netLinks">Development Net</Link>
                <Link to="mainnet" className="netLinks">Main Net</Link>
            </div>
        </div>
    )
}

export default Homepage;