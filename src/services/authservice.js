export async function fetchUser() {
    const res = await fetch("/.auth/me");
    if (!res.ok) return null;
    const data = await res.json();
    return data?.clientPrincipal || null;
}

export function login() {
    window.location.href = "/.auth/login/google?post_login_redirect_uri=/";
}

export function logout() {
    window.location.href = "/.auth/logout?post_logout_redirect_uri=/";
}
