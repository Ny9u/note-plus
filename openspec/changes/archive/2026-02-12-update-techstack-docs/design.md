## Context

当前项目文档存在技术栈描述不一致的问题:

**不一致点:**
1. `openspec/project.md` 在 ADR-001 中声明使用 **Less** 作为 CSS 预处理器
2. 实际代码库使用 **Tailwind CSS 3** + **shadcn/ui** 组件库
3. `package.json` 依赖明确包含 `tailwindcss`、`@radix-ui/react-slot` 等
4. `CLAUDE.md` 正确描述了 Tailwind + shadcn/ui,但与 `openspec/project.md` 冲突

**影响范围:**
- `openspec/project.md`: 错误的 ADR-001 + 技术栈表格
- `docs/技术方案.md`: 缺少 shadcn/ui、Tailwind 相关描述
- `docs/产品文档.md`: 技术选型表格不完整
- `CLAUDE.md`: 已正确,可能需微调
- `README.md`: 可能需补充 UI 组件库说明

**约束:**
- 纯文档更新,不涉及代码变更
- 不改变任何依赖配置或构建流程
- 保持文档格式和结构风格一致

## Goals / Non-Goals

**Goals:**
- 纠正所有文档中关于 CSS 方案的描述(Less → Tailwind CSS)
- 补充 shadcn/ui 组件库相关信息
- 移除或标记为"已废弃"的 ADR-001
- 确保所有技术栈描述与实际代码库 100% 一致
- 统一依赖版本号、工具名称的表述方式

**Non-Goals:**
- 不涉及任何源代码修改
- 不改变项目的技术选型(仅文档纠正)
- 不添加新的 ADR(除非需要解释为何从 Less 迁移到 Tailwind)
- 不重构文档结构(仅内容更新)

## Decisions

### 决策 1: 如何处理 ADR-001(Less 决策)

**选项 A:** 完全删除 ADR-001
**选项 B:** 将 ADR-001 标记为"已废弃",并添加新的 ADR-002 解释 Tailwind 决策
**选项 C:** 直接替换 ADR-001 内容为 Tailwind 决策

**决定:** **选项 B** - 保留历史,标记为已废弃

**理由:**
- ADR 应该保留历史决策以供追溯
- 标记"已废弃"比删除更符合 ADR 最佳实践
- 添加新的 ADR-002 说明当前的 Tailwind CSS + shadcn/ui 决策
- 便于理解项目技术栈的演进过程

### 决策 2: 技术栈表格的更新方式

**选项 A:** 仅修改错误项(Less → Tailwind)
**选项 B:** 全面审查并补充所有缺失的依赖信息

**决定:** **选项 B** - 全面审查和补充

**理由:**
- 既然要修正,就应该确保完整性
- 补充 shadcn/ui、Radix UI 等实际使用的库
- 添加构建工具(PostCSS、Autoprefixer 等)的说明
- 统一版本号表示方式(从 package.json 获取准确信息)

### 决策 3: 文档更新顺序

**决定顺序:**
1. `openspec/project.md` - 核心文档,最详细
2. `CLAUDE.md` - 给 AI 助手的指引,需保持简洁准确
3. `docs/技术方案.md` - 技术方案文档
4. `docs/产品文档.md` - 产品相关技术选型
5. `README.md` - 项目入口文档

**理由:**
- 从详细到简洁的顺序
- 先修正核心规范文档,再更新衍生文档
- README 作为最后一步确保信息来源准确

### 决策 4: 是否需要添加新的 ADR-002

**决定:** **需要**

**内容要点:**
- 标题: "ADR-002: 使用 Tailwind CSS 和 shadcn/ui"
- 决策日期: 项目初始化(根据 git 历史确定)
- 状态: 已采纳
- 背景: 现代化 CSS 方案需求
- 决策: 使用 Tailwind CSS 作为 utility-first CSS 框架 + shadcn/ui 作为组件库
- 理由:
  - Tailwind 提供快速开发体验
  - shadcn/ui 提供高质量、可定制的 React 组件
  - 与 Next.js 生态集成良好
  - 支持暗色模式和响应式设计
- 配置位置: `tailwind.config.ts`, `postcss.config.mjs`, `components.json`

## Risks / Trade-offs

### 风险 1: 遗漏某些文档中的技术栈引用

**风险:** 项目可能还有其他文档(如 `docs/` 子目录)包含技术栈描述

**缓解:**
- 使用 Grep 工具搜索 "Less"、"less"、"CSS 预处理器" 等关键词
- 检查所有 `.md` 文件是否有相关描述
- 在 tasks.md 中列出"全局搜索验证"任务

### 风险 2: 版本号可能过时

**风险:** 手动更新版本号可能与 package.json 不同步

**缓解:**
- 直接从 `package.json` 读取版本号
- 使用 `^` 或 `>=` 表示法而非具体版本号
- 在文档中说明"版本号以 package.json 为准"

### 权衡 1: ADR 历史保留 vs. 文档简洁

**权衡:** 保留 ADR-001(已废弃)会增加文档长度

**决定:** 保留

**理由:** 文档的可追溯性比简洁性更重要,标记"已废弃"已足够提示

### 权衡 2: 技术栈描述的详细程度

**权衡:** `openspec/project.md` vs `CLAUDE.md` 的描述详细度

**决定:**
- `openspec/project.md`: 完整详细的技术栈表格 + ADR
- `CLAUDE.md`: 简洁的关键决策说明(保持当前水平)

**理由:** 不同文档服务不同受众,应保持各自的定位

## Migration Plan

此变更为纯文档更新,无需迁移步骤。

**部署步骤:**
1. 创建分支 `docs/update-techstack`
2. 按顺序更新各文档文件
3. 提交 commit: `docs: 纠正技术栈文档描述(Less → Tailwind CSS + shadcn/ui)`
4. 创建 PR 并请求 review
5. 合并到 main 分支

**验证:**
- 全局搜索 "Less"、"less"、"CSS预处理器" 确认无遗漏
- 检查所有技术栈表格是否统一
- 确认 ADR-001 已标记为"已废弃"
- 确认新增 ADR-002 内容完整

**回滚策略:**
- 使用 `git revert` 恢复 commit(纯文档变更,回滚无风险)

## Open Questions

无待解决问题。文档更新路径明确,无技术不确定性。
