export const handleLink = (href: string): void => {
    const link = document.createElement('a');
    link.target = "_blank";
    link.href = href;
    link.click();
};