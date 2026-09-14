import { getLoggedUser } from "@/lib/api/user";
import { useQuery } from "@tanstack/react-query";



export function useAuth(){
    const query=useQuery({
        queryKey:['logedUser'],
        queryFn:getLoggedUser,
    })

    return {
        data:query.data,
        isPending:query.isPending,
        ...query,
    }

}