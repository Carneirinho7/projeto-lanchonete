import "../src/componentes/login.css";
import { useNavigate } from "react-router-dom";

function Cadastro() {
  const navigate = useNavigate();

  function cadastrar(evento) {
    evento.preventDefault();
    navigate("/login");
  }

  return (
    <main className="pagina-login">
      <form className="login" onSubmit={cadastrar}>
        <h2>Cadastro</h2>
        <input type="text" placeholder="Nome" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Senha" required />
        <button type="submit">Cadastrar</button>
      </form>
    </main>
  );
}

export default Cadastro;
