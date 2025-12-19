export default function LoginScreen() {

  return (
    <div className="box-border p-4 min-h-screen min-w-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-400 display: flex items-center justify-center ">
      <form id="loginForms" className="flex flex-col ">

        <label className="text-stone-50">Usuário</label>
        <input className="w-50 h-10 bg-gray-50 border border-gray-900 rounded-sm mb-4" />
        <label className="text-stone-50">Senha</label>
        <input className="w-50 h-10 bg-gray-50 border border-gray-900 rounded-sm mb-4" type="password" />
        <button className="text-stone-50">Entrar</button>
      </form>
    </div>
  );
}
