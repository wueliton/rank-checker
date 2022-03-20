import axios from "axios";

export const ApiService = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_PATH ?? "https://rankcheckerapp.herokuapp.com",
});
