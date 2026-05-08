## Why

企業缺乏一套集中化的車輛與員工管理工具，導致車隊調度、資產追蹤與人員指派依賴手工記錄，效率低落且容易出錯。本系統以 MVP 方式快速交付核心管理能力，讓管理者與一般使用者都能透過瀏覽器即時存取資料。

## What Changes

- 新增前端 React 應用程式（Vite + shadcn/ui），取代原本無前端介面的狀態
- 新增 MSW Mock API 層，模擬後端 REST 回應，無需真實伺服器即可開發與展示
- 新增角色型存取控制（admin / user），限制員工管理頁面僅 admin 可用
- 新增登入驗證流程，搭配 JWT-like token 存入 localStorage
- 新增儀表板頁面，展示車輛、員工關鍵指標卡片與圖表
- 新增車輛 CRUD 功能（列表、新增、編輯、刪除）
- 新增員工 CRUD 功能（列表、新增、編輯、刪除，admin only）

## Capabilities

### New Capabilities

- `user-auth`: 登入頁面與角色型身份驗證（admin / user），含路由保護
- `dashboard`: 首頁儀表板，顯示關鍵指標卡片（KPI cards）與資料視覺化圖表
- `vehicle-management`: 車輛資料的完整 CRUD，含表格列表、新增/編輯 Modal、刪除確認
- `employee-management`: 員工資料的完整 CRUD（admin only），與車輛管理頁結構一致

### Modified Capabilities

<!-- 目前 openspec/specs/ 中無既有規格，本次皆為全新能力 -->

## Impact

- **新增依賴**：react, react-dom, react-router-dom, @tanstack/react-query, shadcn/ui, recharts, msw, axios
- **新增目錄**：`src/` 包含 components/, pages/, hooks/, mocks/, lib/
- **無後端**：所有 API 呼叫由 MSW handler 攔截並回傳 mock 資料
- **無資料庫**：資料存活於 MSW runtime 記憶體（重整頁面重置）
