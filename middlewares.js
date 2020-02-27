import multer from "multer";
import aws from "aws-sdk";
import multerS3 from "multer-s3";
import routes from "./routes";

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
  region: "ap-northeast-2"
});

const multerVideo = multer({
  storage: multerS3({
    s3: s3,
    acl: "public-read",
    bucket: "tube-project/videos"
  })
});

const multerAvatar = multer({
  storage: multerS3({
    s3: s3,
    acl: "public-read",
    bucket: "tube-project/avatars"
  })
});

export const localMiddleware = async (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes; // routes 객체를 변수로 받아옴
  res.locals.loggedUser = req.user || null; // passport 를 통해서 인증이 되었으면 req.user 를 아니면 빈 객체를 리턴
  next();
};

export const onlyPublic = (req, res, next) => {
  // public 은 특정 사용자가 로그인 하지 않았을때
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  // private 은 특정 사용자로 로그인 했을 때 접근 가능 범위 설정
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};

export const uploadVideo = multerVideo.single("videoFile");
export const uploadAvatar = multerAvatar.single("avatar");
// single 은 하나의 파일만을 업로드 할 수 있음을 의미하고
// single 내부의 값은 input file tag 의 name 값이다. (uplaod.pug 참조)

/*
 * 실제 데이터 베이스가 생성되기 이전에
 * spring boot 에서 mock 객체를 만들 듯이 express 에서도
 * 임시로 가짜 객체를 만들어서 사용함 (변수명 : user)
 * isAuthenticated 가 true 이면 검증된 사용자 라는 뜻으로 (로그인이 되었다 라는 의미)
 * 그 반대이면 로그인이 되지 않은 상태가 되어야 한다.
 */
