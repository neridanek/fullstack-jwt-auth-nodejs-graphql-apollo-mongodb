import React from "react";
import { useQuery, gql, useMutation } from "@apollo/client";

const GET_MYSELF = gql`
  query user {
    user {
      email
      password
    }
  }
`;

const Home: React.FC = () => {
  const { data } = useQuery(GET_MYSELF);
  console.log(data);

  return (
    <div>
      {!data && <p>Data not found</p>}
      Home
    </div>
  );
};

export default Home;
