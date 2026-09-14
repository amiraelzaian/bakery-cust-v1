import { apiClient } from "./client";


export async function getLoggedUser(){

    const data=apiClient(`/users/getMe`)
    return data;

}