import React from 'react';
import {Container} from "./style";

const Home: React.FC = () => {
    return (
      <Container>
        <section className='info-section'>
            <h1>O que é o NotaryChain?</h1>
            <p className='explaining-text'>
                A proposta do projeto é ser uma aplicação web que simula um sistema de registro de 
                documentos digitais utilizando um Smart Contract. O 'Notary' do nome representa 
                justamente isso, a função de um Notário. A ideia do projeto é modernizar os sistemas 
                atuais de cartórios através da tecnologia Blockchain, pois, a partir dela, pode-se 
                ter mais segurança, rapidez, flexibilidade e confiabilidade. Para simplificar o 
                projeto, assume-se que o documento já foi assinado pelas partes interessadas e não 
                infringe nenhuma lei. 
            </p>
            <p className='explaining-text'>
                As funções dessa site incluem a submissão de um arquivo na rede Blockchain, na aba 
                'Subir Documento' e também a verificação da validade de um documento que já esteja 
                na Blockchain, na aba 'Validar Documento'. Apesar da interface ser intuitiva, também
                foi elaborado um Manual de Instruções, na aba "Como usar", para esclarecer a forma de
                uso. 
            </p>
            <p className='disclaimer'>
                * Esse projeto faz parte da disciplina SSC0958 Blockchain e Criptomoedas. 
            </p>

            <img src="https://www.coopersystem.com.br/wp-content/uploads/2022/03/blockchain.jpg" alt="Imagem Ilustrativa Demonstrando uma cadeia Blockchain em tons azuis"/>
            <p className='ref-img'>https://cartorionobrasil.com.br/artigos/como-funcionara-a-blockchain-para-registro-de-imoveis/</p>
        </section>
      </Container>
    );
  };
  
export default Home;