import axios from "axios";

const accessToken = JSON.parse(localStorage.getItem("accessToken"));

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

export const api = {
  url: import.meta.env.VITE_API_URL,
  auth: {
    getToken: () => {
      const accessToken = JSON.parse(localStorage.getItem("accessToken"));
      return accessToken;
    },
    register: ({ name, email, password, confirmPassword }) => {
      return axios.post(`${api.url}/auth/register`, {
        name,
        email,
        password,
        confirmPassword,
      });
    },
    me: () => {
      const accessToken = JSON.parse(localStorage.getItem("accessToken"));
      if (!accessToken) return Promise.resolve(null);
      return axios.get(`${api.url}/auth/me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    },

    verify: ({ id, token }) => {
      const accessToken = api.auth.getToken();
      if (!accessToken) return Promise.resolve(null);
      return axios.get(`${api.url}/auth/verify/${id}/${token}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    },

    resendVerification: ({ email }) => {
      const accessToken = api.auth.getToken();
      if (!accessToken) return Promise.resolve(null);
      return axios.post(
        `${api.url}/auth/resend-verification`,
        {
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    },

    login: ({ email, password }) => {
      return axios.post(`${api.url}/auth/login`, {
        email,
        password,
      });
    },

    onAuthStateChange: (callback) => {
      document.addEventListener("onAuthStateChange", async (e) => {
        const data = await api.auth.me();
        callback(data);
      });

      document.dispatchEvent(new Event("onAuthStateChange"));
    },
  },

  categories: {
    getAll: () => {
      return axios.get(`${api.url}/categories`);
    },
    create: ({ title, parent, image }) => {
      const accessToken = api.auth.getToken();
      if (!parent) parent = null;
      return axios.post(
        `${api.url}/categories`,
        {
          title,
          parent,
          image,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    },
    update: ({ id, title, parent, image }) => {
      const accessToken = api.auth.getToken();
      if (!parent) parent = null;
      return axios.put(
        `${api.url}/categories/${id}`,
        {
          title,
          parent,
          image,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    },
    remove: ({ id }) => {
      const accessToken = api.auth.getToken();

      return axios.delete(`${api.url}/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    },
  },
  products: {
    getAll: () => {
      return http.get("/products");
    },
    create: ({ ...data }) => {
      return http.post("/products", data);
    },
    update: ({ id, ...data }) => {
      return http.put(`/products/${id}`, data);
    },
    remove: ({ id }) => {
      return http.delete(`/products/${id}`);
    },
    getOne: ({ id }) => {
      return http.get(`/products/${id}`);
    },
  },

  orders: {
    getAll: () => {
      return http.get(`/orders`);
    },
    create: ({ ...data }) => {
      return http.post("/orders", data);
    },
  },
  payments: {
    getOne: () => {
      return http.get(`/payments`);
    },
    create: ({ ...data }) => {
      return http.post("/payments", data);
    },
  },
};
