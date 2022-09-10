import { service } from "..";
import { LoginFormInt } from "@/type/login";

export function login(data: LoginFormInt) {
    return service({
        url: '/login',
        method: 'post',
        data
    })
}