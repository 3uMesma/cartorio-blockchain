import { Container } from "./style";

export default function Header() {
    return (
        <Container>
            <a href="/"><h1>Notary<b>CHAIN</b></h1></a>
            <div className = "menu">
                <li><a href="/upload/">SUBIR DOCUMENTO</a></li>
                <li>|</li>
                <li><a href="/check/">VALIDAR DOCUMENTO</a></li>
            </div>
        </Container>
    )
}