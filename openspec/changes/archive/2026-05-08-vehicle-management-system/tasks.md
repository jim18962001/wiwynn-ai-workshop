## 1. 專案初始化

- [x] 1.1 在 repo 根目錄建立 `app/` 子目錄，執行 `npm create vite@latest app -- --template react-ts`
- [x] 1.2 安裝依賴：`react-router-dom @tanstack/react-query axios msw recharts`
- [x] 1.3 安裝並設定 Tailwind CSS（`tailwindcss postcss autoprefixer`）
- [x] 1.4 執行 `npx shadcn@latest init` 設定 shadcn/ui（選擇 Default style, Zinc 色系）
- [x] 1.5 安裝 shadcn 元件：`button input label card dialog table select badge skeleton`
- [x] 1.6 建立目錄結構：`src/components/ui/`、`src/components/layout/`、`src/components/shared/`、`src/pages/`、`src/hooks/`、`src/mocks/handlers/`、`src/mocks/data/`、`src/lib/`、`src/contexts/`、`src/types/`

## 2. 型別定義與基礎設定

- [x] 2.1 在 `src/types/index.ts` 定義 `User`、`Vehicle`、`Employee`、`VehicleStatus` 型別
- [x] 2.2 在 `src/lib/api.ts` 建立 axios instance（baseURL: `/api`，攜帶 Authorization header）
- [x] 2.3 在 `src/lib/queryClient.ts` 建立 React Query QueryClient 設定

## 3. MSW Mock API

- [x] 3.1 在 `src/mocks/data/` 建立 seed 資料：`vehicles.ts`（10 筆）、`employees.ts`（8 筆）
- [x] 3.2 在 `src/mocks/handlers/auth.ts` 建立 `POST /api/auth/login` handler（驗證 admin/user 帳密，回傳 token + role）
- [x] 3.3 在 `src/mocks/handlers/vehicles.ts` 建立完整 CRUD handlers：`GET /api/vehicles`、`POST /api/vehicles`、`PUT /api/vehicles/:id`、`DELETE /api/vehicles/:id`
- [x] 3.4 在 `src/mocks/handlers/employees.ts` 建立完整 CRUD handlers：`GET /api/employees`、`POST /api/employees`、`PUT /api/employees/:id`、`DELETE /api/employees/:id`
- [x] 3.5 在 `src/mocks/handlers/stats.ts` 建立 `GET /api/stats` handler（回傳 KPI 與圖表資料）
- [x] 3.6 在 `src/mocks/browser.ts` 整合所有 handlers，執行 `npx msw init public/` 安裝 service worker

## 4. 身份驗證（user-auth）

- [x] 4.1 在 `src/contexts/AuthContext.tsx` 建立 `AuthContext`，提供 `user`、`login()`、`logout()` 方法，從 localStorage 初始化狀態
- [x] 4.2 建立 `src/hooks/useAuth.ts` hook（封裝 useContext(AuthContext)）
- [x] 4.3 建立 `src/components/layout/ProtectedRoute.tsx`：未登入重導向 `/login`，已登入訪問 `/login` 重導向 `/dashboard`
- [x] 4.4 建立 `src/components/layout/AdminRoute.tsx`：role≠admin 重導向 `/dashboard`
- [x] 4.5 建立 `src/pages/LoginPage.tsx`：包含帳號/密碼輸入欄、送出按鈕、錯誤訊息顯示（使用 react-hook-form + zod 驗證）
- [x] 4.6 在 `LoginPage` 的 submit handler 中呼叫 `POST /api/auth/login`，成功後寫入 localStorage 並導向 `/dashboard`

## 5. 應用程式路由與版面

- [x] 5.1 在 `src/App.tsx` 設定 React Router 路由：`/login`、`/dashboard`（protected）、`/vehicles`（protected）、`/employees`（admin only）
- [x] 5.2 建立 `src/components/layout/AppLayout.tsx`：Sidebar 導覽列 + Header（顯示使用者名稱與登出按鈕）+ 主內容區
- [x] 5.3 在 Sidebar 中依 role 條件顯示「員工管理」選項（admin 才顯示）
- [x] 5.4 在 `src/main.tsx` 包裝 `QueryClientProvider`、`AuthProvider`、`BrowserRouter`，並啟動 MSW worker

## 6. 儀表板（dashboard）

- [x] 6.1 建立 `src/components/shared/StatCard.tsx`：通用 KPI 卡片元件（接受 title、value、icon props）
- [x] 6.2 建立 `src/hooks/useStats.ts`：使用 React Query 呼叫 `GET /api/stats`
- [x] 6.3 建立 `src/pages/DashboardPage.tsx`：上方渲染 4 張 StatCard（載入時顯示 Skeleton），下方放置圖表區
- [x] 6.4 在 `DashboardPage` 中加入 Recharts `PieChart`，呈現車輛狀態分布（使用中 / 閒置 / 維修中）
- [x] 6.5 在 `DashboardPage` 中加入 Recharts `BarChart`，呈現最近 6 個月車輛使用趨勢

## 7. 車輛管理（vehicle-management）

- [x] 7.1 建立 `src/hooks/useVehicles.ts`：封裝 React Query CRUD（`useQuery` + `useMutation` for POST/PUT/DELETE）
- [x] 7.2 建立 `src/components/shared/VehicleForm.tsx`：新增/編輯共用表單（車牌、型號、狀態 Select、指派員工 Select），使用 react-hook-form + zod
- [x] 7.3 建立 `src/components/shared/ConfirmDeleteDialog.tsx`：通用確認刪除 Dialog 元件
- [x] 7.4 建立 `src/pages/VehiclesPage.tsx`：包含「新增車輛」按鈕 + shadcn Table 顯示列表 + 每列的編輯/刪除按鈕
- [x] 7.5 在 `VehiclesPage` 整合 `VehicleForm`（新增 Dialog）、編輯 Dialog（預填資料）、`ConfirmDeleteDialog`
- [x] 7.6 驗證車輛狀態 Badge 顯示（不同狀態使用不同顏色 variant）

## 8. 員工管理（employee-management）

- [x] 8.1 建立 `src/hooks/useEmployees.ts`：封裝 React Query CRUD（同 useVehicles 模式）
- [x] 8.2 建立 `src/components/shared/EmployeeForm.tsx`：新增/編輯共用表單（姓名、職稱、部門、Email、電話），含 Email 格式 zod 驗證
- [x] 8.3 建立 `src/pages/EmployeesPage.tsx`：與 `VehiclesPage` 結構一致，整合 `EmployeeForm`、編輯 Dialog、`ConfirmDeleteDialog`
- [x] 8.4 確認 `AdminRoute` 正確保護 `/employees` 路由（role=user 無法存取）

## 9. 整合驗證

- [x] 9.1 以 admin 帳號登入，驗證可存取所有 4 個功能模組
- [x] 9.2 以 user 帳號登入，驗證儀表板與車輛管理可用，員工管理被阻擋並重導向
- [x] 9.3 驗證車輛 CRUD 流程：新增 → 編輯 → 刪除，列表即時更新
- [x] 9.4 驗證員工 CRUD 流程（以 admin 身份）
- [x] 9.5 驗證表單驗證：車牌必填、Email 格式錯誤訊息正確顯示
- [x] 9.6 驗證重整頁面後，已登入狀態由 localStorage 正確還原
