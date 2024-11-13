import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import qs from "query-string";
import persian from "dayjs/locale/fa"
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function debounce(func: (...args: any[]) => void, wait: number = 500): (...args: any[]) => void {
    let timeout: NodeJS.Timeout;
    return function (...args: any[]) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}



interface Config {
    currentParams? : string;
    params?: Record<string, string | number>;
    hash?:string;
}

export function formUrlQuery({params , currentParams = ""} : Config = {} ) : string {
    const query = qs.parse(currentParams);

    if (params) {
        Object.keys(params).forEach(key => {
            query[key] = String(params[key]);
        })
    }
    return qs.stringifyUrl({
        url: "",
        query: query
    }, {skipNull: true})

}

export function range(start: number, end: number) {
    const length = end - start + 1;
    return Array.from({length}, (_, index) => index + start);
}

export function getTimestamp(date: string | Date) {
    return dayjs(date).locale(persian).fromNow();
}