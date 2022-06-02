import { getComments } from "api/comment";
import useFetching from "hooks/useFetching";
import useObserver from "hooks/useObserver";
import { useEffect, useRef, useState } from "react";
import { post, comment } from "types/post";

const CommentsLogic = (post: post, setComments: (value: comment[]) => void) => {
  const comments = post.comments!;

  const [page, setPage] = useState<number>(0);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const container = useRef<any>();
  const lastElement = useRef<any>();


  const [fetchPosts, isFetching, error]: any = useFetching(async () => {
    const res = await getComments(Number(post.id), page);
    const data = res.data;

    let result = [...comments];

    for (let item of data.comments) {
      const comment = {
        ...item,
        isShowedAnswers: false
      }

      result.push(comment);
    }

    if (!data.hasNextPage) {
      setHasNextPage(false);
    }

    setComments(result);
  });

  useObserver(lastElement, isFetching, hasNextPage, () => {
    setPage(prev => prev + 1);
  });

  useEffect(() => {
    fetchPosts();
  }, [page]);

  return {
    comments,
    container,
    hasNextPage,
    lastElement
  }
}

export default CommentsLogic;
