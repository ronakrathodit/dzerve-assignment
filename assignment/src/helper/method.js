import { Regex } from './constant';


export function numberText(data) {
    let check = RegExp(Regex.number);
    return check.test(data)
}

export function pwdText(data) {
    let check = RegExp(Regex.pwd);
    return check.test(data)
}

export function emailText(data) {
    let check = RegExp(Regex.email);
    return check.test(data)
}
