"use client";
import { deleteStoryAction } from "@/actions";
import { useAuth } from "@/hooks/useAuth";
import { useActionState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
  DialogFooter,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LoaderPinwheel, Trash } from "lucide-react";
import { Story } from "@/types";

const DeleteStory = ({ story }: { story: Story }) => {
  const initialState = { type: "", message: "" };

  const [deleteState, deleteAction, isDeletePending] = useActionState(
    deleteStoryAction,
    initialState
  );
  const { user, token } = useAuth();

  if (!user || user.id !== story.user_id) {
    console.warn("User not authorized to delete this story");
    return null; // Don't render if user is not logged in or doesn't own the story
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          className="bg-plum hover:bg-red-900 text-white px-4 py-1 rounded-md cursor-pointer"
        >
          Delete <Trash className="h-4 w-4 inline-block ml-1" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Story</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this story? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <form action={deleteAction}>
          <input type="hidden" name="storyId" value={story.id} />
          <input type="hidden" name="token" value={token || ""} />
          <input type="hidden" name="userId" value={user?.id || ""} />
          <DialogFooter className="mt-4 flex gap-2">
            <Button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white"
              disabled={isDeletePending}
            >
              {isDeletePending ? (
                <LoaderPinwheel className="animate-spin mr-2" />
              ) : (
                "Delete Story"
              )}
            </Button>{" "}
            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
                className="bg-gray-200 hover:bg-gray-300 text-gray-800"
              >
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
          {deleteState.type && (
            <div
              className={
                deleteState.type === "success"
                  ? "text-green-950 mt-2"
                  : "text-red-950 mt-2"
              }
            >
              {deleteState.message}
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteStory;
