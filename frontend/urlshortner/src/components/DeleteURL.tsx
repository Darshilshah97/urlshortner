import React, { useState } from 'react'
import APIClient from '../services/apiClient';

const DeleteURL = () => {

    const apiClient = new APIClient()

    const [deleteURL, setDeleteUrl] = useState("");
    const [delError, setDelError] = useState("");
    const [success, setSuccess] = useState(false);
    const [delResult, setDelResult] = useState("");

    const handleDelInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDeleteUrl(e.target.value);
        setDelError("")
        setDelResult("")
    }

  return (
    <>
        <form onSubmit={async (event) => {
        event.preventDefault();

        if(deleteURL === ""){
            setDelError("Please enter URL.")
        }else{
            setDelError("")
            const resp = await apiClient.deleteURL(deleteURL)
            console.log(resp);

            if(resp.success){
                setDelResult(resp.data.message);
              setSuccess(true)
              setDelError("")
            }else{
              setDelError(resp.error)
              setDelResult("")
            }
    
        }

        
    }}>
      <label htmlFor="long_url" className="block py-2 text-sm font-medium leading-6 text-gray-900">
        Enter Short URL
      </label>
      <input
          type="text"
          name="short_url"
          id="short_url"
          className="rounded-md border-0 pt-1.5 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="https://example.com"
          onChange={handleDelInputChange}
        />
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Delete Short URL
        </button>
    </form>
    {
        success && <p>{delResult}</p>
    }
    {
        delError && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg dark:text-red-400" role="alert">
        {delError}
     </div>
    }
    </>
  )
}

export default DeleteURL