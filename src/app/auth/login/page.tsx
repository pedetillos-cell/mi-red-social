export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <div className="text-center mb-6">
          <div className="bg-sky-500 inline-block p-2 rounded-lg mb-4">
            <span className="text-white text-2xl font-bold">Vryno</span>
          </div>
          <h1 className="text-2xl font-bold">Iniciar sesión</h1>
          <p className="text-gray-600">Bienvenido de vuelta</p>
        </div>

        <form className="space-y-4">
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
            Entrar en Vryno
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            ¿No tienes cuenta?{' '}
            <a href="/auth/register" className="text-sky-500 hover:underline">
              Regístrate gratis
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}