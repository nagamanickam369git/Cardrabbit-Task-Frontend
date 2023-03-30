import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'service',
  initialState: {
    userspages: [],
    userVerify: [],
    serviceHistory: [],
    currentService: [],
    readyToDelivery: [],
    serviceComplete: []
  },
  reducers: {
    userspages: (state, action) => {
      state.userspages.push(action.payload)
    },
    userVerify: (state, action) => {
      state.userVerify = action.payload
    },
    serviceHistory: (state, action) => {
      state.serviceHistory = action.payload
    },
    currentService: (state, action) => {
      let verify = action.payload
      state.currentService = []
      state.readyToDelivery = []
      state.serviceComplete = []

      for (let i = 0; i < verify.length; i++) {
        const data = verify[i];
        if (data.Status === 'Booked') {
          state.currentService.push(verify[i])
        }
        else if (data.Status === 'ready') {
          state.readyToDelivery.push(verify[i])
        }
        else if (data.Status === 'complete') {
          state.serviceComplete.push(verify[i])
        }

      }


    },

  },
})

// Action creators are generated for each case reducer function
export const { userspages, userVerify, serviceHistory, currentService } = counterSlice.actions

export default counterSlice.reducer