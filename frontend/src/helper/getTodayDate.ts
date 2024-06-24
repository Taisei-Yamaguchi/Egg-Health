export const getCurrentDateFormatted = (): string => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // 月を2桁に
    const day = String(today.getDate()).padStart(2, '0'); // 日を2桁に
    return `${year}-${month}-${day}`;
};