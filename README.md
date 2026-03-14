Employee Dashboard (Frontend Internship Assignment)

A React-based Employee Dashboard that allows users to view employee data, capture profile photos, add signatures, analyze salary data, and visualize employee locations on a map.

The project demonstrates modern frontend techniques including virtualization, canvas manipulation, chart rendering, and route-based state management.

Features
Authentication

Simple login system using React Context

Protected routes for dashboard pages

Redirects unauthorized users to login

Employee List

Displays employees fetched from API

Clickable rows redirect to employee profile

Virtualized grid rendering for performance

Employee Profile

Displays employee information

Capture employee photo using webcam

Draw signature using canvas

Save photo and signature in localStorage

Merge photo and signature into a single image

Analytics

Salary distribution chart by city

Employee location visualization using Leaflet map

Display merged verification images

Performance Optimization

Custom VirtualGrid implementation to render only visible rows

Tech Stack:-
Technology ---- Usage React	Frontend framework
React Router --- Page navigation
Tailwind CSS --- UI styling
Canvas API --- Signature & image processing
Leaflet	Map --- visualization
LocalStorage --- Client-side persistence
Installation
1 Clone the repository - git clone <repository_url>
2 Navigate to project - cd employee-dashboard
3 Install dependencies - npm install
4 Start development server - npm run dev

Application will run at: http://localhost:5173

Project Structure
src
 ├── components
 │    ├── NavBar.jsx
 │    ├── SalaryChart.jsx
 │    ├── VirtualGrid.jsx
 │
 ├── context
 │    └── AuthContext.jsx
 │
 ├── pages
 │    ├── Login.jsx
 │    ├── Home.jsx
 │    ├── List.jsx
 │    ├── Details.jsx
 │    ├── Analytics.jsx
 │
 └── App.jsx
Virtualization Math Explanation

Rendering a large dataset directly can cause performance issues.
To optimize rendering, the application implements a virtualized list.

Instead of rendering all rows, only the rows visible in the viewport are rendered.

Key Variables
ROW_HEIGHT ---	Height of each row
containerHeight ---	Height of scroll container
scrollTop ---	Current scroll position
visibleCount ---	Number of rows visible
startIndex ---	First row index rendered
endIndex ---	Last row index rendered
offsetY ---	Vertical offset for rendering

Step 1 Calculate Visible Rows
visibleCount = containerHeight / ROW_HEIGHT

Example:

visibleCount = 500 / 50
visibleCount = 10 rows
Step 2 Determine Starting Row
startIndex = scrollTop / ROW_HEIGHT

Example:

scrollTop = 250
ROW_HEIGHT = 50

startIndex = 5
Step 3 Determine Ending Row
endIndex = startIndex + visibleCount + buffer

Example:

endIndex = 5 + 10 + 5
endIndex = 20
Step 4 Slice Visible Data
visibleData = data.slice(startIndex, endIndex)
Step 5 Calculate Offset
offsetY = startIndex * ROW_HEIGHT

Example:

offsetY = 5 * 50
offsetY = 250px

Applied using:

transform: translateY(offsetY)
Result

Instead of rendering thousands of DOM nodes, only the visible rows are rendered.

Dataset	Rendered Rows
10,000 rows	~15 rows

This improves:

Scroll performance

Rendering speed

Memory usage

Intentional Vulnerability

This project intentionally includes one performance vulnerability as required by the assignment.

Location

Analytics.jsx

Description

The useEffect hook responsible for fetching employee data includes employees in its dependency array.

Example:

useEffect(() => {
 fetchEmployees()
}, [employees])
Issue

This creates a re-render loop because:

API fetch updates employees

employees state change triggers useEffect

useEffect fetches data again

Impact

Repeated API calls

Unnecessary re-renders

Performance degradation

Purpose

This bug was intentionally added to satisfy the assignment requirement of demonstrating a realistic frontend performance issue.
