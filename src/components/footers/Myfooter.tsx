import { useAppSelector, useAppDispatch } from "../../hooks";
import { selectUser, userActions } from "../../store/user";

function MyFooter() {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <h1 className="text-xl font-bold mb-2">My Project</h1>
        <p className="text-sm mb-2">© 2024 My Project. All rights reserved.</p>
        <nav className="mb-2">
          <a href="/home" className="text-gray-400 hover:text-white mx-2">
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
        </div>{" "}
        <button
          onClick={() => {
            console.log(user.isLogin);
          }}
        >
          로그인했냐
        </button>
        <button
          onClick={() => {
            dispatch(userActions.login(1));
            console.log("로그인됨");
          }}
        >
          로그인
        </button>
        <button
          onClick={() => {
            dispatch(userActions.logout(10));
            console.log("로그아웃됨");
          }}
        >
          로그아웃
        </button>
      </div>
    </footer>
  );
}

export default MyFooter;
