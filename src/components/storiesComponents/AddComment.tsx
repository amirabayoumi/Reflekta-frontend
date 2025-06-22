"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useActionState } from "react";
import { addCommentToStoryAction } from "@/actions";
import { LoaderPinwheel } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { MessageCirclePlus } from "lucide-react";

const AddComment = ({ storyId }: { storyId: number }) => {
  const initialState = { type: "", message: "" };
  const [state, action, isPending] = useActionState(
    addCommentToStoryAction,
    initialState
  );
  const { user, token } = useAuth();

  const tokenValue = token || "";

  if (!user) {
    return (
      <div className="p-6 md:p-8 flex flex-col items-center">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center w-full max-w-md">
          <p className="text-gray-600 mb-2">Sign in to leave a comment</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 flex flex-col items-center">
      <Collapsible className="w-full max-w-md">
        <div className="flex justify-center">
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="rounded-full px-4 py-2">
              <MessageCirclePlus className="h-5 w-5 text-[#553a5c] mr-2" />
              Add Comment
            </Button>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent className="mt-4">
          <form className="space-y-4" action={action}>
            <input type="hidden" name="storyId" value={storyId} />
            <input type="hidden" name="token" value={tokenValue} />

            <div>
              <Textarea
                name="content"
                placeholder="Write your comment here..."
                className="min-h-[120px] resize-none border-gray-200 focus:border-[#553a5c] focus:ring-[#553a5c]"
              />
            </div>
            <div className="flex flex-col items-end">
              <Button
                type="submit"
                className="bg-[#553a5c] hover:bg-[#886f80] text-white"
                disabled={isPending}
              >
                {isPending ? (
                  <LoaderPinwheel className="animate-spin mr-2" />
                ) : (
                  "Add your Comment"
                )}
              </Button>

              {state.message && (
                <div
                  className={`mt-3 text-sm px-3 py-1.5 rounded-md ${
                    state.type === "error"
                      ? "bg-red-50 text-red-600"
                      : state.type === "success"
                      ? "bg-green-50 text-green-600"
                      : "text-gray-600"
                  }`}
                >
                  {state.message}
                </div>
              )}
            </div>
          </form>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};
export default AddComment;
