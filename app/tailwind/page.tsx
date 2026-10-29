export default function Tailwind(){
    return(
        <div className="">
            <p>Hola</p>
            <button className="p-4 rounded-xl bg-blue-500 text-white font-semibold">
                Guardar

            </button>
            <div className="p-6 m-6 rounded-xl bg-blue-500 text-white font-semibold w-fit">
                Ejemplo
            </div>
            <div>
                
            </div>
            <div className="flex items-center justify-between px-5 py-3 gap-5 outline-1 rounded-2xl">
                <div className="outline- w-fit  font-semibold font">
                    GymTrack
                </div>
                <div className="w-fit">
                    Rutinas
                </div>
                <div className="w-fit">
                    Historial
                </div>
                <div className="w-fit">
                    Perfil
                </div>
                <button className="p-4 rounded-2xl bg-blue-500 text-white font-semibold ">
                Entrar

            </button>
            </div>
        </div>

    )
}