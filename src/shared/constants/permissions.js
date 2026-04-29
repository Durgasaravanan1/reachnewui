// Maps action string → roles that can perform it
export const PERMISSIONS = {
  // Campaigns
  'campaigns:create':   ['owner', 'admin', 'editor'],
  'campaigns:schedule': ['owner', 'admin'],
  'campaigns:approve':  ['owner', 'admin', 'approver'],
  'campaigns:delete':   ['owner', 'admin'],
  'campaigns:view':     ['owner', 'admin', 'editor', 'approver', 'viewer'],

  // Contacts
  'contacts:import':    ['owner', 'admin', 'editor'],
  'contacts:edit':      ['owner', 'admin', 'editor'],
  'contacts:delete':    ['owner', 'admin'],
  'contacts:view':      ['owner', 'admin', 'editor', 'approver', 'viewer'],

  // Lists
  'lists:manage':       ['owner', 'admin', 'editor'],

  // Suppression
  'suppression:manage': ['owner', 'admin'],

  // Templates
  'templates:create':   ['owner', 'admin', 'editor'],
  'templates:delete':   ['owner', 'admin'],

  // Automation
  'automation:create':  ['owner', 'admin', 'editor'],
  'automation:activate':['owner', 'admin'],

  // Settings
  'settings:team':      ['owner', 'admin'],
  'settings:billing':   ['owner'],
  'settings:integrations': ['owner', 'admin'],
  'settings:sender':    ['owner', 'admin'],
}