// ─── Shared API Response Types ────────────────────────────────────────────────

// TypeScript interfaces don't exist in JavaScript
// These are for documentation purposes only

/*
export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface ApiError {
  code: string
  message: string
  details?: Record<string, string[]>
}

export interface DateRange {
  from: string // ISO date string
  to: string
}

export interface SelectOption<T = string> {
  label: string
  value: T
}

// Utility types for DTOs
export type CreateDto<T> = Omit<T, 'id' | 'workspaceId' | 'createdAt' | 'updatedAt'>
export type UpdateDto<T> = Partial<CreateDto<T>>
*/

// In JavaScript, you would just use regular objects like:
// 
// Example usage with plain objects:
// 
// const paginatedResponse = {
//   items: [],
//   total: 0,
//   page: 1,
//   limit: 20,
//   totalPages: 0
// };
// 
// const apiError = {
//   code: 'ERROR_CODE',
//   message: 'Error message',
//   details: {}
// };
// 
// const dateRange = {
//   from: '2024-01-01',
//   to: '2024-12-31'
// };
// 
// const selectOption = {
//   label: 'Option Label',
//   value: 'option_value'
// };