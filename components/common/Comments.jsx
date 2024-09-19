import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "@radix-ui/react-select";

export default function Comments({ comments, item }) {
  return (
    <div className="flex flex-col max-h-[700px] overflow-y-auto mt-2 p-2 scrollbar-hidden">
      {comments.length > 0 ? (
        comments.map((comment, index) => (
          <Card key={index} className="w-full mb-4 border-b border-gray-300 bg-white">
            <CardHeader className="p-2">
              <CardTitle className="flex items-center space-x-3">
                <Avatar className="cursor-pointer">
                  <AvatarImage 
                    src={item.Image || "https://github.com/shadcn.png"} 
                    className="w-12 h-12 rounded-full"
                  />
                  <AvatarFallback className="bg-gray-200 text-gray-500">
                    {item.authorInitials || "?"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-semibold">{item.author}</span>
                </div>
              </CardTitle>
            </CardHeader>
            <Separator/>
            <CardContent className="p-2 text-gray-700">
              <p className="font-bold">{comment}</p>
            </CardContent>
          </Card>
        ))
      ) : (
        <p className="text-center p-5 text-gray-500">아직 댓글이 없습니다...</p>
      )}
    </div>
  );
}
