import React, { useState,useEffect} from 'react';
import { Container, Row, Col, Form, InputGroup, Button,Dropdown, DropdownButton } from 'react-bootstrap';
import DatePicker from '../DatePicker';
import ApiRoutes from '../../Utils/ApiRoutes';
import api from '../../Services/ApiService'
import Events from '../Events';
import toast from 'react-hot-toast';
import useLogout from '../../Hooks/UseLogout';

export default function SearchBar() {

  const logout = useLogout();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedValue, setSelectedValue] = useState('Search Category');
  const [events, setEvents] = useState();

  const handleSelect = (eventkey)=>{
    setSelectedValue(eventkey)
  }
  const handleSearch = async ()=>{
    try {
      if(selectedValue === 'date' && selectedValue !== 'Search Category'){
        console.log(selectedValue)
        let response = await api.get(`${ApiRoutes.SearchEvents.path}?${selectedValue}=${selectedDate}`, {authenticate: ApiRoutes.SearchEvents.authenticate})
        console.log(response.data);
        setEvents(response.data)
      }else if(selectedValue !== 'Search Category' && selectedValue !== 'date'){
        console.log(selectedValue)
        let response = await api.get(`${ApiRoutes.SearchEvents.path}?${selectedValue}=${searchTerm}`, {authenticate: ApiRoutes.SearchEvents.authenticate})
        setEvents(response.data)
      }
    } catch (error) {
      toast.error(error.response.data.message) || "Error Occured! Please Try Again";
      if(error.response.status === 401)
        logout();
    }
  }
  return <>

    <Container className='d-flex justify-content-evenly align-items-center mt-3'>
      <Row >
      <Col md={4}>
          <Form className="d-flex">
            <InputGroup>
              <Dropdown id="dropdown-location-button" variant="secondary" className="mr-2 pt-3" onSelect={handleSelect}>
              <Dropdown.Toggle variant="dark" id="dropdown-basic">
                {selectedValue}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                
                <Dropdown.Item eventKey='title'>Title</Dropdown.Item>
                <Dropdown.Item eventKey='location'>Location</Dropdown.Item>
                <Dropdown.Item eventKey='date'>Date</Dropdown.Item>
                <Dropdown.Item eventKey='minPrice'>MinPrice</Dropdown.Item>
                <Dropdown.Item eventKey='maxPrice'>MaxPrice</Dropdown.Item>
              </Dropdown.Menu>
              </Dropdown>
            </InputGroup>
          </Form>
        </Col>
        <Col md={12}>
          <Form className="d-flex mt-4 mb-5">
            <InputGroup>
              <Form.Control type="text" placeholder="Search..." value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} className="mr-2" style={{ width: '100%' }}/>
            </InputGroup>
            <Button type="button" onClick={handleSearch}>Search</Button>
            <Col md={3}>
            <Form.Control selected={selectedDate} type="date" onChange={(e) => setSelectedDate(e.target.value)}/>
            </Col>
          </Form>
        </Col>
      </Row>
    </Container>
    <Events events={events}/>
    </>
}

