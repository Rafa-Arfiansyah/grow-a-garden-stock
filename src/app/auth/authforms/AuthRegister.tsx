import { Button, Label, TextInput } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import LoadingSpinner from "../../components/LoadingAnimation";

const AuthRegister = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Kirim data registrasi ke backend
      const response = await axios.post(
        "/api/auth/register", // Endpoint backend
        { username, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Periksa apakah registrasi berhasil
      if (response.data.message === "User registered successfully") {
        // Bersihkan form
        setUsername("");
        setEmail("");
        setPassword("");

        // Arahkan ke halaman login
        router.push("/auth/login");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<{ error?: string }>;
        if (axiosError.response?.data?.error) {
          setError(axiosError.response.data.error);
        } else {
          setError("An error occurred during registration. Please try again.");
        }
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* Input Username */}
        <div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="name" value="Name" />
          </div>
          <TextInput
            id="name"
            type="text"
            sizing="md"
            className="form-control form-rounded-xl"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Enter your name"
            disabled={isLoading}
          />
        </div>

        {/* Input Email */}
        <div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="emadd" value="Email Address" />
          </div>
          <TextInput
            id="emadd"
            type="email"
            sizing="md"
            className="form-control form-rounded-xl"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
            disabled={isLoading}
          />
        </div>

        {/* Input Password */}
        <div className="mb-6">
          <div className="mb-2 block">
            <Label htmlFor="userpwd" value="Password" />
          </div>
          <TextInput
            id="userpwd"
            type="password"
            sizing="md"
            className="form-control form-rounded-xl"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
            disabled={isLoading}
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-red-500 text-sm p-2 bg-red-50 rounded-md mb-4">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          color="primary"
          className="w-full bg-primary text-white rounded-xl"
          disabled={isLoading}
        >
          Sign Up
        </Button>
      </form>
    </>
  );
};

export default AuthRegister;
