import { useState } from 'react'
import './App.css'
import Form from './components/Form'
import DeleteURL from './components/DeleteURL';

function App() {
  const [deleteURL, setDeleteURL] = useState(false);
  return (
    <>
      <Form />
      <div className='p-4'>
        <button className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
         onClick={() => setDeleteURL(!deleteURL)}
         >Delete a URL?</button>
      </div>
      {
        deleteURL && 
        <div className="p-4">
          <button type="button" onClick={() => setDeleteURL(!deleteURL)} className='ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700'>
          <span className="sr-only">Close</span>
          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
          </svg>
          </button>
          <DeleteURL />
        </div>
      }
    </>
  )
}

export default App
