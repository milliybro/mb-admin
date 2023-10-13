import axios from "axios";

const request = axios.create({
   baseURL: 'https://6509158ef6553137159af260.mockapi.io/api/v1/',
   timeout: 10000
}) 

export default request