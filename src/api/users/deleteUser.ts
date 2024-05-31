import { api } from "../api"

interface DeleteUserProps{
    userId: string;
}


const DeleteUser = async ({ userId }:DeleteUserProps) => {
    console.log("The Data in Appointment id is:",userId)
    
    try {
        const response = await api.delete(`/users/${userId}`);
        console.log("response in DeleteUser.ts file: ", response);
        
        return response.data
    } catch (error) {
        console.log("The Error in DeleteUser api is:",error);
        
        throw error
    }
}

export default DeleteUser;