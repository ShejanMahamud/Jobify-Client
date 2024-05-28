import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const useCurrency = (price) => {

const {data:usd} = useQuery({
    queryKey: ['price',price],
    queryFn: async () => {
        const {data} = await axios.get(`https://api.fastforex.io/convert?from=BDT&to=USD&amount=${price}&api_key=4547cae25f-9ffb2b57c4-se70sm`)
        return data.result.USD
    }
})
return {usd}
}
export default useCurrency