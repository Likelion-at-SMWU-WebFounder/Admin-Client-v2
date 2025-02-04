import { getCookie } from "../api/cookie";

const isLogin = () => !!getCookie("accessToken");
export default isLogin;
