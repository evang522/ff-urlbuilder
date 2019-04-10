const baseProductApiUrl = 'https://www.v2.fitfox.de/api/product/';
const baseEventOccurrenceApiUrl = 'https://www.v2.fitfox.de/api/eventoccurrence/';
const baseStudioOccurrenceApiUrl = 'https://www.v2.fitfox.de/api/studio/';

const fetchProductInfo = async (id: string): Promise<any> => {
    const apiUrl: string = baseProductApiUrl + id;
    const rawResponse = await fetch(apiUrl);
    const product = await rawResponse.json();

    if (!product || product.code === 404) {
        throw new Error('Product Not Found');
    }

    if (product.eventOccurrence) {
        const rawEventOccurrenceResponse = await fetch(baseEventOccurrenceApiUrl + product.eventOccurrence.id);
        const eventOccurrence = await rawEventOccurrenceResponse.json();
        product.eventOccurrence = eventOccurrence;
        return product;
    } else {
        const rawStudioResponse = await fetch(baseStudioOccurrenceApiUrl + product.studio.id);
        const studio = await rawStudioResponse.json();
        product.studio = studio;
        return product;
    }
}

export default fetchProductInfo;