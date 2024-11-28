import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";

export default function ConnectedBadge() {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const healthCheck = async () => {
      try {
        const healthCheckEndpoint = `${import.meta.env.VITE_API_BASE_URL}/ping`;
        console.log(healthCheckEndpoint);
        const res = await fetch(healthCheckEndpoint);
        if (res.status === 200) {
          setConnected(true);
        } else {
          setConnected(false);
        }
      } catch (error) {
        setConnected(false);
        console.log(error);
      }
    };

    const health = setInterval(() => {
      healthCheck();
    }, 5000);

    return () => {
      clearInterval(health);
    };
  }, []);

  return (
    <>
      {connected ? (
        <Badge variant="default" className="text-green-200 bg-green-700">
          Connected
        </Badge>
      ) : (
        <Badge variant="destructive">Disconnected</Badge>
      )}
    </>
  );
}
