import React from 'react';
import { Route } from 'react-router-dom';
import Homepage from './Homepage';
import Testing from './Testing';
import Development from './Development';
import Mainnet from './Mainnet';


const Phantom = () => {

    return (
        <div className="center">
            <Route exact path='/'>
                <Homepage />
            </Route>
            <Route exact path='/testing'>
                <Testing />
            </Route>
            <Route exact path='/development'>
                <Development />
            </Route>
            <Route exact path='/mainnet'>
                <Mainnet />
            </Route>
        </div>
    )
}

export default Phantom;