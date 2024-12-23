export type PageSetting={
    blur:boolean;
    lastRedirect:string;
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
export type ExtraLoginEmailInfo= {
  displayName:string;
  phoneNumber:string;
  photoURL:string;
}
export type PostComment={
    displayName:string;
    comment:string;
    date:Date;
    uid:string;
}
export type ExtraLoginGoogleInfo={
    phoneNumber:string;
}
export type PolicyData = {
    name:string;
    email:string;
    mobileNumber:string;
    registrationNo:string;
    policyNumber:string;
    startDate:string;
    totalPremium:string;
    toBePaidPremium:string;
    lastMonth:any;
    expiryDate:any;
    paid:boolean;
    policyURl:string;
    id:'';
}