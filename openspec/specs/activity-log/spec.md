# Spec: Activity Log

## Purpose

This spec defines the requirements for the admin-facing user activity log feature. It covers the activity log list page, filtering capabilities, and navigation entry point in the sidebar.

## Requirements

### Requirement: 管理者可查看使用者操作記錄列表
系統 SHALL 提供 `/admin/activity-log` 頁面，僅限 `admin` 角色存取，以表格形式顯示所有使用者的操作記錄。每筆記錄 MUST 包含操作人員姓名、操作類型、目標資源、操作時間。

#### Scenario: 管理者進入使用者紀錄頁面
- **WHEN** admin 使用者導航至 `/admin/activity-log`
- **THEN** 系統顯示使用者操作記錄表格，包含欄位：操作人員、操作類型、目標資源、時間

#### Scenario: 非管理者存取被拒
- **WHEN** 一般使用者（role=user）嘗試導航至 `/admin/activity-log`
- **THEN** 系統將使用者重新導向至 `/dashboard`

#### Scenario: 載入中顯示 Skeleton
- **WHEN** 系統正在從 API 取得操作記錄資料
- **THEN** 頁面顯示 Skeleton 佔位元件，而非空白或錯誤畫面

### Requirement: 管理者可依使用者名稱篩選記錄
系統 SHALL 在頁面上提供文字輸入欄位，讓管理者輸入使用者名稱以篩選顯示的操作記錄。

#### Scenario: 輸入使用者名稱篩選
- **WHEN** 管理者在篩選欄輸入部分使用者姓名
- **THEN** 表格 MUST 只顯示符合該姓名（部分比對）的操作記錄

#### Scenario: 清空篩選條件
- **WHEN** 管理者清空使用者名稱篩選欄
- **THEN** 表格顯示所有操作記錄

### Requirement: 管理者可依操作類型篩選記錄
系統 SHALL 提供操作類型下拉選單（CREATE、UPDATE、DELETE、LOGIN、LOGOUT），讓管理者篩選特定類型的操作記錄。

#### Scenario: 選擇操作類型篩選
- **WHEN** 管理者從下拉選單選擇一種操作類型（如 CREATE）
- **THEN** 表格 MUST 只顯示該操作類型的記錄

#### Scenario: 選擇「全部」重置篩選
- **WHEN** 管理者在操作類型下拉選單選擇「全部」
- **THEN** 表格顯示所有操作類型的記錄

### Requirement: 側邊欄顯示使用者紀錄入口
系統 SHALL 在管理者的側邊欄顯示「使用者紀錄」連結，連結至 `/admin/activity-log`。

#### Scenario: 管理者側邊欄顯示連結
- **WHEN** admin 使用者登入後查看側邊欄
- **THEN** 側邊欄 MUST 顯示「使用者紀錄」連結項目

#### Scenario: 一般使用者不顯示連結
- **WHEN** 一般使用者（role=user）登入後查看側邊欄
- **THEN** 側邊欄 MUST NOT 顯示「使用者紀錄」連結項目
