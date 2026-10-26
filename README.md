# RHEMA Fitness Centre frontend

## Email and password authentication

The React app uses Django email/password registration and login. Django issues
short-lived access tokens and rotating refresh tokens using SimpleJWT. Tokens
are kept in the browser session and protected API requests use Bearer
authentication. Django continues to own application roles; users cannot select
or change their role during registration.

1. Run `python manage.py migrate` from `config` before starting Django.
2. Set `VITE_API_BASE_URL` in `frontend/.env` if the API is not available at
   `http://127.0.0.1:8000/`.
3. For Docker Compose, set `VITE_API_BASE_URL` before building the frontend.
   Any existing Clerk variables may remain in the local environment files; the
   app no longer uses them for authentication.

New registrations receive the default `member` role. Existing Django accounts and their memberships are preserved. Accounts created
previously through a passwordless identity provider do not have a local
password; a site administrator must set a Django password for those users
before they can sign in here.
Duplicate email addresses are rejected for login to avoid selecting the wrong
account.

The Django admin at `/admin/` continues to use Django's built-in admin
authentication. React routes and the REST API use JWT authentication.

After signing in, users who are missing a profile picture, full name, phone
number, or weekly attendance plan are required to complete `/complete-profile`
before accessing the rest of the app. The form updates only those profile
details; roles, rewards, and other system-managed fields are not user-editable.
