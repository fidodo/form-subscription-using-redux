import React, { useState } from "react";
import "./SubscriptionInput.css"; // We'll create this CSS file
import { useDispatch } from "react-redux";
import { addSubscription } from "../subscriptionSlice";

export const SubscriptionInput = () => {
  const [newSubscription, setNewSubscription] = useState({
    name: "",
    price: "",
    currency: "USD",
    billingCycle: "monthly",
    category: "",
    status: "active",
    paymentMethod: "",
    startDate: "",
    renewalDate: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSubscription({
      ...newSubscription,
      [name]: value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!newSubscription.name.trim()) {
      newErrors.name = "Subscription name is required";
    }

    if (!newSubscription.price || parseFloat(newSubscription.price) <= 0) {
      newErrors.price = "Valid price is required";
    }

    if (!newSubscription.category.trim()) {
      newErrors.category = "Category is required";
    }

    if (!newSubscription.paymentMethod.trim()) {
      newErrors.paymentMethod = "Payment method is required";
    }

    if (!newSubscription.startDate) {
      newErrors.startDate = "Start date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddSubscription = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (validateForm()) {
      // Logic to dispatch action to add subscription
      console.log("Adding subscription:", {
        ...newSubscription,
        price: parseFloat(newSubscription.price),
      });
      dispatch(
        addSubscription({
          name: newSubscription.name,
          price: parseFloat(newSubscription.price),
          currency: newSubscription.currency,
          billingCycle: newSubscription.billingCycle,
          category: newSubscription.category,
          status: newSubscription.status,
          paymentMethod: newSubscription.paymentMethod,
          startDate: newSubscription.startDate,
          renewalDate: newSubscription.renewalDate,
          description: newSubscription.description,
        })
      );
      // Reset form
      setNewSubscription({
        name: "",
        price: "",
        currency: "USD",
        billingCycle: "monthly",
        category: "",
        status: "active",
        paymentMethod: "",
        startDate: "",
        renewalDate: "",
        description: "",
      });

      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  return (
    <div className="subscription-input">
      <h2>Add New Subscription</h2>

      {isSubmitted && (
        <div className="success-message">Subscription added successfully!</div>
      )}

      <form onSubmit={handleAddSubscription}>
        <div className="form-group">
          <label htmlFor="name">Subscription Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Netflix, Spotify, etc."
            value={newSubscription.name}
            onChange={handleInputChange}
            className={errors.name ? "error" : ""}
          />

          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="price">Price *</label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="0.00"
              min="0"
              step="0.01"
              value={newSubscription.price}
              onChange={handleInputChange}
              className={errors.price ? "error" : ""}
            />
            {errors.price && <span className="error-text">{errors.price}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="currency">Currency</label>
            <select
              id="currency"
              name="currency"
              value={newSubscription.currency}
              onChange={handleInputChange}
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="JPY">JPY (¥)</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="billingCycle">Billing Cycle</label>
            <select
              id="billingCycle"
              name="billingCycle"
              value={newSubscription.billingCycle}
              onChange={handleInputChange}
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <input
              type="text"
              id="category"
              name="category"
              placeholder="Entertainment, Software, etc."
              value={newSubscription.category}
              onChange={handleInputChange}
              className={errors.category ? "error" : ""}
            />
            {errors.category && (
              <span className="error-text">{errors.category}</span>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={newSubscription.status}
              onChange={handleInputChange}
            >
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="paymentMethod">Payment Method *</label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={newSubscription.paymentMethod}
              onChange={handleInputChange}
              className={errors.paymentMethod ? "error" : ""}
            >
              <option value="">Select a payment method</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="PayPal">PayPal</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Other">Other</option>
            </select>
            {errors.paymentMethod && (
              <span className="error-text">{errors.paymentMethod}</span>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="startDate">Start Date *</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={newSubscription.startDate}
              onChange={handleInputChange}
              className={errors.startDate ? "error" : ""}
            />
            {errors.startDate && (
              <span className="error-text">{errors.startDate}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="renewalDate">Renewal Date</label>
            <input
              type="date"
              id="renewalDate"
              name="renewalDate"
              value={newSubscription.renewalDate}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description (Optional)</label>
          <textarea
            id="description"
            name="description"
            placeholder="Any notes about this subscription"
            value={newSubscription.description}
            onChange={handleInputChange}
            rows="3"
          />
        </div>

        <button type="submit" className="submit-btn">
          Add Subscription
        </button>
      </form>
    </div>

    // <div className="container">
    //   <header>
    //     <h1>Subscription Manager</h1>
    //     <p className="subtitle">Track your recurring subscriptions</p>
    //   </header>

    //   <div className="content">
    //     <div className="form-container">
    //       <h2>Add New Subscription</h2>

    //       {isSubmitted && (
    //         <div className="success-message">
    //           Subscription added successfully!
    //         </div>
    //       )}

    //       <form onSubmit={handleAddSubscription}>
    //         <div className="form-group">
    //           <label htmlFor="name">Subscription Name *</label>
    //           <input
    //             type="text"
    //             id="name"
    //             name="name"
    //             placeholder="Netflix, Spotify, etc."
    //             value={newSubscription.name}
    //             onChange={handleInputChange}
    //             className={errors.name ? "error" : ""}
    //           />
    //           {errors.name && <span className="error-text">{errors.name}</span>}
    //         </div>

    //         <div className="form-row">
    //           <div className="form-group">
    //             <label htmlFor="price">Price *</label>
    //             <input
    //               type="number"
    //               id="price"
    //               name="price"
    //               placeholder="0.00"
    //               min="0"
    //               step="0.01"
    //               value={newSubscription.price}
    //               onChange={handleInputChange}
    //               className={errors.price ? "error" : ""}
    //             />
    //             {errors.price && (
    //               <span className="error-text">{errors.price}</span>
    //             )}
    //           </div>

    //           <div className="form-group">
    //             <label htmlFor="currency">Currency</label>
    //             <select
    //               id="currency"
    //               name="currency"
    //               value={newSubscription.currency}
    //               onChange={handleInputChange}
    //             >
    //               <option value="USD">USD ($)</option>
    //               <option value="EUR">EUR (€)</option>
    //               <option value="GBP">GBP (£)</option>
    //               <option value="JPY">JPY (¥)</option>
    //             </select>
    //           </div>
    //         </div>

    //         <div className="form-row">
    //           <div className="form-group">
    //             <label htmlFor="billingCycle">Billing Cycle</label>
    //             <select
    //               id="billingCycle"
    //               name="billingCycle"
    //               value={newSubscription.billingCycle}
    //               onChange={handleInputChange}
    //             >
    //               <option value="weekly">Weekly</option>
    //               <option value="monthly">Monthly</option>
    //               <option value="quarterly">Quarterly</option>
    //               <option value="yearly">Yearly</option>
    //             </select>
    //           </div>

    //           <div className="form-group">
    //             <label htmlFor="category">Category *</label>
    //             <input
    //               type="text"
    //               id="category"
    //               name="category"
    //               placeholder="Entertainment, Software, etc."
    //               value={newSubscription.category}
    //               onChange={handleInputChange}
    //               className={errors.category ? "error" : ""}
    //             />
    //             {errors.category && (
    //               <span className="error-text">{errors.category}</span>
    //             )}
    //           </div>
    //         </div>

    //         <div className="form-row">
    //           <div className="form-group">
    //             <label htmlFor="status">Status</label>
    //             <select
    //               id="status"
    //               name="status"
    //               value={newSubscription.status}
    //               onChange={handleInputChange}
    //             >
    //               <option value="active">Active</option>
    //               <option value="paused">Paused</option>
    //               <option value="cancelled">Cancelled</option>
    //             </select>
    //           </div>

    //           <div className="form-group">
    //             <label htmlFor="paymentMethod">Payment Method *</label>
    //             <select
    //               id="paymentMethod"
    //               name="paymentMethod"
    //               value={newSubscription.paymentMethod}
    //               onChange={handleInputChange}
    //               className={errors.paymentMethod ? "error" : ""}
    //             >
    //               <option value="">Select a payment method</option>
    //               <option value="Credit Card">Credit Card</option>
    //               <option value="Debit Card">Debit Card</option>
    //               <option value="PayPal">PayPal</option>
    //               <option value="Bank Transfer">Bank Transfer</option>
    //               <option value="Other">Other</option>
    //             </select>
    //             {errors.paymentMethod && (
    //               <span className="error-text">{errors.paymentMethod}</span>
    //             )}
    //           </div>
    //         </div>

    //         <div className="form-row">
    //           <div className="form-group">
    //             <label htmlFor="startDate">Start Date *</label>
    //             <input
    //               type="date"
    //               id="startDate"
    //               name="startDate"
    //               value={newSubscription.startDate}
    //               onChange={handleInputChange}
    //               className={errors.startDate ? "error" : ""}
    //             />
    //             {errors.startDate && (
    //               <span className="error-text">{errors.startDate}</span>
    //             )}
    //           </div>

    //           <div className="form-group">
    //             <label htmlFor="renewalDate">Renewal Date</label>
    //             <input
    //               type="date"
    //               id="renewalDate"
    //               name="renewalDate"
    //               value={newSubscription.renewalDate}
    //               onChange={handleInputChange}
    //             />
    //           </div>
    //         </div>

    //         <div className="form-group">
    //           <label htmlFor="description">Description (Optional)</label>
    //           <textarea
    //             id="description"
    //             name="description"
    //             placeholder="Any notes about this subscription"
    //             value={newSubscription.description}
    //             onChange={handleInputChange}
    //             rows="3"
    //           />
    //         </div>

    //         <button type="submit" className="submit-btn">
    //           Add Subscription
    //         </button>
    //       </form>
    //     </div>

    //     <div className="subscriptions-container">
    //       <h2>Your Subscriptions ({subscriptions.length})</h2>
    //       <div className="subscriptions-list">
    //         {subscriptions.length === 0 ? (
    //           <div className="empty-state">
    //             <h3>No subscriptions yet</h3>
    //             <p>Add your first subscription using the form</p>
    //           </div>
    //         ) : (
    //           subscriptions.map((sub) => (
    //             <div key={sub.id} className="subscription-item">
    //               <div className="subscription-info">
    //                 <div className="subscription-name">{sub.name}</div>
    //                 <div className="cost-badge">
    //                   {sub.currency === "USD"
    //                     ? "$"
    //                     : sub.currency === "EUR"
    //                     ? "€"
    //                     : sub.currency === "GBP"
    //                     ? "£"
    //                     : "¥"}
    //                   {sub.price} / {sub.billingCycle}
    //                 </div>
    //                 <div className="subscription-details">
    //                   <span className="detail-badge">{sub.category}</span>
    //                   <span className="detail-badge">{sub.paymentMethod}</span>
    //                   <span className="detail-badge">{sub.status}</span>
    //                 </div>
    //                 {sub.description && (
    //                   <p className="subscription-description">
    //                     {sub.description}
    //                   </p>
    //                 )}
    //               </div>
    //               <button
    //                 className="btn-delete"
    //                 onClick={() => handleRemoveSubscription(sub.id)}
    //               >
    //                 Delete
    //               </button>
    //             </div>
    //           ))
    //         )}
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};
