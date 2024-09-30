import React, { useEffect } from 'react';
import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import useLogout from '../Hooks/UseLogout';
import api from '../Services/ApiService';
import ApiRoutes from '../Utils/ApiRoutes';
import toast from 'react-hot-toast';
import TopBar from './TopBar';

function CancelEvents() {
    let [data, setData] = useState([]);
    let logout = useLogout();

    const getApprovedEvents = async ()=>{
        try {
            let id =sessionStorage.getItem('data');
            console.log(`${ApiRoutes.GetApprovedEvents.path}/${id}`)
            let events = await api.get(`${ApiRoutes.GetApprovedEvents.path}/${id}`, {authenticate: ApiRoutes.GetApprovedEvents.authenticate});
            console.log(events)
            if(events.message === "Approved Events"){
                setData(events.events);
                toast.success(events.message);
            }else if(events.message === "No Approved Events"){
                toast.error(events.message);
            }
        } catch (error) {
            toast.error(error.response.data.message) || "Error Occured! Please Try Again";
            if(error.response.status === 401)
                logout();
        }
    }

    const cancelEvent = async(id)=>{
        try {
            let response = await api.put(`${ApiRoutes.CancelEvent.path}/${id}`, {authenticate: ApiRoutes.CancelEvent.authenticate});
            if(response.message === "Event Cancelled")
            {
                let events = await api.get(`${ApiRoutes.GetApprovedEvents.path}/${sessionStorage.getItem('data')}`, {authenticate: ApiRoutes.GetApprovedEvents.authenticate});
                setData(events.events);
                toast.success(response.message);
            }else{
                toast.error(response.message)
            }
        } catch (error) {
            toast.error(error.response.data.message) || "Error Occured! Please Try Again";
            if(error.response.status === 401)
                logout();
        }
    }


    useEffect(()=>{
        getApprovedEvents();
    }, [])
  return <>
    <TopBar/>
    <div className='p-4'>
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Date</th>
                <th>Location</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.length?data.map((e)=>{
                        return <tr key={e._id}>
                            <td>{e.title}</td>
                            <td>{e.description}</td>
                            <td>{e.date}</td>
                            <td>{e.location}</td>
                            <td>
                                <Button variant='danger' onClick={()=>cancelEvent(e._id)}>Cancel</Button>
                            </td>
                        </tr>
                    }): <></>
                }
            </tbody>
        </Table>
    </div>
  </>
}

export default CancelEvents