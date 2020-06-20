import React from 'react';
import '../CSS/Loading.css';

function Loading(){
    return (
        <div className="Loading-wrapper">
            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>          
        </div>
    );
}

export default Loading;
