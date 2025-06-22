"use client";
import { editStoryAction } from "@/actions";
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
import { Story } from "@/types";
import { Textarea } from "@/components/ui/textarea";
const EditStory = ({ story }: { story: Story }) => {
  const { user, token, refreshUserData } = useAuth();
  const initialState = { type: "", message: "" };
  type EditState = { type: string; message: string };

  const wrappedEditAction = async (
    prevState: EditState,
    formData: FormData
  ) => {
    const result = await editStoryAction(prevState, formData);

    if (result.type === "success") {
      refreshUserData?.(); // call refresh only on success
    }

    return result;
  };

  const [state, editAction, isPending] = useActionState(
    wrappedEditAction,
    initialState
  );
  if (!user || (user.id !== story.user_id && !user.is_admin)) {
    return null; // Don't render if user is not logged in or doesn't own the story
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          className="bg-[#553a5c] hover:bg-[#413743] text-white px-4 py-1 rounded-md cursor-pointer"
        >
          Edit <Edit className="h-4 w-4 inline-block ml-1" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Story</DialogTitle>
          <DialogDescription>
            Update your story details and save changes.
          </DialogDescription>
        </DialogHeader>
        <form action={editAction} className="space-y-4">
          <input type="hidden" name="storyId" value={story.id} />
          <input type="hidden" name="token" value={token || ""} />
          <input type="hidden" name="userId" value={user?.id || ""} />
          <div>
            <label className="block text-sm font-medium mb-1 text-[#553a5c]">
              Title
            </label>
            <input
              type="text"
              name="title"
              defaultValue={story.title}
              className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-[#553a5c]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-[#553a5c]">
              Content
            </label>
            <Textarea
              name="content"
              defaultValue={story.content}
              className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-[#553a5c] h-48 max-h-48 overflow-y-auto"
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

export default EditStory;
