"use client";
import { deleteProfileAction } from "@/actions";
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
import { LoaderPinwheel, Trash2 } from "lucide-react";

const DeleteProfile = () => {
  const { user, token, refreshUserData } = useAuth();
  const initialState = { type: "", message: "" };
  const wrappedDeleteAction = async (
    prevState: { type: string; message: string },
    formData: FormData
  ) => {
    const result = await deleteProfileAction(prevState, formData);

    if (result.type === "success") {
      refreshUserData?.();
    }

    return result;
  };

  const [deleteState, deleteAction, isDeletePending] = useActionState(
    wrappedDeleteAction,
    initialState
  );

  if (!user) {
    return null; // Don't render if user is not logged in or doesn't own the story
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-[#9c2b2b] to-[#e05252] hover:opacity-90 text-white gap-2 px-8 py-6 text-lg font-medium rounded-xl shadow-md flex-1 sm:max-w-[200px]">
          <Trash2 size={22} />
          Delete Profile
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Profile</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete your profile? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <form action={deleteAction}>
          <input type="hidden" name="token" value={token || ""} />
          <input type="hidden" name="id" value={user?.id} />
          <DialogFooter className="mt-4 flex gap-2">
            <Button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white"
              disabled={isDeletePending}
            >
              {isDeletePending ? (
                <LoaderPinwheel className="animate-spin mr-2" />
              ) : (
                "Delete permanently"
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

export default DeleteProfile;
