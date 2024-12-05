import React, { useState } from "react";
import { supabase } from "./supabase";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import styled from "styled-components";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false); // Toggle for login/signup
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { user, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (loginError) throw loginError;

      localStorage.setItem("user", JSON.stringify(user));
      navigate("/dashboard");
    } catch (loginError) {
      setError(loginError.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) return setError("Please enter your email.");
    setLoading(true);
    try {
      const { error: resetError } = await supabase.auth.api.resetPasswordForEmail(email);
      if (resetError) throw resetError;
      setError("Check your email for reset instructions.");
    } catch (resetError) {
      setError(resetError.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!email || !password) return setError("Email and password are required.");
    setLoading(true);
    try {
      const { user, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });
      if (signUpError) throw signUpError;

      alert("Account created successfully! Please check your email to verify.");
      setEmail("");
      setPassword("");
      setIsSignUp(false); // Switch to login after successful sign-up
    } catch (signUpError) {
      setError(signUpError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}

      {!loading && (
        <LoginContainer>
          <LoginWrapper>
            <h2>{isSignUp ? "Create Account" : "Welcome Back"}</h2>
            <p className="subtitle">{isSignUp ? "Sign up to continue" : "Sign in to continue"}</p>

            <form onSubmit={isSignUp ? handleSignUp : handleLogin} aria-label={isSignUp ? "Sign Up Form" : "Login Form"}>
              <FormGroup>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label="Email Address"
                />
                <Label htmlFor="email">Email Address</Label>
              </FormGroup>

              <FormGroup>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  aria-label="Password"
                />
                <Label htmlFor="password">Password</Label>
              </FormGroup>

              {error && <ErrorText role="alert">{error}</ErrorText>}

              <Button type="submit" disabled={loading}>
                {loading ? "Loading..." : isSignUp ? "Sign Up" : "Sign In"}
              </Button>
            </form>

            {!isSignUp ? (
              <>
                <ForgotPasswordLink onClick={handleForgotPassword} disabled={loading}>
                  Forgot your password?
                </ForgotPasswordLink>
                <SignUpText>
                  Don't have an account?{" "}
                  <StyledLink onClick={() => setIsSignUp(true)} disabled={loading}>
                    Sign up here
                  </StyledLink>
                </SignUpText>
              </>
            ) : (
              <SignUpText>
                Already have an account?{" "}
                <StyledLink onClick={() => setIsSignUp(false)} disabled={loading}>
                  Login here
                </StyledLink>
              </SignUpText>
            )}
          </LoginWrapper>
        </LoginContainer>
      )}
    </>
  );
}

// Styled Components
const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(to bottom right, #e0eafc, #cfdef3);
  padding: 20px;
`;

const LoginWrapper = styled.div`
  background: #fff;
  padding: 40px;
  border-radius: 16px;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.15);
  text-align: center;

  h2 {
    margin-bottom: 10px;
    font-size: 28px;
    font-weight: bold;
    color: #333;
  }

  .subtitle {
    margin-bottom: 30px;
    font-size: 16px;
    color: #555;
  }
`;

const FormGroup = styled.div`
  position: relative;
  margin-bottom: 24px;
`;

const Label = styled.label`
  position: absolute;
  top: 14px;
  left: 14px;
  font-size: 14px;
  color: #999;
  transition: all 0.3s ease;
`;

const Input = styled.input`
  width: 100%;
  padding: 16px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    border-color: #4a90e2;
  }

  &:focus + ${Label}, &:not(:placeholder-shown) + ${Label} {
    top: -8px;
    left: 12px;
    font-size: 12px;
    color: #4a90e2;
  }
`;

const ErrorText = styled.p`
  color: #e74c3c;
  font-size: 14px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  width: 100%;
  height: 48px;
  background: #4a90e2;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #357abd;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(2px);
  }

  &:disabled {
    background-color: #b2c6dc;
    cursor: not-allowed;
  }
`;

const ForgotPasswordLink = styled.button`
  margin-top: 12px;
  font-size: 14px;
  color: #4a90e2;
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    text-decoration: none;
  }
`;

const SignUpText = styled.p`
  margin-top: 20px;
  font-size: 14px;
  color: #555;
`;

const StyledLink = styled.button`
  color: #4a90e2;
  background: none;
  border: none;
  font-weight: bold;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    text-decoration: none;
    color: #357abd;
  }
`;
