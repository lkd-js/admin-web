interface RoleInt {
    role: number,
    roleName: string
}

interface SearchInt {
    id: string,
    nickName: string,
    role: string
}

interface PageInt {
    page: number,   //第几页
    pagesize: number //一页条数
}

interface RolesList {
    authority: number[],
    roleId: number,
    roleName: string
}

export interface UsersInt {
    id: number,
    nickName: string,
    role: RoleInt[],
    userName: string
}
interface UsersInt2 {
    id: number,
    nickName: string,
    role: number[],
    userName: string
}
export class InitUsers {
    searchData: SearchInt = {
        id: "",
        nickName: "",
        role: ""
    }
    usersList: UsersInt[] = [{
        id: 0,
        nickName: "",
        role: [{
            role: 0,
            roleName: ""
        }],
        userName: ""
    }]
    pageData: PageInt = {
        page: 1,   //第几页
        pagesize: 8//一页条数
    }
    rolesList: RolesList[] = [{
        authority: [],
        roleId: 0,
        roleName: ""
    }]
    isShow = false
    curRoleBase: UsersInt = {
        id: 0,
        nickName: "",
        role: [{
            role: 0,
            roleName: ""
        }],
        userName: ""
    }
    curRole: UsersInt2 = {
        id: 0,
        nickName: "",
        role: [],
        userName: ""
    }
}