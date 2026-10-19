const STAFF_ROLES = new Set(["coach", "casher", "admin"]);

export function isStaffUser(user) {
    return Boolean(
        user?.is_staff ||
        user?.is_superuser ||
        STAFF_ROLES.has(user?.profile?.role),
    );
}
