"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getDate(timestamp) {
    const timeAgo = formatTimeAgo(timestamp.seconds * 1000);
    return timeAgo;
}
const formatTimeAgo = (timestamp) => {
    const now = Date.now();
    const diffInMilliseconds = (now - timestamp);
    const formatter = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
    if (diffInMilliseconds < 60 * 1000) {
        const diffInSeconds = Math.round(diffInMilliseconds / 1000);
        return formatter.format(-diffInSeconds, 'second');
    }
    if (diffInMilliseconds < 60 * 60 * 1000) {
        const diffInMinutes = Math.round(diffInMilliseconds / (60 * 1000));
        return formatter.format(-diffInMinutes, 'minute');
    }
    if (diffInMilliseconds < 24 * 60 * 60 * 1000) {
        const diffInHours = Math.round(diffInMilliseconds / (60 * 60 * 1000));
        return formatter.format(-diffInHours, 'hour');
    }
    if (diffInMilliseconds < 30 * 24 * 60 * 60 * 1000) {
        const diffInDays = Math.round(diffInMilliseconds / (24 * 60 * 60 * 1000));
        return formatter.format(-diffInDays, 'day');
    }
    if (diffInMilliseconds < 12 * 30 * 24 * 60 * 60 * 1000) {
        const diffInDays = Math.round(diffInMilliseconds / (30 * 24 * 60 * 60 * 1000));
        return formatter.format(-diffInDays, 'month');
    }
    // Add more conditions for weeks, months, etc. if needed
    return 'Long time ago';
};
exports.default = getDate;
