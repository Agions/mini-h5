import { resolve } from "path";

const config = {
  projectName: "mini",
  date: "2023-6-3",
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sourceRoot: "src",
  outputRoot: "dist",
  plugins: [],
  defineConstants: {},
  copy: {
    patterns: [],
    options: {}
  },
  framework: "react",
  compiler: "webpack4",
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {}
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]"
        }
      }
    },
    webpackChain(chain) {
      chain.merge({
        module: {
          rule: {
            babelLoader: {
              test: /\.js$/,
              use: [
                {
                  loader: "babel-loader",
                  options: {
                    presets: ["@babel/preset-env"]
                  }
                }
              ]
            }
          }
        }
      });
    }
  },
  h5: {
    publicPath: "/",
    staticDirectory: "static",
    esnextModules: ["@taroify"],
    postcss: {
      autoprefixer: {
        enable: true,
        config: {}
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]"
        }
      }
    },
    webpackChain(chain) {
      chain.merge({
        module: {
          rule: {
            babelLoader: {
              test: /\.js$/,
              use: [
                {
                  loader: "babel-loader",
                  options: {
                    presets: ["@babel/preset-env"]
                  }
                }
              ]
            }
          }
        }
      });
    }
  },
  alias: {
    "@": resolve(__dirname, "../src")
    // "regenerator-runtime": regeneratorRuntime
    // 'regenerator-runtime': path.resolve('/Users/luckyhh/Desktop/project/prequest2/node_modules/regenerator-runtime'),
  }
};

export default function(merge) {
  if (process.env.NODE_ENV === "development") {
    return merge({}, config, require("./dev"));
  }
  return merge({}, config, require("./prod"));
}
