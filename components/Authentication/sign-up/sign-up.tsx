'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaApple, FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle, } from 'react-icons/fc';

export default function SignupPage() {
  const [inputValue, setInputValue] = useState('');
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [otp, setOtp] = useState(Array(6).fill(''));

  const [password, setPassword] = useState('');
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  // New validation states
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  // Validate phone and email separately
  useEffect(() => {
    const phoneRegex = /^[6-9]\d{9}$/;
    setIsPhoneValid(phoneRegex.test(phone));
  }, [phone]);

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(email));
  }, [email]);

  // Handle Continue
  const handleContinue = () => {
    if (isPhoneValid || isEmailValid) {
      setInputValue(phone || email); // Store the value for OTP display
      setShowOtpScreen(true);        // Show OTP screen
    }
  };

  // OTP input handling
  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  // Resend timer countdown
  useEffect(() => {
    if (!showOtpScreen || resendTimer === 0) return;
    const interval = setInterval(() => {
      setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [showOtpScreen, resendTimer]);

  if (showOtpScreen && !otpVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <Image src="/login-bg.svg" alt="Background" fill className="object-cover -z-10" priority />
        <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl text-center z-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Verification Code</h2>
          <p className="text-sm text-gray-600 mb-4">
            Enter the 6-digit verification code sent to{' '}
            <span className="text-blue-700 font-medium">{inputValue}</span>
          </p>
          <div className="flex justify-between gap-2 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                value={digit}
                maxLength={1}
                onChange={(e) => handleOtpChange(e.target.value, index)}
                className="w-10 h-12 border border-gray-300 rounded-lg text-center text-xl focus:outline-none focus:ring-2 focus:ring-[#4ade80]"
              />
            ))}
          </div>
          <button
            className="w-full py-2 rounded-lg bg-[#06044B] text-white font-medium text-sm hover:bg-[#38366F] mb-4"
            onClick={() => {
              // Replace this with your real OTP check
              if (otp.join('').length === 6) {
                setOtpVerified(true);
                setShowOtpScreen(false);
                setShowPasswordInput(true);
              } else {
                alert('Please enter the 6-digit OTP');
              }
            }}
          >
            Continue
          </button>
          <p className="text-sm text-gray-600">Didn't receive the code?</p>
          <p className="text-sm mt-1 text-black font-medium">Resend after: 00:{resendTimer.toString().padStart(2, '0')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <Image src="/bg-sign-up.png" alt="Background" fill className="object-cover -z-10" priority />

      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl text-center z-10">
        <div className="flex justify-center mt-4 mb-4">
          <Image src="/logo.png" alt="Logo" width={100} height={100} />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome to Printable!</h1>
        <p className="text-sm font-semibold text-black mb-6">Sign up and start using Print & Delivery.</p>

        <input
          type="text"
          placeholder="Enter Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4ade80]"
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4ade80]"
        />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4ade80]"
        />
        
{/* Password Input (only if needed) */}
{showPasswordInput && (
  <div className="mt-4 transition-all duration-300">
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
  </div>
)}


{/* Continue Button — Always Visible */}
<button
  onClick={() => {
    if (showPasswordInput) {
      if (password.length >= 6) {
        alert('Logging in...');
      }
    } else {
      handleContinue(); // Now shows OTP input if phone or email is valid
    }
  }}
  disabled={
    (showPasswordInput && password.length < 6) ||
    (!showPasswordInput && !(isPhoneValid || isEmailValid))
  }
  className={`w-full py-2 mt-4 rounded-lg font-medium text-sm transition-all duration-300 ${
    (showPasswordInput && password.length >= 6) || (!showPasswordInput && (isPhoneValid || isEmailValid))
      ? 'bg-[#06044B] text-white hover:bg-[#38366F]'
      : 'bg-gray-300 text-white cursor-not-allowed'
  }`}
>
  Create account
</button>

{/* Forgot password — Show only when password is visible */}
{showPasswordInput && (
  <p className="text-sm text-center text-blue-600 mt-2 cursor-pointer hover:underline">
    Forgot password?
  </p>
)}



        <div>
          <p className="text-bold text-[12px] py-2 text-black">
            By creating an account, you are agreeing to our{' '}
            <span className="text-blue-600 font-medium cursor-pointer hover:underline">Terms of Service</span>
            {' '}and acknowledging receipt of our{' '}
            <span className="text-blue-600 font-medium cursor-pointer hover:underline">Privacy Policy</span>
          </p>
        </div>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-400 text-sm">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <div className="flex gap-3 mb-6">
          <button className="flex items-center justify-center gap-2 border border-[#C9C9C9] rounded-lg py-2 px-4 text-xs w-1/2 hover:bg-[#E9E9E9]">
            <FcGoogle className="text-lg" />
            Continue with Google
          </button>
          <button className="flex items-center justify-center gap-2 border border-[#C9C9C9] rounded-lg py-2 px-4 text-xs w-1/2 hover:bg-[#E9E9E9]">
            <FaApple className="text-lg" />
            Continue with Apple
          </button>
        </div>

        <p className="text-sm text-gray-600">
  Already have an account?{' '}
  <Link
    href="/log_in" // replace this with your actual route later
    className="text-blue-600 font-medium hover:underline"
  >
    Log in
  </Link>
</p>
      </div>
    </div>
  );
}
