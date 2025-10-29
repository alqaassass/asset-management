# Vendor Management Module - Implementation Tasks

## Database & Backend Tasks

- [ ] 1. Create database schema for vendor management
  - Create vendors table with all required fields
  - Create purchase_orders table with vendor foreign key
  - Create purchase_order_items junction table
  - Alter assets table to add vendor_id, purchase_date, purchase_price, warranty_end_date columns
  - Add all necessary indexes for performance
  - Write migration script that can be run safely
  - _Requirements: 1.1, 1.2, 2.1, 2.2, 3.1_

- [ ] 2. Implement vendor API endpoints
- [ ] 2.1 Create vendors router and controller
  - Implement GET /api/vendors (list all with pagination)
  - Implement GET /api/vendors/:id (get single vendor with stats)
  - Implement POST /api/vendors (create new vendor)
  - Implement PUT /api/vendors/:id (update vendor)
  - Implement DELETE /api/vendors/:id (soft delete, set assets vendor_id to NULL)
  - Add authentication middleware to all endpoints
  - Add input validation for all fields
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [ ] 2.2 Create vendor analytics endpoints
  - Implement GET /api/vendors/:id/assets (get all assets for vendor)
  - Implement GET /api/vendors/:id/orders (get all POs for vendor)
  - Implement GET /api/vendors/dashboard/stats (aggregate vendor statistics)
  - Implement POST /api/vendors/compare (compare multiple vendors)
  - Calculate total spend, asset count, reliability score for each vendor
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 5.3, 5.4, 5.5, 8.1, 8.2, 8.3_

- [ ] 3. Implement purchase order API endpoints
  - Create purchase orders router and controller
  - Implement GET /api/purchase-orders (list all with filters)
  - Implement GET /api/purchase-orders/:id (get single PO with items)
  - Implement POST /api/purchase-orders (create PO with items)
  - Implement PUT /api/purchase-orders/:id (update PO)
  - Implement DELETE /api/purchase-orders/:id (delete PO)
  - Add validation for order_number uniqueness
  - Handle purchase_order_items creation/update
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [ ] 4. Update assets API to include vendor information
  - Modify GET /api/assets to include vendor name
  - Modify POST /api/assets to accept vendor_id
  - Modify PUT /api/assets to allow vendor_id updates
  - Add vendor filter to asset list endpoint
  - Return vendor details in asset detail endpoint
  - _Requirements: 2.1, 2.3, 2.4, 9.3, 9.4_

- [ ] 5. Implement vendor insights analyzer
  - Create vendorInsightsAnalyzer.js module
  - Implement reliability score calculation algorithm
  - Implement low reliability detection (< 60% score)
  - Implement high spend alert (> 50% increase)
  - Implement preferred vendor identification (rating >= 4.5, reliability >= 80)
  - Implement contract expiry warnings (< 30 days)
  - Implement vendor consolidation opportunity detection
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 7.2, 7.3_

- [ ] 6. Integrate vendor insights with main insights engine
  - Add vendor insights to GET /api/insights endpoint
  - Include vendor metrics in dashboard stats
  - Generate vendor-related recommendations
  - Add vendor filter to insights
  - _Requirements: 9.1, 9.2, 9.5_

## Frontend Tasks

- [ ] 7. Create Vendors list page
  - Create Vendors.jsx component
  - Implement table view with columns: name, category, rating, assets, spend
  - Add search functionality (filter by name)
  - Add category filter dropdown
  - Add rating filter
  - Add sort functionality (name, rating, spend)
  - Implement pagination (20 vendors per page)
  - Add "Add Vendor" button
  - Add Edit and Delete actions for each vendor
  - Style with glassmorphism matching existing design
  - Support dark mode
  - _Requirements: 1.1, 1.4_

- [ ] 8. Create Vendor form component
  - Create VendorForm.jsx modal component
  - Add fields: name, email, phone, address, category dropdown, rating (star selector), notes textarea
  - Add contract start and end date pickers
  - Implement form validation (required fields, email format, phone format)
  - Handle create and update modes
  - Display success/error messages
  - Style with glassmorphism
  - Support dark mode
  - _Requirements: 1.2, 1.3, 7.1_

- [ ] 9. Create Vendor detail page
  - Create VendorDetail.jsx component
  - Display vendor information card with all fields
  - Show contract status badge (active, expiring, expired)
  - Display performance metrics (total assets, total spend, reliability score)
  - List all assets supplied by vendor with status and type
  - List all purchase orders with dates and amounts
  - Add Edit and Delete buttons
  - Add "Create Purchase Order" button
  - Style with glassmorphism
  - Support dark mode
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 7.4_

- [ ] 10. Create Vendor dashboard page
  - Create VendorDashboard.jsx component
  - Display overview cards: total vendors, active contracts, total spend, average rating
  - Create vendor count by category pie chart
  - Create top 5 vendors by spend bar chart
  - Create top 5 vendors by assets bar chart
  - Display contract expiry alerts widget
  - Display AI vendor insights widget
  - Add refresh button
  - Style with glassmorphism matching main dashboard
  - Support dark mode
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 7.2, 7.3_

- [ ] 11. Create Purchase Orders page
  - Create PurchaseOrders.jsx component
  - Display PO list table with columns: order number, vendor, date, amount, status
  - Add filters: vendor, status, date range
  - Add "Create Purchase Order" button
  - Implement PO detail modal showing all items
  - Add Edit and Delete actions
  - Style with glassmorphism
  - Support dark mode
  - _Requirements: 3.1, 3.2, 3.3_

- [ ] 12. Create Purchase Order form component
  - Create PurchaseOrderForm.jsx modal component
  - Add fields: vendor dropdown, order number, order date, status dropdown, notes
  - Implement multi-asset selector (add multiple assets to PO)
  - Add unit price input for each asset
  - Calculate and display total amount automatically
  - Add invoice URL input field
  - Implement form validation
  - Handle create and update modes
  - Style with glassmorphism
  - Support dark mode
  - _Requirements: 3.1, 3.2, 3.4_

- [ ] 13. Create Vendor comparison page
  - Create VendorComparison.jsx component
  - Add multi-select dropdown to choose vendors (2-5 vendors)
  - Display comparison table with columns: rating, total spend, assets, reliability score, contract status
  - Highlight best performer in each category with green indicator
  - Add AI recommendation text based on comparison
  - Add "Export to PDF" button
  - Style with glassmorphism
  - Support dark mode
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [ ] 14. Update Assets page to include vendor
  - Add vendor dropdown to asset create/edit modal
  - Display vendor name in asset list table
  - Add vendor filter to asset list
  - Make vendor name clickable (link to vendor detail)
  - Update asset detail page to show vendor information
  - _Requirements: 2.1, 2.3, 2.4, 2.5_

- [ ] 15. Create reusable vendor components
  - Create VendorCard.jsx (summary card for dashboard)
  - Create VendorRating.jsx (star rating display and input)
  - Create ContractExpiryBadge.jsx (visual indicator for contract status)
  - Create VendorMetrics.jsx (performance metrics display)
  - Style all components with glassmorphism
  - Support dark mode
  - _Requirements: 5.1, 7.4_

- [ ] 16. Update main navigation
  - Add "Vendors" link to navigation menu
  - Add "Purchase Orders" link to navigation menu
  - Update mobile menu to include new links
  - Add vendor icon (🏢) to navigation
  - Ensure active state styling works
  - _Requirements: 1.1_

- [ ] 17. Integrate vendor widget into main dashboard
  - Create TopVendorsWidget component
  - Display top 3 vendors by spend
  - Show vendor name, category, and total spend
  - Add "View All Vendors" link
  - Place widget in dashboard grid
  - Style with glassmorphism
  - Support dark mode
  - _Requirements: 9.1_

- [ ] 18. Add vendor charts to analytics section
  - Create VendorSpendChart component (bar chart)
  - Create VendorCategoryChart component (pie chart)
  - Integrate charts into ChartsSection or create separate VendorChartsSection
  - Add AI insights for vendor spending patterns
  - Style with glassmorphism
  - Support dark mode
  - _Requirements: 4.2, 4.3, 4.4, 9.2_

## Integration & Testing Tasks

- [ ] 19. Update routing
  - Add /vendors route to App.jsx
  - Add /vendors/:id route for vendor detail
  - Add /vendor-dashboard route
  - Add /purchase-orders route
  - Add /vendors/compare route
  - Ensure all routes require authentication
  - _Requirements: 1.1, 5.1_

- [ ] 20. Add dummy vendor data
  - Create SQL script with 10-15 sample vendors
  - Include various categories (Hardware, Software, Services, Peripherals)
  - Add varied ratings (2-5 stars)
  - Link existing assets to vendors
  - Create sample purchase orders
  - Include vendors with expiring contracts
  - _Requirements: All_

- [ ]* 21. Write backend tests
  - Test vendor CRUD operations
  - Test purchase order creation and linking
  - Test vendor analytics calculations
  - Test reliability score algorithm
  - Test vendor insights generation
  - Test vendor comparison logic

- [ ]* 22. Write frontend tests
  - Test Vendors page rendering and filtering
  - Test VendorForm validation and submission
  - Test VendorDetail page data display
  - Test VendorDashboard charts rendering
  - Test PurchaseOrderForm asset linking
  - Test vendor comparison functionality

- [ ]* 23. Documentation
  - Update README with vendor management features
  - Create vendor management user guide
  - Document API endpoints
  - Add database schema documentation
  - Create vendor workflow diagrams
