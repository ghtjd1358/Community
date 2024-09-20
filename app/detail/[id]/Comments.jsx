"use client"

import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Separator } from "@radix-ui/react-select";
import { fetchComments, fetchCommentsPost } from "@/redux/features/commentSlice";
import { Input } from "../../../components/ui/input";
import { Button } from "@/components/ui/button";

export default function Comments({item}) {
  const dispatch = useDispatch();
  const { comments, loading, error } = useSelector(state => state.comment);
  const [newComment, setNewComment] = useState(""); 

  useEffect(() => {
    dispatch(fetchComments(item._id));
  }, [dispatch]);

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      const commentsList = {
        _id: item._id,
        comment: newComment,
      };
      dispatch(fetchCommentsPost(commentsList));
      setNewComment("");
    }
  };

  return (

<Card className="w-[30%] border shadow-none ml-5 overflow-y-auto">
          <CardContent>
          <div className="flex flex-col max-h-[650px]">
      {comments.length > 0 ? (
        comments.map((comment) => (
          <Card key={comment._id} className="w-[100%] p-1 rounded-none shadow-none">
            <CardHeader className="p-2">
              <CardTitle className="flex items-center space-x-2">
                <Avatar className="cursor-pointer">
                  <AvatarImage 
                    src={comment.image || "https://github.com/shadcn.png"} 
                    className="w-5 h-5 rounded-full"
                  />
                  <AvatarFallback className="bg-gray-200 text-grey-400">
                    {comment.authorInitials || "?"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-semibold opacity-50 text-sm">{comment.author}</span>
                </div>
              </CardTitle>
            </CardHeader>
            <Separator/>
            <CardContent className="p-2">
              <p className="font-bold text-sm">{comment.content}</p>
            </CardContent>
          </Card>
        ))
      ) : (
        <p className="text-center p-5 text-gray-500">아직 댓글이 없습니다...</p>
      )}
    </div>
          </CardContent>
          <Separator />
          <CardFooter className="w-full fixed bottom-0 left-0 right-0 flex flex-col p-4 space-y-2">
            <Input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="댓글을 입력해주세요"
              className="text-white bg-gray-800 border-none p-2 rounded-md"
            />
            <Button onClick={handleAddComment} className="w-full bg-blue-600 text-white hover:bg-blue-700">
              댓글 추가
            </Button>
          </CardFooter>
        </Card>
  );
}
