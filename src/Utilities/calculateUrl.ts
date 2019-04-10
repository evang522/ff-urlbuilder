import { IIdMember } from './../App';
const calculateUrl = (idList: IIdMember[]): string => {
    let url: string = 'https://www.fitfox.de/checkout/?';
    if (!idList.length) {
        return '';
    }

    const filteredIdList = idList.reduce((accumulator: IIdMember[], idMember: IIdMember) => {
        if (idMember.verified) {
            accumulator.push(idMember);
        }
        return accumulator;
    }, [])

    filteredIdList.forEach((idMember: IIdMember, index: number) => {
        if (idMember.verified) {
            url += `products[${index}][id]=${idMember.productId}&products[${index}][quantity]=${idMember.quantity}&`
        }
    })

    if (url[url.length - 1] === '&') {
        url = url.slice(0, url.length - 1);
    }
    return url;
}

export default calculateUrl;