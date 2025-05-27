"use client";

import { useState } from "react";

interface JoinEventButtonProps {
  eventId: number;
}

export default function JoinEventButton({ eventId }: JoinEventButtonProps) {
  const [joining, setJoining] = useState(false);
  const [joined, setJoined] = useState(false);

  const handleJoin = async () => {
    try {
      setJoining(true);

      // Here we would make an API call to join the event

      // Simulate API call using eventId to avoid unused variable warning
      await new Promise((resolve) => setTimeout(resolve, 800));
      console.log("Joining event with ID:", eventId);

      setJoined(true);
    } catch (error) {
      console.error("Failed to join event:", error);
      alert("Failed to join event. Please try again.");
    } finally {
      setJoining(false);
    }
  };

  if (joined) {
    return (
      <div className="bg-green-50 text-green-700 px-6 py-3 rounded-lg border border-green-200 flex items-center">
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          ></path>
        </svg>
        You&#39;re attending this event!
      </div>
    );
  }

  return (
    <button
      onClick={handleJoin}
      disabled={joining}
      className="bg-[#553a5c] hover:bg-[#937195] text-white px-8 py-3 rounded-lg transition-colors disabled:opacity-70"
    >
      {joining ? "Joining..." : "Join Event"}
    </button>
  );
}
