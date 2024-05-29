import { api } from "../api"

interface UpdateAppointmentProps{
    appointmentId: string;
    data: object
}


const UpdateAppointment = async ({ appointmentId, data }:UpdateAppointmentProps) => {
    console.log("The Data in Appointment status is:",data)
    console.log("The Data in Appointment id is:",appointmentId)
    
    try {
        const response = await api.patch(`/appointment/${appointmentId}`, data);
        console.log("response in Appointment.ts file: ", response);
        
        return response.data
    } catch (error) {
        console.log("The Error in Appointment api is:",error);
        
        throw error
    }
}

export default UpdateAppointment;