"use client"
import { Separator } from '@/components/ui/separator';
import { UserContext } from '@/context/UserContext/UserContext';
import React, { useContext } from 'react';

const DashboardProfilePage = () => {
    const { user, setUser , userLoading } = useContext(UserContext);
    console.log("The dashboard userLoading is ",userLoading);
    
if (userLoading){
    return <p>Loading..</p>
}
    return (
        <main>
            <h1 className="text-2xl text-gray-200 font-bold">
                Profile
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
                This is how others will see you on the site.
            </p>
            <Separator className="my-4" />
        </main>
    );
};

export default DashboardProfilePage;