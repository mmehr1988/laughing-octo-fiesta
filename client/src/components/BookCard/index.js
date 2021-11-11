import React, { useState, useEffect } from 'react';
import BookModel from '../BookModel';
import { saveBookIds, getSavedBookIds } from '../../utils/localStorage';
import { useMutation } from '@apollo/client';
import { SAVE_BOOK } from '../../utils/mutations';
import Auth from '../../utils/auth';

const BookCard = (props) => {
  ////////////////////////////////////////////////////////////
  // TO GET THE LOGGED IN USER DATA
  ////////////////////////////////////////////////////////////

  // TO SET THE MODEL STATES
  const [model, setModel] = useState(false);
  const [modeldata, setModelData] = useState([]);

  // create state to hold saved bookId values
  const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());
  // To check how books are in the array on click
  // console.log('You Have These Books Saved', savedBookIds);
  const [saveBook, { error }] = useMutation(SAVE_BOOK);

  const getData = (img, title, desc) => {
    let tempData = [img, title, desc];

    setModelData((item) => [1, ...tempData]);
    return setModel(true);
  };

  //////////////////////////////////////////////
  // USE EFFECT TO SAVE "savedBookIds" LIST TO LOCALSTORAGE
  //////////////////////////////////////////////
  useEffect(() => {
    return () => saveBookIds(savedBookIds);
  });

  //////////////////////////////////////////////
  // FUNCTION TO HANDLE DUPLICATE SUBMISSIONS
  //////////////////////////////////////////////
  const handleDuplicateSaves = async (bookId) => {
    return savedBookIds?.some((savedBookId) => savedBookId === bookId) ? true : false;
  };

  //////////////////////////////////////////////
  // FUNCTION TO HANDLE SAVING BOOKS
  //////////////////////////////////////////////

  const handleSaveBook = async (bookId) => {
    // [1] AWAIT FIND THE BOOK BEING PASSED BY THE PROPS
    const bookToSave = await props.booksData.find((book) => book.bookId === bookId);

    // [2] CHECK IF THE USER HAS A VALID JWT TOKEN
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    // [3] AWAIT - CHECK IF BOOK IS ALREADY SAVED
    const checkSavedBooks = await handleDuplicateSaves(bookId);

    try {
      if (!checkSavedBooks) {
        await saveBook({
          variables: { input: bookToSave },
        });
        // if book successfully saves to user's account, save book id to state
        setSavedBookIds([...savedBookIds, bookToSave.bookId]);
        // On Success, Alert User
        alert('Book Successfully Saved');
      } else {
        // On Duplicate, Alert User
        alert('Book Is Already Saved');
      }
    } catch (err) {
      console.error(err);
    }
  };

  //////////////////////////////////////////////
  // CSS STYLING
  //////////////////////////////////////////////

  let bookCardImage = {
    width: '100%',
    height: '30vw',
    objectFit: 'cover',
    cursor: 'pointer',
  };

  let linkBtn = {
    backgroundColor: '#222831',
    color: '#fff',
  };

  let saveBtn = {
    backgroundColor: '#1E5128',
    color: '#fff',
  };

  //////////////////////////////////////////////
  // HTML UI OUTPUT
  //////////////////////////////////////////////

  return (
    <>
      <div className='py-4 py-lg-5 container-fluid'>
        <div className='row justify-content-center align-item-center'>
          {props.booksData.map((item, index) => {
            return (
              <div className='col-lg-3 col-md-3 col-sm-3 col-6 mb-5 pt-2 text-center' key={index}>
                <div className='card overflow-hidden h-100 shadow'>
                  <img src={item.image} className='card-img-top img-thumbnail' style={bookCardImage} alt='Cover Of Searched Book' onClick={() => getData(item.image, item.title, item.description)} />
                  <div className='card-body p-0' style={{ lineHeight: '20px' }}>
                    <ul className='list-group list-group-flush border-none '>
                      <li className='list-group-item fw-bold border-0'>{item.title}</li>
                      <li className='list-group-item fw-light border-0 pt-0'>{item.authors}</li>
                    </ul>
                  </div>
                </div>
                <div className='d-flex flex-row justify-content-center gap-1'>
                  {/* ON CLICK = OPEN GOOGLE BOOK LINK */}
                  <button className='btn mt-2' style={linkBtn} onClick={() => window.open(item.link, '_blank')}>
                    Link
                  </button>

                  {/* IF USER IS LOGGED IN SHOW BUTTON */}
                  {Auth.loggedIn() ? (
                    <button className='btn mt-2' style={saveBtn} onClick={() => handleSaveBook(item.bookId)}>
                      Save
                    </button>
                  ) : (
                    ''
                  )}
                </div>
                {error && <div className='col-12 my-3 bg-danger text-white p-3'>{error.message}</div>}
              </div>
            );
          })}
        </div>
      </div>
      {model === true ? <BookModel img={modeldata[1]} title={modeldata[2]} desc={modeldata[3]} hide={() => setModel(false)} /> : ''}
    </>
  );
};

export default BookCard;
