"use client";
import { editStoryAction, deleteStoryAction } from "@/actions";
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
import { LoaderPinwheel, Edit, Trash } from "lucide-react";
const ContentSection = () => {
  const initialState = { type: "", message: "" };
  const [state, editAction, isPending] = useActionState(
    editStoryAction,
    initialState
  );
  const [deleteState, deleteAction, isDeletePending] = useActionState(
    deleteStoryAction,
    initialState
  );
  const { userStories, user, token } = useAuth();

  return (
    <div className="flex flex-col items-center justify-start min-h-[60vh] w-full">
      <h2 className="text-2xl font-bold mb-6 text-[#553a5c]">Your Stories</h2>
      {userStories && userStories.length > 0 ? (
        <ul className="w-full max-w-2xl space-y-6">
          {userStories.map((story) => (
            <li
              key={story.id}
              className="bg-white/80 shadow rounded-lg p-5 border border-gray-200 flex flex-col gap-2"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold text-[#553a5c]">
                      {story.title}
                    </span>
                    {/* Show published status using is_published */}
                    {story.is_published ? (
                      <span className="inline-block px-2 py-0.5 text-xs rounded bg-green-100 text-green-700 border border-green-200">
                        Published
                      </span>
                    ) : (
                      <span className="inline-block px-2 py-0.5 text-xs rounded bg-yellow-100 text-yellow-700 border border-yellow-200">
                        still in review by admin
                      </span>
                    )}
                  </div>
                  <div className="text-gray-700 mt-1">{story.content}</div>
                </div>
                <div className="flex gap-2 mt-2 md:mt-0">
                  {/* Edit Dialog */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        type="button"
                        className="bg-[#553a5c] hover:bg-[#6b4b72] text-white px-4 py-1 rounded-md"
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
                        <input
                          type="hidden"
                          name="userId"
                          value={user?.id || ""}
                        />
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
                          <input
                            type="text"
                            name="content"
                            defaultValue={story.content}
                            className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-[#553a5c]"
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
                          <Button
                            type="button"
                            variant="secondary"
                            data-dialog-close
                          >
                            Cancel
                          </Button>
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
                  {/* Delete Dialog */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button type="button" className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md">
                        <Trash className="h-4 w-4 " />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Delete Story</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to delete this story? This
                          action cannot be undone.
                        </DialogDescription>
                      </DialogHeader>
                      <form action={deleteAction}>
                        <input type="hidden" name="storyId" value={story.id} />
                        <input type="hidden" name="token" value={token || ""} />
                        <input
                          type="hidden"
                          name="userId"
                          value={user?.id || ""}
                        />
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
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="bg-white/80 rounded-lg shadow p-8 text-center text-gray-500 mt-10">
          <p>No stories found.</p>
        </div>
      )}
    </div>
  );
};

export default ContentSection;
