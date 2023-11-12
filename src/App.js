import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { uploadFile } from './service/api';
import QRCode from 'react-qr-code';

function App() {
  const [file, setFile] = useState('');
  const [result, setResult] = useState('');

  const fileInputRef = useRef(null);

  const urll = 'https://i.pinimg.com/originals/16/46/24/1646243661201a0892cc4b1a64fcbacf.jpg';

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        const response = await uploadFile(data);
        setResult(response.path);
      }
    }
    getImage();
  }, [file]);

  const onUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  return (
    <div className='container'>
      <img src={urll} alt='background' className='img' />
      <div className='wrapper'>
        <h1>Simple file sharing!</h1>
        <p>Upload and share the download link.</p>
        
        <button onClick={onUploadClick} style={{ cursor:'pointer'}}>Upload</button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />

        <a href={result}>{result}</a>
        {result && <QRCode value={result} size={256} style={{ margin: '10px' }} />}
      </div>
    </div>
  );
}

export default App;
