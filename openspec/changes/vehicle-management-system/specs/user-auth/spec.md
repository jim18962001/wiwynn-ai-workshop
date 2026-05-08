## ADDED Requirements

### Requirement: 使用者可透過帳號密碼登入
系統 SHALL 提供登入頁面，接受帳號（email 或 username）與密碼欄位。送出後由 MSW handler 驗證憑證，成功則寫入 token 與角色（role: admin | user）至 localStorage，並重新導向至儀表板。

#### Scenario: 管理者登入成功
- **WHEN** 使用者輸入 admin 帳號密碼並提交
- **THEN** 系統寫入 token 與 role=admin 至 localStorage
- **AND** 頁面導向 `/dashboard`

#### Scenario: 一般使用者登入成功
- **WHEN** 使用者輸入 user 帳號密碼並提交
- **THEN** 系統寫入 token 與 role=user 至 localStorage
- **AND** 頁面導向 `/dashboard`

#### Scenario: 帳號密碼錯誤
- **WHEN** 使用者輸入錯誤憑證並提交
- **THEN** 系統顯示錯誤訊息「帳號或密碼錯誤」
- **AND** 不寫入任何 token

---

### Requirement: 未登入使用者無法存取受保護頁面
系統 SHALL 透過 `ProtectedRoute` 元件保護所有非登入頁面的路由。未登入使用者存取任何受保護路由時，系統 MUST 將其重新導向至 `/login`。

#### Scenario: 直接存取受保護路由
- **WHEN** 未登入使用者直接輸入 `/dashboard` URL
- **THEN** 系統重新導向至 `/login`

#### Scenario: 已登入使用者重新訪問登入頁
- **WHEN** 已登入使用者訪問 `/login`
- **THEN** 系統重新導向至 `/dashboard`

---

### Requirement: 使用者可登出
系統 SHALL 提供登出功能，清除 localStorage 中的 token 與 role，並重新導向至 `/login`。

#### Scenario: 點擊登出
- **WHEN** 已登入使用者點擊 Header 中的「登出」按鈕
- **THEN** 系統清除 localStorage 的 token 與 role
- **AND** 頁面導向 `/login`

---

### Requirement: 僅 admin 可存取員工管理頁
系統 SHALL 以 `role=admin` 作為員工管理路由的存取前提。role=user 的使用者嘗試存取時，系統 MUST 顯示 403 或重新導向至 `/dashboard`。

#### Scenario: user 角色嘗試存取員工管理
- **WHEN** role=user 的已登入使用者存取 `/employees`
- **THEN** 系統重新導向至 `/dashboard`
- **AND** 不顯示員工資料

#### Scenario: admin 角色成功存取員工管理
- **WHEN** role=admin 的已登入使用者存取 `/employees`
- **THEN** 系統顯示員工管理頁面
