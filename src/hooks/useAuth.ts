import { UserContext } from "@/context/UserContext/UserContext";
import { useContext } from "react";


export const useAuth = () => {
    const { user, setUser, userLoading } = useContext(UserContext);

    return { user, setUser, userLoading }
}