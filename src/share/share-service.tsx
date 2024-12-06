const regex_number = /[0-9]/g;
const regex_decimal = /[0-9.]/g;
const noDayInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export const validateEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export const onNumberPress = (e: KeyboardEvent) => {
    if (!e.key.match(regex_number)) {
        e.preventDefault();
    }
}

export const onNumberWithDecimalPress = (e: KeyboardEvent, value: string) => {
    if (!e.key.match(regex_decimal)) {
        e.preventDefault();
    } else {
        if (value.includes('.') && e.key === '.') {
            e.preventDefault();
        }
    }
}

export const onDateChange = (value: string) => {
    let ret: string = '';
    value = value.replaceAll(/\//g, '');

    if (value.length > 2 && value.length <= 4) {
        ret = value.substring(0, 2) + '/' + value.substring(2);
    } else if (value.length > 4) {
        ret = value.substring(0, 2) + '/' + value.substring(2, 4) + '/' + value.substring(4);
    } else {
        ret = value;
    }

    return ret;
}

// unique function for behavior app.
export const onNotifiedNoChange = (value: string) => {
    let ret: string = '';
    value = value.replaceAll(/\//g, '');

    if (value.length > 4) {
        ret = value.substring(0, 4) + '/' + value.substring(4);
    } else {
        ret = value;
    }

    return ret;
}

export const onDateVerify = (value: string) => {
    const months = noDayInMonths;
    value = value.replaceAll(/\//g, '');
    if (value.length === 8) {
        const dd = +value.slice(0, 2);
        const MM = +value.slice(2, 4);
        const yyyy = +value.slice(4);

        if (MM >= 1 && MM <= 12) {
            if (MM === 2) {
                if ((!(yyyy % 4) && yyyy % 100) || !(yyyy % 400)) {
                    months[1] = 29;
                }
            }
            if (dd <= months[MM - 1]) {
                return true;
            } else {
                return false;
            }

        } else {
            return false;
        }
    } else {
        return false;
    }
}

export const onTimeChange = (value: string) => {
    let ret: string = '';
    value = value.replaceAll(/[.]/g, '');
    if (value.length > 2 && value.length <= 4) {
        ret = value.substring(0, 2) + '.' + value.substring(2);
    } else {
        ret = value;
    }

    return ret;
}

export const onTimeVerify = (value: string) => {
    value = value.replaceAll(/[.]/g, '');

    if (value.length === 4) {
        const HH = +value.slice(0, 2);
        const mm = +value.slice(2, 4);
        if ((mm <= 59 && mm >= 0) && (HH <= 23 && HH >= 0)) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

export const formatMoneyWithDecimal = (value: any) => {
    let ret = '';
    if (typeof (value) === 'number') {
        value = value.toString();
    }

    if (!value) {
        value = '0';
    }

    const money = value.split(/[.]/g, 2);
    let integer = '';
    if (money[0] !== '') {
        integer = parseInt(money[0]).toString().split("").reverse().join("");
    } else {
        integer = money[0].split("").reverse().join("");
    }

    let count = Math.floor(integer.length / 3);
    let start = 0;
    let end = 3;
    for (let i = 0; i < count; i++) {
        if (count - i === 1) {
            if (integer.substring(i * 3).length > 3) {
                ret = ret + integer.substring(i * 3).substring(0, 3) + "," + integer.substring(i * 3).substring(3);
            } else {
                ret = ret + integer.substring(i * 3);
            }
        } else {
            ret = ret + integer.substring(start, end) + ",";
            start = start + 3;
            end = end + 3;
        }
    }

    if (integer) {
        if (integer.length > 2) {
            ret = ret.split("").reverse().join("");
        }
        else if (integer.length === 1 || integer.length === 2) {
            ret = parseInt(money[0]).toString();
        }
    }

    if (money[1]) {
        ret = ret + '.' + money[1];
    } else {
        ret = ret + '.00';
    }

    return ret;
}

export const verifyLeftYear = (year: number) => {
    let ret = false;
    if ((!(year % 4) && year % 100) || !(year % 400)) {
        ret = true;
    }
    return ret;
}