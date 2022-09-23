import { service } from "..";

export function getGoods() {
    return service({
        url: '/goods',
        method: 'get',
    })
}

export function getUsers() {
    return service({
        url: '/users',
        method: 'get',
    })
}

export function getRoles() {
    return service({
        url: '/roles',
        method: 'get',
    })
}

export function getAuthors() {
    return service({
        url: '/authors',
        method: 'get',
    })
}