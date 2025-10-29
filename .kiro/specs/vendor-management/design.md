# Vendor Management Module - Design Document

## Overview

The Vendor Management module adds comprehensive vendor tracking and analytics to the IT Asset Management System. It includes database schema extensions, new API endpoints, frontend pages for vendor CRUD operations, a vendor dashboard with analytics, and AI-powered vendor insights integrated with the existing insights engine.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────┐
│         Frontend (React)                │
├─────────────────────────────────────────┤
│  - Vendors Page (List/CRUD)             │
│  - Vendor Detail Page                   │
│  - Vendor Dashboard                     │
│  - Purchase Orders Page                 │
│  - Vendor Comparison View               │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│         API Layer (Express)             │
├─────────────────────────────────────────┤
│  - /api/vendors                         │
│  - /api/vendors/:id                     │
│  - /api/purchase-orders                 │
│  - /api/vendors/dashboard               │
│  - /api/vendors/compare                 │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│      Business Logic Layer               │
├─────────────────────────────────────────┤
│  - Vendor Service                       │
│  - Purchase Order Service               │
│  - Vendor Analytics Service             │
│  - Vendor Insights Analyzer (AI)        │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│       Database (PostgreSQL)             │
├─────────────────────────────────────────┤
│  - vendors table                        │
│  - purchase_orders table                │
│  - assets table (add vendor_id FK)      │
└─────────────────────────────────────────┘
```

## Database Schema

### New Tables

#### vendors table
```sql
CREATE TABLE vendors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255),
    phone VARCHAR(50),
    address TEXT,
    category VARCHAR(100) NOT NULL,
    rating DECIMAL(2,1) CHECK (rating >= 0 AND rating <= 5),
    notes TEXT,
    contract_start_date DATE,
    contract_end_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_vendors_category ON vendors(category);
CREATE INDEX idx_vendors_rating ON vendors(rating);
CREATE INDEX idx_vendors_contract_end ON vendors(contract_end_date);
```

#### purchase_orders table
```sql
CREATE TABLE purchase_orders (
    id SERIAL PRIMARY KEY,
    vendor_id INTEGER REFERENCES vendors(id) ON DELETE CASCADE,
    order_number VARCHAR(100) UNIQUE NOT NULL,
    order_date DATE NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    invoice_url TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_po_vendor ON purchase_orders(vendor_id);
CREATE INDEX idx_po_status ON purchase_orders(status);
CREATE INDEX idx_po_date ON purchase_orders(order_date);
```

#### purchase_order_items table
```sql
CREATE TABLE purchase_order_items (
    id SERIAL PRIMARY KEY,
    purchase_order_id INTEGER REFERENCES purchase_orders(id) ON DELETE CASCADE,
    asset_id INTEGER REFERENCES assets(id) ON DELETE SET NULL,
    quantity INTEGER DEFAULT 1,
    unit_price DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_poi_po ON purchase_order_items(purchase_order_id);
CREATE INDEX idx_poi_asset ON purchase_order_items(asset_id);
```

### Modified Tables

#### assets table (add vendor_id)
```sql
ALTER TABLE assets 
ADD COLUMN vendor_id INTEGER REFERENCES vendors(id) ON DELETE SET NULL,
ADD COLUMN purchase_date DATE,
ADD COLUMN purchase_price DECIMAL(10,2),
ADD COLUMN warranty_end_date DATE;

CREATE INDEX idx_assets_vendor ON assets(vendor_id);
```

## API Endpoints

### Vendor Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | /api/vendors | List all vendors | Yes |
| GET | /api/vendors/:id | Get vendor details | Yes |
| POST | /api/vendors | Create new vendor | Yes |
| PUT | /api/vendors/:id | Update vendor | Yes |
| DELETE | /api/vendors/:id | Delete vendor | Yes |
| GET | /api/vendors/:id/assets | Get assets by vendor | Yes |
| GET | /api/vendors/:id/orders | Get POs by vendor | Yes |
| GET | /api/vendors/dashboard/stats | Vendor dashboard data | Yes |
| POST | /api/vendors/compare | Compare multiple vendors | Yes |

### Purchase Order Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | /api/purchase-orders | List all POs | Yes |
| GET | /api/purchase-orders/:id | Get PO details | Yes |
| POST | /api/purchase-orders | Create new PO | Yes |
| PUT | /api/purchase-orders/:id | Update PO | Yes |
| DELETE | /api/purchase-orders/:id | Delete PO | Yes |

## Data Models

### Vendor Object
```javascript
{
  id: number,
  name: string,
  email: string,
  phone: string,
  address: string,
  category: string, // 'Hardware', 'Software', 'Services', 'Peripherals'
  rating: number, // 0-5
  notes: string,
  contractStartDate: date,
  contractEndDate: date,
  createdAt: timestamp,
  updatedAt: timestamp,
  // Computed fields
  totalAssets: number,
  totalSpend: number,
  reliabilityScore: number
}
```

### Purchase Order Object
```javascript
{
  id: number,
  vendorId: number,
  vendorName: string,
  orderNumber: string,
  orderDate: date,
  totalAmount: number,
  status: string, // 'pending', 'completed', 'cancelled'
  invoiceUrl: string,
  notes: string,
  items: Array<{
    assetId: number,
    assetName: string,
    quantity: number,
    unitPrice: number
  }>,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

## Frontend Components

### Page Components

1. **Vendors.jsx** - Main vendors list page
   - Table view with search and filter
   - Add/Edit/Delete actions
   - Category filter dropdown
   - Rating filter
   - Sort by name, rating, spend

2. **VendorDetail.jsx** - Individual vendor profile
   - Vendor information card
   - Assets supplied list
   - Purchase orders list
   - Performance metrics
   - Edit/Delete buttons

3. **VendorDashboard.jsx** - Analytics dashboard
   - Vendor count by category (pie chart)
   - Top vendors by spend (bar chart)
   - Top vendors by assets (bar chart)
   - Contract expiry alerts
   - AI insights widget

4. **PurchaseOrders.jsx** - PO management page
   - PO list with filters
   - Create/Edit PO modal
   - Link assets to PO
   - Upload invoice

5. **VendorComparison.jsx** - Side-by-side comparison
   - Select vendors to compare
   - Comparison table
   - Visual indicators for best in category
   - Export to PDF

### Reusable Components

1. **VendorCard.jsx** - Vendor summary card
2. **VendorForm.jsx** - Create/Edit vendor form
3. **PurchaseOrderForm.jsx** - Create/Edit PO form
4. **VendorRating.jsx** - Star rating display/input
5. **ContractExpiryBadge.jsx** - Visual indicator for contract status
6. **VendorMetrics.jsx** - Performance metrics display

## AI Insights Integration

### Vendor Insights Analyzer

Location: `server/services/analyzers/vendorInsightsAnalyzer.js`

#### Analysis Rules

1. **Reliability Score Calculation**
```javascript
reliabilityScore = (
  (activeAssets / totalAssets) * 0.4 +
  (rating / 5) * 0.3 +
  (1 - (failedAssets / totalAssets)) * 0.3
) * 100
```

2. **Low Reliability Alert**
- Trigger: Reliability score < 60
- Priority: High
- Message: "Vendor X has a low reliability score of Y%. Consider reviewing asset quality."

3. **High Spend Alert**
- Trigger: Spend increase > 50% vs previous period
- Priority: Medium
- Message: "Spending with Vendor X increased by Y% this period. Review budget allocation."

4. **Preferred Vendor Recommendation**
- Trigger: Rating >= 4.5 AND reliability score >= 80
- Priority: Low
- Message: "Vendor X is a top performer. Consider consolidating purchases."

5. **Contract Expiry Warning**
- Trigger: Contract expires within 30 days
- Priority: High
- Message: "Contract with Vendor X expires in Y days. Initiate renewal process."

6. **Vendor Consolidation Opportunity**
- Trigger: Multiple vendors in same category with low spend
- Priority: Medium
- Message: "Consider consolidating purchases from 3 peripheral vendors to reduce overhead."

## UI/UX Design

### Vendors List Page Layout

```
┌─────────────────────────────────────────────────────────┐
│  Vendors                                    [+ Add Vendor]│
├─────────────────────────────────────────────────────────┤
│  [Search...] [Category ▼] [Rating ▼] [Sort ▼]          │
├─────────────────────────────────────────────────────────┤
│  Name          Category    Rating  Assets  Spend        │
│  ────────────────────────────────────────────────────── │
│  Dell Inc.     Hardware    ⭐⭐⭐⭐⭐   45    $125,000    │
│  HP Enterprise Hardware    ⭐⭐⭐⭐     32    $89,500     │
│  Lenovo        Hardware    ⭐⭐⭐⭐     28    $76,200     │
│  Microsoft     Software    ⭐⭐⭐⭐⭐   15    $45,000     │
└─────────────────────────────────────────────────────────┘
```

### Vendor Dashboard Layout

```
┌─────────────────────────────────────────────────────────┐
│  Vendor Dashboard                                        │
├─────────────────────────────────────────────────────────┤
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│  │ Total    │ │ Active   │ │ Total    │ │ Avg      │  │
│  │ Vendors  │ │ Contracts│ │ Spend    │ │ Rating   │  │
│  │   24     │ │    18    │ │ $450K    │ │  4.2⭐   │  │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘  │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────────────┐  ┌─────────────────────────┐  │
│  │ Top Vendors by Spend│  │ Vendors by Category     │  │
│  │ (Bar Chart)         │  │ (Pie Chart)             │  │
│  └─────────────────────┘  └─────────────────────────┘  │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────┐   │
│  │ 🤖 AI Vendor Insights                           │   │
│  │ • Contract with Dell expires in 15 days         │   │
│  │ • HP Enterprise is a top performer (4.8⭐)      │   │
│  │ • Consider consolidating peripheral vendors     │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### Color Scheme

**Vendor Categories:**
- Hardware: Blue (#3B82F6)
- Software: Purple (#8B5CF6)
- Services: Green (#10B981)
- Peripherals: Orange (#F59E0B)

**Contract Status:**
- Active: Green
- Expiring Soon (< 30 days): Yellow
- Expired: Red

**Rating Colors:**
- 5 stars: Gold (#FFD700)
- 4-4.9 stars: Light Gold
- 3-3.9 stars: Gray
- < 3 stars: Red

## Integration Points

### Main Dashboard Integration

Add vendor widget to main dashboard:
```javascript
<div className="vendor-summary-widget">
  <h3>Top Vendors</h3>
  <ul>
    {topVendors.map(vendor => (
      <li key={vendor.id}>
        {vendor.name} - ${vendor.totalSpend}
      </li>
    ))}
  </ul>
</div>
```

### Asset Pages Integration

- Add vendor dropdown to asset create/edit forms
- Display vendor name in asset list
- Show vendor info in asset detail page
- Filter assets by vendor

### Navigation Integration

Add to main navigation:
```javascript
<Link to="/vendors">Vendors</Link>
<Link to="/purchase-orders">Purchase Orders</Link>
```

## Security Considerations

1. **Authentication**: All vendor endpoints require JWT authentication
2. **Authorization**: Only admin users can create/edit/delete vendors
3. **Input Validation**: Sanitize all vendor inputs (name, email, notes)
4. **File Upload Security**: Validate invoice file types and sizes
5. **SQL Injection Prevention**: Use parameterized queries
6. **Rate Limiting**: Limit vendor creation to prevent abuse

## Performance Optimization

1. **Database Indexes**: Add indexes on frequently queried columns
2. **Caching**: Cache vendor dashboard stats for 1 hour
3. **Pagination**: Implement pagination for vendor lists (20 per page)
4. **Lazy Loading**: Load vendor details only when needed
5. **Query Optimization**: Use JOINs efficiently for vendor-asset relationships

## Testing Strategy

### Unit Tests
- Vendor CRUD operations
- Purchase order creation and linking
- Reliability score calculation
- AI insights generation

### Integration Tests
- Vendor-asset relationship
- Purchase order-asset linking
- Dashboard data aggregation
- Vendor comparison logic

### E2E Tests
- Complete vendor creation flow
- Asset assignment to vendor
- Purchase order workflow
- Vendor dashboard loading

## Migration Strategy

1. **Phase 1**: Add database tables and columns
2. **Phase 2**: Implement backend API endpoints
3. **Phase 3**: Create frontend pages and components
4. **Phase 4**: Integrate with existing dashboard
5. **Phase 5**: Add AI insights
6. **Phase 6**: Testing and refinement

## Future Enhancements

1. **Vendor Portal**: Allow vendors to log in and update order status
2. **Automated Procurement**: Integration with procurement systems
3. **Vendor Performance Tracking**: Detailed metrics over time
4. **Contract Management**: Full contract lifecycle management
5. **Multi-currency Support**: Handle international vendors
6. **Vendor Certifications**: Track compliance and certifications
7. **RFP Management**: Request for Proposal workflow
8. **Vendor Scorecards**: Comprehensive performance reports
