import axios, { AxiosResponse } from "axios";

 const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000'
 })

 interface successResponse {
    key: string;
    long_url: string;
    short_url: string;
 }

 interface FetchResponseSuccess {
    success: true;
    data: successResponse;
 }

 interface FetchResponseError {
    success: false;
    error: string; 
 }

 type FetchResponse =  FetchResponseSuccess | FetchResponseError;

class APIClient {

    constructor() {
        
    }

    generate = async <T>(longUrl:string): Promise<FetchResponse> => {
        try {
          const response: AxiosResponse<T> = await axiosInstance.post('/generate', {
            url: longUrl
          });
          return { success: true, data: response.data } as FetchResponseSuccess;
        } catch (error: any) {
          return {
            success: false,
            error: error.response ? error.response.data.error : 'Network Error',
          } as FetchResponseError;
        }
    }
    
    // generate : AxiosResponse<T> = (inputUrl: string) => {
    //     const result = axiosInstance.post<FetchResponse<T>>('/generate', {
    //         url: inputUrl
    //     })
        
    // }

    retrieve = (inputcode: string) => {
        return axiosInstance.get('/retrieve', {
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