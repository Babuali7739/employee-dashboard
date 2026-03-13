import { useState } from "react"

const ROW_HEIGHT = 50

function VirtualGrid({ data, onRowClick }) {

  const [scrollTop, setScrollTop] = useState(0)

  const containerHeight = 500

  const visibleCount = Math.ceil(containerHeight / ROW_HEIGHT)

  const startIndex = Math.floor(scrollTop / ROW_HEIGHT)

  const buffer = 5

  const endIndex = startIndex + visibleCount + buffer

  const visibleData = data.slice(startIndex, endIndex)

  const offsetY = startIndex * ROW_HEIGHT

  return (

    <div
      style={{ height: containerHeight, overflowY: "auto" }}
      onScroll={(e) => setScrollTop(e.target.scrollTop)}
    >

      <div style={{ height: data.length * ROW_HEIGHT }}>

        <div style={{ transform: `translateY(${offsetY}px)` }}>

          {visibleData.map((emp, index) => (

            <div
              key={startIndex + index}
              style={{ height: ROW_HEIGHT }}
              className="border p-2 grid grid-cols-6 cursor-pointer hover:bg-gray-100"
              onClick={() => onRowClick(emp)}
            >

              <span>{emp[0]}</span>
              <span>{emp[1]}</span>
              <span>{emp[2]}</span>
              <span>{emp[3]}</span>
              <span>{emp[4]}</span>
              <span>{emp[5]}</span>

            </div>

          ))}

        </div>

      </div>

    </div>
  )
}

export default VirtualGrid