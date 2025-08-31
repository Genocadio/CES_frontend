# Search Functionality for Opinions Section

## Overview
The opinions section now includes real-time search functionality that connects to the backend API endpoint `/api/issues/search` with pagination support.

## Features

### 1. Real-time Search
- **Debounced Search**: Search input is debounced by 500ms to avoid excessive API calls
- **Combined Filters**: Search combines text query with category and status filters
- **Query Building**: Automatically builds search queries like `"road issue AND category:infrastructure AND status:open"`

### 2. Pagination
- **Infinite Scroll**: Automatically loads more issues as user scrolls down
- **Load More Button**: Manual load more button for better UX
- **Page Size**: Default page size of 20 issues per request

### 3. Filtering
- **Category Filter**: Filter by department/category (infrastructure, healthcare, education, etc.)
- **Status Filter**: Filter by issue status (open, in-progress, resolved, closed)
- **Clear Filters**: Easy way to reset all filters

### 4. API Integration
- **Endpoint**: `GET /api/issues/search?query={query}&page={page}&size={size}&sortBy={sortBy}&sortDir={sortDir}`
- **Response**: Paginated response with metadata (totalElements, totalPages, etc.)
- **Error Handling**: Proper error display and retry mechanisms

## Implementation Details

### Hooks Used
1. **`useFetchIssues`**: Main hook for fetching and managing issues with pagination
2. **`useLanguage`**: For internationalization support
3. **`useFetchIssue`**: For individual issue details (used in followup page)

### Search Query Format
The search query combines multiple criteria:
- **Text Search**: User input for title/description
- **Category Filter**: `category:infrastructure`
- **Status Filter**: `status:open`
- **Combined**: `"road issue AND category:infrastructure AND status:open"`

### Pagination Logic
- **Initial Load**: Fetches first 20 issues
- **Scroll Detection**: Automatically detects when user is near bottom
- **Load More**: Appends new issues to existing list
- **State Management**: Maintains current page, total pages, and loading states

## Usage

### Basic Search
1. Type in the search box to search for issues
2. Use category and status dropdowns to filter results
3. Results update automatically as you type/filter

### Advanced Search
1. Combine text search with filters
2. Use the "Clear Filters" button to reset all filters
3. Scroll down to automatically load more results

### API Response Structure
```typescript
interface PaginatedIssuesResponse {
  content: IssueResponseDto[]        // Array of issues
  totalElements: number              // Total number of issues
  totalPages: number                 // Total number of pages
  size: number                       // Page size
  number: number                     // Current page number
  first: boolean                     // Is first page
  last: boolean                      // Is last page
}
```

## Error Handling
- **Network Errors**: Displayed with retry options
- **No Results**: Clear messaging when no issues match criteria
- **Loading States**: Visual feedback during API calls
- **Error Dismissal**: Users can dismiss error messages

## Performance Optimizations
- **Debounced Search**: Prevents excessive API calls
- **Infinite Scroll**: Efficient loading of large datasets
- **State Management**: Optimized re-renders and state updates
- **Memory Management**: Proper cleanup of event listeners

## Future Enhancements
- **Search History**: Save recent searches
- **Advanced Filters**: Date range, priority, location filters
- **Search Suggestions**: Auto-complete for common search terms
- **Saved Searches**: Allow users to save filter combinations

