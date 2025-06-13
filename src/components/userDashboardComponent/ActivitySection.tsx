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
import { editCommentAction, deleteCommentAction } from "@/actions";

const ActivitySection = () => {
  const { userComments, user, token } = useAuth();

  const initialState = { type: "", message: "" };
  const [editState, editAction, isEditPending] = useActionState(
    editCommentAction,
    initialState
  );
  const [deleteState, deleteAction, isDeletePending] = useActionState(
    deleteCommentAction,
    initialState
  );

  return (
    <div className="bg-white/80 rounded-lg shadow p-6 max-w-xl w-full mx-auto mt-8">
      <h2 className="text-xl font-semibold text-[#553a5c] mb-4">
        Your Comments
      </h2>
      {userComments && userComments.length > 0 ? (
        <ul className="space-y-4">
          {userComments.map((comment) => (
            <li key={comment.id} className="border-b pb-3 flex flex-col gap-2">
              <div className="text-gray-800">{comment.content}</div>
              <div className="text-xs text-gray-400 mt-1">
                {new Date(comment.created_at).toLocaleString()}
              </div>
              <div className="flex gap-2 mt-2">
                {/* Edit Dialog */}
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
                        <Button
                          type="button"
                          variant="secondary"
                          data-dialog-close
                        >
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
                {/* Delete Dialog */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      type="button"
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md"
                    >
                      Delete
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete Comment</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete this comment? This action cannot be undone.
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
                        <Button
                          type="button"
                          variant="secondary"
                          data-dialog-close
                        >
                          Cancel
                        </Button>
                      </DialogFooter>
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
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-gray-500 text-center">No comments found.</div>
      )}
    </div>
  );
};
export default ActivitySection;
