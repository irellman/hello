import { getCommentAnswers } from "api/comment";
import { dislikeComment, likeComment } from "context/postsReducer/actions";
import { postsReducer } from "context/postsReducer/reducer";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { comment } from 'types/comment';

const CommentLogic = (comment: comment) => {
  const { id } = useParams();

  const [page, setPage] = useState<number>(0);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(state => state.authReducer.isAuth);
  const navigate = useNavigate();

  const {
    addAnswers,
    showAnswers
  } = postsReducer.actions;

  const like = async () => {
    if (!isAuth) {
      navigate("/auth/login");
      return;
    }

    if (comment.isLiked) {
      dispatch(dislikeComment(Number(id), comment.id))
    } else {
      dispatch(likeComment(Number(id), comment.id))
    }
  }

  const getAnswers = async () => {
    setIsFetching(true);
    const res = await getCommentAnswers(comment.id, page);
    const data = res.data;

    dispatch(addAnswers({
      id: Number(id),
      commentId: comment.id,
      answers: data.comments
    }));

    if (data.hasNextPage) {
      setPage(prev => prev + 1);
      setHasNextPage(true);
    } else {
      setHasNextPage(false);
    }

    setIsFetching(false);
  }

  const showComments = async () => {
    getAnswers();
    dispatch(showAnswers({id: Number(id), commentId: comment.id}));
  }

  return {
    isFetching,
    like,
    showComments,
    hasNextPage,
    getAnswers
  }
}

export default CommentLogic;
