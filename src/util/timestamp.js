export function timeStamp(data) {
    // const t = parseInt(time);
    // console.log("t", t);
    // const dateComment = new Date(data).getTime();

    // console.log(dateComment);
    // console.log(dateNow);
    // console.log(diff);
    // return diff;

    const dateComment = new Date(parseInt(data));
    const dateNow = new Date();

    const diffYear = dateNow.getFullYear() - dateComment.getFullYear();
    if (diffYear === 0) {
        const diffDay = dateNow.getDay() - dateComment.getDay();

        if (diffDay === 0) {
            const diffHours = dateNow.getHours() - dateComment.getHours();

            if (diffHours === 0) {
                const diffminutes =
                    dateNow.getMinutes() - dateComment.getMinutes();

                if (diffminutes >= 0 && diffminutes < 1) {
                    return "1 минуту назад";
                }
                if (diffminutes >= 1 && diffminutes < 5) {
                    return "5 минуту назад";
                }
                if (diffminutes >= 5 && diffminutes < 10) {
                    return "10 минут назад";
                }
                if (diffminutes >= 10 && diffminutes < 30) {
                    return "30 минут назад";
                }

                return "30 минут";
            }
            return `${dateComment.getHours()}:${dateComment.getMinutes()}`;
        }
        return `${dateComment.getDay()} ${dateComment.toLocaleString(
            "default",
            {
                month: "long"
            }
        )}`;
    }
    return (
        dateComment.getFullYear() +
        "." +
        (dateComment.getMonth() + 1) +
        "." +
        dateComment.getDate()
    );
}
