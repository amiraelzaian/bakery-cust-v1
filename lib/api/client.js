 const API_URL=process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
console.log("API URL:", API_URL);

export async function apiClient(endpoint,options={}){

    const res=await fetch(`${API_URL}${endpoint}`,{
        ...options,
        headers:{
            "Content-Type":"application/json",
            ...options?.headers,
        }
    })
if(!res.ok){
    throw new Error(`API request failed with status ${res.status}`);
}
return res.json();

}

