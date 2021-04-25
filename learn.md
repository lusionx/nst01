## 基础概念

文件组织是一种约定, 没有执行意义, 所有文件直接/间接的被注册到 module, 否则 di 扫不到

ctx:ExecutionContext 真实的上下文, 在默认情况下只Request, 也支持 tcp, ws, redis 等

执行顺序
- 中间件: 偏全局, 不应该有业务逻辑, 稳定
- 守卫 guard: 可以直接结束请求
- 拦截器: 干预 controler 的 before/after
- 管道: 处理参数转换
- controll.method 具体业务
- 拦截器: after
- 异常过滤器:
- 响应

### Providers

抽象父类, 万物都是 provider, 被 di 管理生命周期`@Injectable()`,

最典型是是个 class, 在 constructor 里管理依赖

### controller
`xxx/xxx.controller.ts` 具体的业务入口, 依赖 service 等其他服务, 方法的参数可以被注入

自己不知道实际的 ctx, 靠 di 把真实的上下文数据给 TA

### dto

对外部参数的映射, 必须是 class, 但不能有方法
- 本质还是外部合法参数的 clone, 并没有 new
- 功能上 interface 能满足, 但 interface 不能注入


### module

`xxx/xxx.module.ts`, 独立/单例的container, 组织的自己 di, 可以依赖其他module(使用 exports)

以是否包含 controller 区分2种 module,

- yes 应该至少包含 module&controller, 只被顶级 app.module 引用, 对外提供服务
- no module&其他, 被其他子 module 引用, 内部代码

理解参数
- imports: 其他 module(含 exports), 按 namespace 理解,
- providers: 具体的 service 类, 能从 imports 里找到
- controllers: 本 module 里干活的
- exports: 能被其他 module 查找的 service

### service

`xxx/xxx.service.ts`, 小功能函数的实现, 注入到 controller 使用, 也能 service 直接嵌套, 不参与生命周期

### middleware

可选实现`NestMiddleware`, 在`module`的`configure`里配进去, 中间件是最先执行的, 所有无法感知之后的 controller, 所以不能和 controll 进行绑定

### 管道
插在注入controller.method之前, 验证/转换从实际 ctx 提取的参数

- controller 级别用来处理Params
- method 级别验证 body

### 守卫 guard
能拿到`ctx: ExecutionContext`, 通过配置 metaDate, 在实现是 canActive 时处理


### 拦截器 interceptor
和守卫类似, 面向的场景不同, 这些功能受面向切面编程（AOP）技术的启发, 在实现中调用 next.handle() 获取 controller 的结果, 干扰后续

## 生命周期

中间件
守卫
拦截器 （控制器之前）
管道
控制器（方法处理器） 15。服务（如果有）
拦截器（请求之后）
异常过滤器 （路由，之后是控制器，之后是全局）
服务器响应
