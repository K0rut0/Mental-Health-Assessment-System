import AdminNav from "@/components/custom/AdminNav"
import { ReactNode } from "react"

export default function Layout({ children }: {
    children: ReactNode
}){
    return(
    <>
        <AdminNav></AdminNav>
        {children}
    </>
    )
}