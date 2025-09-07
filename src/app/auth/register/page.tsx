export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <div className="text-center mb-6">
          <div className="bg-sky-500 inline-block p-2 rounded-lg mb-4">
            <span className="text-white text-2xl font-bold">Vryno</span>
          </div>
          <h1 className="text-2xl font-bold">Crear cuenta</h1>
          <p className="text-gray-600">Únete a la comunidad</p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Nombre de usuario</label>
            <input 
              type="text" 
              placeholder="tu_usuario"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input 
              type="email" 
              placeholder="tu@email.com"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Contraseña</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-sky-500"
            />
          </div>

          <button className="w-full bg-sky-500 text-white py-3 rounded-md font-semibold hover:bg-sky-600">
            Crear cuenta
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            ¿Ya tienes cuenta?{' '}
            <a href="/auth/login" className="text-sky-500 hover:underline">
              Inicia sesión
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}