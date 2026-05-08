# Build with AI — 課程範例專案

這是一個 AI 課程的範例專案，提供預設的 **Agent Skills** 供學員練習如何與 AI 協作開發。

課程講義：[deanlin.net/course/wiwynn](https://deanlin.net/course/wiwynn)

---

## 專案簡介

本 repo 包含兩個獨立的子專案：

### 1. 根目錄 — Node.js Skills 練習專案

以 Node.js ESM 撰寫的技能練習環境，包含 ESLint、Jest 測試，以及 Husky pre-commit hook（提交前自動執行 lint 與測試）。

### 2. `app/` — 車輛管理系統 (Vehicle Management System)

以 React + TypeScript 建構的單頁應用程式，展示角色權限管理、CRUD 操作與資料視覺化。

**主要功能：**

| 頁面 | 說明 | 權限 |
|------|------|------|
| 登入頁 `/login` | 帳號密碼驗證，區分 admin / user 角色 | 公開 |
| 儀表板 `/dashboard` | KPI 卡片 + 車輛狀態圓餅圖 + 月度趨勢長條圖 | 登入後 |
| 車輛管理 `/vehicles` | 車輛 CRUD（車牌、型號、狀態、指派員工） | 登入後 |
| 員工管理 `/employees` | 員工 CRUD（姓名、職稱、部門、Email、電話） | 僅 admin |

**技術架構：** React 19、TypeScript、Vite、Tailwind CSS v4、shadcn/ui、React Router、TanStack Query、MSW（Mock API）、Recharts

---

## 啟動方式

### 環境需求

- Node.js >= 20

### 根目錄專案

```bash
# 安裝依賴
npm install

# 執行測試
npm test

# 執行 Lint
npm run lint
```

### 車輛管理系統 (app/)

```bash
cd app

# 安裝依賴
npm install

# 啟動開發伺服器（http://localhost:5173）
npm run dev
```

開啟瀏覽器後，使用以下測試帳號登入：

| 角色 | 帳號 | 密碼 |
|------|------|------|
| 管理者 | `admin` | `admin123` |
| 一般使用者 | `user` | `user123` |

> 所有 API 皆由 MSW（Mock Service Worker）在瀏覽器端模擬，無需啟動後端服務。

---

## 關於 Agent Skills

專案內建的 Skills 放置於 `.agents/skills/` 目錄下。

每個 Skill 都是一份提示詞腳本，用來擴充 AI Agent 的特定能力。如果你使用其他 AI Agent（如 GitHub Copilot、Cursor、Gemini 等），可以參考這些 Skills 的結構與邏輯，改寫成符合你的工具的格式。

## 內建 Skills

| Skill | 說明 |
|-------|------|
| `git-smart-commit` | 將雜亂的 git 變更依功能邏輯自動拆分成多個有意義的 conventional commit |
| `git-pr-description` | 根據 branch 差異自動產生 Pull Request 的 Title 與 Description |
| `gen-test-cases` | 根據選取的程式碼或功能範圍，自動產生測試案例與對應測試程式 |
| `git-branch-name` | 根據變更內容，設計符合 kebab-case 命名規則的名稱 |

## 快速開始

1. 安裝 [Claude Code](https://claude.ai/code)
2. 在專案目錄下啟動 Claude Code
3. 輸入 `/` 即可看到可用的 Skills 清單

## 自訂 Skills

每個 Skill 的核心是 `SKILL.md`，描述該 Skill 的運作流程與規則。你可以：

- 直接修改現有 Skill 的行為
- 新增自己的 Skill 目錄與 `SKILL.md`
- 將 Skill 邏輯移植到其他 AI Agent 平台
