# Implementation Plan

- [ ] 1. Set up database schema for insights storage
  - Create `insights` table with columns for type, priority, title, description, recommendation, metrics, metadata, timestamps
  - Create `insight_assets` junction table to link insights with affected assets
  - Add indexes on priority, type, and dismissed_at columns for query performance
  - Write migration script that can be run safely on existing database
  - _Requirements: 1.1, 1.2, 1.3, 5.2_

- [ ] 2. Implement backend analysis modules
- [ ] 2.1 Create maintenance analyzer module
  - Write function to identify assets with no updates in 90+ days
  - Implement logic to detect asset types with high reassignment patterns
  - Return structured data with affected assets and metrics
  - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [ ] 2.2 Create utilization analyzer module
  - Write function to find active assets with no assignment
  - Calculate percentage of unassigned assets by type
  - Identify types exceeding 20% underutilization threshold
  - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [ ] 2.3 Create cost optimization analyzer module
  - Write function to find multiple inactive assets of same type
  - Identify asset types with high counts of unassigned items
  - Generate consolidation and disposal recommendations
  - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [ ] 2.4 Create priority ranking module
  - Implement scoring algorithm based on count, percentage, and type
  - Write function to assign priority levels (high, medium, low)
  - Sort insights by priority score for display ordering
  - _Requirements: 1.5_

- [ ] 2.5 Create insights service orchestrator
  - Write main `generateInsights()` function that calls all analyzers
  - Implement caching logic to store insights with 24-hour expiration
  - Add logic to check cache before regenerating insights
  - Store generated insights in database with proper timestamps
  - _Requirements: 1.2, 1.3_

- [ ] 3. Create backend API endpoints
- [ ] 3.1 Implement GET /api/insights endpoint
  - Add authentication middleware to protect endpoint
  - Query database for non-dismissed, non-expired insights
  - Include related asset data through joins
  - Return insights ordered by priority
  - _Requirements: 1.1, 1.5_

- [ ] 3.2 Implement GET /api/insights/:id endpoint
  - Add authentication middleware
  - Query specific insight with full details
  - Include calculation methodology in response
  - Return 404 if insight not found
  - _Requirements: 5.1, 5.2, 5.3_

- [ ] 3.3 Implement POST /api/insights/refresh endpoint
  - Add authentication middleware
  - Trigger manual insight regeneration
  - Clear expired insights from database
  - Return newly generated insights
  - _Requirements: 1.2_

- [ ] 3.4 Implement PUT /api/insights/:id/dismiss endpoint
  - Add authentication middleware
  - Update insight's dismissed_at timestamp
  - Return success confirmation
  - _Requirements: 5.4_

- [ ] 4. Create frontend InsightCard component
  - Create component file with props for insight data and click handler
  - Implement color-coded priority indicators (red, yellow, blue)
  - Add category icons (maintenance, utilization, cost, lifecycle)
  - Style with glassmorphism design matching existing dashboard cards
  - Add hover effects and transitions
  - Support dark mode with appropriate color classes
  - Make card clickable to trigger detail view
  - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [ ] 5. Create frontend InsightsWidget component
  - Create component file that fetches insights from API
  - Implement loading state with skeleton loaders
  - Implement error state with friendly error message
  - Implement empty state when no insights available
  - Add refresh button with loading indicator
  - Display last updated timestamp
  - Render InsightCard components in responsive grid (3-col desktop, 2-col tablet, 1-col mobile)
  - Add auto-refresh logic every 24 hours
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [ ] 6. Create frontend InsightDetailModal component
  - Create modal component with props for insight, open state, and handlers
  - Display full insight details including title, description, recommendation
  - Show affected assets list with links to asset detail pages
  - Display supporting metrics and calculation methodology
  - Add dismiss button that calls API and updates UI
  - Add close button to exit modal
  - Style modal with glassmorphism and dark mode support
  - Make modal responsive for mobile devices
  - _Requirements: 2.4, 5.1, 5.2, 5.3, 5.4_

- [ ] 7. Integrate InsightsWidget into Dashboard page
  - Import InsightsWidget component into Dashboard.jsx
  - Add widget above or alongside existing statistics section
  - Ensure proper spacing and layout with existing dashboard elements
  - Test responsive behavior on different screen sizes
  - Verify dark mode styling consistency
  - _Requirements: 1.1_

- [ ] 8. Add click navigation from insights to asset details
  - Implement click handler in InsightCard for affected assets
  - Use React Router to navigate to asset detail page
  - Pass asset ID in URL parameter
  - Ensure navigation works from both card and modal views
  - _Requirements: 2.4_

- [ ] 9. Implement insight generation scheduler
  - Add scheduled job to run insight generation every 24 hours
  - Use node-cron or similar library for scheduling
  - Log generation results for monitoring
  - Handle errors gracefully without crashing server
  - _Requirements: 1.2_

- [x] 10. Install and configure Recharts library


  - Add recharts package to client dependencies
  - Verify compatibility with React 18
  - Test basic chart rendering
  - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [ ] 11. Create chart data analyzer module
  - Write function to analyze asset acquisition trends over 12 months
  - Implement logic to detect significant increases (>30%) or decreases
  - Write function to identify asset type concentration (>40%)
  - Generate natural language insights for each chart pattern
  - Return structured data with insights for each chart type
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_



- [ ] 12. Implement GET /api/insights/charts endpoint
  - Add authentication middleware
  - Query database for asset acquisition data by month (last 12 months)
  - Query database for asset status distribution
  - Query database for asset type counts
  - Query database for assignment distribution
  - Call chart analyzer to generate insights for each dataset


  - Return structured chart data with AI insights
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 9.1, 9.5_

- [ ] 13. Create AssetTrendChart component
  - Create component file using Recharts LineChart
  - Implement responsive container with proper sizing
  - Add X-axis with month labels and Y-axis with count values
  - Style chart with glassmorphism background
  - Add smooth animations on data load


  - Display AI-generated insight text below chart
  - Support light and dark mode color schemes
  - Add hover tooltips showing exact values
  - _Requirements: 7.1, 7.5, 8.1, 8.3, 8.4, 8.5, 9.1, 9.2_

- [ ] 14. Create AssetStatusChart component
  - Create component file using Recharts PieChart
  - Implement responsive container with proper sizing
  - Add color-coded segments for active, inactive, maintenance
  - Style chart with glassmorphism background


  - Add smooth animations on data load
  - Display AI-generated insight text below chart
  - Support light and dark mode color schemes
  - Add hover tooltips showing percentages and counts
  - Implement click handler to highlight segment
  - _Requirements: 7.2, 7.5, 8.1, 8.2, 8.3, 8.4, 8.5_

- [ ] 15. Create AssetTypeChart component
  - Create component file using Recharts BarChart
  - Implement responsive container with proper sizing


  - Use horizontal bars for better label readability
  - Sort bars by count in descending order
  - Style chart with glassmorphism background
  - Add smooth animations on data load
  - Display AI-generated insight text below chart
  - Support light and dark mode color schemes
  - Add hover tooltips showing exact counts
  - _Requirements: 7.3, 7.5, 8.1, 8.3, 8.4, 8.5, 9.4_

- [x] 16. Create AssetAssignmentChart component


  - Create component file using Recharts PieChart with doughnut style
  - Implement responsive container with proper sizing
  - Add segments for assigned, unassigned, shared resources
  - Display total count in center of doughnut
  - Style chart with glassmorphism background
  - Add smooth animations on data load
  - Display AI-generated insight text below chart
  - Support light and dark mode color schemes



  - Add hover tooltips showing percentages and counts
  - _Requirements: 7.4, 7.5, 8.1, 8.3, 8.4, 8.5_

- [ ] 17. Create ChartsSection component wrapper
  - Create component that fetches chart data from API
  - Implement loading state with skeleton loaders for charts
  - Implement error state with friendly error message
  - Render all four chart components in responsive grid
  - Add section title and description
  - Style with consistent spacing and glassmorphism
  - Support dark mode
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 8.4_

- [ ] 18. Integrate ChartsSection into Dashboard page
  - Import ChartsSection component into Dashboard.jsx
  - Add charts section below insights widget
  - Ensure proper spacing and layout with existing elements
  - Test responsive behavior on mobile, tablet, and desktop
  - Verify dark mode styling consistency
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 8.4, 8.5_

- [ ]* 19. Write backend tests for analysis modules
  - Create test file for maintenance analyzer with sample data
  - Create test file for utilization analyzer with edge cases
  - Create test file for cost optimizer with various scenarios
  - Create test file for priority ranker with different score combinations
  - Create test file for chart insights analyzer with trend detection
  - Test insights service orchestrator with mocked analyzers

- [ ]* 20. Write API endpoint tests
  - Test GET /api/insights returns correct data structure
  - Test GET /api/insights/charts returns chart data with insights
  - Test authentication requirements on all endpoints
  - Test refresh endpoint triggers regeneration
  - Test dismiss endpoint updates database correctly
  - Test error responses for invalid requests

- [ ]* 21. Write frontend component tests
  - Test InsightCard renders with different priorities
  - Test InsightsWidget handles loading, error, and empty states
  - Test InsightDetailModal opens and closes correctly
  - Test dismiss functionality updates UI
  - Test all chart components render with sample data
  - Test chart tooltips display on hover
  - Test chart responsiveness on different screen sizes
  - Test ChartsSection handles loading and error states
