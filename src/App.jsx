/* eslint-disable no-template-curly-in-string */

import React from "react";
import "./App.css";
import { InputGroup, Input, FormGroup, Label, Spinner } from "reactstrap";
import { Button } from "reactstrap";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import { axios } from 'axios';
import BookCard from './components/BookCard.jsx'


function App() {
  //states

  const [maxResults, setMaxResults] = useState(10);
  const [startIndex, setStartIndex] = useState(1);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState([]);

  //handle search
  const handleSubmit = () => {
    setLoading(true);
    if (maxResults > 40 || maxResults < 1) {
      toast.error('max results must be between 1 and 40')
    } else {
      axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults${maxResults}&startIndex=${startIndex}`
      ).then(res => {
        if (startIndex >= res.data.totalItems || startIndex < 1) {
          toast.error('max results must be between 1 and ${res.data.totalItems}');

        } else {
          if (res.data.items.lenght > 0) {
            setCards(res.data.items)
            setLoading(false)
          }
        }

      }).catch(err => {
        setLoading(true)
        toast.error('${err.response.data.error.message}')
      });
    }
  };


  const mainHeader = () => {
    return (
      <div className="mainImage d-flex justify-content-center align-items-center flex-column">
        <div className="filter"></div>
        <h1 className="d-flex justify-content-center text-light" style={{ zIndex: 2 }}>
          Google Books
        </h1>

        <div style={{ width: "70%", zIndex: 2 }}>

          <InputGroup size="lg" className="mb-3">

            <Input placeholder="Book Search" className="input"
              value={query}
              onChange={e =>
                setQuery(e.target.value)} />
            < Button color="secondary" onClick={handleSubmit}>
              <i className="fas fa-search"  ></i>
            </Button>


          </InputGroup>

          <div className="d-flex text-white justify-content-center">

            <FormGroup className="ml-5">
              <Label for="maxsults"> Max Result     </Label>
              <Input type="number"
                id="maxResult"
                placeholder="Max Result"
                className="input" value={maxResults}
                onChange={e => setMaxResults(e.target.value)} />

            </FormGroup>

            <FormGroup className="ml-5">
              <Label for="startIndex">  Start Index      </Label>
              <Input type="number"
                id="startIndex"
                placeholder="start index"
                className="input"
                value={startIndex}
                onChange={e =>
                  setStartIndex(e.target.value)} />
            </FormGroup>
          </div>


        </div>
      </div>
    );
  };

  const handleCards = () => {
    console.log(cards)
    const items = cards.map((item, i) => {
      let thumbnail = '';
      if (item.volumeInfo.imageLinks.thumnail) {
        thumbnail = item.volumeInfo.imageLinks.thumbnail;
      }
      return (
        <div className="col-lg-4 mb-3" key={item.id}>
          <BookCard thumbnail={thumbnail}  
          title={item.volumeInfo.title}
          pageCount={item.volumeInfo.language}
          language={item.volumeInfo.language}
          authors={item.volumeInfo.authors}
          publisher={item.volumeInfo.publisher}

          description={item.volumeInfo.description}
          previewLink={item.volumeInfo.previewLink}
          infoLink={item.volumeInfo.infoLink}
          
          
          />
        </div>
      )
    })
    if (loading) {
      return (
        <div className="d-flex justify-content-center mt-3">
          <Spinner style={{ width: '3rem', height: '3rem' }} />
        </div>
      );
    } else {
      return (
        <div className="container my-5">
          <div className="row">{items}</div>
        </div>
      )
    }
  }

  return (

    <div className="w-100 h-100">
      {mainHeader()}
      {handleCards()}
      <ToastContainer />
    </div>
  );

}

export default App;
