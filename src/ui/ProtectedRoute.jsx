import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import styled from "styled-components";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1) Load the authenticated user:
  const { isLoadingUser, isAuthenticated } = useUser();

  // 2) If no authenticated user, redirect to /login route:
  useEffect(
    function () {
      if (!isAuthenticated && !isLoadingUser) navigate("/login");
    },
    [isAuthenticated, isLoadingUser, navigate]
  );

  // 3) While loading the user, display a spinner:
  if (isLoadingUser)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4) If there is a user, render the app:
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
