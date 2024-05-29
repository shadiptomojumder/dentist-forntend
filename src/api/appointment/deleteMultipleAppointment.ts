import { api } from "../api"

interface DeleteMultipleAppointmentProps{
    selectedAppointmentIds: Array<string>;
}


const DeleteMultipleAppointment = async ({ selectedAppointmentIds }:DeleteMultipleAppointmentProps) => {
    console.log("The Data in Appointment id is:",selectedAppointmentIds)
    
    try {
        const response = await api.delete(`/appointment`, { data: selectedAppointmentIds });
        console.log("response in DeleteAppointment.ts file: ", response);
        
        return response.data
    } catch (error) {
        console.log("The Error in DeleteAppointment api is:",error);
        
        throw error
    }
}

export default DeleteMultipleAppointment;