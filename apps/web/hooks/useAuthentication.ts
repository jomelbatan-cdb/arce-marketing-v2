import { useAuthStore } from "@/stores/authStore";
import { useApiClient } from "@/utils/axios";
import { useMutation } from "@tanstack/react-query";

interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}
interface LoginPayload {
  email: string;
  password: string;
}

export const useAuthentication = () => {
  const api = useApiClient();
  const { setUser, logout } = useAuthStore();

  const registerUserMutation = useMutation({
    mutationFn: (data: RegisterPayload) => api.post("/auth/register", data),
    onSuccess: (response) => {
      setUser(response.data.user, response.data.token, response.data.role); // Zustand
    },
    onError: (error) => {
      console.log("[Error]: ", error);
    },
  });

  const loginUserMutation = useMutation({
    mutationFn: (data: LoginPayload) => api.post("/auth/login", data),
    onSuccess: (response) => {
      setUser(response.data.user, response.data.token, response.data.role);
    },
    onError: (error) => {
      console.log("[Error]: ", error);
    },
  });
  const logoutUserMutation = useMutation({
    mutationFn: () => api.post("/auth/logout", {}),
    onSuccess: (response) => {
      logout();
    },
    onError: (error) => {
      console.log("[Error]: ", error);
    },
  });
  const registerUser = (data: {
    username: string;
    email: string;
    password: string;
  }) => {
    if (!data.username.trim() || !data.email.trim() || !data.password.trim()) {
      return false;
    }

    registerUserMutation.mutate(data);
    return true;
  };
  const loginUser = (data: { email: string; password: string }) => {
    if (!data.email.trim() || !data.password.trim()) {
      return false;
    }

    loginUserMutation.mutate(data);
    return true;
  };

  return {
    registerUser,
    loginUser,
    logoutUser: logoutUserMutation.mutate,
    isLogingOut: logoutUserMutation.isPending,
    isRegisterLoading: registerUserMutation.isPending,
    isLoginLoading: loginUserMutation.isPending,
  };
};
