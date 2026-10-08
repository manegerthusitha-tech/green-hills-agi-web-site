"use client";

import { useState } from "react";
import { Leaf, Lock, User, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      
      if (res.ok && data.success) {
        window.location.href = "/admin/dashboard";
      } else {
        setError(data.message || "Invalid username or password");
        setLoading(false);
      }
    } catch {
      setError("An network error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-border p-8">
        
        {/* Header */}
        <div className="flex flex-col items-center justify-center text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
            <Leaf className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold font-outfit text-foreground">Admin Portal</h1>
          <p className="text-muted-foreground text-sm mt-1">Sign in to manage your website</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center border border-red-100">
              {error}
            </div>
          )}

          <div className="space-y-1">
            <label className="text-sm font-medium text-foreground">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                placeholder="Enter username"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-foreground">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input 
                type={showPassword ? "text" : "password"} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-10 py-3 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                placeholder="Enter password"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full h-12 text-base font-semibold" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          Protected area. Authorized personnel only.<br/>
          &copy; {new Date().getFullYear()} Green Hills Agriculture.
        </div>
      </div>
    </div>
  );
}
