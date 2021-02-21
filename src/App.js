import React, { useState } from 'react'
import './App.css';
import Axios from 'axios'
import { Pagination, Button, Row, Col } from 'react-bootstrap'
import { pdfjs, Document, Page } from 'react-pdf';
import pdfBook from './duckett.pdf'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function MyApp() {
  const [translatedData, setTranslatedData] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
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

  const changePage = (pageChange) => {
    if (pageChange === 'next') {
      setPageNumber(pageNumber + 1)
    } else {
      setPageNumber(pageNumber - 2)
    }
  }

  return (
    <div>
      <Row>
        <Col md={6}>
          <label className='label_upload'>
            Upload Book Here
            <input className='upload_input' type='file' accept='.pdf' onChange={(e) => { setFile(e.target.files[0]) }} />
          </label>
        </Col>
        <Col md={6}>
          <Button variant="success" onClick={translateFunc}>translate</Button>
        </Col>
      </Row>

      <Row className='pdf_Row'>
        <Col md={6}>
          <Document
            file={file ? file : pdfBook}
          >
            <Page
              pageNumber={pageNumber}
            >
            </Page>
          </Document>
          {pdfBook && <Pagination>
            <Pagination.First onClick={() => changePage('previous')} />
            <Pagination.Last onClick={() => changePage('next')} />
          </Pagination>}
        </Col>
        <Col Col md={6}>
          <div>{translatedData}</div>
        </Col>
      </Row>

    </div>
  );
}

export default MyApp;
