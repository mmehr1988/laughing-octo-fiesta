import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';
import BookModel from '../components/BookModel';

const SavedBooks = () => {
  const { loading, data } = useQuery(GET_ME);
  const userData = data?.me || [];

  // console.log(userData.savedBooks);

  // TO SET THE MODEL STATES
  const [model, setModel] = useState(false);
  const [modeldata, setModelData] = useState([]);

  const [removeBook, { error }] = useMutation(REMOVE_BOOK);

  // DATA USED TO GENERATE EACH MODEL
  const getData = (img, title, desc) => {
    let tempData = [img, title, desc];

    setModelData((item) => [1, ...tempData]);
    return setModel(true);
  };

  //////////////////////////////////////////////////////////////////
  // HANDLE DELETE BOOK
  //////////////////////////////////////////////////////////////////
  const handleDeleteBook = async (bookId) => {
    // [1] Check whether user is logged in by checking to see if there is a JWT token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    // [2] If there is not valid token, then exit the process
    if (!token) {
      return false;
    }

    try {
      // [3] IF TOKEN IS VALID, REMOVE THE BOOK FROM THE SAVED USER LIST [MONGODB] USING THE REMOVE_BOOK MUTATION
      await removeBook({
        variables: { bookId },
      });

      //  ONCE THE REMOVE_BOOK MUTATION PROCESS IS DONE, REMOVE THE BOOK FROM LOCAL STORAGE
      removeBookId(bookId);
      // RELOAD WINDOW TO REFRESH THE PAGE
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };
  //////////////////////////////////////////////////////////////////
  // CSS STYLING FOR BOOK CARDS
  //////////////////////////////////////////////////////////////////

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

  let deleteBtn = {
    backgroundColor: '#FF0000',
    color: '#fff',
  };

  //////////////////////////////////////////////////////////////////
  // A SIMPLE IF STATEMENT TO WAIT UNTIL THE QUERY GET_ME
  // IS FINISHED SO THE SCREEN DOESNT ERROR OUT
  //////////////////////////////////////////////////////////////////
  if (loading) {
    return <div></div>;
  }

  return (
    <>
      <div className='py-4 py-lg-5 container-fluid'>
        <div className='row justify-content-center align-item-center'>
          {userData.savedBooks.map((item, index) => {
            // console.log(item);
            return (
              <div className='col-lg-3 col-md-3 col-sm-3 col-6 mb-5 pt-2 text-center' key={index}>
                <div className='card overflow-hidden h-100 shadow'>
                  <img src={item.image} className='card-img-top img-thumbnail' style={bookCardImage} alt='Cover Of Saved Book' onClick={() => getData(item.image, item.title, item.description)} />
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
                  {/* ON CLICK = DELETE BOOK */}
                  <button className='btn mt-2' style={deleteBtn} onClick={() => handleDeleteBook(item.bookId)}>
                    Delete
                  </button>
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

export default SavedBooks;
