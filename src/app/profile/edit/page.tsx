export default function EditProfilePage() {
  return (
    <div className="min-h-screen bg-gray-100 pt-20 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h1 className="text-2xl font-bold mb-6">Editar perfil</h1>
          
          <form className="space-y-6">
            {/* Avatar */}
            <div>
              <label className="block text-sm font-medium mb-2">Foto de perfil</label>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-sky-500 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">J</span>
                </div>
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cambiar foto
                </button>
              </div>
            </div>

            {/* Nombre */}
            <div>
              <label className="block text-sm font-medium mb-2">Nombre</label>
              <input
                type="text"
                defaultValue="Javier Layos"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-sky-500"
              />
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-medium mb-2">Nombre de usuario</label>
              <input
                type="text"
                defaultValue="javierlayos"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-sky-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                defaultValue="javier@vryno.com"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-sky-500"
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium mb-2">Biografía</label>
              <textarea
                rows={3}
                placeholder="Cuéntanos sobre ti..."
                defaultValue="Creador de contenido sobre desarrollo web y tecnología."
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-sky-500"
              />
            </div>

            {/* Botones */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600"
              >
                Guardar cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}