import { api } from "../api"


const GetUserAppointments = async () => {
    try {
        const response = await api.get(`/appointment/user-appointments`);
        console.log("response in Appointment list file: ", response);
        
        return response.data
    } catch (error) {
        console.log("The Error in GetUserAppointments list api is:",error);
        
        throw error
    }
}

export default GetUserAppointments;