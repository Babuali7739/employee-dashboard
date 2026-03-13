function SalaryChart({ data }) {

  if (!data || data.length === 0) {
    return <p>Loading chart...</p>
  }

  const citySalary = {}

  data.forEach(emp => {

    const city = emp[2]

    const salary = parseFloat(
      String(emp[5]).replace(/[^0-9.]/g, "")
    )

    console.log("City:", city, "Salary:", salary)

    if (!city || isNaN(salary)) return

    if (!citySalary[city]) {
      citySalary[city] = 0
    }

    citySalary[city] += salary

  })

  const chartData = Object.entries(citySalary)


  if (chartData.length === 0) {
    return <p>No salary data available</p>
  }

  const maxSalary = Math.max(...chartData.map(item => item[1]))

  return (

    <div className="flex justify-center mt-6">

    <svg width="650" height="350">

      {chartData.map(([city, salary], i) => {

        const barHeight = (salary / maxSalary) * 250
        const x = i * 120 + 80
        const y = 300 - barHeight

        return (
          <g key={i}>

            <rect
              x={x}
              y={y}
              width="60"
              height={barHeight}
              fill="#2563eb"
            />

            <text
              x={x + 30}
              y={y - 5}
              textAnchor="middle"
            >
              ${salary}
            </text>

            <text
              x={x + 30}
              y="320"
              textAnchor="middle"
            >
              {city}
            </text>

          </g>
        )
      })}

    </svg>

  </div>


  )
}

export default SalaryChart