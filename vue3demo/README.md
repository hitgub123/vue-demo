项目结构：
    src\api
    项目使用的后台服务器，port：8081，需要跨域请求

================================================================

报错error Component name "index" should always be multi-word
>>vue.config.js的module.exports = defineConfig里加上lintOnSave: false,重启项目。
>>上述方法已经失效，新方法是在package.json的"eslintConfig"的"rules"里加上"vue/multi-word-component-names": "off"

ts里使用require时，eslin报错Require statement not part of import statement.
>>在package.json的"eslintConfig"的"rules"里加上"@typescript-eslint/no-var-requires": 0

vue add typescript，将js代码转成ts并检查
? Use class-style component syntax? No
? Use Babel alongside TypeScript (required for modern mode, auto-detected polyfills, transpiling JSX)? Yes
? Convert all .js files to .ts? Yes
? Allow .js files to be compiled? Yes
? Skip type checking of all declaration files (recommended for apps)? Yes

style scoped的作用:
>>在组件的<style>加上 scoped属性，可以让<style></style>里的样式只在当前组件生效

报错doesnot work properly without JavaScript enabled when serving a Vue App
>>src\router\index.ts的最外层的path要以'/'开头，原因不明

.a:not(.b) {width: 200px;}表示className包含a不包含b，比如可用于是否active 

:class="{ a: b }"表示b为true则className里加上a，否则不加。也可使用:class="{ a: !b }"

express启动服务器：
代码内容见server\index.js和server\router.js，nodemon index.js开启服务器。
报错无法将“nodemon 识别为...“，使用命令npx nodemon index.js，这相当于运用管理员权限来实现命令。
js转ts后，需要用npx nodemon index.ts开启服务器。

ts字符串替换占位符， js可能没有format方法，注意引号时键盘上数字1左边那个引号
>>let sql=`select * from product limit ${pageSize} offset ${from+1}`

||的妙用
null||112>>112
undefined||112>>112
''||112>>112
false||112>>112
0||112>>112
true||112>>true
'1'||112>>'1'

全局挂载(在src\main.ts)：
vue2>> 
    import Vue from 'vue'
    Vue.prototype.$api=api;
vue3>> 
    const app = createApp(App)
    app.config.globalProperties.$api=api;

postgresql的offset从0开始

express post 获取参数
    npm install body-parser
    const bodyParser=require('body-parser')
    const app=express();
    app.use(bodyParser.urlencoded({extended:false}))
    app.use(bodyParser.json())
    app.post('/api/addGood', (req) => {console.log(req.body)})

一次性给多个变量赋值
obj={a:1,b:2,c:3};
let {a,d}=obj;
结果：a=1，b和c is not defined，d=undefined

使用jsonwebtoken进行登录控制：
安装@types/jsonwebtoken,jwt-decode和express-jwt
