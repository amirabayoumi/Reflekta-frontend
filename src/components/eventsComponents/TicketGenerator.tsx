"use client";

import { useEffect } from "react";
import { downloadTicket } from "@/actions";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LoaderPinwheel, Download, Ticket } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import type { TicketGeneratorProps } from "@/types";

const TicketGenerator = ({ event }: TicketGeneratorProps) => {
  // Use auth context instead of manual cookie checks
  const { user } = useAuth();
  const isLoggedIn = !!user;

  const initialState = { type: "", message: "", pdfData: "" };
  const [message, action, isPending] = useActionState(
    downloadTicket,
    initialState
  );

  // Format dates for the ticket
  const eventStartDate = new Date(event.start_date);
  const eventEndDate = new Date(event.end_date);

  // Format dates as readable strings
  const formattedStartDate = eventStartDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const formattedEndDate = eventEndDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // Calculate duration in hours
  const differenceMs = eventEndDate.getTime() - eventStartDate.getTime();
  const totalHours = Math.ceil(differenceMs / (1000 * 60 * 60));

  let formattedDuration = "";

  if (totalHours < 24) {
    formattedDuration = `${totalHours} ${totalHours === 1 ? "hour" : "hours"}`;
  } else {
    const totalDays = Math.ceil(totalHours / 24);
    formattedDuration = `${totalDays} ${totalDays === 1 ? "day" : "days"}`;
  }

  // Handle PDF download when data is received
  useEffect(() => {
    if (message.type === "success" && message.pdfData) {
      // Convert base64 back to blob and trigger download
      const binaryData = atob(message.pdfData);
      const bytes = new Uint8Array(binaryData.length);
      for (let i = 0; i < binaryData.length; i++) {
        bytes[i] = binaryData.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: "application/pdf" });

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${event.title}-ticket.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      console.log("✅ PDF downloaded successfully.");
    }
  }, [message, event.title]);

  return (
    <div className="border-t border-gray-200 pt-6 mt-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {isLoggedIn ? (
          <>
            <p className="text-gray-600">
              Enjoy our free tickets for all community events!
            </p>
            <Dialog
              onOpenChange={(open) => {
                if (open) {
                  // Reset state when dialog opens
                  const formData = new FormData();
                  formData.set("reset", "true");
                  action(formData);
                }
              }}
            >
              <DialogTrigger>
                <div className="bg-gradient-to-r from-lavender to-[#9e86a2] text-white px-5 py-2.5 rounded-full flex items-center gap-2.5 hover:from-[#9e86a2] hover:to-lavender shadow-md transition-all duration-300 transform hover:scale-105 font-medium border border-[#ffffff20]">
                  Get Tickets
                  <Ticket className="h-4.5 w-4.5 transition-transform group-hover:rotate-12" />
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Get Tickets for {event.title} Event</DialogTitle>

                <div>
                  <form action={action}>
                    <input type="hidden" name="eventname" value={event.title} />
                    <input
                      type="hidden"
                      name="eventLocation"
                      value={event.location}
                    />
                    <input
                      type="hidden"
                      name="eventStartDate"
                      value={formattedStartDate}
                    />
                    <input
                      type="hidden"
                      name="eventEndDate"
                      value={formattedEndDate}
                    />
                    <input
                      type="hidden"
                      name="eventDuration"
                      value={formattedDuration}
                    />
                    <input
                      type="hidden"
                      name="eventOrganizer"
                      value={event.organizer || "Reflekta Community"}
                    />
                    <input
                      type="hidden"
                      name="userEmail"
                      value={user?.email || ""}
                    />

                    <div className="mb-4">
                      <label
                        htmlFor="numberOfAdults"
                        className="block text-sm font-medium mb-1"
                      >
                        Number of tickets:
                      </label>
                      <input
                        id="numberOfAdults"
                        type="number"
                        name="numberOfAdults"
                        defaultValue="1"
                        min="1"
                        max={10}
                        className="w-full p-2 border rounded-md"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isPending}
                      className="w-full"
                    >
                      {isPending ? (
                        <LoaderPinwheel className="h-4 w-4 animate-spin mr-2" />
                      ) : (
                        <>
                          <Download className="h-4 w-4 mr-2" /> Download Ticket
                        </>
                      )}
                    </Button>

                    {message.message && (
                      <p
                        className={`mt-3 text-sm ${
                          message.type === "error"
                            ? "text-red-500"
                            : "text-green-500"
                        }`}
                      >
                        {message.message}
                      </p>
                    )}
                  </form>
                </div>
              </DialogContent>
            </Dialog>
          </>
        ) : (
          <>
            <p className="text-gray-600">
              Reflekta members get free access to all events. Sign in or sign up
              to claim your free tickets and join the community at no cost.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default TicketGenerator;
