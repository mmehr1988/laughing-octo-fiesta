import React from 'react';

import { Card, InputGroup, FormControl, Button } from 'react-bootstrap';

const SearchBar = (props) => {
  let searchBtnStyle = {
    backgroundColor: '#FFA0A0',
    borderColor: '#FFA0A0',
    color: '#000',
  };

  return (
    <Card className='bg-dark text-white rounded text-center m-2'>
      <Card.Img src='https://source.unsplash.com/vyAm0--3U2c/970x250' alt='Image of nightsky stars ' />
      <Card.ImgOverlay className='container'>
        <InputGroup className='position-absolute top-50 start-50 translate-middle gap-2 '>
          <FormControl onChange={props.handleSearchField} className='rounded' placeholder='Search Books' aria-label='Search Books' aria-describedby='basic-addon2' />
          {/* BTN SEARCH */}
          <Button className='rounded btn-light' style={searchBtnStyle} onClick={props.handleSearchSubmit}>
            Search
          </Button>
        </InputGroup>
      </Card.ImgOverlay>
    </Card>
  );
};

export default SearchBar;
