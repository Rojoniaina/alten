import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  id: string;
  username: string;
  email: string;
  exp: number;
}

export function useAuth() {
  const [decoded, setDecoded] = useState<JwtPayload | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const payload = jwtDecode<JwtPayload>(token);
        setDecoded(payload);
      } catch (err) {
        console.error("Token invalide", err);
        setDecoded(null);
      }
    }
  }, []);

  return {
    isAdimn: decoded && decoded?.email === "admin@admin.com",
  };
}
