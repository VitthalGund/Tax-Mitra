"use client";
import React, { useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";

export default function Page({ params }) {
  const { user, isLoaded } = useUser();
  const videoContainerRef = useRef(null);

  useEffect(() => {
    if (!isLoaded || !user?.id || !videoContainerRef.current) return;

    // Dynamically import Zego UIKit inside useEffect (client-side only)
    import("@zegocloud/zego-uikit-prebuilt").then((module) => {
      const appID = parseInt(process.env.NEXT_PUBLIC_APP_ID, 10);
      const serverSecret = process.env.NEXT_PUBLIC_SERVER_SEC;

      if (!appID || !serverSecret) {
        console.error("Zego App ID or Server Secret is missing!");
        return;
      }

      const kitToken = module.ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        params.id,
        user.id,
        user.fullName || "Guest"
      );

      const zp = module.ZegoUIKitPrebuilt.create(kitToken);
      zp.joinRoom({
        container: videoContainerRef.current,
        sharedLinks: [
          {
            name: "Meet Link",
            url: window.location.href,
          },
        ],
        scenario: {
          mode: module.ZegoUIKitPrebuilt.VideoConference,
        },
      });
    });
  }, [params, user, isLoaded]);

  return <div ref={videoContainerRef} className="w-screen h-screen" />;
}
