import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

import ArticleListView from "@/views/community/ArticleListView.vue";
import ArticleDetailView from "@/views/community/ArticleDetailView.vue";
import ArticleNewView from "@/views/community/ArticleNewView";
import ArticleEditView from "@/views/community/ArticleEditView";

import MovieListView from "@/views/movie/MovieListView.vue";
import MovieDetailView from "@/views/movie/MovieDetailView.vue";
import RecommendView from "@/views/RecommendView";
import RecommendTheaters from "@/views/RecommendTheaters";
import ActorProfile from "@/views/movie/ActorProfile";
import GenresView from "@/views/movie/GenresView";

import LoginView from "@/views/account/LoginView.vue";
import LogoutView from "@/views/account/LogoutView.vue";
import SignupView from "@/views/account/SignupView.vue";
import ProfileView from "@/views/account/ProfileView.vue";
import NotFound404 from "../views/NotFound404.vue";

Vue.use(VueRouter);
const routes = [
  /*
  accounts
    /login => LoginView
    /logout => LogoutView
    /signup => SignupView
    /profile/:username => ProfileView
  
  articles
    / => ArticleListView
    /articles/new => ArticleNewView
    /articles/:articlePk => ArticleDetailView
    /articles/:articlePk/edit => ArticleEditView
    /404 => NotFound404
    * => /404
  */
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/logout",
    name: "logout",
    component: LogoutView,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignupView,
  },
  {
    path: "/profile/:username", // /profile/neo
    name: "profile",
    component: ProfileView,
  },
  {
    path: "/", // Home
    name: "movies",
    component: MovieListView,
  },
  {
    path: "/recommende/:username", // Home
    name: "movieRecommend",
    component: RecommendView,
  },
  {
    path: "/movies/genres",
    name: "genre",
    component: GenresView,
  },
  {
    path: "/theater", // Home
    name: "movieTheater",
    component: RecommendTheaters,
  },
  {
    path: "/movies/:moviePk",
    name: "movie",
    component: MovieDetailView,
  },
  {
    path: "/actor/:actorPk", // 배우 프로필
    name: "actorProfile",
    component: ActorProfile,
  },
  {
    path: "/articles",
    name: "articles",
    component: ArticleListView,
  },
  {
    path: "/articles/new",
    name: "articleNew",
    component: ArticleNewView,
  },
  {
    path: "/articles/:articlePk",
    name: "article",
    component: ArticleDetailView,
  },
  {
    path: "/articles/:articlePk/edit",
    name: "articleEdit",
    component: ArticleEditView,
  },
  {
    path: "/404",
    name: "NotFound404",
    component: NotFound404,
  },
  {
    path: "*",
    redirect: "/404",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // 이전 페이지에서 발생한 에러메시지 삭제
  store.commit("SET_AUTH_ERROR", null);

  const { isLoggedIn } = store.getters;

  const authPages = [
    "logout",
    "articleNew",
    "articleEdit",
    "articles",
    "article",
  ];

  const isAuthRequired = authPages.includes(to.name);

  if (isAuthRequired && !isLoggedIn) {
    alert("Require Login. Redirecting..");
    next({ name: "login" });
  } else {
    next();
  }

  // if (!isAuthRequired && isLoggedIn) {
  //   next({ name: "articles" });
  // }
});

/*
Navigation Guard 설정
  (이전 페이지에서 있던 에러 메시지 삭제)

  로그인(Authentication)이 필요 없는 route 이름들 저장(/login, /signup)

  0. router 에서 이동 감지

  1. 현재 이동하고자 하는 페이지가 로그인이 필요한지 확인
  
  2. 로그인이 필요한 페이지인데 로그인이 되어있지 않다면
    로그인 페이지(/login)로 이동

  3. 로그인이 되어 있다면
    원래 이동할 곳으로 이동
  
  4. 로그인이 되어있는데 /login, /signup 페이지로 이동한다면
    메인 페이지(/)로 이동
    

*/

export default router;
