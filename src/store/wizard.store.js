import { create } from 'zustand'

const initialState = {
  step: 1,
  campaignName: '',
  channel: null,
  goalLabel: null,
  audienceListIds: [],
  excludeListIds: [],
  estimatedRecipients: 0,
  suppressedCount: 0,
  templateId: null,
  subjectLine: '',
  previewText: '',
  senderIdentityId: '',
  sendMode: 'scheduled',
  scheduledAt: null,
  timezone: 'Asia/Kolkata',
  isReadyToSend: false,
  createdCampaignId: null,
}

export const useWizardStore = create((set, get) => ({
  ...initialState,

  setStep: (step) => set({ step }),
  nextStep: () => set((s) => ({ step: Math.min(s.step + 1, 6) })),
  prevStep: () => set((s) => ({ step: Math.max(s.step - 1, 1) })),

  setStep1: (data) => set(data),
  setStep2: (data) => set(data),
  setStep3: (data) => set(data),
  setStep4: (data) => set(data),

  setCreatedCampaignId: (id) => set({ createdCampaignId: id }),

  reset: () => set(initialState),
}))