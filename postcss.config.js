export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    // px与rem转换插件
    'postcss-pxtorem': {
      rootValue: 16, // rem 相对于 px 转换的基准值 这里都是按照设计稿1920的宽度来设置的 16px为1rem, 包括rem.js 也是按照设计稿1920*1280设置html的font-size为16
      propList: ['*', '!border'], // 需要转换的 CSS 属性，* 表示全部
      unitPrecision: 2, // 转换后的小数位数
      selectorBlackList: ['-nopx'], // 过滤掉-nopx开头的class，不进行rem转换
      exclude: (e) => {
        // 只对src/views/screen文件进行px转rem，其他文件不转换
        if (/src(\\|\/)views(\\|\/)screen/.test(e)) {
          return false
        } else {
          return true
        }
      },
    },
  },
}
