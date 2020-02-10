import multer from "multer";
import routes from "./routes";

const multerVideo = multer({ dest: "uploads/videos/" });

export const localMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes; // routes 객체를 변수로 받아옴
  res.locals.user = {
    isAuthenticated: true,
    id: 1
  };
  next();
};

export const uploadVideo = multerVideo.single("videoFile");
// single 은 하나의 파일만을 업로드 할 수 있음을 의미하고
// single 내부의 값은 input file tag 의 name 값이다. (uplaod.pug 참조)

/*
 * 실제 데이터 베이스가 생성되기 이전에
 * spring boot 에서 mock 객체를 만들 듯이 express 에서도
 * 임시로 가짜 객체를 만들어서 사용함 (변수명 : user)
 * isAuthenticated 가 true 이면 검증된 사용자 라는 뜻으로 (로그인이 되었다 라는 의미)
 * 그 반대이면 로그인이 되지 않은 상태가 되어야 한다.
 */
