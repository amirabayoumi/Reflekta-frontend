"use client";
import { addNewStoryAction } from "@/actions";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
} from "@/components/ui/dialog";
import { LoaderPinwheel } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function ShareStoryButton() {
  const initialState = { type: "", message: "" };

  const { user } = useAuth();

  const [state, action, isPending] = useActionState(
    addNewStoryAction,
    initialState
  );

  // If user is not logged in, show message instead of dialog
  if (!user) {
    return (
      <div className="bg-white/70 backdrop-blur-sm shadow-sm rounded-lg p-4 border border-gray-200">
        <p className="text-gray-700 text-center">
          <span className="font-medium text-[#553a5c] block mb-1">
            Sign in to share your story
          </span>
          Join our community to share your experiences and connect with others
        </p>
      </div>
    );
  }

  return (
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
      <DialogTrigger asChild>
        <Button className="bg-[#553a5c] hover:bg-[#937195] text-white">
          Let Your Story Float
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Share Your Story</DialogTitle>
          <p className="text-sm text-gray-500">
            All fields marked with <span className="text-red-500">*</span> are
            required.
          </p>
        </DialogHeader>

        <form action={action} className="mt-4">
          {/* Use user_id from auth context instead of hardcoded value */}
          <input type="hidden" name="userId" value={user.id} />
          <div className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Title <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                type="text"
                name="title"
                placeholder="Story Title"
                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#553a5c]"
              />
            </div>

            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Content <span className="text-red-500">*</span>
              </label>
              <textarea
                id="content"
                name="content"
                placeholder="Write your story here..."
                className="border border-gray-300 rounded-md p-2 w-full min-h-[200px] focus:outline-none focus:ring-2 focus:ring-[#553a5c]"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <Button
              type="submit"
              disabled={isPending}
              className="bg-[#553a5c] hover:bg-[#937195] text-white"
            >
              {isPending ? (
                <>
                  <LoaderPinwheel className="animate-spin mr-2" /> Submitting...
                </>
              ) : (
                "Share Your Story"
              )}
            </Button>
          </div>
        </form>
        {state.type && (
          <div
            className={`mt-4 p-3 rounded-md ${
              state.type === "success"
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            {state.message}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
