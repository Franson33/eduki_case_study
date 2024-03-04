export const removeHtml = (item: string) => item.replace(/<\/?[^>]+(>|$)/g, '');
