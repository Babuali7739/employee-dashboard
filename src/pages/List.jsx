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

        const tableData = data?.TABLE_DATA?.data || []

        setEmployees(tableData)

      })

  }, [])

  return (
    <div style={{ padding: "20px" }}>

      <h1 style={{ marginBottom: "20px" }}>Employee List</h1>

      <table border="1" cellPadding="10" cellSpacing="0" width="100%">

        <thead style={{ background: "#f2f2f2" }}>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>City</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          {employees.map((emp, index) => (
            <tr key={index}>
              <td>{emp[0]}</td>
              <td>{emp[1]}</td>
              <td>{emp[2]}</td>
              <td>{emp[3]}</td>
              <td>{emp[4]}</td>
              <td>{emp[5]}</td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  )
}

export default List