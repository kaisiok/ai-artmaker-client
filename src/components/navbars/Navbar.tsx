import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import { useAppSelector, useAppDispatch } from "../../hooks";
import { selectUser, userActions } from "../../store/user";
import { Link, useNavigate } from "react-router-dom";

function MyNavbar(): React.ReactElement {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 w-full z-10 h-14">
      <Navbar expand="lg" className="bg-gray-lv1 h-14">
        <Container>
          <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
            <Navbar.Brand>React-Bootstrap</Navbar.Brand>
          </Link>
          <div className="hidden lg:block">
            <Nav className="ms-auto items-end">
              {user.isLogin ? (
                <Nav.Item className="mx-2">
                  <Link
                    to={"/myphotos"}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    MyPhotos
                  </Link>
                </Nav.Item>
              ) : null}
              {user.isLogin ? (
                <Nav.Item className="mx-2">
                  <Link
                    to={"/mypage"}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    MyPage
                  </Link>
                </Nav.Item>
              ) : null}
              {user.isLogin ? (
                <Nav.Item className="mx-2">
                  <Link
                    to={"/tagselect"}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Logout
                  </Link>
                </Nav.Item>
              ) : null}
              {user.isLogin ? null : (
                <Link
                  to={"/login"}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <Nav.Item className="mx-2">Login</Nav.Item>
                </Link>
              )}
              {user.isLogin ? null : (
                <Link
                  to={"/signup"}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <Nav.Item className="mx-2">Signup</Nav.Item>
                </Link>
              )}
            </Nav>
          </div>
          {user.isLogin ? null : (
            <NavDropdown
              title="Menu"
              id="basic-nav-dropdown"
              className="lg:hidden"
              align={"end"}
            >
              <NavDropdown.Item
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Singup
              </NavDropdown.Item>
            </NavDropdown>
          )}
          {user.isLogin ? (
            <NavDropdown
              title="Menu"
              id="basic-nav-dropdown"
              className="lg:hidden"
              align={"end"}
            >
              <NavDropdown.Item
                onClick={() => {
                  navigate("/myphotos");
                }}
              >
                MyPhotos
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  navigate("/mypage");
                }}
              >
                MyPage
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>Logout</NavDropdown.Item>
            </NavDropdown>
          ) : null}
        </Container>
      </Navbar>
    </div>
  );
}

export default MyNavbar;
