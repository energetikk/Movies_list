export { auth as middleware } from "@/configs/auth";
export const config = { matcher: ['/profile', '/protected/:path*'] };
