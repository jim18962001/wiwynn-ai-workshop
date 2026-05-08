## ADDED Requirements

### Requirement: 儀表板顯示關鍵指標卡片
系統 SHALL 在儀表板頁面上方顯示至少 4 張 KPI 卡片，每張卡片包含標題、數值與趨勢指示。卡片資料來源為 MSW `/api/stats` 端點。

指標內容：
- 車輛總數
- 使用中車輛數
- 閒置車輛數
- 員工總數

#### Scenario: 儀表板載入成功
- **WHEN** 已登入使用者進入儀表板
- **THEN** 系統顯示 4 張 KPI 卡片
- **AND** 每張卡片顯示正確數值

#### Scenario: 資料載入中
- **WHEN** API 回應尚未返回
- **THEN** 每張卡片顯示 skeleton loading 狀態

---

### Requirement: 儀表板顯示車輛狀態分布圓餅圖
系統 SHALL 在 KPI 卡片下方顯示圓餅圖（PieChart），呈現車輛依狀態（使用中 / 閒置 / 維修中）分布比例。

#### Scenario: 圓餅圖顯示車輛狀態分布
- **WHEN** 已登入使用者進入儀表板
- **THEN** 系統顯示圓餅圖，各切片對應車輛狀態類別
- **AND** 圖表包含圖例（legend）

---

### Requirement: 儀表板顯示月度車輛使用趨勢長條圖
系統 SHALL 在儀表板下方顯示長條圖（BarChart），呈現最近 6 個月的車輛使用數量趨勢。

#### Scenario: 長條圖顯示月度趨勢
- **WHEN** 已登入使用者進入儀表板
- **THEN** 系統顯示長條圖，X 軸為月份，Y 軸為使用數量
- **AND** 圖表包含 tooltip，hover 可查看精確數值
