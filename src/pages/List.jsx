import { useEffect, useState } from "react"

function List() {

  const [employees, setEmployees] = useState([])

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

      // ✅ correct extraction
      const tableData = data?.TABLE_DATA?.data || []

      setEmployees(tableData)

    })

  }, [])

  return (
    <div className="p-5">

      <h1 className="text-xl mb-4">Employee List</h1>

      {employees.map((emp, index) => (

        <div key={index} className="border p-2 mb-2">

          ID: {emp[0]} |
          Name: {emp[1]} |
          City: {emp[2]} |
          Department: {emp[3]} |
          Salary: {emp[4]}

        </div>

      ))}

    </div>
  )
}

export default List