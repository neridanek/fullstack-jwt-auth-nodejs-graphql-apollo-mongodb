import React, { useRef } from "react";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

const ADD_ACCOUNT = gql`
  mutation register($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      email
      password
    }
  }
`;

const Register: React.FC = () => {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [createUser] = useMutation(ADD_ACCOUNT);
  console.log(ADD_ACCOUNT);
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const handleRegister = () => {
    createUser({
      variables: {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      },
    });
    navigate("/login");
  };
  return (
    <div className="h-100 d-flex flex-column align-items-center justify-content-center">
      register
      <form onSubmit={handleSubmit(handleRegister)}>
        <input type="text" required={true} ref={emailRef} />
        <input type="password" ref={passwordRef} required={true} />
        {errors.email && <div>email is required</div>}
        {errors.password && <div>password is required</div>}
        <input type="submit" />
      </form>
    </div>
  );
};

export default Register;
