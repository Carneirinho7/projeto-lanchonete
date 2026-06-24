import Header from "./componentes/Header";
import Login from "./componentes/Login";
import CardProd from "./componentes/CardProd";
import Funcionario from "./componentes/Funcionario";
import "./App.css";
import Contador from "./componentes/contador";


function App(){
  return(
    <div className="pagina">
      <Header titulo = "Lanchonete Dogão"
      subtitulo = "A melhor de CWB" />
      <Login  />

      <section className="produtos">
        <h2>Cardápio</h2>
        <div className="lista-produtos">
          <CardProd nome="X-Bozze" preco="R$ 19,00" />
          <CardProd nome="X-Pimentel" preco="R$ 17,00" />
          <CardProd nome="X-Fermino" preco="R$ 15,00" />
          <CardProd nome="Refrigerante" preco="R$ 6,00" />
          <CardProd nome="Suco" preco="R$ 5,00" />
          <CardProd nome="Água" preco="R$ 3,50" />
        </div>
      </section>

      <Funcionario nome="Thiago o Chefe da Chapa" />

      <Contador/>
    </div>

  

  )
}
export default App
