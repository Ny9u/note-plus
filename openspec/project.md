# Note Plus 项目规范

## 项目概述

**项目名称**: Note Plus
**项目类型**: AI驱动的知识库应用
**架构模式**: Monorepo (基于 pnpm workspaces + Turborepo)
**当前状态**: 基础架构完成,业务逻辑待实现

### 核心功能(规划中)

- PDF文档处理与预览
- AI驱动的RAG(检索增强生成)系统
- 用户认证与授权
- 实时协作功能(WebSocket)
- 知识库管理

## 技术栈

### 前端 (apps/web)

| 技术         | 版本 | 用途                           |
| ------------ | ---- | ------------------------------ |
| Next.js      | 15.x | React框架,使用App Router       |
| React        | 19.x | UI库                           |
| TypeScript   | 5.x  | 类型系统                       |
| Tailwind CSS | 3.x  | Utility-first CSS 框架         |
| shadcn/ui    | 最新 | React UI 组件库                |
| Radix UI     | 最新 | 无障碍 UI 原语(shadcn/ui 依赖) |
| PostCSS      | 最新 | CSS 后处理器                   |
| Autoprefixer | 最新 | CSS 自动添加浏览器前缀         |
| pnpm         | 10.x | 包管理器                       |

**关键配置**:

- 端口: `3000`
- 路由: App Router (`app/` 目录)
- 样式: Tailwind CSS + shadcn/ui 组件
- 构建: Turbopack (dev) / Webpack (production)

### 后端 (apps/api)

| 技术       | 版本   | 用途            |
| ---------- | ------ | --------------- |
| NestJS     | 10.x   | Node.js后端框架 |
| TypeScript | 5.x    | 类型系统        |
| TypeORM    | 规划中 | ORM框架         |
| PostgreSQL | 规划中 | 关系型数据库    |
| Supabase   | 规划中 | 后端服务        |

**关键配置**:

- 端口: `3001`
- 全局路由前缀: `/api`
- CORS: 已启用(允许前端通信)
- 健康检查: `GET /api/health`

### 共享包 (packages/)

| 包名                    | 路径                  | 用途                       |
| ----------------------- | --------------------- | -------------------------- |
| @note-plus/shared-types | packages/shared-types | 跨应用的TypeScript类型定义 |
| @note-plus/shared-utils | packages/shared-utils | 跨应用的工具函数           |

## 架构决策记录 (ADR)

### ADR-001: ~~使用Less而非Tailwind CSS~~ (已废弃)

**决策日期**: 项目初始化
**状态**: ❌ 已废弃 - 本决策已被 ADR-002 替代

**背景**: 需要选择CSS解决方案。

**决策**: 使用Less作为CSS预处理器。

**理由**:

- 传统CSS预处理器,学习曲线低
- 支持变量、混入、嵌套等功能
- 不需要额外的构建工具集成

**配置位置**:

- `apps/web/next.config.ts` (webpack配置)
- `apps/web/app/globals.less` (全局样式)

**废弃原因**: 项目实际采用 Tailwind CSS + shadcn/ui 方案,详见 ADR-002。

---

### ADR-002: 使用 Tailwind CSS 和 shadcn/ui

**决策日期**: 项目初始化
**状态**: ✅ 已采纳

**背景**: 需要现代化、高效的 CSS 解决方案和可复用的 UI 组件库。

**决策**: 使用 Tailwind CSS 作为 utility-first CSS 框架 + shadcn/ui 作为 UI 组件库。

**理由**:

- **Tailwind CSS**: 提供快速开发体验,utility-first 方法避免 CSS 命名冲突
- **shadcn/ui**: 提供高质量、可定制的 React 组件,基于 Radix UI 构建
- 与 Next.js 生态集成良好
- 支持暗色模式和响应式设计
- 组件可直接复制到项目中,无需 npm 包依赖
- 完全类型安全,配合 TypeScript 使用

**配置位置**:

- `apps/web/tailwind.config.ts` (Tailwind 配置)
- `apps/web/postcss.config.mjs` (PostCSS 配置)
- `apps/web/components.json` (shadcn/ui 配置)
- `apps/web/app/globals.css` (全局样式 + Tailwind 指令)
- `apps/web/components/ui/` (shadcn/ui 组件目录)

---

### ADR-003: API路由统一前缀 `/api`

**决策日期**: 项目初始化
**状态**: 已采纳

**背景**: 需要明确前后端API路由约定。

**决策**: 所有NestJS路由自动添加 `/api` 前缀。

**理由**:

- 避免与Next.js路由冲突
- 清晰区分前端路由和API端点
- 便于反向代理配置

**配置位置**: `apps/api/src/main.ts`

```typescript
app.setGlobalPrefix("api");
```

### ADR-004: Monorepo构建顺序

**决策日期**: 项目初始化
**状态**: 已采纳

**背景**: 多包依赖需要正确的构建顺序。

**决策**: 使用Turborepo的 `^build` 依赖声明。

**构建顺序**:

1. `packages/*` (shared-types, shared-utils)
2. `apps/*` (web, api)

**配置位置**: `turbo.json`

## 开发约定

### 文件组织原则

1. **小文件优于大文件**
   - 单文件不超过 800 行
   - 典型文件 200-400 行
   - 按功能/领域组织,不按类型

2. **高内聚,低耦合**
   - 相关功能放在同一模块
   - 最小化跨模块依赖

### 命名约定

#### 文件命名

- **组件**: PascalCase (例如: `UserProfile.tsx`)
- **工具函数**: camelCase (例如: `formatDate.ts`)
- **样式文件**: camelCase (例如: `userProfile.less`)
- **类型定义**: PascalCase (例如: `User.ts`)
- **常量**: UPPER_SNAKE_CASE (例如: `API_BASE_URL.ts`)

#### 变量命名

```typescript
// 组件 - PascalCase
const UserCard = () => {};

// 函数 - camelCase
function calculateTotal() {}

// 常量 - UPPER_SNAKE_CASE
const MAX_RETRY_COUNT = 3;

// 接口/类型 - PascalCase
interface User {}
type ApiResponse<T> = {};

// 私有变量 - 前缀 _
const _internalCache = {};
```

### 不可变性原则 (CRITICAL)

**始终创建新对象,永不修改现有对象**:

```typescript
// ❌ 错误: 直接修改
function updateUser(user: User, name: string) {
  user.name = name; // 突变!
  return user;
}

// ✅ 正确: 返回新对象
function updateUser(user: User, name: string) {
  return {
    ...user,
    name,
  };
}
```

### 错误处理

#### 前端

```typescript
try {
  const result = await fetchData();
  return result;
} catch (error) {
  console.error("[error] 操作失败:", error);
  // 向用户显示友好错误消息
  toast.error("数据加载失败,请稍后重试");
  throw error;
}
```

#### 后端

```typescript
try {
  const result = await this.service.getData();
  return result;
} catch (error) {
  this.logger.error("数据获取失败", error.stack);
  throw new InternalServerErrorException("服务暂时不可用");
}
```

### 输入验证

**始终在系统边界验证输入**:

```typescript
// 使用 Zod 进行验证
import { z } from "zod";

const createUserSchema = z.object({
  email: z.string().email(),
  age: z.number().int().min(0).max(150),
  name: z.string().min(1).max(100),
});

const validated = createUserSchema.parse(input);
```

## Git工作流程

### 提交消息格式

**格式**: `<type>: <description>`

**允许的类型**:

- `feat`: 新功能
- `fix`: 错误修复
- `refactor`: 代码重构
- `docs`: 文档更新
- `test`: 测试相关
- `chore`: 构建/工具链
- `perf`: 性能优化
- `ci`: CI配置
- `style`: 代码格式

**示例**:

```bash
git commit -m "feat: 添加用户登录功能"
git commit -m "fix: 修复PDF预览内存泄漏"
git commit -m "refactor: 优化数据库查询性能"
```

### 分支策略

- `main`: 主分支,保持稳定
- `feature/*`: 功能分支
- `fix/*`: 修复分支
- `refactor/*`: 重构分支

### Pull Request检查清单

提交PR前确认:

- [ ] 代码已通过类型检查
- [ ] 所有测试通过
- [ ] 代码覆盖率 ≥ 80%
- [ ] 无console.log残留
- [ ] 无硬编码密钥
- [ ] 提交消息符合规范
- [ ] 代码已格式化

## 测试要求

### 最低覆盖率: 80%

**测试类型**(全部必需):

1. **单元测试** - 独立函数、工具、组件
2. **集成测试** - API端点、数据库操作
3. **E2E测试** - 关键用户流程(Playwright)

### TDD工作流

**强制流程**:

1. **编写测试** (RED) - 测试应该失败
2. **运行测试** - 验证失败
3. **编写实现** (GREEN) - 最小实现使测试通过
4. **运行测试** - 验证通过
5. **重构代码** (IMPROVE) - 优化实现
6. **验证覆盖率** - 确保 ≥ 80%

## 安全检查清单

**提交前必查**:

- [ ] 无硬编码密钥(API keys、密码、tokens)
- [ ] 所有用户输入已验证
- [ ] SQL注入防护(参数化查询)
- [ ] XSS防护(HTML清理)
- [ ] CSRF保护已启用
- [ ] 认证/授权已验证
- [ ] 所有端点已启用限流
- [ ] 错误消息不泄露敏感信息

## 环境配置

### 开发环境

```bash
# 安装依赖
pnpm install

# 启动开发服务器(前端+后端)
pnpm dev

# 仅启动前端
pnpm dev:web

# 仅启动后端
pnpm dev:api
```

### 构建

```bash
# 构建所有包和应用
pnpm build

# 构建特定工作区
pnpm --filter web build
pnpm --filter api build
```

### 清理

```bash
# 清理所有构建产物和node_modules
pnpm clean
```

## 端口分配

| 服务               | 端口 | 说明       |
| ------------------ | ---- | ---------- |
| 前端(Next.js)      | 3000 | 开发服务器 |
| 后端(NestJS)       | 3001 | API服务器  |
| 数据库(PostgreSQL) | 5432 | 规划中     |
| Redis              | 6379 | 规划中     |

## 待实现功能

以下功能**尚未实现**但已规划:

### 认证与授权

- [ ] JWT认证系统
- [ ] 用户注册/登录
- [ ] 权限管理(RBAC)

### 数据库

- [ ] TypeORM集成
- [ ] PostgreSQL连接
- [ ] 数据迁移系统

### 文档处理

- [ ] PDF上传与存储
- [ ] PDF预览与渲染
- [ ] 文档元数据提取

### RAG系统

- [ ] 向量数据库集成
- [ ] 文档分块与索引
- [ ] 语义搜索
- [ ] AI回答生成

### 实时功能

- [ ] WebSocket集成
- [ ] 实时协作
- [ ] 在线状态同步

### 第三方集成

- [ ] Supabase集成
- [ ] OpenAI API集成
- [ ] 对象存储(S3/OSS)

## 性能优化策略

### 前端优化

- 使用 Next.js Image 组件优化图片
- 路由级别的代码分割
- React Server Components优先
- 客户端状态最小化

### 后端优化

- 数据库查询优化(索引、分页)
- Redis缓存热点数据
- API响应压缩
- 连接池管理

## 监控与日志

### 日志级别

- `error`: 严重错误,需立即处理
- `warn`: 警告信息,需关注
- `info`: 一般信息,记录关键操作
- `debug`: 调试信息,开发环境使用

### 监控指标(规划中)

- API响应时间
- 错误率
- 数据库查询性能
- 内存使用率
- CPU使用率

## 参考资料

- [Next.js文档](https://nextjs.org/docs)
- [NestJS文档](https://docs.nestjs.com/)
- [Turborepo文档](https://turbo.build/repo/docs)
- [TypeScript手册](https://www.typescriptlang.org/docs/)
- [Conventional Commits](https://www.conventionalcommits.org/)

## 更新日志

| 日期       | 版本  | 变更内容              |
| ---------- | ----- | --------------------- |
| 2026-02-12 | 1.0.0 | 初始版本,项目规范创建 |
