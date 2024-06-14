export function humanReadableToLocalTime(time: string, delimeter: string): string {
    const date = new Date(
        time.replace("Dated on ", "")
            .split(", minute ")[0]
    ).toLocaleDateString("en-GB");
    return date.replaceAll("/", delimeter);
}