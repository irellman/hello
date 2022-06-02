import React, {Suspense} from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { useAppSelector } from "hooks/redux";
import PostList from "../components/PostList";
import UserPostsFeed from "pages/ProfilePage/UserPostsFeed";

const Home = React.lazy(() => import("pages/Home"));
const ProfilePage = React.lazy(() => import("pages/ProfilePage"));
const Auth = React.lazy(() => import("pages/Auth"));
const Login = React.lazy(() => import("pages/Auth/Login"));
const Signup = React.lazy(() => import("pages/Auth/Singup"));
const Edit = React.lazy(() => import("pages/ProfileEdit"));
const PostPage = React.lazy(() => import("pages/PostPage"));
const Saved = React.lazy(() => import("pages/Saved"));
const SavedPostsFeed = React.lazy(() => import("pages/SavedPostsFeed"));
const CollectionsPosts = React.lazy(() => import("pages/CollectionsPosts"));

const Router = () => {
  const isAuth = useAppSelector(state => state.authReducer.isAuth);
  const posts = useAppSelector(state => state.postsReducer.posts);

  return (
    <Routes>
      {isAuth ?
        <>
          <Route path="/" element={<Suspense fallback={<></>}><Home /></Suspense>} />
          <Route path="/edit" element={<Suspense fallback={<></>}><Edit /></Suspense>} />
          <Route path="/saved/:id/posts" element={<Suspense fallback={<></>}><SavedPostsFeed /></Suspense>} />
          <Route path="/saved/:id" element={<Suspense fallback={<></>}><CollectionsPosts /></Suspense>} />
          <Route path="/saved" element={<Suspense fallback={<></>}><Saved /></Suspense>} />
        </>
        :
        <Route path="/auth" element={<Suspense fallback={<></>}><Auth /></Suspense>}>
          <Route path="login" element={<Suspense fallback={<></>}><Login /></Suspense>} />
          <Route path="signup" element={<Suspense fallback={<></>}><Signup /></Suspense>} />
        </Route>
      }
      <Route path="/profile/:username/posts" element={<Suspense fallback={<></>}><UserPostsFeed /></Suspense>} />
      <Route path="/profile/:username" element={<Suspense fallback={<></>}><ProfilePage /></Suspense>}>
        <Route path="" element={<PostList posts={posts} />} />
      </Route>
      <Route path="/post/:id" element={<Suspense fallback={<></>}><PostPage /></Suspense>} />
      <Route path="*" element={<Navigate to={isAuth ? "/" : "/auth/login"} />} />
    </Routes>
  );
}

export default Router;
