interface api {
  publicPath: string;
  apiPath: string;
}

let webConfig:api = {
  publicPath: "/",
  apiPath: "/",
};

if (process.env.NODE_ENV === "production") {
  // 生产环境api接口地址
  webConfig = {
    publicPath: "/",
    apiPath: "http://123.60.5.92:10010/user",
  };
} else if (process.env.NODE_ENV === "development") {
  // 开发环境
  webConfig = {
    publicPath: "/",
    // apiPath: "http://192.168.1.30:10010/user",
    apiPath: "http://123.60.5.92:10010/user",

  };
}

export default webConfig;
