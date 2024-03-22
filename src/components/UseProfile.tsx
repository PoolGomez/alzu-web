import { DataProfileType } from "@/libs/types";
import { useEffect, useState } from "react";

export function useProfile(){
    // const [data, setData] = useState(false);
    const [data, setData] = useState<DataProfileType>();
    const[loading, setLoading] = useState(true);

    useEffect(()=>{
        setLoading(true);
        fetch('/api/profile').then(response =>{
            console.log('useProfile');
            console.log(response);
            response.json().then(data=>{
                console.log('data')
                console.log(data)
                setData(data);
                setLoading(false);
            })
        })
    },[]);

    return { loading, data}
}