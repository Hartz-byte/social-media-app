import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";

import Logo from "../assets/logo/Buzzz-Logo.jpg";

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [quote, setQuote] = useState("");
  const [username, setUsername] = useState("@");
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [profilePicPreview, setProfilePicPreview] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  // Handle file selection for the profile picture
  const handleProfilePicChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfilePic(file);
      setProfilePicPreview(URL.createObjectURL(file));
    }
  };

  const uploadProfilePic = async (file: File): Promise<string | null> => {
    const fileName = `${Date.now()}_${file.name}`;
    try {
      const { data, error } = await supabase.storage
        .from("profile-pictures")
        .upload(fileName, file);

      if (error) {
        console.error("Supabase storage upload error:", error);
        throw error;
      }

      const { data: publicURLData } = supabase.storage
        .from("profile-pictures")
        .getPublicUrl(data.path);

      if (!publicURLData) {
        throw new Error("Public URL retrieval failed.");
      }

      console.log("Uploaded profile picture URL:", publicURLData.publicUrl);
      return publicURLData.publicUrl;
    } catch (err) {
      console.error("Error uploading profile picture:", err);
      return null;
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Firebase authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const firebaseUid = userCredential.user.uid;
      let profilePicUrl = "";

      // Upload profile picture if provided
      if (profilePic) {
        const uploadedUrl = await uploadProfilePic(profilePic);
        if (uploadedUrl) {
          profilePicUrl = uploadedUrl;
        }
      }

      // Insert user data into Supabase
      const { error: supabaseError } = await supabase.from("users").insert([
        {
          firebase_uid: firebaseUid,
          name,
          username,
          profile_pic_url: profilePicUrl,
          quote,
        },
      ]);

      if (supabaseError) {
        throw supabaseError;
      }

      navigate("/login");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#1a1a1a]">
      {/* Left Half */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-4 py-8 md:py-0">
        <img
          src={Logo}
          alt="Buzzz Logo"
          className="w-48 h-48 md:w-64 md:h-64 object-contain"
        />
      </div>

      {/* Divider */}
      <div
        className="hidden md:block w-0.5 bg-[#222423]"
        style={{ height: "50vh", alignSelf: "center" }}
      />

      {/* Right Half */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-4">
        <form onSubmit={handleSignup} className="w-full max-w-sm space-y-4">
          {/* Sign Up Title */}
          <h2 className="text-xl font-bold text-white mb-4 text-center">
            Sign Up
          </h2>

          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

          {/* Profile Pic */}
          <div className="flex flex-col items-center mb-4">
            <label
              htmlFor="profilePic"
              className="block w-24 h-24 rounded-full bg-[#3B364C] flex justify-center items-center text-white cursor-pointer relative"
              style={{
                backgroundImage: profilePicPreview
                  ? `url(${profilePicPreview})`
                  : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {!profilePicPreview && <span>Upload</span>}
              <input
                type="file"
                id="profilePic"
                accept="image/*"
                className="hidden"
                onChange={handleProfilePicChange}
              />
            </label>
            <p className="text-sm text-gray-400 mt-2">Profile Picture</p>
          </div>

          {/* Name Input */}
          <div className="flex flex-col">
            <label htmlFor="name" className="text-white mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Full Name"
              className={`block w-full p-2 rounded ${
                focusedField === "name"
                  ? "border-2 border-[#9281BD]"
                  : "border-none"
              } bg-[#3B364C] text-white`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setFocusedField("name")}
              onBlur={() => setFocusedField(null)}
              required
            />
          </div>

          {/* Username Input */}
          <div className="flex flex-col">
            <label htmlFor="username" className="text-white mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              className={`block w-full p-2 rounded ${
                focusedField === "username"
                  ? "border-2 border-[#9281BD]"
                  : "border-none"
              } bg-[#3B364C] text-white`}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onFocus={() => setFocusedField("username")}
              onBlur={() => setFocusedField(null)}
              required
            />
          </div>

          {/* Email Input */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-white mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              className={`block w-full p-2 rounded ${
                focusedField === "email"
                  ? "border-2 border-[#9281BD]"
                  : "border-none"
              } bg-[#3B364C] text-white`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col">
            <label htmlFor="password" className="text-white mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className={`block w-full p-2 rounded ${
                focusedField === "password"
                  ? "border-2 border-[#9281BD]"
                  : "border-none"
              } bg-[#3B364C] text-white`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocusedField("password")}
              onBlur={() => setFocusedField(null)}
              required
            />
          </div>

          {/* Quote Input */}
          <div className="flex flex-col">
            <label htmlFor="quote" className="text-white mb-2">
              Favorite Quote
            </label>
            <input
              type="text"
              id="quote"
              placeholder="Your Quote"
              className={`block w-full p-2 rounded ${
                focusedField === "quote"
                  ? "border-2 border-[#9281BD]"
                  : "border-none"
              } bg-[#3B364C] text-white`}
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              onFocus={() => setFocusedField("quote")}
              onBlur={() => setFocusedField(null)}
            />
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full py-2 mt-4 bg-[#9281BD] text-white rounded flex justify-center items-center"
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
