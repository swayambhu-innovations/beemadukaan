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
export type post = {
    id:string;
    name:string;
    date:string;
    description:string;
    image:string;
}
export type blog = {
    id:string;
    name:string;
    date:string;
    description:string;
    image:string;
    body:string;
    author:string;
}