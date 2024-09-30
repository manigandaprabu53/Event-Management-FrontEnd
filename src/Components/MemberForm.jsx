import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import toast from 'react-hot-toast';
import api from '../Services/ApiService';
import ApiRoutes from '../Utils/ApiRoutes';
import { useNavigate } from 'react-router-dom';
import TopBar from './TopBar';
import UseLogout from '../Hooks/UseLogout';

function MemberForm() {

    const logout = UseLogout();

    let navigate = useNavigate();
    let [email, setEmail] = useState();
    let [pwd, setPwd] = useState();

    const handleSubmit = async ()=>{
        try {
            let data = {id: sessionStorage.getItem('data'), email: email, password: pwd}
            let response = await api.put(ApiRoutes.MemberForm.path, data, {authenticate: ApiRoutes.MemberForm.authenticate});
            toast.success(response.message);
            navigate('/index')
        } catch (error) {
            toast.error(error.response.data.message) || "Error Occured! Please Try Again";
            if(error.response.status === 401)
                logout();
        }
    }
  return <>
    <TopBar/>
    <div className='p-3'>
        
        <h1>Organizer Form</h1>
        <h3 className='text-center mt-4 mb-4'>By submitting this form you will become an organizer once admin approves you</h3>
        <Form>
        <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}/>
            <Form.Text className="text-muted">
                We'll never share your email with anyone else.
            </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={(e)=>setPwd(e.target.value)}/>
        </Form.Group>

        <Button variant="primary" type="button" onClick={handleSubmit}>
            Submit
        </Button>
        </Form>
    </div>
  </>
}

export default MemberForm