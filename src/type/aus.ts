interface numInt {
    name: string,
    roleId: number,
    roleList?: numInt[],
    viewRole?: string
}

export class numData {
    numList: numInt[] = [{
        name: "",
        roleId: 0,
        roleList: [],
        viewRole: ""
    }]
}