// global address
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";

// Users
const USERS = "/users";
const USER_DETAIL = "/:id";
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";
const ME = "/me";

// Videos
const VIDEOS = "/videos";
const UPLOAD = "/upload";
const VIDEO_DETAIL = "/:id";
const EDIT_VIDEO = "/:id/edit";
const DELETE_VIDEO = "/:id/delete";

// github
const GITHUB = "/auth/github";
const GITHUB_CALLBACK = "/auth/github/callback";

// facebook
const FACEBOOK = "/auth/facebook";
const FACEBOOK_CALLBACK = "/auth/facebook/callback";

// API for AJAX
const API = "/api";
const REGISTER_VIEW = "/:id/view";
const ADD_COMMENTS = "/:id/comment";
const EDIT_COMMENT = "/:id/comment-edit";
const DELETE_COMMENT = "/:id/comment-delete";

// routes object
const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  users: USERS,
  user_detail: id => {
    if (id) {
      return `/users/${id}`;
    } else {
      return USER_DETAIL;
    }
  },
  edit_profile: EDIT_PROFILE,
  change_password: CHANGE_PASSWORD,
  me: ME,
  videos: VIDEOS,
  upload: UPLOAD,
  video_detail: id => {
    if (id) {
      return `/videos/${id}`;
    } else {
      return VIDEO_DETAIL;
    }
  },
  edit_video: id => {
    if (id) {
      return `/videos/${id}/edit`;
    } else {
      return EDIT_VIDEO;
    }
  },
  delete_video: id => {
    if (id) {
      return `/videos/${id}/delete`;
    } else {
      return DELETE_VIDEO;
    }
  },
  github: GITHUB,
  githubCallback: GITHUB_CALLBACK,
  facebook: FACEBOOK,
  facebookCallback: FACEBOOK_CALLBACK,
  api: API,
  registerView: REGISTER_VIEW,
  addComments: ADD_COMMENTS,
  editComment: EDIT_COMMENT,
  deleteComment: DELETE_COMMENT
};

export default routes;
