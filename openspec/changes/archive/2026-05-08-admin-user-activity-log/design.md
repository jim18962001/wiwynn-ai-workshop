## Context

系統目前有 `/employees` 作為管理者專屬頁面（受 `AdminRoute` 保護），側邊欄使用 `navItems` / `adminNavItems` 分開定義普通與管理者選單。所有 API 均由 MSW v2 mock，資料定義在 `src/mocks/data/`，handler 在 `src/mocks/handlers/`。

新頁面 `/admin/activity-log` 將遵循相同模式：`AdminRoute` 保護、React Query 取資料、Skeleton 載入狀態、篩選使用 React 本地狀態。

## Goals / Non-Goals

**Goals:**
- 新增 `/admin/activity-log` 路由，僅 admin 可進入
- 以表格列出操作記錄（操作人員、類型、目標資源、時間）
- 支援依使用者名稱與操作類型做前端篩選
- MSW mock `GET /api/activity-logs` 回傳假資料

**Non-Goals:**
- 不實作伺服器端分頁或排序
- 不寫入真實稽核日誌
- 不提供匯出功能

## Decisions

### 1. 前端篩選 vs. API 查詢參數

選擇**前端篩選**（React 本地 state filter），不傳 query params 給 MSW。

**理由**：資料量少（mock 固定筆數），避免為 MSW handler 增加複雜的 query parsing 邏輯；與現有 `EmployeesPage` 搜尋實作一致。

**替代方案**：MSW handler 接受 `?user=&type=` query，但帶來不必要的複雜度。

### 2. 資料結構

```ts
interface ActivityLog {
  id: string
  userId: string
  userName: string
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'LOGIN' | 'LOGOUT'
  resource: string      // e.g. "vehicle:VH-001"
  timestamp: string     // ISO 8601
}
```

`action` 使用有限枚舉，方便篩選下拉選單使用。

### 3. 路由位置

使用 `/admin/activity-log` 而非 `/activity-log`，明確表示管理者專屬，與 `/employees` 同樣套用 `AdminRoute`。

**Tailwind v4 注意**：無 `tailwind.config.js`，勿使用 `theme()` 函式；直接用 utility class 或 CSS 自訂屬性。

**MSW v2 注意**：handler 使用 `http.get(...)` 而非舊版 `rest.get(...)`；回傳用 `HttpResponse.json(...)`。

## Risks / Trade-offs

- [假資料無法反映真實操作] → 僅為展示用途，符合 non-goal 定義
- [前端篩選在大量資料時效能差] → 本次 mock 資料量有限，可接受
