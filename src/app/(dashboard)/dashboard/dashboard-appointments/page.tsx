"use client"
import React, { useEffect } from 'react';
import { DataTable } from '../../DashboardComponents/Table/DataTable ';
import { Payment, columns } from "../../DashboardComponents/Table/columns"
import GetAppointment from '@/api/appointment/getAppointmentList';
import { useQuery } from '@tanstack/react-query';
import SortByDate from "../../DashboardComponents/Table/date-sorting"


const DashboardAppointmentsPage = () => {
    const { isLoading , data , error } = useQuery({
        queryKey: ["appointments"],
        queryFn: GetAppointment,
      });
    //   console.log("The data is:",data);
      

    if(isLoading){
        return <h2>Loading...</h2>
    }
    

    return (
        <div>
            <h2>This is Appointments list</h2>
            <DataTable columns={columns} data={data.data} />
        </div>
    );
};

export default DashboardAppointmentsPage;