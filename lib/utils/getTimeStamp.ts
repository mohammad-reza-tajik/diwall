import persian from "dayjs/locale/fa"
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

function getTimestamp(date: string | Date) {
    return dayjs(date).locale(persian).fromNow();
}

export default getTimestamp;