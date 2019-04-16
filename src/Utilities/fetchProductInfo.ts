const productUrlPath = '/api/product/';
const eventOccurrenceUrlPath = '/api/eventoccurrence/';
const studioUrlPath = '/api/studio/';

const fetchProductInfo = async (id: string, baseUrl: string): Promise<any> => {
    const apiUrl: string = baseUrl + productUrlPath + id;
    const rawResponse = await fetch(apiUrl);
    const product = await rawResponse.json();

    if (!product || product.code === 404) {
        throw new Error('Product Not Found');
    }

    if (product.eventOccurrence) {
        const rawEventOccurrenceResponse = await fetch(baseUrl + eventOccurrenceUrlPath + product.eventOccurrence.id);
        const eventOccurrence = await rawEventOccurrenceResponse.json();
        product.eventOccurrence = eventOccurrence;
        return product;
    } else {
        const rawStudioResponse = await fetch(baseUrl + studioUrlPath + product.studio.id);
        const studio = await rawStudioResponse.json();
        product.studio = studio;
        return product;
    }
}

export default fetchProductInfo;