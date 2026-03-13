import { useEffect, useState } from "react"
import SalaryChart from "../component/SalaryChart"
import { MapContainer, TileLayer, Marker } from "react-leaflet"
import "leaflet/dist/leaflet.css"

function Analytics() {

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

        const tableData = data?.TABLE_DATA?.data || []
        setEmployees(tableData)

      })

  }, [])

  const cityCoords = {
    Delhi: [28.6139, 77.2090],
    Mumbai: [19.0760, 72.8777],
    Bangalore: [12.9716, 77.5946]
  }

  return (

    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Employee Analytics
      </h1>

      {/* Salary Chart */}

      <SalaryChart data={employees} />

      {/* Map */}

      <h2 className="text-xl font-semibold mt-8 mb-3">
        Employee Locations
      </h2>

      <MapContainer
        center={[28.6139, 77.2090]}
        zoom={5}
        style={{ height: "400px" }}
      >

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {employees.map((emp, i) => {

          const coords = cityCoords[emp[2]]

          if (!coords) return null

          return <Marker key={i} position={coords} />

        })}

      </MapContainer>

    </div>

  )
}

export default Analytics