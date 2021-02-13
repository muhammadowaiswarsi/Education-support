import React, { useState } from 'react'
import './App.css';
import Axios from 'axios'
import { pdfjs, Document, Page } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function MyApp() {
  const [translatedData, setTranslatedData] = useState('');
  const [pageNumber, setPageNumber] = useState(12);
  const [file, setFile] = useState(null);


  const translateFunc = () => {
    const contentData = window?.getSelection()?.toString()
    if (contentData) {
      Axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=ur&dt=t&q=${contentData}`)
        .then(({ data }) => {
          setTranslatedData(data[0][0][0])
        })
        .catch((err) => {
          console.log('err', err)
        })
    } else {
      alert('Please highlight text to translate')
    }
  }

  return (
    <div>
      <input type='file' accept='.pdf' onChange={(e) => { setFile(e.target.files[0]) }} />
      <button onClick={translateFunc}>translate</button>
      <div>{translatedData}</div>
      <Document
        file={file}
      >
        <Page
          pageNumber={pageNumber}
        >
        </Page>
      </Document>
    </div>
  );
}

export default MyApp;
