import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import OTPForm from "../components/auth/OTPForm";

export default function AuthPage() {
  const { mode } = useParams(); // "login", "register", "otp" or undefined
  const navigate = useNavigate();

  const [step, setStep] = useState("login");

  useEffect(() => {
    if (mode === "register") setStep("register");
    else if (mode === "otp") setStep("otp");
    else setStep("login");
  }, [mode]);

  // Switch between steps and update URL accordingly
  const handleSwitch = (newStep) => {
    setStep(newStep);
    if (newStep === "login") navigate("/auth/login");
    else if (newStep === "register") navigate("/auth/register");
    else if (newStep === "otp") navigate("/auth/otp");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded shadow">
        {step === "login" && <LoginForm onSwitch={() => handleSwitch("register")} />}
        {step === "register" && (
          <RegisterForm
            onSwitch={() => handleSwitch("login")}
            onRegisterSuccess={() => handleSwitch("otp")}
          />
        )}
        {step === "otp" && <OTPForm />}
      </div>
    </div>
  );
}
