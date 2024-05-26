"use client"
import { UserContext } from '@/context/UserContext/UserContext';
import React, { useContext } from 'react';

const DashboardProfilePage = () => {
    const { user, setUser , userLoading } = useContext(UserContext);
    console.log("The dashboard userLoading is ",userLoading);
    
if (userLoading){
    return <p>Loading..</p>
}
    return (
        <div>
            <h2>Dashboard Profile Page</h2>
            <h2>{user?.fullname}</h2>
        </div>
    );
};

export default DashboardProfilePage;