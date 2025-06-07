import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { MessageCirclePlus } from "lucide-react";
const AddComment = () => {
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
          <form className="space-y-4">
            <div>
              <Textarea
                placeholder="Write your comment here..."
                className="min-h-[120px] resize-none border-gray-200 focus:border-[#553a5c] focus:ring-[#553a5c]"
              />
            </div>
            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-[#553a5c] hover:bg-[#886f80] text-white"
              >
                Post Comment
              </Button>
            </div>
          </form>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};
export default AddComment;
