import { api } from "../api"


const Logout = async () => {
    try {
        const response = await api.post(`/users/logout`,{});
        return response.data
    } catch (error) {
        console.log("The Error in Logout api is:",error);
        
        throw error
    }
}

export default Logout;