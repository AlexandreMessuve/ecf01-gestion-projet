import axios from "axios";
/**
 *  Instance axios to the BACKEND
 *
 *  @author MESSUVE Alexandre
 */

const apiBackend = axios.create({
    baseURL: "http://localhost:3000",
});

export default apiBackend;