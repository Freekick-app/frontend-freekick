import { useEffect } from "react";

export default function CheckOrder() {
  // redirect to home
  useEffect(() => {
    window.location.href = "/";
  }, []);
  return (
    <div className="w-full">
      <h1 className="text-white text-center text-2xl">Redirecting...</h1>
    </div>
  );
}
