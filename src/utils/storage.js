import data from "./data.json";

// LocalStorage keys
const KEY_AREAS = "milk_app_areas_v1";
const KEY_COLONIES = "milk_app_colonies_v1";
const KEY_USERS = "milk_app_users_v1";

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (e) {
    console.error("storage read error", e);
    return fallback;
  }
}

function write(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Initialize localStorage with JSON data if not already stored
(function init() {
  if (!localStorage.getItem(KEY_AREAS)) write(KEY_AREAS, data.areas);
  if (!localStorage.getItem(KEY_COLONIES)) write(KEY_COLONIES, data.colonies);
  if (!localStorage.getItem(KEY_USERS)) write(KEY_USERS, data.users);
})();

// ===== Area and Colony =====
export function getAreas() {
  return read(KEY_AREAS, []);
}

export function getColoniesByArea(areaId) {
  const cols = read(KEY_COLONIES, []);
  return cols.filter((c) => c.areaId === areaId);
}

// ===== Users =====
export function getUsersByColony(colonyId) {
  const users = read(KEY_USERS, []);
  return users.filter((u) => u.colonyId === colonyId);
}

export function getUserById(userId) {
  const users = read(KEY_USERS, []);
  return users.find((u) => u.id === userId) || null;
}

export function markDeliveredForUser(userId, dateStr = null) {
  const users = read(KEY_USERS, []);
  const idx = users.findIndex((u) => u.id === userId);
  if (idx === -1) return null;
  const d = dateStr || new Date().toISOString().slice(0, 10);
  users[idx].deliveryLog = users[idx].deliveryLog || {};
  users[idx].deliveryLog[d] = true;
  write(KEY_USERS, users);
  return users[idx];
}

export function toggleDeliveryForUser(userId, dateStr) {
  const users = read(KEY_USERS, []);
  const idx = users.findIndex((u) => u.id === userId);
  if (idx === -1) return null;
  users[idx].deliveryLog = users[idx].deliveryLog || {};
  users[idx].deliveryLog[dateStr] = !users[idx].deliveryLog[dateStr];
  write(KEY_USERS, users);
  return users[idx];
}

export function updateUserQtyAndType(userId, newQty, newType) {
  const users = read(KEY_USERS, []);
  const idx = users.findIndex((u) => u.id === userId);
  if (idx === -1) return null;
  users[idx].qty = Number(newQty);
  users[idx].milkType = newType;
  write(KEY_USERS, users);
  return users[idx];
}

// Optional: store user preferences
export const getUser = () => {
  try {
    const data = localStorage.getItem("userPreferences");
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error getting user preferences:", error);
    return null;
  }
};

export const saveUser = (userData) => {
  try {
    localStorage.setItem("userPreferences", JSON.stringify(userData));
  } catch (error) {
    console.error("Error saving user preferences:", error);
  }
};
