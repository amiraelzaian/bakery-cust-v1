import { sendMessageToAssistant } from "@/lib/api/assistant";
import { useMutation } from "@tanstack/react-query";

export function useAssistant() {
    const mutation = useMutation({
        mutationFn: ({ message, history }) =>
            sendMessageToAssistant(message, history),
    });

    return {
        sendMessage: mutation.mutateAsync, 
        isPending: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
        reset: mutation.reset,
    };
}