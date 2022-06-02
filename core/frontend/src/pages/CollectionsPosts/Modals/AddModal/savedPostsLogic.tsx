import {useEffect, useRef, useState} from "react";
import {post} from "types/post";
import useFetching from "hooks/useFetching";
import axios from "axios";
import useObserver from "hooks/useObserver";

const SavedPostsLogic = () => {
  const [savedPosts, setSavedPosts] = useState<post[]>([]);
  const [page, setPage] = useState<number>(0);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const lastElement = useRef<any>();

  const [fetchPosts, isFetching, error]: any = useFetching(async () => {
    const formData = new FormData();
    formData.append("collection_id", String(0));
    formData.append("page", String(page));

    const res = await axios.post("http://127.0.0.1:8000/api/collection/get", formData);
    const data = res.data;

    setSavedPosts([
      ...savedPosts,
      ...data.posts
    ]);

    if (!data.hasNextPage) {
      setHasNextPage(data.hasNextPage);
    }
  });

  useObserver(lastElement, isFetching, hasNextPage, () => {
    setPage(prev => prev + 1);
  });

  useEffect(() => {
    fetchPosts();
  }, [page]);

  return {
    savedPosts,
    hasNextPage,
    lastElement
  }
}

export default SavedPostsLogic;
