const STAFF_ROLES = new Set(["coach", "casher", "admin"]);

export function isStaffUser(user) {
    return Boolean(
        user?.is_staff ||
        user?.is_superuser ||
        STAFF_ROLES.has(user?.profile?.role),
    );
}

export function hasCompletedProfile(user) {
    const profile = user?.profile;
    return Boolean(
        profile?.full_name?.trim() &&
        profile?.phone_number?.trim() &&
        profile?.attendance_plan_per_week?.trim() &&
        profile?.profile,
    );
}
