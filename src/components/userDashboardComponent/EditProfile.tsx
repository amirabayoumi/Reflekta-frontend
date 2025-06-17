"use client";
import { editUserProfileAction } from "@/actions";
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
import { LoaderPinwheel, Edit } from "lucide-react";

const EditProfile = () => {
  const { user, token, refreshUserData } = useAuth();
  const initialState = { type: "", message: "" };
  type EditState = { type: string; message: string };

  const wrappedEditAction = async (
    prevState: EditState,
    formData: FormData
  ) => {
    const result = await editUserProfileAction(prevState, formData);

    if (result.type === "success") {
      refreshUserData?.(); // call refresh only on success
    }

    return result;
  };

  const [state, editAction, isPending] = useActionState(
    wrappedEditAction,
    initialState
  );
  if (!user) {
    return null; // Don't render if user is not logged in or doesn't own the story
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-[#553a5c] to-[#937195] hover:opacity-90 text-white gap-2 px-8 py-6 text-lg font-medium rounded-xl shadow-md flex-1 sm:max-w-[200px]">
          <Edit size={22} />
          Edit Profile Name
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile Name</DialogTitle>
          <DialogDescription>
            Update your profile name and save changes.
          </DialogDescription>
        </DialogHeader>
        <form action={editAction} className="space-y-4">
          <input type="hidden" name="token" value={token || ""} />
          <input type="hidden" name="id" value={user?.id || ""} />
          <div>
            <label className="block text-sm font-medium mb-1 text-[#553a5c]">
              Name
            </label>
            <input
              type="text"
              name="name"
              defaultValue={user.name}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#553a5c] transition-colors"
            />
          </div>

          <DialogFooter className="mt-4 flex gap-2">
            <Button
              type="submit"
              className="bg-[#553a5c] hover:bg-[#6b4b72] text-white"
              disabled={isPending}
            >
              {isPending ? (
                <LoaderPinwheel className="animate-spin mr-2" />
              ) : (
                "Save Changes"
              )}
            </Button>
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
          {state.type && (
            <div
              className={
                state.type === "success"
                  ? "text-green-600 mt-2"
                  : "text-red-600 mt-2"
              }
            >
              {state.message}
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;
