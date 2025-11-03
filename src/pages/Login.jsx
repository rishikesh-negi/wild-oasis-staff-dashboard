import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

const TestLoginInstructions = styled.p`
  font-size: 1.4rem;
  font-weight: 500;
  letter-spacing: 0.3px;
`;

function Login() {
  return (
    <LoginLayout>
      <Logo />
      <Heading as="h4">Log in to your account</Heading>
      <TestLoginInstructions>
        (Use <code>test@example.com</code> and <code>Hello@123</code> as the
        username and password to log in and explore the app)
      </TestLoginInstructions>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
