import { createContext,useState,ReactNode } from "react";
import { ProductIF } from "../types/product";

interface ViewDataIF{
    viewData:ProductIF | null
    setViewData:(data:ProductIF)=>void
}

const ViewContext = createContext<ViewDataIF | null>(null)

export const ViewContextProvider = ({children}:{children:ReactNode})=>{
    const [viewData,setViewData] = useState<ProductIF | null>(null)
    return (
        <ViewContext.Provider value={{viewData,setViewData}}>
            {children}
        </ViewContext.Provider>
    )
}

export {ViewContext}