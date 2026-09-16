import { Joan } from "next/font/google";
import { apiClient } from "./client";


export async function getLoggedUser(){

    const data=await apiClient(`/users/getMe`)
    return data;

}

export async function updateProfile(payload){
    const data=await apiClient(`/users/updateMe`,{
        method:"PATCH",
        body:JSON.stringify(payload)
    })
    return data;
}

export async function forgotPassword(email) {
  const data = await apiClient("/auth/forgotPassword", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
  return data;
}

export async function verifyCode(email,resetCode){

    const data=await apiClient  ('/auth/verifyPassword',{
        method:"POST",
        body:JSON.stringify({email,resetCode})
    })
    return data;
}

export async function changeUserPassword(userId,currentPassword,password,passwordConfirm){

    const data=await apiClient(`/users/change-user-pass/${userId}`,{
        method:"PATCH",
        body:JSON.stringify({currentPassword,password,passwordConfirm})
    })

    return data;
}