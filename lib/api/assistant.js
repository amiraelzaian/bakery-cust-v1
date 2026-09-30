import { apiClient } from "./client";


export async function sendMessageToAssistant(message,history=[]){
    const data=await apiClient(`/chat/`,{
        method:"POST",
        body:JSON.stringify({message,history}),
    })
    return data
}