import { fileURLToPath, URL } from 'node:url'

import { loadEnv, ConfigEnv, UserConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// import vueDevTools from 'vite-plugin-vue-devtools'
import qiankun from 'vite-plugin-qiankun'
const packName = require('./package').name
import proxy from './config/vite/proxy'
import { VITE_PORT } from './config/constant'
// https://vite.dev/config/
import { VueHooksPlusResolver } from '@vue-hooks-plus/resolvers'

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const isBuild = command === 'build'
  const env = loadEnv(mode, process.cwd())
  console.log(command, mode)

  return {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    base: '/zqdemo/', // 这个要与主应用的micro-app.js中activeRule一致
    // plugins
    plugins: [
      vue(),
      vueJsx(),
      // vueDevTools(),
      qiankun(`${packName}`, {
        useDevMode: true,
      }),
      AutoImport({
        imports: ['vue', 'vue-router'],
        include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
        dts: true, // 表示是否启用自动生成auto-imports.d.ts文件
        // 针对eslint配置，加入这个配置此时启动项目会生成.eslintrc-auto-import.json文件
        eslintrc: {
          enabled: true,
        },
        resolvers: [VueHooksPlusResolver()],
      }),
    ],
    server: {
      port: VITE_PORT,
      proxy,
      // proxy: {
      //   '/api': {
      //     target: 'http://192.168.3.156:8281', // 张柯 http://192.168.0.138 李可可：(309) http://192.168.3.156:8281) (312)http://192.168.0.109  李建：192.168.0.111:8280
      //     changeOrigin: true, //是否跨域
      //     rewrite: (path) => path.replace(/^\/api/, ''),
      //   },
      // },
    },
    css: {
      // CSS 预处理器
      preprocessorOptions: {
        // 定义全局 SCSS 变量
        scss: {
          javascriptEnabled: true,
          additionalData: `@import "@/styles/variables.scss";`,
        },
      },
    },
  }
}