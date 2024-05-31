import { api } from "../api"


const GetAllUser = async () => {
    try {
        const response = await api.get(`/users`);
        console.log("response in GetAllUser.ts file: ", response);
        
        return response.data
    } catch (error) {
        console.log("The Error in GetAllUser api is:",error);
        
        throw error
    }
}

export default GetAllUser;