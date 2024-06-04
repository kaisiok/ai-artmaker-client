import Button from "react-bootstrap/Button";
import naverLoginImg from "../img/naverLogin.png";
import api from "./Api";

function NaverLoginButton(): React.ReactElement {
  const handleOauthNaver = async () => {
    try {
      const result = await api.get("/user/login/oauthnaver");
      if (result.data.authUrl) {
        window.location.href = result.data.authUrl;
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <Button
      onClick={handleOauthNaver}
      style={{ width: "8rem", height: "2.5rem" }}
      className="p-0 border-0 truncate mx-2"
    >
      <img
        src={naverLoginImg}
        alt="naverLogin"
        className="w-full h-full object-cover"
      />
    </Button>
  );
}

export default NaverLoginButton;
