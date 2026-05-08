## Why

目前系統缺乏管理者稽核使用者行為的機制，無法追蹤使用者的操作歷程（如登入、新增/修改車輛、修改員工資料等）。新增使用者紀錄頁面，讓管理者能集中查看所有使用者的操作記錄，有助於系統稽核與異常行為偵測。

## What Changes

- 新增管理者專屬的「使用者紀錄」頁面（路由：`/admin/activity-log`）
- 頁面顯示所有使用者的操作記錄列表，包含操作人員、操作類型、目標資源、時間戳記
- 支援依使用者名稱、操作類型篩選記錄
- MSW 新增對應的假資料與 API handler（`GET /api/activity-logs`）
- 側邊欄新增管理者專屬的「使用者紀錄」連結入口

## Non-goals

- 不實作真實後端的稽核日誌寫入邏輯
- 不提供刪除或匯出紀錄的功能
- 不追蹤頁面瀏覽行為，僅記錄資料異動操作

## Capabilities

### New Capabilities

- `activity-log`: 管理者查看所有使用者操作記錄的頁面，含篩選功能

### Modified Capabilities

（無現有 spec 需修改）

## Impact

- **新增檔案**：`app/src/pages/ActivityLogPage.tsx`、`app/src/mocks/handlers/activityLogHandlers.ts`、`app/src/mocks/data/activityLogs.ts`
- **修改檔案**：`app/src/App.tsx`（新增路由）、側邊欄元件（新增連結）、`app/src/mocks/handlers/index.ts`（注冊 handler）
- **無外部相依性異動**
