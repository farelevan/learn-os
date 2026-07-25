"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User } from "../types/auth.types";

export function useDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [userName, setUserName] = useState<string>("Farel");
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState<boolean>(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const userObj: User = JSON.parse(storedUser);
        setUser(userObj);
        if (userObj.name) {
          setUserName(userObj.name.split(" ")[0]);
        }
      } catch (e) {
        console.error("Gagal membaca profil pengguna dari localStorage:", e);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return {
    user,
    userName,
    activeTab,
    setActiveTab,
    mobileSidebarOpen,
    setMobileSidebarOpen,
    profileDropdownOpen,
    setProfileDropdownOpen,
    handleLogout,
  };
}
