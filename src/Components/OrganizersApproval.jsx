import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import api from '../Services/ApiService';
import ApiRoutes from '../Utils/ApiRoutes';
import toast from 'react-hot-toast';
import TopBar from './TopBar';
import UseLogout from '../Hooks/UseLogout';

function OrganizersApproval() {

    const logout = UseLogout();

    let [data, setData] = useState([]);

    const fetchPendingApprovals = async ()=>{
        try {
            let response = await api.get(ApiRoutes.PendingOrganizers.path, {authenticate: ApiRoutes.PendingOrganizers.authenticate});
            setData(response.data)
            toast.success(response.message)
        } catch (error) {
            toast.error(error.response.data.message) || "Error Occured! Please Try Again";
            if(error.response.status === 401)
                logout();
        }
    }

    const approveOrganizer = async (id)=>{
        try {
            console.log("Approval Triggered")
            let info = {id: id};
            let response = await api.put(ApiRoutes.ApproveOrganizers.path, info, {authenticate: ApiRoutes.ApproveOrganizers.authenticate});
            if(response){
                let organizers = await api.get(ApiRoutes.PendingOrganizers.path, {authenticate: ApiRoutes.PendingOrganizers.authenticate});
                setData(organizers.data)
                toast.success(response.message);
            }
        } catch (error) {
            toast.error(error.response.data.message) || "Error Occured! Please Try Again";
            if(error.response.status === 401)
                logout();
        }
    }

    const rejectOrganizer = async (id)=>{
        try {
            console.log("Rejection Triggered")
            let info = {id: id};
            let response = await api.put(ApiRoutes.RejectOrganizer.path, info, {authenticate: ApiRoutes.RejectOrganizer.authenticate});
            if(response){
                let organizers = await api.get(ApiRoutes.PendingOrganizers.path, {authenticate: ApiRoutes.PendingOrganizers.authenticate});
                setData(organizers.data)
                toast.success(response.message);
            }
        } catch (error) {
            toast.error(error.response.data.message) || "Error Occured! Please Try Again";
            if(error.response.status === 401)
                logout();
        }
    }

    useEffect(()=>{
        fetchPendingApprovals();
    }, [])
  return <>
    <TopBar/>
    <div className='p-4'>
        <TopBar/>
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>Name</th>
                <th>Email</th>
                <th>status</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.length?data.map((e)=>{
                        return <tr key={e._id}>
                            <td>{e.name}</td>
                            <td>{e.email}</td>
                            <td>{e.organizerRequestStatus}</td>
                            <td>
                                <Button variant='success' onClick={()=>approveOrganizer(e._id)}>Approve</Button>
                                &nbsp; &nbsp;
                                <Button variant='danger' onClick={()=>rejectOrganizer(e._id)}>Reject</Button>
                            </td>
                        </tr>
                    }): <></>
                }
            </tbody>
        </Table>
    </div>
  </>
}

export default OrganizersApproval