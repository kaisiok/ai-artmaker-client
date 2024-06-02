import Button from "react-bootstrap/Button";
import naverLoginImg from "../img/naverLogin.png";

import axios from "axios";

function NaverLoginButton(): React.ReactElement {
  const handleOauthNaver = async () => {
    try {
      const result = await axios.get(
        process.env.REACT_APP_SERVER_ADRESS + "/user/login/oauthnaver"
      );
      if (result.data.authUrl) {
        window.location.href = result.data.authUrl; // 클라이언트에서 네이버 로그인 페이지로 리디렉션
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
