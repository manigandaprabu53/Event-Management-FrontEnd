import React, { useState , useEffect} from 'react';
import { Container, Row, Col, Image,Dropdown, DropdownButton,Card,Button, } from 'react-bootstrap';
import TopBar from './TopBar';
import ApiRoutes from '../Utils/ApiRoutes';
import api from '../Services/ApiService';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import '../Components/Styles/ViewMore.css';
import Payment from './Payment';

export default function ViewMore() {

  let navigate = useNavigate();

  const { id } = useParams();
  const dataID = String(id); // Convert to string once
  console.log(dataID)
  let [data, setData] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null); 

  const fetchDetails = async()=>{
    try {
      let response = await api.get(`${ApiRoutes.GetEventById.path}/${String(dataID)}`, {authenticate: ApiRoutes.GetEventById.authenticate});
      console.log(response)
      let arrData = []
      arrData.push(response.data)
      if(response){
        setData(arrData)
        toast.success(response.message)
        console.log(response);
        
      }
      else{
        setData([])
      }
    } catch (error) {
      toast.error(error.response.data.message) || "Error Occured! Please Try Again"
    }
  }

  useEffect(() => {fetchDetails()}, [])

  const handleTicketSelection = (eventKey) => {
    const selectedPricing = data[0]?.ticketPricing?.find((pricing) => pricing.type === eventKey); // Find the selected ticket pricing object
    setSelectedTicket(selectedPricing);
    console.log(selectedPricing)
  };

  const registerEvent = async ()=>{
    try {
      let info = {userID: sessionStorage.getItem('data'), eventID: id, ticketType: selectedTicket.type, ticketPrice: selectedTicket.price};
      let response = await api.post(ApiRoutes.RegisterEvent.path, info, {authenticate: ApiRoutes.RegisterEvent.authenticate});
      if(response){
        toast.success(response.message)
        navigate(`/payment/${id}`)
      }
    } catch (error) {
      toast.error(error.response.data.message) || "Error Occured! Please Try Again"
    }
  }
  

  return <>
  <TopBar/>
    <Container>
        <div className='bg'>
        {data.map((event) => (
          <Col key={event._id}>
            <div>
            <img src={event.image} alt="image" style={{width: '100%', height: '80vh', marginTop: '24px',marginBottom: '20px'}}/>
              <div className="details">
                <h1>Event Details</h1>
                <h5>Title : {event.title}</h5>
                <h5>Description : {event.description}</h5>
                <h5>Location : {event.location}</h5>
                <h5>Timings : {event.date}</h5>
                <h5>Category : {event.category}</h5>
              </div>
              <div className="buttons">
              <DropdownButton id="dropdown-basic-button"
                  title={selectedTicket?.type || 'Select Ticket'}
                  onSelect={handleTicketSelection}>
                {
                  event.ticketPricing.map((e)=>(
                    <Dropdown.Item key={e.type} eventKey={e.type}>
                      {e.type} - INR {e.price} ({e.availableTickets} Tickets Available)
                    </Dropdown.Item>
                  ))
                }
              </DropdownButton>
              <button className='btn btn-primary' onClick={registerEvent}>Register</button>
              </div>
              
            </div>
          </Col>
        ))}
        </div>
    </Container>
    </>
}

