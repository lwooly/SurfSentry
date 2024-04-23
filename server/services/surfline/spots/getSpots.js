import axios from 'axios'

const BASE_SPOT_URL = 'https://services.surfline.com/taxonomy/';

export const fetchSpots = async (id) => {
    const baseUrl = `${BASE_SPOT_URL}?type=taxonomy&id=${id}`;

    try {
        const res = await axios.get(baseUrl)
        return res.data
    } catch (err) {
        console.log('Spots not found', err)
    }
}

const spots = await fetchSpots('58f7efcadadb30820bb64fb3')

console.log(spotArr)


