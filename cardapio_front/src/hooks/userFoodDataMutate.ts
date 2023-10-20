import axios, {AxiosPromise} from "axios"
import { FoodData } from "../interface/FoodData"
import { useMutation, useQueryClient } from "react-query"

const API_URL = "http://localhost:8080"

const fetchData = async (data: FoodData): AxiosPromise<any> =>{
    const response = axios.post(API_URL+"/food", data)
    return response;
}


export function UseFoodDataMutate(){
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: fetchData,
        retry:2,
        onSuccess: ()=>{
            queryClient.invalidateQueries(["food-data"])
        }
    })
    return mutate;
}