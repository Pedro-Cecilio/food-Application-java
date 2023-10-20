import axios, { AxiosPromise } from "axios"
import { useMutation, useQueryClient } from "react-query"

const API_URL = "http://localhost:8080"

const fetchData = async (id?: number): AxiosPromise<string> => {
    const response = axios.delete(`${API_URL}/food/${id}`)
    return response;
}


export function UseFoodDataDelete() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: fetchData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries(["food-data"])
        }
    })
    return mutate;

}