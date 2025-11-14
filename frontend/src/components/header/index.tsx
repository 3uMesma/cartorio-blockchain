import { Container } from "./style";

export default function Header() {
    return (
        <Container>
            <a href="/"><h1>Notary<b>CHAIN</b></h1></a>
            <div className = "menu">
                <li><a href="/how-to-use">COMO USAR</a></li>
                <li>|</li>
                <li><a href="/upload-blockchain">SUBIR DOCUMENTO</a></li>
                <li>|</li>
                <li><a href="/check-document">VALIDAR DOCUMENTO</a></li>
            </div>
        </Container>
    )
}