import React, { Component } from 'react';
import '../../CSS/Loading.css';

class Loading extends Component {
    render() {
        return (
            <div className="Loading-wrapper">
                <div className="Loading-container">
                    <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                </div>            
            </div>
        );
    }
}

export default Loading;
