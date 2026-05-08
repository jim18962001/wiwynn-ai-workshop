# vehicle-management Specification

## Purpose
TBD - created by archiving change vehicle-management-system. Update Purpose after archive.
## Requirements
### Requirement: 使用者可檢視車輛清單
系統 SHALL 在車輛管理頁顯示所有車輛的資料表格，欄位包含：車牌號碼、車輛型號、狀態、指派員工、最後更新時間。資料來源為 MSW `GET /api/vehicles`。

#### Scenario: 車輛清單載入成功
- **WHEN** 已登入使用者進入 `/vehicles`
- **THEN** 系統顯示車輛資料表格
- **AND** 表格包含車牌、型號、狀態、指派員工欄位

#### Scenario: 無車輛資料
- **WHEN** MSW 回傳空陣列
- **THEN** 系統顯示「目前無車輛資料」的空狀態訊息

#### Scenario: 資料載入中
- **WHEN** API 回應尚未返回
- **THEN** 表格顯示 skeleton loading 列

---

### Requirement: 使用者可新增車輛
系統 SHALL 提供「新增車輛」按鈕，點擊後開啟 Dialog Modal，包含表單欄位：車牌號碼（必填）、車輛型號（必填）、狀態（select，預設「閒置」）、指派員工（optional select）。送出後呼叫 MSW `POST /api/vehicles`，成功後關閉 Modal 並刷新列表。

#### Scenario: 成功新增車輛
- **WHEN** 使用者填寫必填欄位並提交新增表單
- **THEN** 系統呼叫 POST /api/vehicles
- **AND** Modal 關閉，車輛清單新增該筆資料

#### Scenario: 新增表單驗證失敗
- **WHEN** 使用者未填寫車牌號碼即提交
- **THEN** 系統在車牌欄位下方顯示「車牌號碼為必填」錯誤訊息
- **AND** 不送出 API 請求

---

### Requirement: 使用者可編輯車輛資料
系統 SHALL 在每筆車輛資料列提供「編輯」按鈕，點擊後開啟編輯 Dialog，預填現有資料。送出後呼叫 MSW `PUT /api/vehicles/:id`，成功後更新列表對應資料。

#### Scenario: 成功編輯車輛
- **WHEN** 使用者修改車輛狀態並提交編輯表單
- **THEN** 系統呼叫 PUT /api/vehicles/:id
- **AND** 表格中該筆資料即時更新

#### Scenario: 編輯 Modal 預填資料
- **WHEN** 使用者點擊某筆車輛的「編輯」按鈕
- **THEN** 編輯 Dialog 的所有欄位預填該車輛的現有資料

---

### Requirement: 使用者可刪除車輛
系統 SHALL 在每筆資料列提供「刪除」按鈕，點擊後顯示確認 Dialog（「確認刪除此車輛？此操作無法復原。」）。確認後呼叫 MSW `DELETE /api/vehicles/:id`，成功後從列表移除該筆資料。

#### Scenario: 成功刪除車輛
- **WHEN** 使用者確認刪除 Dialog
- **THEN** 系統呼叫 DELETE /api/vehicles/:id
- **AND** 該筆車輛從表格中移除

#### Scenario: 取消刪除
- **WHEN** 使用者在確認 Dialog 點擊「取消」
- **THEN** Dialog 關閉，車輛資料保留不變

