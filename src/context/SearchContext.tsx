import React,{createContext,useState,ReactNode} from "react";


interface SearchContextProps{
    searchQuery:string
    setSearchQuery:(query:string)=>void
}

export const SearchContext = createContext<SearchContextProps>({
    searchQuery:'',
    setSearchQuery:()=>{}
})

interface searchProviderProps{
    children:ReactNode
}

export const SearchContextProvider : React.FC<searchProviderProps> = ({children}) => {
    const [searchQuery,setSearchQuery] = useState('')

    return (
        <SearchContext.Provider value={{searchQuery,setSearchQuery}}>
            {children}
        </SearchContext.Provider>
    )
}
