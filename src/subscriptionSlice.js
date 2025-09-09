import { createSlice } from "@reduxjs/toolkit";

const initialSubscriptionState = {
  subscriptions: [
    {
      id: 1,
      name: "Blue Film",
      price: 10,
      currency: "USD",
      billingCycle: "monthly",
      category: "Mojo",
      paymentMethod: "Credit card",
      status: "active",
      startDate: Date.now().toString(),
      renewalDate: "",
      user: "Ayokunle",
    },
    {
      id: 2,
      name: "Red Film",
      price: 15,
      currency: "USD",
      billingCycle: "monthly",
      category: "Mojo",
      paymentMethod: "Credit card",
      status: "active",
      startDate: Date.now().toString(),
      renewalDate: "",
      user: "Ayokunle",
    },
  ], // Change to array to store multiple subscriptions
  currentSubscription: {
    // Optional: keep single subscription structure for forms
    name: "",
    price: 0,
    currency: "USD",
    billingCycle: "monthly",
    category: "",
    paymentMethod: "",
    status: "active",
    startDate: "",
    renewalDate: "",
    user: "",
  },
};

const subscriptionSlice = createSlice({
  name: "subscriptions",
  initialState: initialSubscriptionState, // Fixed: should be 'initialState'
  reducers: {
    addSubscription(state, action) {
      // Add to the subscriptions array
      const newSubscription = {
        id: state.subscriptions.length + 1,
        ...action.payload,
      };
      state.subscriptions.push(newSubscription);
    },
    cancelSubscription(state, action) {
      const subscription = state.subscriptions.find(
        (sub) => sub.id === action.payload.id
      );
      if (subscription) {
        subscription.status = "cancelled";
      }
    },
    updateSubscription(state, action) {
      const index = state.subscriptions.findIndex(
        (sub) => sub.id === action.payload.id
      );
      if (index !== -1) {
        state.subscriptions[index] = {
          ...state.subscriptions[index],
          ...action.payload,
        };
      }
    },
    deleteSubscription(state, action) {
      state.subscriptions = state.subscriptions.filter(
        (sub) => sub.id !== action.payload.id
      );
    },
    // Optional: reducer to update current subscription (for forms)
    updateCurrentSubscription(state, action) {
      state.currentSubscription = {
        ...state.currentSubscription,
        ...action.payload,
      };
    },
    // Optional: reset current subscription
    resetCurrentSubscription(state) {
      state.currentSubscription = initialSubscriptionState.currentSubscription;
    },
  },
});

export const {
  addSubscription,
  cancelSubscription,
  updateSubscription,
  deleteSubscription,
  updateCurrentSubscription,
  resetCurrentSubscription,
} = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
