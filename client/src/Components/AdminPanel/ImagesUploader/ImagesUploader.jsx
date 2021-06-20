import React, { useState } from "react";
import axios from 'axios';
import './ImagesUploader.scss'

function ImageUploader ({ json, setJson }){
    
    const [progress, setProgress] = useState(0);

    const handleUploadImage = async (files) => {
        let arrAux = [];
        for(let i = 0; i < (3 - json.images.length); i++) {
            const formData = new FormData();
            formData.append('file', files[i]);
            formData.append('upload_preset', 'dhalbnfi');
            const res = await axios.post('https://api.cloudinary.com/v1_1/daau4qgbu/image/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress(e) {
                    setProgress((e.loaded * 100) / e.total);
                }
            });
            arrAux.push(res.data.url);
            setProgress(0);
        }
        setJson({
            ...json,
            images: [...json.images, ...arrAux]
        });
    };

    const handleOnClose = (url) => {
        setJson({
            ...json,
            images: json.images.filter(src => src !== url)
        });
    }

    return(
        <div className='img-uploader-container'>
            <div className='card-previewer'>
                {json.images.map((url, i) => {
                    return <div className='img-view-container' key={i}>
                        <img src={url} alt='' className='img-view'/>
                        <button className='onclose-btn' value={url} onClick={e => handleOnClose(e.target.value)}>X</button>
                    </div>
                })}
                <label className='card-footer' for='input-file'>
                    <input 
                        type='file' 
                        className='img-uploader' 
                        onInput={e => handleUploadImage(e.target.files)}
                        disabled={json.images.length < 3 ? false : true}
                        multiple
                        accept="image/png, image/jpeg"
                        id='input-file'
                    />
                    Subir archivos  
                    <progress 
                        value={progress} 
                        max='100' 
                        className='progress-bar'
                    />
                </label>
            </div>
        </div>
    );
}

export default ImageUploader;