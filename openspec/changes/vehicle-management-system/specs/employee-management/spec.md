## ADDED Requirements

### Requirement: 管理者可檢視員工清單
系統 SHALL 在員工管理頁（`/employees`，admin only）顯示所有員工的資料表格，欄位包含：姓名、職稱、部門、Email、電話。資料來源為 MSW `GET /api/employees`。

#### Scenario: admin 檢視員工清單
- **WHEN** role=admin 使用者進入 `/employees`
- **THEN** 系統顯示員工資料表格，包含姓名、職稱、部門、Email 欄位

#### Scenario: 無員工資料
- **WHEN** MSW 回傳空陣列
- **THEN** 系統顯示「目前無員工資料」的空狀態訊息

---

### Requirement: 管理者可新增員工
系統 SHALL 提供「新增員工」按鈕（admin only），點擊後開啟 Dialog Modal，包含表單欄位：姓名（必填）、職稱（必填）、部門（必填）、Email（必填，格式驗證）、電話（optional）。送出後呼叫 MSW `POST /api/employees`，成功後關閉 Modal 並刷新列表。

#### Scenario: 成功新增員工
- **WHEN** admin 填寫必填欄位並提交新增表單
- **THEN** 系統呼叫 POST /api/employees
- **AND** Modal 關閉，員工清單新增該筆資料

#### Scenario: Email 格式錯誤
- **WHEN** admin 輸入無效 Email 格式並提交
- **THEN** 系統在 Email 欄位下方顯示「請輸入有效的 Email 格式」
- **AND** 不送出 API 請求

---

### Requirement: 管理者可編輯員工資料
系統 SHALL 在每筆員工資料列提供「編輯」按鈕，點擊後開啟編輯 Dialog，預填現有資料。送出後呼叫 MSW `PUT /api/employees/:id`，成功後更新列表對應資料。

#### Scenario: 成功編輯員工
- **WHEN** admin 修改員工職稱並提交編輯表單
- **THEN** 系統呼叫 PUT /api/employees/:id
- **AND** 表格中該筆資料即時更新

---

### Requirement: 管理者可刪除員工
系統 SHALL 在每筆資料列提供「刪除」按鈕，點擊後顯示確認 Dialog（「確認刪除此員工？此操作無法復原。」）。確認後呼叫 MSW `DELETE /api/employees/:id`，成功後從列表移除該筆資料。

#### Scenario: 成功刪除員工
- **WHEN** admin 確認刪除 Dialog
- **THEN** 系統呼叫 DELETE /api/employees/:id
- **AND** 該筆員工從表格中移除

#### Scenario: 取消刪除
- **WHEN** admin 在確認 Dialog 點擊「取消」
- **THEN** Dialog 關閉，員工資料保留不變
