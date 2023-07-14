import axios from "axios";

const khaltiURL = process.env.KHALTI_API_URL || "https://a.khalti.com/api/v2/";

export const khalti = axios.create({
  baseURL: khaltiURL,
  headers: {
    'Authorization': `Key ${process.env.KHALTI_KEY}`,
  },
});
