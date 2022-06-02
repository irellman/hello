from django.urls import path

from .Controllers import SavedController
from .Controllers import CommentController
from .Controllers import RecentSearchController
from .Controllers import AuthController
from .Controllers import PostController
from .Controllers import IndexController
from .Controllers import UserController

urlpatterns = [
  # Auth
  path("user/auth", AuthController.auth),
  path("user/login", AuthController.login),
  path("user/signup", AuthController.signup),
  path("user/logout", AuthController.logout),
  path("user/verification/<uidb64>/<token>", AuthController.activate),

  # User
  path("user/subscribe", UserController.subscribe),
  path("user/unsubscribe", UserController.unsubscribe),
  path("user/edit", UserController.edit_user),
  path("user/avatar", UserController.change_avatar),

  # Posts
  path("user/popular", UserController.popular),
  path("user/posts", UserController.getUserPosts),
  path("user/<str:username>", UserController.getInfoAboutUser),
  
  path("api/post/<int:id>/like", PostController.likePost),
  path("api/post/<int:id>/dislike", PostController.dislikePost),
  path("api/post/<int:id>/saved/add", PostController.addToSaved),
  path("api/post/<int:id>/saved/delete", PostController.deleteFromSaved),
  path("api/post/<int:id>", PostController.getPost),

  # Comments
  path("api/comments", CommentController.getPostComments),
  path("api/answers", CommentController.getUserAnswers),
  path("api/comment/add", CommentController.addComment),
  path("api/comment/like", CommentController.likeComment),
  path("api/comment/dislike", CommentController.dislikeComment),
  
  # RecentSearches
  path("api/recent_searches/get", RecentSearchController.getRecentSearch),
  path("api/recent_searches/update", RecentSearchController.updateRecentSearch),
  path("api/recent_searches/add", RecentSearchController.addRecentSearch),
  path("api/recent_searches/delete", RecentSearchController.deleteRecentSearch),
  path("api/recent_searches/clear", RecentSearchController.clearRecentSearch),
  
  path("api/search", IndexController.searchUsersOrTags),

  path("api/collections/get", SavedController.getCollections),
  path("api/collection/get", SavedController.getCollection),
  path("api/collection/create", SavedController.createCollection),
  path("api/collection/delete", SavedController.deleteCollection),
  path("api/collection/rename", SavedController.renameCollection),
  path("api/collection/edit", SavedController.editCollection)
]