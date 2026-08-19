import './login.css'
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(){
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");

    function entrar(evento) {
        evento.preventDefault();

        if (usuario === "cliente" && senha === "123") {
            localStorage.setItem("usuario-logado", "cliente");
            navigate("/home");
            return;
        }

        if (usuario === "admin" && senha === "123") {
            localStorage.setItem("usuario-logado", "admin");
            navigate("/pedido");
            return;
        }

        setErro("Usuário não cadastrado.");
    }

    return(
        <form className='login' onSubmit={entrar}>
            <h2>Login</h2>

            <input
                type="text"
                placeholder="Usuário"
                value={usuario}
                onChange={(evento) => setUsuario(evento.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(evento) => setSenha(evento.target.value)}
                required
            />
            {erro && <p className="erro-login" role="alert">{erro}</p>}
            <button type="submit">Entrar</button>
        </form>
    )
}

export default Login
