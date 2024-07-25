import { createSlice } from '@reduxjs/toolkit'
import { IPartnersState } from '../../../types/partners'

const initialPartnersState = {
  partners: {
    data: [],
    total: 0
  },
  loading: false,
  selectedPartner: null,
  filters: {
    page: 1,
    limit: 10,
    search: ''
  }
}

export const partnersSlice = createSlice({
  name: 'partners',
  initialState: initialPartnersState as IPartnersState,
  reducers: {
    sendRequestStart (state) {
      state.loading = true
    },
    getPartnersSuccess (state, action) {
      state.partners.data = action.payload.data
      state.partners.total = action.payload.count
      state.loading = false
    },
    sendRequestFailure (state) {
      state.loading = false
    },
    createPartnerSuccess (state, action) {
      state.partners.data.push(action.payload)
      state.loading = false

    },
    updatePartnerSuccess (state, action) {
      const index = state.partners.data.findIndex(
        partner => partner.id === action.payload.id
      )
      state.partners.data[index] = action.payload
      state.loading = false
    },
    deletePartnerSuccess (state, action) {
      state.partners.data = state.partners.data.filter(
        partner => partner.id !== action.payload
      )
      state.loading = false
    },
    setSelectedPartner (state, action) {
      state.selectedPartner = action.payload
    },
    setFilters (state, action) {
      state.filters = action.payload
    }
  }
})

export const {
  sendRequestStart,
  getPartnersSuccess,
  sendRequestFailure,
  createPartnerSuccess,
  updatePartnerSuccess,
  deletePartnerSuccess,
  setSelectedPartner,
  setFilters
} = partnersSlice.actions
