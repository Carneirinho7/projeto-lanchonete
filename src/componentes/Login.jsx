import './login.css'

function Login(){
    return(
        <div className='login'>
            <h2>Login</h2>

            <input type="text" placeholder="Usuário ou Email" />
            <input type="password" placeholder='Senha'/>
            <button>Enviar</button>
        </div>
    )
}

export default Login
