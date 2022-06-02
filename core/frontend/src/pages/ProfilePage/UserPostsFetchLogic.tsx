import {useEffect, useRef, useState} from "react";
import useFetching from "hooks/useFetching";
import axios from "axios";
import useObserver from "hooks/useObserver";
import {useAppDispatch, useAppSelector} from "hooks/redux";
import {useParams} from "react-router-dom";
import {postsReducer} from "context/postsReducer/reducer";
import usePrevious from "hooks/usePrevious";

const UserPostsFetchLogic = () => {
  const { username } = useParams();
  const user = useAppSelector(state => state.userReducer);

  const posts = useAppSelector(state => state.postsReducer.posts);
  const hasNextPage = useAppSelector(state => state.postsReducer.hasNextPage);
  const [page, setPage] = useState<number>(Math.floor(posts.length / 12));
  const dispatch = useAppDispatch();
  const prevPage = usePrevious(page);

  const lastElement = useRef<any>();

  const [fetchPosts, isFetching, error]: any = useFetching(async () => {
    const formData = new FormData();
    const { addPosts, setHasNextPage } = postsReducer.actions;

    formData.append("username", username!);
    formData.append("page", String(page));

    const res = await axios.post("http://127.0.0.1:8000/user/posts", formData);
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
    if (prevPage === undefined && posts.length > 0) return;
    fetchPosts();
  }, [page]);

  useEffect(() => {
    if (username !== user.username) {
      window.scrollTo(0, 0);
    }
  }, [username]);

  return {
    lastElement,
    hasNextPage,
    isFetching,
    posts,
    setPage
  }
}

export default UserPostsFetchLogic;
