import React, { useEffect, useState } from 'react'
import TopBar from './TopBar'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import api from '../Services/ApiService';
import ApiRoutes from '../Utils/ApiRoutes';
import toast from 'react-hot-toast';
import UseLogout from '../Hooks/UseLogout';

function EventsApproval() {

    const logout = UseLogout();

    let [data, setData] = useState([]);

    const fetchEventsApproval = async ()=>{
        try {
            console.log("Fetch Triggered")
            let response = await api.get(ApiRoutes.PendingEvents.path, {authenticate: ApiRoutes.PendingEvents.authenticate});
            setData(response.data);
            toast.success(response.message)
        } catch (error) {
            toast.error(error.response.data.message) || "Error Occured! Please Try Again";
            if(error.response.status === 401)
                logout();
        }
    }

    const approveEvent = async (id)=>{
        try {
            let info = {id: id};
            let response = await api.put(ApiRoutes.ApproverEvent.path, info, {authenticate: ApiRoutes.ApproverEvent.authenticate});
            if(response){
                let events = await api.get(ApiRoutes.PendingEvents.path, {authenticate: ApiRoutes.PendingEvents.authenticate});
                setData(events.data);
                console.log(events.data)
                toast.success(response.message);
            }
        } catch (error) {
            toast.error(error.response.data.message) || "Error Occured! Please Try Again";
            if(error.response.status === 401)
                logout();
        }
    }

    const rejectEvent = async (id)=>{
        try {
            let info = {id: id};
            let response = await api.put(ApiRoutes.RejectEvent.path, info, {authenticate: ApiRoutes.RejectEvent.authenticate});
            if(response){
                let events = await api.get(ApiRoutes.PendingEvents.path, {authenticate: ApiRoutes.PendingEvents.authenticate});
                setData(events.data);
                console.log(events.data)
                toast.success(response.message);
            }
        } catch (error) {
            toast.error(error.response.data.message) || "Error Occured! Please Try Again";
            if(error.response.status === 401)
                logout();
        }
    }

    useEffect(()=>{
        fetchEventsApproval();
    }, [])

  return <>
    <TopBar/>
    <div className='p-4'>
        <Table striped bordered hover className='text-align-center'>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Date</th>
                    <th>Location</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.length? data.map((e)=>{
                        return <tr key={e._id}>
                            <td>{e.title}</td>
                            <td>{e.description}</td>
                            <td>{e.date}</td>
                            <td>{e.location}</td>
                            <td>
                                <Button variant='success' onClick={()=>approveEvent(e._id)}>Approve</Button>
                                &nbsp; &nbsp;
                                <Button variant='danger' onClick={()=>rejectEvent(e._id)}>Reject</Button>
                            </td>
                        </tr>
                    }):<></>
                }
            </tbody>
        </Table>
    </div>
  </>
}

export default EventsApproval