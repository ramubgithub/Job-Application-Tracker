import JobContext from "./JobContext"
import { useState, useEffect, useContext } from "react"
import authContext from "./AuthContext"

function JobProvider( {children} ) {
    const [Jobs, setJobs] = useState([])
    const { user } = useContext(authContext)
    useEffect(() => {
        if(!user) {
            setJobs([])
            return
        }
        const storedJobs = localStorage.getItem(`jobs_${user.username}`)
        if(storedJobs) {
            setJobs(JSON.parse(storedJobs))
        }
    }, [user?.username])

  return (
   <JobContext.Provider value={{Jobs, setJobs}}>
        {children}
   </JobContext.Provider>
    
  )
}

export default JobProvider