import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useAppSelector, useAppDispatch } from "../../hooks";
import { selectUser, userActions } from "../../store/user";

function Signup(): React.ReactElement {
  const user = useAppSelector(selectUser);

  return (
    <div className="mt-14 h-[calc(100svh-56px)]">
      <div className="bg-gray-lv2 h-full flex justify-center">
        <div className="w-96 h-full bg-white pt-40 px-10 lg:px-20 lg:w-1/2 border-x-2 border-solid border-gray-lv3">
          <Form className="flex flex-col">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>ID</Form.Label>
              <div className="flex">
                <Form.Control type="email" placeholder="Enter email" />
                <Button
                  className="mx-2"
                  style={{ width: "8rem", height: "2.5rem" }}
                  variant="primary"
                  type="submit"
                >
                  중복확인
                </Button>
              </div>
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPasswordck">
              <Form.Label>비밀번호 확인</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <div className="flex justify-center">
              <Button style={{ width: "8rem" }} variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
