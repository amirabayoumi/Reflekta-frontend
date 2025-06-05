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
import { LoaderPinwheel } from "lucide-react";
import { Download, Ticket } from "lucide-react";

interface TicketGeneratorProps {
  event: {
    id: number | string;
    title: string;
    start_date: string;
    location: string;
    organizer?: string;
  };
}

const TicketGenerator = ({ event }: TicketGeneratorProps) => {
  const initialState = { type: "", message: "", pdfData: "" };
  const [message, action, isPending] = useActionState(
    downloadTicket,
    initialState
  );

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
    <Dialog>
      <DialogTrigger>
        <div className="bg-lavender  text-black px-4 py-2 rounded-full flex items-center gap-2 hover:bg-beige transition-colors duration-300">
          Get Tickets <Ticket className="h-4 w-4" />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Get Tickets for {event.title} Event</DialogTitle>

        <div>
          <form action={action}>
            <input type="hidden" name="eventname" value={event.title} />
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

            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? (
                <LoaderPinwheel className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" /> download Ticket
                </>
              )}
            </Button>

            {message.message && (
              <p
                className={`mt-3 text-sm ${
                  message.type === "error" ? "text-red-500" : "text-green-500"
                }`}
              >
                {message.message}
              </p>
            )}
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TicketGenerator;
