import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import NavBar from "../component/NavBar"

function Home() {

  const { user } = useContext(AuthContext)

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className=" text-center max-w-xl">

        <h1 className="text-3xl font-bold mb-4">
          Welcome {user?.username || "User"} 👋
        </h1>

        <p className="text-lg text-gray-700">
          This dashboard provides insights into employee data, including profiles,
          analytics, and more. Use the navigation menu to explore different sections
          of the dashboard.
        </p>

      </div>

    </div>

  )
}

export default Home