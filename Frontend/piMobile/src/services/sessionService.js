let currentSession = null;

export function setCurrentUser(user) {
  currentSession = user ?? null;
}

export function getCurrentUser() {
  return currentSession;
}

export function updateCurrentUser(patch) {
  if (!currentSession) {
    return null;
  }

  currentSession = {
    ...currentSession,
    ...(patch || {}),
  };

  return currentSession;
}

export function clearCurrentSession() {
  currentSession = null;
}
