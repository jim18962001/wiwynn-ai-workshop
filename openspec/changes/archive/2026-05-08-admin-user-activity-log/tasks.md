## 1. 資料型別與假資料

- [x] 1.1 在 `app/src/types/` 新增 `ActivityLog` 介面（id, userId, userName, action, resource, timestamp）
- [x] 1.2 在 `app/src/mocks/data/activityLogs.ts` 建立假資料陣列（至少 15 筆，涵蓋各操作類型）

## 2. MSW Handler

- [x] 2.1 新增 `app/src/mocks/handlers/activityLogs.ts`，實作 `GET /api/activity-logs`，使用 `http.get` 與 `HttpResponse.json` 回傳假資料
- [x] 2.2 在 `app/src/mocks/handlers/index.ts` 引入並註冊 activityLogs handler

## 3. React Query Hook

- [x] 3.1 新增 `app/src/hooks/useActivityLogs.ts`，使用 TanStack Query 呼叫 `GET /api/activity-logs`，staleTime 設為 1 分鐘

## 4. 頁面元件

- [x] 4.1 新增 `app/src/pages/ActivityLogPage.tsx`，使用 `useActivityLogs` 取資料
- [x] 4.2 實作載入中 Skeleton 狀態（表格列佔位）
- [x] 4.3 實作操作記錄表格，顯示欄位：操作人員、操作類型、目標資源、時間
- [x] 4.4 新增使用者名稱篩選文字輸入欄（前端 filter，部分比對）
- [x] 4.5 新增操作類型篩選下拉選單（全部 / CREATE / UPDATE / DELETE / LOGIN / LOGOUT）

## 5. 路由整合

- [x] 5.1 在 `app/src/App.tsx` 的 `AdminRoute` 下新增 `<Route path="/admin/activity-log" element={<ActivityLogPage />} />`

## 6. 側邊欄整合

- [x] 6.1 在 `app/src/components/layout/AppLayout.tsx` 的 `adminNavItems` 陣列中新增「使用者紀錄」連結，指向 `/admin/activity-log`
