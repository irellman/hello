import {useAppDispatch, useAppSelector} from "hooks/redux";
import Header from "components/Header";
import PostsFeed from "components/PostsFeed";
import {useParams} from "react-router-dom";
import {useEffect, useMemo, useState} from "react";
import {getCollections} from "context/collectionsReducer/actions";
import {postsReducer} from "../../context/postsReducer/reducer";
import axios from "axios";

const SavedPostsFeed = () => {
  const windowWidth = useAppSelector(state => state.appReducer.width);

  const params = useParams();
  const id = useMemo(() => {
    return params.id === "all-posts" ? 0 : Number(params.id)
  }, [params.id])
  const collections = useAppSelector(state => state.collectionsReducer);
  const collection = collections.find(item => {
    return item.id === id
  })!

  const posts = useAppSelector(state => state.postsReducer.posts);
  const hasNextPage = useAppSelector(state => state.postsReducer.hasNextPage);
  const [page, setPage] = useState<number>(Math.floor(posts?.length / 12) || 0);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    document.addEventListener("scroll", fetchOnScroll);

    if (collections.length === 0) {
      dispatch(getCollections());
    }

    if (!posts) {
      setIsFetching(true);
    }

    return () => {
      document.removeEventListener("scroll", fetchOnScroll);
    }
  }, []);

  const fetchOnScroll = () => {
    let scrollHeight = document.documentElement.scrollHeight,
      scrollTop = document.documentElement.scrollTop,
      innerHeight = window.innerHeight;

    if (scrollHeight - (scrollTop + innerHeight) < 500 && hasNextPage && !isFetching) {
      setIsFetching(true);
    }
  }

  useEffect(() => {
    if (!isFetching || !hasNextPage) {
      return;
    }
    fetchPosts();
  }, [isFetching, hasNextPage]);

  const fetchPosts = async () => {
    const formData = new FormData();
    const { addPosts, setHasNextPage } = postsReducer.actions;
    formData.append("collection_id", String(id));
    formData.append("page", String(page));

    const res = await axios.post("http://127.0.0.1:8000/api/collection/get", formData);
    const data = res.data;

    dispatch(addPosts(data.posts));

    if (!data.hasNextPage) {
      dispatch(setHasNextPage(data.hasNextPage));
    }

    setPage(prev => prev + 1);
    setTimeout(() => {
      setIsFetching(false);
    }, 100);
  }

  return (
    <>
      {windowWidth < 640 &&
        <Header>Посты</Header>
      }
      {posts?.length ?
        <PostsFeed posts={posts}/>
      :
        <></>
      }
    </>
  );
}

export default SavedPostsFeed;
