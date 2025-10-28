# Design Document

## Overview

The AI-powered Asset Insights feature adds intelligent analytics to the IT Asset Management System by analyzing asset data patterns and generating actionable recommendations. The system will use rule-based algorithms to identify maintenance needs, underutilization, cost optimization opportunities, and lifecycle management insights. The insights will be displayed prominently on the dashboard in a dedicated widget with visual indicators for priority and category.

## Architecture

### High-Level Architecture

```
┌─────────────────┐
│   Dashboard     │
│   Component     │
└────────┬────────┘
         │
         ├─── Insights Widget (New)
         │
         ▼
┌─────────────────┐
│  API Layer      │
│  /api/insights  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Insights Engine │
│  (Backend)      │
└────────┬────────┘
         │
         ├─── Maintenance Analyzer
         ├─── Utilization Analyzer
         ├─── Cost Optimizer
         └─── Priority Ranker
         │
         ▼
┌─────────────────┐
│   PostgreSQL    │
│   Database      │
└─────────────────┘
```

### Technology Stack

- **Frontend**: React 18 with existing styling patterns (Tailwind CSS, glassmorphism)
- **Charting Library**: Recharts (React-based, responsive, customizable)
- **Backend**: Node.js + Express (extending existing server)
- **Database**: PostgreSQL (using existing schema with potential new tables)
- **Analysis**: Rule-based algorithms (no external AI services required)

## Components and Interfaces

### 1. Frontend Components

#### InsightsWidget Component
Location: `client/src/components/InsightsWidget.jsx`

```javascript
<InsightsWidget 
  insights={Array<Insight>}
  loading={boolean}
  onRefresh={function}
  onInsightClick={function}
/>
```

Props:
- `insights`: Array of insight objects
- `loading`: Loading state indicator
- `onRefresh`: Callback to manually refresh insights
- `onInsightClick`: Callback when user clicks on an insight card

#### InsightCard Component
Location: `client/src/components/InsightCard.jsx`

```javascript
<InsightCard
  insight={Insight}
  onClick={function}
/>
```

Props:
- `insight`: Single insight object with all metadata
- `onClick`: Click handler for detailed view

#### InsightDetailModal Component
Location: `client/src/components/InsightDetailModal.jsx`

```javascript
<InsightDetailModal
  insight={Insight}
  isOpen={boolean}
  onClose={function}
  onDismiss={function}
/>
```

Props:
- `insight`: Detailed insight data
- `isOpen`: Modal visibility state
- `onClose`: Close modal handler
- `onDismiss`: Mark insight as resolved handler

#### Chart Components

**AssetTrendChart Component**
Location: `client/src/components/charts/AssetTrendChart.jsx`

```javascript
<AssetTrendChart 
  data={Array<{month: string, count: number}>}
  insight={string}
/>
```

**AssetStatusChart Component**
Location: `client/src/components/charts/AssetStatusChart.jsx`

```javascript
<AssetStatusChart 
  data={Array<{status: string, count: number, percentage: number}>}
  insight={string}
/>
```

**AssetTypeChart Component**
Location: `client/src/components/charts/AssetTypeChart.jsx`

```javascript
<AssetTypeChart 
  data={Array<{type: string, count: number}>}
  insight={string}
/>
```

**AssetAssignmentChart Component**
Location: `client/src/components/charts/AssetAssignmentChart.jsx`

```javascript
<AssetAssignmentChart 
  data={Array<{category: string, count: number, percentage: number}>}
  insight={string}
/>
```

### 2. Backend Components

#### Insights Router
Location: `server/routes/insights.js`

Endpoints:
- `GET /api/insights` - Fetch all current insights
- `GET /api/insights/:id` - Get detailed insight data
- `POST /api/insights/refresh` - Manually trigger insight generation
- `PUT /api/insights/:id/dismiss` - Mark insight as dismissed
- `GET /api/insights/charts` - Fetch chart data with AI-generated insights

#### Insights Service
Location: `server/services/insightsService.js`

Methods:
- `generateInsights()` - Main orchestrator for insight generation
- `analyzeMaintenanceNeeds()` - Identify assets needing maintenance
- `analyzeUtilization()` - Find underutilized assets
- `analyzeCostOptimization()` - Generate cost-saving recommendations
- `rankInsightsByPriority()` - Sort insights by importance

#### Analysis Modules

**MaintenanceAnalyzer** (`server/services/analyzers/maintenanceAnalyzer.js`)
- Checks asset age and update frequency
- Identifies assets with no recent status changes
- Flags asset types with high reassignment rates

**UtilizationAnalyzer** (`server/services/analyzers/utilizationAnalyzer.js`)
- Calculates unassigned asset percentages
- Identifies idle assets by type
- Tracks assignment patterns

**CostOptimizer** (`server/services/analyzers/costOptimizer.js`)
- Finds duplicate or redundant assets
- Suggests consolidation opportunities
- Identifies inactive assets for disposal

**PriorityRanker** (`server/services/analyzers/priorityRanker.js`)
- Assigns priority scores (high, medium, low)
- Considers impact and urgency
- Orders insights for display

**ChartInsightsAnalyzer** (`server/services/analyzers/chartInsightsAnalyzer.js`)
- Analyzes chart data for significant trends
- Detects acquisition spikes or drops
- Identifies asset type concentration
- Generates natural language insights about patterns

## Data Models

### Insight Object Structure

```javascript
{
  id: string,                    // Unique identifier
  type: string,                  // 'maintenance' | 'utilization' | 'cost' | 'lifecycle'
  priority: string,              // 'high' | 'medium' | 'low'
  title: string,                 // Short descriptive title
  description: string,           // Detailed explanation
  recommendation: string,        // Actionable next step
  affectedAssets: Array<{        // Assets related to this insight
    id: number,
    name: string,
    serialNumber: string,
    type: string
  }>,
  metrics: {                     // Supporting data
    count: number,
    percentage: number,
    trend: string
  },
  createdAt: timestamp,          // When insight was generated
  dismissedAt: timestamp | null, // When user dismissed it
  metadata: object               // Additional context
}
```

### Chart Data Structure

```javascript
{
  trendData: {
    data: Array<{
      month: string,           // 'Jan 2024', 'Feb 2024', etc.
      count: number,           // Number of assets acquired
      cumulative: number       // Total assets up to this month
    }>,
    insight: string            // AI-generated insight about trend
  },
  statusData: {
    data: Array<{
      status: string,          // 'active', 'inactive', 'maintenance'
      count: number,
      percentage: number,
      color: string            // Hex color for chart
    }>,
    insight: string
  },
  typeData: {
    data: Array<{
      type: string,            // 'Laptop', 'Desktop', etc.
      count: number,
      percentage: number
    }>,
    insight: string
  },
  assignmentData: {
    data: Array<{
      category: string,        // 'Assigned', 'Unassigned', 'Shared'
      count: number,
      percentage: number,
      color: string
    }>,
    insight: string
  }
}
```

### Database Schema Extension

New table: `insights`

```sql
CREATE TABLE insights (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50) NOT NULL,
    priority VARCHAR(20) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    recommendation TEXT NOT NULL,
    metrics JSONB,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    dismissed_at TIMESTAMP,
    expires_at TIMESTAMP
);

CREATE TABLE insight_assets (
    id SERIAL PRIMARY KEY,
    insight_id INTEGER REFERENCES insights(id) ON DELETE CASCADE,
    asset_id INTEGER REFERENCES assets(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_insights_priority ON insights(priority);
CREATE INDEX idx_insights_type ON insights(type);
CREATE INDEX idx_insights_dismissed ON insights(dismissed_at);
```

## Analysis Algorithms

### Maintenance Detection Rules

1. **Stale Asset Rule**: Asset with no updates in 90+ days
   - Query: `SELECT * FROM assets WHERE updated_at < NOW() - INTERVAL '90 days'`
   - Priority: Medium

2. **High Reassignment Rate**: Asset type reassigned >3 times in 30 days
   - Requires tracking reassignment history
   - Priority: High

### Utilization Analysis Rules

1. **Unassigned Active Assets**: Status='active' but assigned_to IS NULL
   - Query: `SELECT * FROM assets WHERE status='active' AND assigned_to IS NULL`
   - Priority: Medium if <20%, High if >20%

2. **Type-Level Underutilization**: >20% of asset type unassigned
   - Group by type, calculate percentage
   - Priority: High

### Cost Optimization Rules

1. **Inactive Asset Accumulation**: Multiple inactive assets of same type
   - Query: `SELECT type, COUNT(*) FROM assets WHERE status='inactive' GROUP BY type HAVING COUNT(*) > 2`
   - Priority: Medium

2. **Redundant Unassigned Assets**: >5 unassigned assets of same type
   - Suggests consolidation or disposal
   - Priority: High

### Priority Scoring Algorithm

```javascript
function calculatePriority(insight) {
  let score = 0;
  
  // Impact factors
  if (insight.metrics.count > 10) score += 3;
  else if (insight.metrics.count > 5) score += 2;
  else score += 1;
  
  if (insight.metrics.percentage > 30) score += 3;
  else if (insight.metrics.percentage > 15) score += 2;
  else score += 1;
  
  // Type factors
  if (insight.type === 'maintenance') score += 2;
  if (insight.type === 'cost') score += 1;
  
  // Priority assignment
  if (score >= 7) return 'high';
  if (score >= 4) return 'medium';
  return 'low';
}
```

## UI/UX Design

### Insights Widget Layout

The widget will be placed prominently on the dashboard, above or alongside existing statistics.

```
┌─────────────────────────────────────────────┐
│  🤖 AI-Powered Insights                     │
│  Last updated: 2 hours ago  [Refresh]       │
├─────────────────────────────────────────────┤
│                                             │
│  ┌──────────────────────────────────────┐  │
│  │ 🔴 HIGH PRIORITY                     │  │
│  │ 🔧 Maintenance Alert                 │  │
│  │ 12 assets haven't been updated in    │  │
│  │ 90+ days. Review and update status.  │  │
│  │ [View Details →]                     │  │
│  └──────────────────────────────────────┘  │
│                                             │
│  ┌──────────────────────────────────────┐  │
│  │ 🟡 MEDIUM PRIORITY                   │  │
│  │ 💰 Cost Optimization                 │  │
│  │ 8 laptops are unassigned. Consider   │  │
│  │ reallocation or disposal.            │  │
│  │ [View Details →]                     │  │
│  └──────────────────────────────────────┘  │
│                                             │
│  ┌──────────────────────────────────────┐  │
│  │ 🔵 INFORMATIONAL                     │  │
│  │ 📊 Utilization Trend                 │  │
│  │ Desktop utilization improved by 15%  │  │
│  │ this month. Great work!              │  │
│  │ [View Details →]                     │  │
│  └──────────────────────────────────────┘  │
│                                             │
└─────────────────────────────────────────────┘
```

### Color Scheme

Following existing design patterns with glassmorphism:

- **High Priority**: Red accent (`bg-red-500/10`, `border-red-500`, `text-red-600`)
- **Medium Priority**: Yellow/Orange accent (`bg-yellow-500/10`, `border-yellow-500`, `text-yellow-600`)
- **Low/Info Priority**: Blue accent (`bg-blue-500/10`, `border-blue-500`, `text-blue-600`)

### Icons by Category

- 🔧 Maintenance
- 📊 Utilization
- 💰 Cost Optimization
- 🔄 Lifecycle Management

### Responsive Design

- Desktop: 3-column grid for insight cards
- Tablet: 2-column grid
- Mobile: Single column, stacked cards

### Dark Mode Support

All components will support dark mode using existing Tailwind dark: classes:
- Light backgrounds: `bg-white/70 dark:bg-gray-800/70`
- Text: `text-gray-900 dark:text-white`
- Borders: `border-gray-200 dark:border-gray-700`

## Error Handling

### Frontend Error Handling

1. **API Failures**: Display friendly error message in widget
   ```javascript
   if (error) {
     return <div className="text-red-600">Unable to load insights. Please try again.</div>
   }
   ```

2. **Empty State**: Show helpful message when no insights available
   ```javascript
   if (insights.length === 0) {
     return <div>No insights available. Your assets are well-managed! ✅</div>
   }
   ```

3. **Loading State**: Show skeleton loaders during data fetch

### Backend Error Handling

1. **Database Errors**: Log error, return 500 with generic message
2. **Invalid Requests**: Return 400 with specific validation errors
3. **Analysis Failures**: Continue with partial results, log warnings

```javascript
try {
  const insights = await generateInsights();
  res.json(insights);
} catch (error) {
  console.error('Insights generation error:', error);
  res.status(500).json({ 
    error: 'Failed to generate insights',
    message: 'Please try again later'
  });
}
```

## Testing Strategy

### Unit Tests

1. **Analysis Functions**
   - Test maintenance detection logic
   - Test utilization calculations
   - Test priority scoring algorithm
   - Test edge cases (empty data, null values)

2. **API Endpoints**
   - Test successful insight retrieval
   - Test error responses
   - Test authentication requirements
   - Test dismiss functionality

### Integration Tests

1. **End-to-End Insight Generation**
   - Create test assets with specific patterns
   - Trigger insight generation
   - Verify correct insights are produced
   - Verify insights are properly stored

2. **Frontend-Backend Integration**
   - Test data flow from API to UI
   - Test refresh functionality
   - Test detail modal interactions
   - Test dismiss actions

### Manual Testing Checklist

- [ ] Insights display correctly on dashboard
- [ ] Priority colors are accurate
- [ ] Click on insight opens detail modal
- [ ] Refresh button updates insights
- [ ] Dismiss functionality works
- [ ] Dark mode styling is correct
- [ ] Responsive design works on mobile
- [ ] Loading states display properly
- [ ] Error states display properly
- [ ] Empty state displays when no insights

## Performance Considerations

### Caching Strategy

1. **Insight Generation**: Cache results for 24 hours
   - Store in database with `expires_at` timestamp
   - Only regenerate if cache expired or manual refresh

2. **API Response Caching**: Use HTTP cache headers
   ```javascript
   res.set('Cache-Control', 'public, max-age=3600'); // 1 hour
   ```

### Query Optimization

1. **Use Indexes**: Add indexes on frequently queried columns
   - `assets.status`
   - `assets.updated_at`
   - `assets.assigned_to`

2. **Batch Queries**: Combine multiple analysis queries where possible

3. **Limit Result Sets**: Only analyze active/recent assets for performance

### Frontend Optimization

1. **Lazy Loading**: Load insight details only when modal opens
2. **Memoization**: Use React.memo for insight cards
3. **Debounce Refresh**: Prevent rapid refresh button clicks

## Security Considerations

1. **Authentication**: All insight endpoints require JWT authentication
2. **Authorization**: Only admin users can access insights
3. **Data Sanitization**: Sanitize all user inputs for dismiss/refresh actions
4. **Rate Limiting**: Limit refresh endpoint to prevent abuse
5. **SQL Injection Prevention**: Use parameterized queries throughout

## Chart Design Specifications

### Chart Types and Use Cases

1. **Line Chart (Asset Acquisition Trend)**
   - X-axis: Time (last 12 months)
   - Y-axis: Number of assets acquired
   - Shows growth or decline patterns
   - Includes cumulative total line

2. **Pie Chart (Status Distribution)**
   - Segments: Active, Inactive, Maintenance
   - Shows percentage breakdown
   - Color-coded by status

3. **Bar Chart (Asset Type Comparison)**
   - X-axis: Asset types
   - Y-axis: Count
   - Horizontal bars for better label readability
   - Sorted by count (descending)

4. **Doughnut Chart (Assignment Distribution)**
   - Segments: Assigned, Unassigned, Shared Resource
   - Center displays total count
   - Percentage labels on segments

### Chart Styling

**Light Mode Colors:**
- Primary: `#3B82F6` (blue-500)
- Success: `#10B981` (green-500)
- Warning: `#F59E0B` (yellow-500)
- Danger: `#EF4444` (red-500)
- Background: `rgba(255, 255, 255, 0.7)`
- Grid: `#E5E7EB` (gray-200)
- Text: `#1F2937` (gray-800)

**Dark Mode Colors:**
- Primary: `#60A5FA` (blue-400)
- Success: `#34D399` (green-400)
- Warning: `#FBBF24` (yellow-400)
- Danger: `#F87171` (red-400)
- Background: `rgba(31, 41, 55, 0.7)`
- Grid: `#374151` (gray-700)
- Text: `#F9FAFB` (gray-50)

### Responsive Breakpoints

- Desktop (lg): 2-column chart grid
- Tablet (md): 2-column chart grid
- Mobile (sm): 1-column stacked charts

### Chart Interactions

1. **Hover**: Display tooltip with exact values
2. **Click**: Highlight related data or filter view
3. **Legend Click**: Toggle data series visibility
4. **Resize**: Automatically adjust dimensions

## Future Enhancements

1. **Machine Learning Integration**: Replace rule-based system with ML models
2. **Predictive Analytics**: Forecast future asset needs
3. **Custom Insight Rules**: Allow admins to configure their own rules
4. **Email Notifications**: Send critical insights via email
5. **Historical Trends**: Track insight patterns over time
6. **Export Functionality**: Export insights and charts as PDF/CSV reports
7. **Custom Date Ranges**: Allow users to select time periods for charts
8. **Drill-Down Charts**: Click chart segments to see detailed breakdowns
9. **Comparison Mode**: Compare current period with previous periods
10. **Real-Time Updates**: WebSocket integration for live chart updates
