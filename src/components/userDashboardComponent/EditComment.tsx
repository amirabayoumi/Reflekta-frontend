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
import { editCommentAction } from "@/actions";
import { StoryComment } from "@/types";

const EditComment = ({ comment }: { comment: StoryComment }) => {
  const { user, token } = useAuth();
  console.log(user);
  const initialState = { type: "", message: "" };
  const [editState, editAction, isEditPending] = useActionState(
    editCommentAction,
    initialState
  );

  if (!user || (user.id !== comment.user_id && !user.is_admin)) {
    console.warn(
      "User not authorized to edit this comment or no comments available"
    );
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          className="bg-[#553a5c] hover:bg-[#6b4b72] text-white px-3 py-1 rounded-md"
        >
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Comment</DialogTitle>
          <DialogDescription>
            Update your comment and save changes.
          </DialogDescription>
        </DialogHeader>
        <form action={editAction} className="space-y-4">
          <input type="hidden" name="commentId" value={comment.id} />
          <input type="hidden" name="token" value={token || ""} />
          <input type="hidden" name="userId" value={user?.id || ""} />
          <div>
            <label className="block text-sm font-medium mb-1 text-[#553a5c]">
              Content
            </label>
            <input
              type="text"
              name="content"
              defaultValue={comment.content}
              className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-[#553a5c]"
            />
          </div>
          <DialogFooter className="mt-4 flex gap-2">
            <Button
              type="submit"
              className="bg-[#553a5c] hover:bg-[#6b4b72] text-white"
              disabled={isEditPending}
            >
              {isEditPending ? (
                <LoaderPinwheel className="animate-spin mr-2" />
              ) : (
                "Save Changes"
              )}
            </Button>
            <Button type="button" variant="secondary" data-dialog-close>
              Cancel
            </Button>
          </DialogFooter>
          {editState.type && (
            <div
              className={
                editState.type === "success"
                  ? "text-green-600 mt-2"
                  : "text-red-600 mt-2"
              }
            >
              {editState.message}
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default EditComment;
