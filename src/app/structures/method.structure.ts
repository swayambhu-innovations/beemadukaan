export type PageSetting={
    blur:boolean;
    lastRedirect:boolean;
    message:string;
    messageType:'Error'|'Warning'|'Success'|'Info';
    spinner:boolean;
}
export type menuItem = {
    name:string;
    icon:string;
    route:string;
    outlet:string;
}