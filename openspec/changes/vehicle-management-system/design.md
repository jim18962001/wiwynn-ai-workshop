## Context

目前專案為純 Node.js 技能練習環境，尚無任何前端介面或 API 層。本次設計目標是在同一 repo 的 `app/` 子目錄下建立一個完整的 React SPA，採用 MVP 策略：以 MSW 模擬後端，讓整個系統可在無伺服器的情況下完整運行與展示。

主要關係人：管理者（admin）需要完整 CRUD 所有資源；一般使用者（user）只能瀏覽車輛資料與儀表板。

## Goals / Non-Goals

**Goals:**
- 可獨立執行的 React SPA（`npm run dev`）
- 角色型路由保護（admin / user）
- 以 MSW handler 完整模擬 REST API（GET / POST / PUT / DELETE）
- shadcn/ui 元件庫構成一致的 UI 風格
- React Query 管理 server state（快取、loading、error）

**Non-Goals:**
- 真實後端或資料庫（本次不實作）
- 資料持久化（MSW 資料為 in-memory，重整即重置）
- 單元 / E2E 測試（MVP 範疇外）
- i18n 多語言（UI 以中文為主）
- 部署 / CI/CD 流程

## Decisions

### D1：前端框架選擇 Vite + React

**選擇**：Vite  
**理由**：開發啟動速度快，HMR 即時，比 CRA 輕量。shadcn/ui 官方也以 Vite 為預設範例。  
**替代方案**：Next.js（過重，MVP 不需 SSR）、CRA（已不被推薦）

---

### D2：UI 元件庫選擇 shadcn/ui

**選擇**：shadcn/ui（基於 Radix UI + Tailwind CSS）  
**理由**：元件直接複製到 `src/components/ui/`，完全可客製化，不綁定版本。Dialog、Table、Form、Input 等元件齊全，可直接滿足 CRUD UI 需求。  
**替代方案**：Ant Design（太重）、MUI（樣式難覆蓋）

---

### D3：圖表庫選擇 Recharts

**選擇**：Recharts  
**理由**：基於 React 元件，與 shadcn/ui 搭配良好，語法直覺，BarChart / PieChart / LineChart 覆蓋儀表板所需。  
**替代方案**：Chart.js（需額外 wrapper）、Victory（較小眾）

---

### D4：Server State 管理選擇 React Query

**選擇**：TanStack React Query v5  
**理由**：提供開箱即用的 loading/error/cache 狀態，搭配 MSW 的介面與真實 API 完全一致，未來切換真實後端只需改 base URL。  
**替代方案**：SWR（功能較少）、Redux Toolkit Query（過重）

---

### D5：Auth 狀態管理選擇 React Context + localStorage

**選擇**：自訂 `AuthContext`，token 與角色存入 `localStorage`  
**理由**：MVP 範疇下，不需要全域 store（Zustand / Redux）。Context 足以在路由保護元件與 header 中共享使用者狀態。  
**替代方案**：Zustand（可擴展性較好，但 MVP 不必要）

---

### D6：Mock API 選擇 MSW v2

**選擇**：MSW（Mock Service Worker）  
**理由**：在 browser 端攔截真實 HTTP 請求，React Query 不需任何修改即可運作，開發體驗與真實 API 完全一致。  
**替代方案**：json-server（需另起 process）、axios-mock-adapter（綁定 axios）

---

### D7：專案目錄結構

```
app/                          ← React SPA 根目錄
├── public/
├── src/
│   ├── components/
│   │   ├── ui/               ← shadcn/ui 元件（Button, Dialog, Table…）
│   │   ├── layout/           ← Sidebar, Header, ProtectedRoute
│   │   └── shared/           ← DataTable, ConfirmDialog, StatCard
│   ├── pages/
│   │   ├── LoginPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── VehiclesPage.tsx
│   │   └── EmployeesPage.tsx
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useVehicles.ts
│   │   └── useEmployees.ts
│   ├── mocks/
│   │   ├── browser.ts        ← MSW browser setup
│   │   ├── handlers/
│   │   │   ├── auth.ts
│   │   │   ├── vehicles.ts
│   │   │   └── employees.ts
│   │   └── data/             ← seed data（vehicles[], employees[]）
│   ├── lib/
│   │   ├── api.ts            ← axios instance
│   │   └── queryClient.ts
│   ├── contexts/
│   │   └── AuthContext.tsx
│   ├── types/
│   │   └── index.ts          ← Vehicle, Employee, User 型別定義
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── vite.config.ts
├── tailwind.config.ts
└── package.json
```

## Risks / Trade-offs

| 風險 | 緩解策略 |
|------|----------|
| MSW 資料重整即消失，無持久化 | MVP 接受此限制；seed data 提供預設資料集 |
| shadcn/ui 元件需手動 `npx shadcn add`，初始化繁瑣 | 建立安裝清單，確保所有需要元件一次安裝 |
| React Query + MSW 版本相容性 | 固定 msw@2、@tanstack/react-query@5 版本 |
| admin 路由保護僅為前端檢查，無真實後端驗證 | MVP 接受此設計；說明文件標註此為模擬 |
