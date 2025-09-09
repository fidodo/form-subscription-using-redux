import { useSelector } from "react-redux";
import { deleteSubscription } from "../subscriptionSlice";
import { useDispatch } from "react-redux";
import React from "react";

export const SubscriptionList = () => {
  const dispatch = useDispatch();
  // Fixed the useSelector hook - added return statement
  const subscriptions = useSelector((state) => {
    console.log("Current Redux State:", state);
    return state.subscription.subscriptions || state.subscription || [];
  });

  console.log("Subscriptions:", subscriptions);

  const handleRemoveSubscription = (id) => {
    // Logic to dispatch action to remove subscription
    console.log("Removing subscription with id:", id);
    dispatch(deleteSubscription({ id }));
  };

  return (
    <div className="subscription-list">
      <h1>Subscription List</h1>

      {subscriptions && subscriptions.length > 0 ? (
        <div className="subscriptions-container">
          {subscriptions.map((sub) => (
            <React.Fragment key={sub.id}>
              <div key={sub.id} className="subscription-card">
                <h2>{sub.name}</h2>
                <p>
                  Price: {sub.price} {sub.currency}
                </p>
                <p>Billing Cycle: {sub.billingCycle}</p>
                <p>Category: {sub.category}</p>
                <p>
                  Status:{" "}
                  <span className={`status ${sub.status}`}>{sub.status}</span>
                </p>
                <p>Start Date: {sub.startDate}</p>
                {sub.renewalDate && <p>Renewal Date: {sub.renewalDate}</p>}
              </div>
              <button
                className="btn-delete"
                onClick={() => handleRemoveSubscription(sub.id)}
              >
                Delete
              </button>
            </React.Fragment>
          ))}
        </div>
      ) : (
        <p className="no-subscriptions">No subscriptions available.</p>
      )}
    </div>
  );
};
