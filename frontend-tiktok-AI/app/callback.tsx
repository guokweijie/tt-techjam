// app/callback.tsx
"use client";

import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Callback = () => {
  const router = useRouter();
  const { code, state } = router.query;

  useEffect(() => {
    if (code) {
      const fetchToken = async () => {
        try {
          const response = await axios.post("/api/tiktok-auth", { code });
          console.log("User Info:", response.data);
        } catch (error) {
          console.error("Error fetching token:", error);
        }
      };

      fetchToken();
    }
  }, [code]);

  return <div>Loading...</div>;
};

export default Callback;
