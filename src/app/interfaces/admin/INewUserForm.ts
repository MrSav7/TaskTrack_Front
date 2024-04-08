export interface INewUserForm{
    UserLogin:string,
    UserPassword: string,
    UserFirstName: string,
    UserLastName: string, 
    UserMiddleName: string|null,
    UserEmail: string
    UserRoleId: number
}