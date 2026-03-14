# Employee Dashboard (Frontend Internship Assignment)

A **React-based Employee Dashboard** that allows users to view employee
data, capture profile photos, add signatures, analyze salary data, and
visualize employee locations on a map.

This project demonstrates **modern frontend development techniques**
such as virtualization, canvas manipulation, chart rendering, and
route-based state management.

------------------------------------------------------------------------

# Project Features

## 1. Authentication

-   Simple login system implemented using **React Context**
-   **Protected routes** for dashboard pages
-   Redirects **unauthorized users to login page**

------------------------------------------------------------------------

## 2. Employee List

-   Displays employees fetched from an API
-   **Clickable rows** redirect to employee profile
-   Uses **virtualized grid rendering** for better performance

------------------------------------------------------------------------

## 3. Employee Profile

-   Displays detailed employee information
-   Capture employee **photo using webcam**
-   Draw **signature using Canvas API**
-   Save photo and signature in **localStorage**
-   Merge photo and signature into a **single verification image**

------------------------------------------------------------------------

## 4. Analytics

-   Salary distribution **chart by city**
-   Employee location visualization using **Leaflet Map**
-   Display merged **verification images**

------------------------------------------------------------------------

## 5. Performance Optimization

A custom **VirtualGrid implementation** renders only the visible rows
instead of the entire dataset.

Benefits: - Faster rendering - Improved scrolling performance - Reduced
memory usage

------------------------------------------------------------------------

# Tech Stack

  Technology     Usage
  -------------- --------------------------------
  React          Frontend framework
  React Router   Page navigation
  Tailwind CSS   UI styling
  Canvas API     Signature and image processing
  Leaflet        Map visualization
  LocalStorage   Client-side persistence

------------------------------------------------------------------------

# Installation

### 1. Clone the repository

``` bash
git clone <repository_url>
```

### 2. Navigate to the project directory

``` bash
cd employee-dashboard
```

### 3. Install dependencies

``` bash
npm install
```

### 4. Start the development server

``` bash
npm run dev
```

Application will run at:

    http://localhost:5173

------------------------------------------------------------------------

# Project Structure

    src
    │
    ├── components
    │   ├── NavBar.jsx
    │   ├── SalaryChart.jsx
    │   ├── VirtualGrid.jsx
    │   └── context
    │       └── AuthContext.jsx
    │
    ├── pages
    │   ├── Login.jsx
    │   ├── Home.jsx
    │   ├── List.jsx
    │   ├── Details.jsx
    │   └── Analytics.jsx
    │
    └── App.jsx

------------------------------------------------------------------------

# Virtualization Math Explanation

Rendering a large dataset directly can cause **serious performance
issues**. To solve this, the application implements a **virtualized
list**.

Instead of rendering **all rows**, only the rows visible in the viewport
are rendered.

------------------------------------------------------------------------

## Key Variables

  Variable          Description
  ----------------- --------------------------------------
  ROW_HEIGHT        Height of each row
  containerHeight   Height of the scroll container
  scrollTop         Current scroll position
  visibleCount      Number of visible rows
  startIndex        First row index rendered
  endIndex          Last row index rendered
  offsetY           Vertical offset used for positioning

------------------------------------------------------------------------

## Step 1 --- Calculate Visible Rows

    visibleCount = containerHeight / ROW_HEIGHT

Example:

    visibleCount = 500 / 50
    visibleCount = 10 rows

------------------------------------------------------------------------

## Step 2 --- Determine Starting Row

    startIndex = scrollTop / ROW_HEIGHT

Example:

    scrollTop = 250
    ROW_HEIGHT = 50

    startIndex = 5

------------------------------------------------------------------------

## Step 3 --- Determine Ending Row

    endIndex = startIndex + visibleCount + buffer

Example:

    endIndex = 5 + 10 + 5
    endIndex = 20

------------------------------------------------------------------------

## Step 4 --- Slice Visible Data

    visibleData = data.slice(startIndex, endIndex)

------------------------------------------------------------------------

## Step 5 --- Calculate Offset

    offsetY = startIndex * ROW_HEIGHT

Example:

    offsetY = 5 * 50
    offsetY = 250px

Applied using:

    transform: translateY(offsetY)

------------------------------------------------------------------------

## Result

Instead of rendering thousands of DOM nodes, only the visible rows are
rendered.

  Dataset Size   Rendered Rows
  -------------- ---------------
  10,000 rows    \~15 rows

### Performance Improvements

-   Smooth scrolling
-   Faster rendering
-   Lower memory usage

------------------------------------------------------------------------

# Intentional Vulnerability (Assignment Requirement)

This project intentionally includes **one performance vulnerability** to
demonstrate a realistic frontend issue.

## Location

    Analytics.jsx

## Problematic Code

``` javascript
useEffect(() => {
  fetchEmployees()
}, [employees])
```

------------------------------------------------------------------------

## Issue Explanation

The `useEffect` hook depends on `employees`.

1.  API fetch updates `employees`
2.  `employees` state changes
3.  `useEffect` runs again
4.  API fetch runs again

This creates a **re-render loop**.

------------------------------------------------------------------------

## Impact

-   Repeated API calls
-   Unnecessary re-renders
-   Performance degradation

------------------------------------------------------------------------

## Purpose

This bug was **intentionally added** to satisfy the assignment
requirement of demonstrating a **real-world frontend performance
issue**.
