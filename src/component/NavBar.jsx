import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">

      <h1 className="text-xl font-bold">
        Employee Dashboard
      </h1>

      <div className="space-x-6">
        <Link
            to= "/Home"
            className="hover:text-gray-300"
        >
            Home
        </Link>

        <Link
          to="/list"
          className="hover:text-gray-300"
        >
          Employee List
        </Link>

        <Link
          to="/analytics"
          className="hover:text-gray-300"
        >
          Analytics
        </Link>

        <Link
          to="/"
          className="hover:text-gray-300"
        >
          Logout
        </Link>

      </div>

    </nav>
  );
}

export default NavBar;