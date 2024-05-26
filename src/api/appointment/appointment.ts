import { api } from "../api"


const Appointment = async (data:any) => {
    console.log("The Data in Appointment api is:",data)
    
    try {
        const response = await api.post(`/appointment`, data);
        console.log("response in Appointment.ts file: ", response);
        
        return response.data
    } catch (error) {
        console.log("The Error in Appointment api is:",error);
        
        throw error
    }
}

export default Appointment;