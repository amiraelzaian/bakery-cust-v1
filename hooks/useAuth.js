import { getLoggedUser, updateProfile,forgotPassword, changeUserPassword } from "@/lib/api/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { toast } from "sonner";



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


export function useUpdateProfile() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload) => updateProfile(payload), 
    onSuccess: () => {
      toast.success("Profile updated");
      queryClient.invalidateQueries({ queryKey: ["logedUser"] }); 
    },
    onError: (error) => {
      toast.error(error?.message || "Couldn't update profile");
    },
  });

  return { updateProfile: mutation.mutate, isPending: mutation.isPending };
}


export function useForgotPassword() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: ({ email }) => forgotPassword(email),
    onSuccess: (data, variables) => {
  console.log("forgotPassword success:", data, variables);
  router.push(`/verifyCode?email=${encodeURIComponent(variables.email)}`);
},
  });

  return {
    forgotPassword: mutation.mutate,
    isPending: mutation.isPending,
    error: mutation.error,
  };
}
export function useChangeUserPassword() {
  const mutation = useMutation({
    mutationFn: ({ userId, currentPassword, password, passwordConfirm }) =>
      changeUserPassword(userId, currentPassword, password, passwordConfirm),
    onSuccess: () => {
      toast.success("Password Changed")
    },
    onError: () => {
      toast.error("Could not change password, Try later")
    },
  })

  return {
    changeUserPassword: mutation.mutate,
    isPending: mutation.isPending,
    error: mutation.error,
  }
}