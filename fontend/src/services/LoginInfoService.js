import api from "../ultils/api";

const LoginInfoService = {
  getCurrentUser: async () => {
    const response = await api.get("/auth/current-user");
    return response.data;
  },
};

export default LoginInfoService;
