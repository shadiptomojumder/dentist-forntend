import { api } from "../api"


const GetAppointment = async () => {
    try {
        const response = await api.get(`/appointment`);
        //console.log("response in Appointment list file: ", response.data.data);
        
        return response.data
    } catch (error) {
        console.log("The Error in Appointment list api is:",error);
        
        throw error
    }
}

export default GetAppointment;