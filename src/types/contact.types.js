// ─── Contact Types ────────────────────────────────────────────────────────────

// TypeScript types and interfaces don't exist in JavaScript
// These are for documentation purposes only

/*
export type ContactGlobalStatus = 'active' | 'suppressed' | 'deleted'

export type IneligibilityReason =
  | 'none'
  | 'unsubscribed'
  | 'hard_bounced'
  | 'spam_complaint'
  | 'manual'

export type ContactSource = 'manual' | 'import' | 'api' | 'crm_sync'

export interface Contact {
  id: string
  workspaceId: string
  email: string | null
  phoneNumber: string | null
  firstName: string
  lastName: string
  fullName: string
  customFields: Record<string, unknown>
  tags: string[]
  globalStatus: ContactGlobalStatus
  emailEligible: boolean
  whatsappEligible: boolean
  emailIneligibilityReason: IneligibilityReason
  whatsappIneligibilityReason: IneligibilityReason
  softBounceCount: number
  engagementScore: number // 0–100
  source: ContactSource
  crmContactId: string | null
  createdAt: string
  updatedAt: string
}

export interface ContactFilters {
  search?: string
  listId?: string
  globalStatus?: ContactGlobalStatus
  emailEligible?: boolean
  whatsappEligible?: boolean
  tags?: string[]
  page?: number
  limit?: number
}

export interface CreateContactDto {
  email?: string
  phoneNumber?: string
  firstName: string
  lastName: string
  customFields?: Record<string, unknown>
  tags?: string[]
  listIds?: string[]
}

export interface UpdateContactDto extends Partial<CreateContactDto> {
  emailEligible?: boolean
  whatsappEligible?: boolean
}

export interface ImportConfig {
  fieldMappings: FieldMapping[]
  duplicateRule: 'skip' | 'update' | 'create_new'
  listIds: string[]
  defaultOptIn?: boolean
}

export interface FieldMapping {
  csvColumn: string
  contactField: string
}

export interface ImportJobResult {
  jobId: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  totalRows: number
  validRows: number
  duplicateRows: number
  errorRows: number
  importedCount: number
  errors: ImportError[]
}

export interface ImportError {
  row: number
  column: string
  message: string
}
*/

// Example contact object in JavaScript
const contact = {
  id: 'cont_123',
  workspaceId: 'ws_456',
  email: 'john.doe@example.com',
  phoneNumber: null,
  firstName: 'John',
  lastName: 'Doe',
  fullName: 'John Doe',
  customFields: {
    company: 'Acme Inc',
    position: 'Engineer',
    interests: ['CFD', 'Python']
  },
  tags: ['qualified_lead', 'interested_cfd'],
  globalStatus: 'active', // 'active' | 'suppressed' | 'deleted'
  emailEligible: true,
  whatsappEligible: false,
  emailIneligibilityReason: 'none', // 'none' | 'unsubscribed' | 'hard_bounced' | 'spam_complaint' | 'manual'
  whatsappIneligibilityReason: 'unsubscribed',
  softBounceCount: 0,
  engagementScore: 85, // 0–100
  source: 'import', // 'manual' | 'import' | 'api' | 'crm_sync'
  crmContactId: 'crm_789',
  createdAt: '2024-01-15T10:30:00Z',
  updatedAt: '2024-06-01T14:20:00Z'
};

// Example contact filters object
const contactFilters = {
  search: 'John',
  listId: 'list_123',
  globalStatus: 'active',
  emailEligible: true,
  whatsappEligible: null,
  tags: ['qualified_lead'],
  page: 1,
  limit: 20
};

// Example DTO for creating a contact
const createContactDto = {
  email: 'jane.smith@example.com',
  phoneNumber: '9876543210',
  firstName: 'Jane',
  lastName: 'Smith',
  customFields: {
    company: 'Tech Corp',
    role: 'Developer'
  },
  tags: ['new_lead', 'newsletter'],
  listIds: ['list_1', 'list_2']
};

// Example DTO for updating a contact
const updateContactDto = {
  firstName: 'Jane',
  lastName: 'Smithson',
  tags: ['updated_lead'],
  emailEligible: true,
  whatsappEligible: true
};

// Example import configuration
const importConfig = {
  fieldMappings: [
    { csvColumn: 'Full Name', contactField: 'fullName' },
    { csvColumn: 'Email Address', contactField: 'email' },
    { csvColumn: 'Phone', contactField: 'phoneNumber' },
    { csvColumn: 'Company', contactField: 'customFields.company' }
  ],
  duplicateRule: 'update', // 'skip' | 'update' | 'create_new'
  listIds: ['list_1', 'list_2'],
  defaultOptIn: true
};

// Example import job result
const importJobResult = {
  jobId: 'job_123',
  status: 'processing', // 'pending' | 'processing' | 'completed' | 'failed'
  totalRows: 1000,
  validRows: 950,
  duplicateRows: 30,
  errorRows: 20,
  importedCount: 920,
  errors: [
    {
      row: 45,
      column: 'Email',
      message: 'Invalid email format'
    },
    {
      row: 78,
      column: 'Phone',
      message: 'Phone number already exists'
    }
  ]
};

// Example field mapping
const fieldMapping = {
  csvColumn: 'Email Address',
  contactField: 'email'
};

// Example import error
const importError = {
  row: 45,
  column: 'Email',
  message: 'Invalid email format'
};