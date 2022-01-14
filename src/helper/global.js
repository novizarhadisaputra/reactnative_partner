import { useTranslation } from "react-i18next";

const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
];
const changeFormatDate = (date) => {
    if (date) {
        const current = new Date(date);
        const { t, i18n } = useTranslation();
        return `${current.getDate()} ${t(months[current.getMonth()])} ${current.getFullYear()}`;
    }
    return ``;
}

const formatOrderNumber = (id) => {
    let str = "" + id;
    let pad = "0000000";
    let ans = pad.substring(0, pad.length - str.length) + str
    return ans
}

export { changeFormatDate, formatOrderNumber, months }
