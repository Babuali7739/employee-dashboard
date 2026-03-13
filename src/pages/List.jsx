import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import VirtualGrid from "../component/VirtualGrid"

function List() {

  const [employees, setEmployees] = useState([])
  const navigate = useNavigate()

  useEffect(() => {

    fetch("https://backend.jotish.in/backend_dev/gettabledata.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: "test",
        password: "123456"
      })
    })
      .then(res => res.json())
      .then(data => {

        console.log("API Response:", data)

        const tableData = data?.TABLE_DATA?.data || []

        setEmployees(tableData)

      })

  }, [])

  return (

    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4">
        Employee List
      </h1>

      {/* Table Header */}

      <div className="grid grid-cols-6 font-bold border p-2 bg-gray-100">

        <span>Name</span>
        <span>Department</span>
        <span>City</span>
        <span>ID</span>
        <span>Date</span>
        <span>Salary</span>

      </div>

      {/* Virtualized Grid */}

      <VirtualGrid
        data={employees}
        onRowClick={(emp) => navigate(`/details/${emp[3]}`)}
      />

    </div>

  )
}

export default List