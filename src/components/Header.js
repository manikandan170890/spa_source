import React from 'react';
import './Header.css';

const Header = (props) => {
    return(
        <div className="jumbotron">
              <p className="text-muted ">Balance</p>
             <h1 className="display-4 heading-h1">{props.index_head.total} CZK</h1>
            <p className="lead text-success p-2 d-inline heading-h1">Income: {props.index_head.incoming} kc</p>
            <p className="lead text-danger p-2  d-inline heading-h1">Spendings: {props.index_head.spending} kc</p>
            </div> 
    )
}


export default Header;