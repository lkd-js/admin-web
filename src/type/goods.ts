export interface ListInt {
    userId: number,
    id: number,
    title: string,
    introduce: string
}

interface SearchInt {
    title: string,
    introduce: string,
}
interface PageInt {
    page: number,   //第几页
    pagesize: number //一页条数
}

export class InitData {
    searchData: SearchInt = {
        title: "",
        introduce: "",
    }
    list: ListInt[] = [{
        userId: 0,
        id: 0,
        title: "",
        introduce: ""
    }]
    pageData: PageInt = {
        page: 1,   //第几页
        pagesize: 5//一页条数
    }
}