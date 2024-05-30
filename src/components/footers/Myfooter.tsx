import { useAppSelector, useAppDispatch } from "../../hooks";
import { selectUser, userActions } from "../../store/user";

function MyFooter() {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <h1 className="text-xl font-bold mb-2">Wallmaker</h1>
        <p>&copy;2010-2011 Fontspring. All rights reserved.</p>
        <nav className="mb-2">
          <a href="/" className="text-gray-400 hover:text-white mx-2">
            Home
          </a>
          <a href="/about" className="text-gray-400 hover:text-white mx-2">
            About
          </a>
          <a href="/contact" className="text-gray-400 hover:text-white mx-2">
            Contact
          </a>
        </nav>
        <div>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white mx-2"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white mx-2"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}

export default MyFooter;
