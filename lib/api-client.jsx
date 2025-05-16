// Client-side API functions

// Helper to handle API responses
async function handleResponse(response) {
  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: "An unknown error occurred",
    }));
    throw new Error(error.message || `HTTP error! Status: ${response.status}`);
  }
  return response.json();
}

// Tasks API
export async function fetchTasks(filters = {}) {
  // Convert filters object to query string
  const queryParams = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) queryParams.append(key, value);
  });

  const response = await fetch(`/api/tasks?${queryParams}`);
  return handleResponse(response);
}

export async function fetchTaskStats() {
  const response = await fetch("/api/tasks/stats");
  return handleResponse(response);
}

export async function getTaskById(id) {
  const response = await fetch(`/api/tasks/${id}`);
  return handleResponse(response);
}

export async function createTask(taskData) {
  const response = await fetch("/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });
  return handleResponse(response);
}

export async function updateTask(id, taskData) {
  const response = await fetch(`/api/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });
  return handleResponse(response);
}

export async function deleteTask(id) {
  const response = await fetch(`/api/tasks/${id}`, {
    method: "DELETE",
  });
  return handleResponse(response);
}

export async function fetchDeletedTasks() {
  const response = await fetch("/api/tasks/trash");
  return handleResponse(response);
}

export async function restoreTask(id) {
  const response = await fetch(`/api/tasks/${id}/restore`, {
    method: "PUT",
  });
  return handleResponse(response);
}

export async function permanentDeleteTask(id) {
  const response = await fetch(`/api/tasks/${id}/permanent`, {
    method: "DELETE",
  });
  return handleResponse(response);
}

// Search tasks
export async function searchTasks(query) {
  const response = await fetch(
    `/api/tasks/search?q=${encodeURIComponent(query)}`
  );
  return handleResponse(response);
}

// Update user profile
export async function updateProfile(userData) {
  const response = await fetch("/api/auth/profile", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  return handleResponse(response);
}

// Change password
export async function changePassword(passwordData) {
  const response = await fetch("/api/auth/change-password", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(passwordData),
  });
  return handleResponse(response);
}

// Users API
export async function fetchUsers() {
  const response = await fetch("/api/users");
  return handleResponse(response);
}
