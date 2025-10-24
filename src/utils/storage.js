// storage.js

const STORAGE_KEYS = {
  USER: "user",
  REGISTERED_USER: "registeredUser",
  DELIVERIES: "deliveries",
};

/**
 * Save data to localStorage
 * @param {string} key
 * @param {any} value
 */
export const setItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

/**
 * Get data from localStorage
 * @param {string} key
 * @returns {any|null}
 */
export const getItem = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return null;
  }
};

/**
 * Remove an item from localStorage
 * @param {string} key
 */
export const removeItem = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing from localStorage:", error);
  }
};

/* ===========================
   User Management
=========================== */

/**
 * Save/update current logged in user
 * @param {object} userData
 */
export const saveUser = (userData) => {
  setItem(STORAGE_KEYS.USER, userData);
};

/**
 * Get current logged in user
 * @returns {object|null}
 */
export const getUser = () => {
  return getItem(STORAGE_KEYS.USER) || {};
};

/**
 * Remove current logged in user (logout)
 */
export const clearUser = () => {
  removeItem(STORAGE_KEYS.USER);
};

/**
 * Save registered user details
 * @param {object} data
 */
export const saveRegisteredUser = (data) => {
  setItem(STORAGE_KEYS.REGISTERED_USER, data);
};

/**
 * Get registered user
 * @returns {object|null}
 */
export const getRegisteredUser = () => {
  return getItem(STORAGE_KEYS.REGISTERED_USER) || {};
};

/* ===========================
   Delivery Management
=========================== */

/**
 * Save delivery data (array of deliveries)
 * @param {Array} deliveries
 */
export const saveDeliveries = (deliveries) => {
  setItem(STORAGE_KEYS.DELIVERIES, deliveries);
};

/**
 * Get all deliveries
 * @returns {Array}
 */
export const getDeliveries = () => {
  return getItem(STORAGE_KEYS.DELIVERIES) || [];
};

/**
 * Update a single delivery by ID
 * @param {number|string} id
 * @param {object} data
 */
export const updateDelivery = (id, data) => {
  const deliveries = getDeliveries();
  const updated = deliveries.map((d) => (d.id === id ? { ...d, ...data } : d));
  saveDeliveries(updated);
};

/**
 * Mark a delivery as delivered
 * @param {number|string} id
 */
export const markDelivered = (id) => {
  const deliveries = getDeliveries();
  const updated = deliveries.map((d) =>
    d.id === id ? { ...d, delivered: true } : d
  );
  saveDeliveries(updated);
};

/**
 * Get all delivered deliveries
 * @returns {Array}
 */
export const getDelivered = () => {
  const deliveries = getDeliveries();
  return deliveries.filter((d) => d.delivered);
};
