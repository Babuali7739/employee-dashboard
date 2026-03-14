import { useEffect, useState } from "react"
import SalaryChart from "../component/SalaryChart"
import { MapContainer, TileLayer, Marker } from "react-leaflet"
import "leaflet/dist/leaflet.css"

function Analytics() {

  const [employees, setEmployees] = useState([])
  const [mergedImages, setMergedImages] = useState([])

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

        // Load merged images from localStorage
        const images = tableData.map(emp => {

          const id = emp[3]

          return {
            id,
            name: emp[0],
            image: localStorage.getItem(`mergedImage_${id}`)
          }

        })

        setMergedImages(images)

      })

  }, [employees])

  const cityCoords = {
    Delhi: [28.6139, 77.2090],
    Mumbai: [19.0760, 72.8777],
    Bangalore: [12.9716, 77.5946],
    London: [51.5072, -0.1276],
    Tokyo: [35.6762, 139.6503],
    "San Francisco": [37.7749, -122.4194],
    Singapore: [1.3521, 103.8198],
    Sydney: [-33.8688, 151.2093],
    "New York": [40.7128, -74.0060],
    Edinburgh: [55.9533, -3.1883]
  }

  return (

    <div className=" p-6">

      <h2 className="text-xl font-semibold mb-6 text-center">
        Employee Verification Images
      </h2>

      <div className=" flex justify-center mb-12">

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 max-w-4xl">

          {mergedImages.map((emp, i) => {

            if (!emp.image) return null

            return (

              <div
                key={i}
                className="bg-white shadow-md rounded-lg p-4 text-center hover:shadow-xl transition"
              >

                <p className="font-semibold text-gray-700 ">
                  Name : {emp.name}
                </p>
                <p className="font-semibold mb-2 text-gray-700">
                  Id : {emp.id}
                </p>

                <img
                  src={emp.image}
                  alt="merged"
                  className="w-48 h-auto mx-auto border rounded-md"
                />

              </div>

            )

          })}

        </div>

      </div>

      {/* SALARY CHART */}

      <h2 className="text-xl font-semibold mb-4 text-center">
        Salary Distribution
      </h2>

      <div className="flex justify-center mb-12">
        <SalaryChart data={employees} />
      </div>

      {/* MAP */}

      <h2 className="text-xl font-semibold mb-4 text-center">
        Employee Locations
      </h2>

      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={2}
        style={{ height: "400px" }}
      >

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {employees.map((emp, i) => {

          const coords = cityCoords[emp[2]]

          if (!coords) return null

          return (
            <Marker
              key={i}
              position={coords}
            />
          )

        })}

      </MapContainer>

    </div>

  )
}

export default Analytics