export const ROLES = {
    ADMIN: "Admin",
    MANAGER: "Manager",
    EMPLOYEE: "Employee"
};

export const getToken = () => {
    return localStorage.getItem("token");
};

export const getLoggedInUser = () => {
    return {
        fullName: localStorage.getItem("fullName"),
        email: localStorage.getItem("email"),
        role: localStorage.getItem("role")
    };
};

export const clearAuthStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("fullName");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
};

const normalizeRole = (role) => {
    return role
        ?.replace("ROLE_", "")
        .replace("_", " ")
        .trim()
        .toLowerCase();
};

export const hasRole = (role) => {
    return normalizeRole(localStorage.getItem("role")) === normalizeRole(role);
};

export const hasAnyRole = (roles) => {
    return roles.some((role) => hasRole(role));
};

export const isAdmin = () => {
    return hasRole(ROLES.ADMIN);
};

export const isManager = () => {
    return hasRole(ROLES.MANAGER);
};

export const isEmployee = () => {
    return hasRole(ROLES.EMPLOYEE);
};
