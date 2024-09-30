import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import api from '../Services/ApiService';
import ApiRoutes from '../Utils/ApiRoutes';
import toast from 'react-hot-toast';
import UseLogout from '../Hooks/UseLogout';
import { useNavigate } from 'react-router-dom';
import TopBar from './TopBar';


function CreateEvent() {

    const logout = UseLogout();
    const navigate = useNavigate();

    const [arr, setArr] = useState([{type: "", price: "", availableTickets: ""}]);
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [date, setDate] = useState();
    const [time, setTime] = useState();
    const [location, setLocation] = useState();
    const [category, setCategory] = useState();
    const [image, setImage] = useState();
    const organizer = sessionStorage.getItem('data');

    const handleAdd = ()=>{
        setArr([...arr, {type: "", price: "", availableTickets: ""}]);
        
    }

    const handleDelete = (i)=>{
        if(i >= 1){
            const deleteval = [...arr];
            deleteval.splice(i, 1);
            setArr(deleteval);
        }
        
    }

    const handleChange = (e, i)=>{
        const {name, value} = e.target;
        const onchangeval = [...arr];
        onchangeval[i][name] = value;
        setArr(onchangeval);
    }

    const handleSubmit = async ()=>{
        try {
            const data = {title: title, description: description, category: category, date: date, time: time, location: location, ticketPricing: arr, organizer: organizer, image: image};
            let response = await api.post(ApiRoutes.CreateEvent.path, data, {authenticate: ApiRoutes.CreateEvent.authenticate});
            toast.success(response.message)
            navigate('/index')
        } catch (error) {
            toast.error(error.response.data.message) || "Error Occured! Please Try Again";
            if(error.response.status === 401)
                logout();
        }
    }

    const validateExtension = (name)=>{
        let allowedExtensions = ['jpg', 'jpeg', 'png'];    
        let extension = name.split('.')[name.split('.').length-1];
        return allowedExtensions.includes(extension);
    }

    const handleImage = (e)=>{
        let file = e.target.files[0];
        if(validateExtension(file.name)){
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () =>{
            setImage(reader.result)
          }
        }
        else{
          toast.error('Only .jpg, .jpeg, .png supported')
        }
        
    }

  return <>
    <TopBar/>
    <div className='p-3'>
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Enter title" onChange={(e)=>setTitle(e.target.value)} required/>
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" placeholder="Description" onChange={(e)=>setDescription(e.target.value)} required/>
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control type="text" placeholder="Category" onChange={(e)=>setCategory(e.target.value)} required/>
        </Form.Group>

        <div className="row mb-3">
            <Form.Group className="mb-3 w-25">
                <Form.Label>Date</Form.Label>
                <Form.Control type="date" onChange={(e)=>setDate(e.target.value)} required/>
            </Form.Group>

            <Form.Group className="mb-3 w-25">
                <Form.Label>Time</Form.Label>
                <Form.Control type="time" onChange={(e)=>setTime(e.target.value)} required/>
            </Form.Group>
        </div>

        <Form.Group className="mb-3 w-25">
            <Form.Label>Location</Form.Label>
            <Form.Control type="text" onChange={(e)=>setLocation(e.target.value)} required/>
        </Form.Group>

        <div>
            {
                arr.map((val, i)=>{
                    return <div className='row mb-3'>
                                <Form.Group className="mb-3 w-25">
                                    <Form.Label>Ticket Type</Form.Label>
                                    <Form.Control type="text" placeholder="Ticket Type" name='type' value={val.type} onChange={(e)=>handleChange(e,i)} required/>
                                </Form.Group>
                                <Form.Group className="mb-3 w-25">
                                    <Form.Label>Ticket Price</Form.Label>
                                    <Form.Control type="text" placeholder="Ticket price" name='price' value={val.Price} onChange={(e)=>handleChange(e,i)} required/>
                                </Form.Group>
                                <Form.Group className="mb-3 w-25">
                                    <Form.Label>Available Tickets</Form.Label>
                                    <Form.Control type="text" placeholder="Available Tickets" name='availableTickets' value={val.availableTickets} onChange={(e)=>handleChange(e,i)} required/>
                                </Form.Group>
                                <Button type='button' variant='danger' className='w-25 h-25 mt-4' onClick={()=>handleDelete(i)}>Remove</Button>
                                
                            </div>
                })
            }
            <Button variant='success'className='mb-4' onClick={handleAdd}>Add Field</Button>
        </div>

        <Form.Group className="mb-3 w-25">
            <Form.Label>Organizer</Form.Label>
            <Form.Control type="text" defaultValue={sessionStorage.getItem('data')} disabled/>
        </Form.Group>

        <Form.Group className="mb-3 w-25">
            <Form.Label>Image</Form.Label>
            <Form.Control type="file" onChange={handleImage} required/>
        </Form.Group>

        <Button variant="primary" type="submit">Submit</Button>
        </Form>
    </div>
    
  </>
}
export default CreateEvent