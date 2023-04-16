import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
    return (
        <div>
            <p className = 'f3'>Add an image link inside this box.</p>
            <div className = 'form'>
                <div className = 'boxSize pa4 br3 shadow-5'>
                    <input type = 'text' className = 'f4 pa2 w-70' onChange={onInputChange}/>
                    <button className = ' w-30 grow f4 link ph3 pv2 dib white bg-light-purple purpleborder' onClick={onButtonSubmit}>Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm; 

