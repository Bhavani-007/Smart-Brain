import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imageURL, box}) => {
    const Regions = ({box}) => (    
    <>
    {
        box.map((region, i) => 
        <div className = 'bounding-box' key = {i} style = {{top: region.topRow, right: region.rightCol, bottom: region.bottomRow, left: region.leftCol}}></div>
    )
    }
    </>); 
        
    
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id = 'inputimage' src = {imageURL} alt = '' width = '500px' height = 'auto'></img>
                <div>
                    <Regions box = {box}/>
                </div> 
            </div>
        </div>
    ); 
    
}

export default FaceRecognition;