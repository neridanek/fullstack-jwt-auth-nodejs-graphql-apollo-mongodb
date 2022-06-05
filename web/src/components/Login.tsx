import React, { useRef } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const GET_ACCOUNTS = gql`
  query users {
    users {
      email
      password
    }
  }
`;
const LOGIN = gql`
  mutation login($email: String, $password: String) {
    login(email: $email, password: $password) {
      email
      password
    }
  }
`;

console.log(GET_ACCOUNTS);
const Login: React.FC = () => {
  const { data, error, loading } = useQuery(GET_ACCOUNTS);
  const [setLogin] = useMutation(LOGIN);
  console.log(data);
  const navigate = useNavigate();
  const {
    handleSubmit,
    formState: { errors },
  } = useForm();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const handleLogin = () => {
    setLogin({
      variables: {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      },
    });
    navigate("/home");
  };

  return (
    <div>
      login
      <form onSubmit={handleSubmit(handleLogin)}>
        <input ref={emailRef} required={true} />
        <input ref={passwordRef} required={true} />
        {errors.email && <div>email is required</div>}
        {errors.password && <div>password is required</div>}
        <input type="submit" />
        <div>
          If you dont have account click there
          <button onClick={() => navigate("/register")} />
        </div>
      </form>
    </div>
  );
};
export default Login;
