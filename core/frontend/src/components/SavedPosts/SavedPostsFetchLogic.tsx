import {useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {useAppDispatch, useAppSelector} from "hooks/redux";
import useFetching from "hooks/useFetching";
import useObserver from "hooks/useObserver";
import axios from "axios";
import {postsReducer} from "context/postsReducer/reducer";

const SavedPostsFetchLogic = (collectionId: number) => {
  const params = useParams();
  const [id] = useState<number>(typeof params.id === "string" && params.id !== "all-posts" ? Number(params.id) : 0);
  const posts = useAppSelector(state => state.postsReducer.posts);
  const hasNextPage = useAppSelector(state => state.postsReducer.hasNextPage);
  const [page, setPage] = useState<number>(Math.floor(posts?.length / 12));
  const dispatch = useAppDispatch();
  const lastElement = useRef<any>();

  const { clearPosts, setHasNextPage, addPosts } = postsReducer.actions;

  const [fetchPosts, isFetching, error]: any = useFetching(async () => {
    const formData = new FormData();
    formData.append("collection_id", String(id));
    formData.append("page", String(page));

    const res = await axios.post("http://127.0.0.1:8000/api/collection/get", formData);
    const data = res.data;

    dispatch(addPosts(data.posts));

    if (!data.hasNextPage) {
      dispatch(setHasNextPage(data.hasNextPage));
    }
  });

  useObserver(lastElement, isFetching, hasNextPage, () => {
    setPage(prev => prev + 1);
  });

  useEffect(() => {
    fetchPosts();
  }, [page]);


  useEffect(() => {
    return () => {
      dispatch(clearPosts())
    }
  }, [])
  return {
    posts,
    isFetching,
    hasNextPage,
    lastElement
  }
}

export default SavedPostsFetchLogic;
