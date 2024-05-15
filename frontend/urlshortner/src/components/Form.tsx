import { ReactEventHandler, useRef, useState } from "react"
import APIClient from "../services/apiClient"

const Form = () => {

    const apiClient = new APIClient()

    

    const [longUrl, setlongUrl] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setlongUrl(e.target.value);
    }
  return (
    <form onSubmit={(event) => {
        event.preventDefault();

        apiClient.generate(longUrl)
    }}>
      <label htmlFor="long_url" className="block py-2 text-sm font-medium leading-6 text-gray-900">
        Enter URL
      </label>
      <input
          type="text"
          name="long_url"
          id="long_url"
          className="rounded-md border-0 pt-1.5 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="https://example.com"
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Generate short url
        </button>
    </form>
  )
}

export default Form