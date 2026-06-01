import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { PostListItem } from "../components/post-list-item.tsx";
import { type PostRecord } from "../lib/api.ts";

export default function PostList({
  posts: initialPosts,
}: {
  posts: PostRecord[];
}) {
  const posts = useSignal(initialPosts);

  useEffect(() => {
    posts.value = initialPosts;
  }, [initialPosts]);

  return (
    <>
      {posts.value?.map((record) => {
        const post = record.value;
        const rkey = record.uri.split("/").pop() || "";
        return <PostListItem key={record.uri} post={post} rkey={rkey} />;
      })}
    </>
  );
}
