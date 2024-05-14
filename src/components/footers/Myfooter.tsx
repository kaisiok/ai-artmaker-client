import { useAppSelector, useAppDispatch } from "../../hooks";
import { selectUser, userActions } from "../../store/user";

function MyFooter() {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  return (
    <footer>
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
    </footer>
  );
}

export default MyFooter;
