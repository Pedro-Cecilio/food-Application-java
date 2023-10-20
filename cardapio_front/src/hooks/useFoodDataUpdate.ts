import axios, { AxiosPromise } from "axios"
import { useMutation, useQueryClient } from "react-query"
import { FoodData } from "../interface/FoodData"

const API_URL = "http://localhost:8080"

const fetchData = async (data: FoodData): AxiosPromise<string> => {
    const response = axios.put(`${API_URL}/food/${data.id}`, data)
    return response;
}


export function UseFoodDataUpdate() {
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