import { Header } from "../Component/Header"
import { Nav_Var } from "../Component/Nav_Var"
import { Hero } from "../Component/Hero"
import { Footer } from "../Component/Footer"
export function Principal(){
    return(
        <>
        <Nav_Var
        variante="P"
        />
        <Header></Header>
        <Hero></Hero>
        <Footer></Footer>
        </>
    )
}