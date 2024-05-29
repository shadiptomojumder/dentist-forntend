import { api } from "../api"

interface DeleteAppointmentProps{
    appointmentId: string;
}


const DeleteAppointment = async ({ appointmentId }:DeleteAppointmentProps) => {
    console.log("The Data in Appointment id is:",appointmentId)
    
    try {
        const response = await api.delete(`/appointment/${appointmentId}`);
        console.log("response in DeleteAppointment.ts file: ", response);
        
        return response.data
    } catch (error) {
        console.log("The Error in DeleteAppointment api is:",error);
        
        throw error
    }
}

export default DeleteAppointment;