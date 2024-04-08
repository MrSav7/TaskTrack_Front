export interface IGetUser{
    userId: number,
    userLogin: string,
    userFirstName: string,
    userLastName: string,
    userMiddleName: string,
    userCreateDate: Date,
    userEmail: string,
    userActiveStatus: boolean,
    userActStName: string,
    userRoleId: number,
    roleTextName: string,
    taskNotClosed: number
}