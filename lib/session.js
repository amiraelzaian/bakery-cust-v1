const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export function saveSession(token) {
  localStorage.setItem("token", token);
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `token=${token}; path=/; max-age=${MAX_AGE}; SameSite=Lax${secure}`;
}

export function clearSession() {
  localStorage.removeItem("token");
  document.cookie = "token=; path=/; max-age=0; SameSite=Lax";
  try {
    sessionStorage.removeItem("golden-crumbs-assistant");
  } catch {}
}

// only allow local paths
export function getSafeRedirect(value) {
  if (typeof value === "string" && value.startsWith("/") && !value.startsWith("//")) {
    return value;
  }
  return "/";
}