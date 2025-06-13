"use client";
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
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LoaderPinwheel } from "lucide-react";
import { deleteCommentAction } from "@/actions";
import { StoryComment } from "@/types";
import { Trash } from "lucide-react";

const DeleteComment = ({ comment }: { comment: StoryComment }) => {
  const { user, token } = useAuth();

  const initialState = { type: "", message: "" };

  const [deleteState, deleteAction, isDeletePending] = useActionState(
    deleteCommentAction,
    initialState
  );

  if (!user || user.id !== comment.user_id) {
    console.warn("User not authorized to delete this comment");
    return null; // Don't render if user is not logged in or doesn't own the comment
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          className="bg-red-950 hover:bg-red-900 text-white px-4 py-1 rounded-md cursor-pointer"
        >
          <Trash className="h-4 w-4 inline-block  " />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Comment</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this comment? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <form action={deleteAction}>
          <input type="hidden" name="commentId" value={comment.id} />
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
                "Delete Comment"
              )}
            </Button>
            <Button type="button" variant="secondary" data-dialog-close>
              Cancel
            </Button>
            {deleteState.type && (
              <div
                className={
                  deleteState.type === "success"
                    ? "text-green-600 mt-2"
                    : "text-red-600 mt-2"
                }
              >
                {deleteState.message}
              </div>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteComment;
