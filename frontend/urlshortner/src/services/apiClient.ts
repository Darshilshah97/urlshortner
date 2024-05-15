import axios from "axios";

 const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000'
 })

class APIClient {

    

    constructor() {
        
    }

    generate = (inputUrl: string) => {
        axiosInstance.post('/generate', {
            url: inputUrl
        })
        .then(res => {
            console.log(res.data)
        })
        .catch(res => {
            console.log(res.error)
        })
    }

    retrieve = (inputcode: string) => {
        axiosInstance.get('/retrieve', {
            params: {
                code: inputcode
            }
        })
        .then(res => res.data)
        .catch(err => {
            console.log(err.error)
        })
    }
}

export default APIClient