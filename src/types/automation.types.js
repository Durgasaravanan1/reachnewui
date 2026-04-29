// ─── Automation Types ─────────────────────────────────────────────────────────

// TypeScript types and interfaces don't exist in JavaScript
// These are for documentation purposes only

/*
export type WorkflowStatus = 'active' | 'paused' | 'draft'

export type TriggerType =
  | 'contact_added_to_list'
  | 'tag_applied'
  | 'campaign_opened'
  | 'campaign_link_clicked'
  | 'date_field'

export type ActionType =
  | 'send_email_campaign'
  | 'send_whatsapp_campaign'
  | 'add_tag'
  | 'remove_tag'
  | 'add_to_list'
  | 'notify_team_member'

export type ExecutionOutcome = 'success' | 'failed' | 'skipped'

export interface WorkflowTrigger {
  type: TriggerType
  config: Record<string, unknown>
  // e.g. { listId: 'xxx' } for contact_added_to_list
  // e.g. { tag: 'inactive-90d' } for tag_applied
}

export interface WorkflowCondition {
  field: string
  operator: 'is_in_list' | 'has_tag' | 'score_above' | 'score_below'
  value: unknown
}

export interface WorkflowAction {
  type: ActionType
  config: Record<string, unknown>
  cooldownHours: number
}

export interface Workflow {
  id: string
  workspaceId: string
  workflowName: string
  status: WorkflowStatus
  trigger: WorkflowTrigger
  condition: WorkflowCondition | null
  action: WorkflowAction
  totalTriggered: number
  lastRunAt: string | null
  createdByUserId: string
  createdAt: string
  updatedAt: string
}

export interface WorkflowExecutionLog {
  logId: string
  workflowId: string
  contactId: string
  contactName: string
  triggeredAt: string
  conditionPassed: boolean
  actionType: ActionType
  outcome: ExecutionOutcome
  failureReason: string | null
}

export interface CreateWorkflowDto {
  workflowName: string
  trigger: WorkflowTrigger
  condition?: WorkflowCondition
  action: WorkflowAction
}
*/

// In JavaScript, you would work with plain objects like:

// Example workflow object
const workflow = {
  id: 'wf_123',
  workspaceId: 'ws_456',
  workflowName: 'Welcome Workflow',
  status: 'active', // 'active' | 'paused' | 'draft'
  trigger: {
    type: 'contact_added_to_list', // 'contact_added_to_list' | 'tag_applied' | 'campaign_opened' | 'campaign_link_clicked' | 'date_field'
    config: { listId: 'list_789' }
  },
  condition: {
    field: 'score',
    operator: 'score_above', // 'is_in_list' | 'has_tag' | 'score_above' | 'score_below'
    value: 50
  },
  action: {
    type: 'send_email_campaign', // 'send_email_campaign' | 'send_whatsapp_campaign' | 'add_tag' | 'remove_tag' | 'add_to_list' | 'notify_team_member'
    config: { campaignId: 'camp_123' },
    cooldownHours: 24
  },
  totalTriggered: 150,
  lastRunAt: '2024-01-15T10:30:00Z',
  createdByUserId: 'user_123',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-15T10:30:00Z'
};

// Example workflow execution log
const executionLog = {
  logId: 'log_123',
  workflowId: 'wf_123',
  contactId: 'contact_456',
  contactName: 'John Doe',
  triggeredAt: '2024-01-15T10:30:00Z',
  conditionPassed: true,
  actionType: 'send_email_campaign',
  outcome: 'success', // 'success' | 'failed' | 'skipped'
  failureReason: null
};

// Example DTO for creating a workflow
const createWorkflowDto = {
  workflowName: 'New Workflow',
  trigger: {
    type: 'tag_applied',
    config: { tag: 'new_lead' }
  },
  condition: {
    field: 'email',
    operator: 'is_in_list',
    value: { listId: 'list_789' }
  },
  action: {
    type: 'add_to_list',
    config: { listId: 'target_list_123' },
    cooldownHours: 0
  }
};