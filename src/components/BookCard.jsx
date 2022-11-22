


import React from 'react';
import { Card, CardTitle, CardImg, CardBody, Button, Modal } from 'reactstrap'
import { useState } from 'react'





const BookCard = ({
    thumbnail,
    title,
    pageCount,
    language,
    description,
    authors,
    publisher,
    previewLink,
    infoLink






}) => {


    //state

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);


    return (
        <div>


            <Card style={{ width: '233px' }} className='m-auto  ' >

                <CardImg top style={{ width: '100%', height: '233px' }} src={thumbnail} alt={title} />


            </Card>;

            <CardBody>
                <CardTitle className='card-title'>{title}    </CardTitle>
                <Button onClick={toggle}>More Info</Button>
            </CardBody>

            <Modal isOpen={modal} toggle={toggle}>
                <div className="modal-header d-flex justify-content-center">
                    <h5 className='modal-title text-center' id='exampleModalLabel'>{title}</h5>

                    <button aria-label='close' className='close' type='button' onClick={toggle}></button>
                    <span aria-hidden={true}>X</span>

                    <div className='modal-body'>
                        <div className="d-flex justify-content-between mt-3">
                            <img src={thumbnail} alt={title} style={{ height: '233px' }} />
                        </div>

                        <div>
                            <p>Page Count: {pageCount}</p>
                            <p>Language: {language}</p>
                            <p>Authors: {authors}</p>
                            <p>Publisher: {publisher}</p>
                        </div>

                    </div>

                    <div className='mt-3'>{description}</div>

                </div>
                <div className="modal-footer">
                    <div className="left-side">
                        <a href={previewLink}   
                        className="btn-link" 
                        color='default' 
                        type='button' 
                        target='_blank'
                        ref='noreferre' rel="noreferrer"   >Preview Link</a>
                    </div>

                    <div className="divider">
                    <div className="right-side">
                        <a href={infoLink}   
                        className="btn-link" 
                        color='default' 
                        type='button' 
                        target='_blank'
                        ref='noreferre' rel="noreferrer"   >Info Link</a>
                    </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default BookCard;
