export const ENDPOINTS = {
  mainURL: import.meta.env.VITE_API_BASE_URL,
  admin_login: "/accounts/user/root-admin/login/", 
  sub_admin_login: "/accounts/user/sub-admin/login/",
  forgot_pass: "/accounts/user/send-reset-password-email/",
  verify_otp: "/accounts/user/reset-password-otp/", 
  reset_pass: "/accounts/user/set-new-password/"
};