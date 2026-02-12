## 1. 准备工作

- [x] 1.1 读取 `apps/web/package.json` 确认前端依赖的准确版本号
- [x] 1.2 使用 Grep 搜索所有 `.md` 文件中的 "Less"、"less"、"CSS预处理器" 关键词
- [x] 1.3 列出所有需要更新的文档文件清单
- [x] 1.4 创建分支 `docs/update-techstack`

## 2. 更新 openspec/project.md

- [x] 2.1 将 ADR-001 标题修改为 "ADR-001: ~~使用Less而非Tailwind CSS~~ (已废弃)"
- [x] 2.2 在 ADR-001 顶部添加废弃警告："**状态**: 已废弃 - 本决策已被 ADR-002 替代"
- [x] 2.3 在 ADR-001 末尾添加废弃说明："**废弃原因**: 项目实际采用 Tailwind CSS + shadcn/ui 方案,详见 ADR-002"
- [x] 2.4 创建新的 ADR-002 章节："ADR-002: 使用 Tailwind CSS 和 shadcn/ui"
- [x] 2.5 填写 ADR-002 内容(决策日期、状态、背景、决策、理由、配置位置)
- [x] 2.6 更新"前端 (apps/web)"技术栈表格,将 Less 替换为 Tailwind CSS
- [x] 2.7 在技术栈表格中新增一行：Tailwind CSS | 3.x | Utility-first CSS 框架
- [x] 2.8 在技术栈表格中新增一行：shadcn/ui | 最新 | React UI 组件库
- [x] 2.9 在技术栈表格中新增一行：Radix UI | 最新 | 无障碍 UI 原语(shadcn/ui 依赖)
- [x] 2.10 在技术栈表格中新增一行：PostCSS | 最新 | CSS 后处理器
- [x] 2.11 在技术栈表格中新增一行：Autoprefixer | 最新 | CSS 自动添加浏览器前缀
- [x] 2.12 更新"关键配置"部分,将样式配置改为：样式: Tailwind CSS + shadcn/ui 组件
- [x] 2.13 删除或更新涉及 Less 模块化的描述

## 3. 更新 CLAUDE.md

- [x] 3.1 检查"Key Architectural Decisions"第1条是否准确描述 Tailwind CSS + shadcn/ui
- [x] 3.2 确认提到了 `tailwind.config.ts` 和 `globals.css` 配置文件路径
- [x] 3.3 确认提到了 shadcn/ui 组件的安装方式和位置(`components/ui/`)
- [x] 3.4 如果存在 Less 相关描述,标记为 "Legacy" 或删除
- [x] 3.5 检查"Adding UI Components"部分是否准确(应提到 `pnpm dlx shadcn@latest add`)

## 4. 更新 docs/技术方案.md

- [x] 4.1 检查"前端(Next.js)"章节是否包含 Tailwind CSS 描述 ✅ 已添加
- [x] 4.2 补充 shadcn/ui 为 UI 组件库(如缺失) ✅ 已添加
- [x] 4.3 检查"技术选型与职责"部分,确保前端技术栈准确 ✅ 已验证
- [x] 4.4 如存在与 Less 相关的描述,替换为 Tailwind CSS ✅ 无 Less 描述
- [x] 4.5 如存在"UI 样式"或"样式方案"相关章节,更新为 Tailwind CSS + shadcn/ui ✅ 已更新

## 5. 更新 docs/产品文档.md

- [x] 5.1 定位到"技术选型"或"技术方案建议"章节 ✅ 第140行和第1196行
- [x] 5.2 检查前端技术栈表格,确认包含 Tailwind CSS 和 shadcn/ui ✅ 第1201行已有
- [x] 5.3 如存在 "UI 样式" 行,更新为：TailwindCSS + shadcn/ui ✅ 已确认
- [x] 5.4 补充 shadcn/ui 的选型理由(如："专门解决 Web 端组件复用问题的库") ✅ 第144-145行已添加
- [x] 5.5 检查是否有其他地方提到 CSS 方案,统一更新 ✅ 已完成

## 6. 更新 README.md

- [x] 6.1 检查 README.md 是否包含技术栈描述章节
- [x] 6.2 如存在技术栈列表,确认包含 Tailwind CSS 和 shadcn/ui
- [x] 6.3 如存在"快速开始"或"开发指南"章节,确认无 Less 相关命令
- [x] 6.4 补充 UI 组件添加说明(如需要)：`pnpm dlx shadcn@latest add <component-name>`
- [x] 6.5 如 README.md 无技术栈详情,保持简洁(仅需确保无错误描述)

## 7. 全局验证

- [x] 7.1 使用 Grep 搜索 `"Less"` 关键词,检查是否还有遗漏的文件
- [x] 7.2 使用 Grep 搜索 `"less"` 关键词(小写),检查是否还有遗漏的文件
- [x] 7.3 使用 Grep 搜索 `"CSS预处理器"` 或 `"CSS 预处理器"`,确认无误导描述
- [x] 7.4 使用 Grep 搜索 `"globals.less"`,确认是否有引用需要更新为 `globals.css`
- [x] 7.5 检查所有技术栈表格的版本号表示方式是否统一(建议使用 `^3.x` 或 `3.x` 格式)
- [x] 7.6 确认 ADR-001 已标记为"已废弃"
- [x] 7.7 确认 ADR-002 内容完整且准确

## 8. 提交与审查

- [x] 8.1 检查所有修改文件的格式是否正确(Markdown 语法、表格对齐)
- [x] 8.2 使用 `git diff` 查看所有变更,确认无意外修改
- [x] 8.3 提交 commit: `docs: 纠正技术栈文档描述(Less → Tailwind CSS + shadcn/ui)`
- [ ] 8.4 推送到远程分支 `docs/update-techstack`
- [ ] 8.5 创建 Pull Request
- [ ] 8.6 在 PR 描述中列出所有修改的文件和主要变更点
- [ ] 8.7 请求 Code Review
- [ ] 8.8 合并到 main 分支
