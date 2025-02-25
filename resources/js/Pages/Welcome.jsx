import { Link, Head } from '@inertiajs/react'


export default function Welcome({ auth, laravelVersion, phpVersion }) {
  return (
    <>
      <Head title="Welcome" />
      <div data-theme="valentine" className="bg-dots-darker dark:bg-dots-lighter min-h-screen flex flex-col items-center justify-center gap-6 p-6">
        <img src="/img/logo.svg" alt="Fluentlyyy" className="w-64" />
        <h1 className="text-2xl md:text-6xl font-bold">Hola! Esto es Fluentlyyy</h1>
        <p className="text-xl text-center">Fluentlyyy es una plataforma para conectar gente que quiere aprender idiomas.</p>
        <div className="flex flex-col md:flex-row mt-10 gap-4 md:gap-12">
            <Link href="/register" className="btn btn-secondary btn-wide text-lg text-white  px-6">Registrate</Link>
            <Link href="/login" className="btn btn-primary btn-wide text-lg">Iniciar sesión</Link>
        </div>
      </div>
      <style>{`
                .bg-dots-darker {
                    background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(0,0,0,0.07)'/%3E%3C/svg%3E");
                }
                @media (prefers-color-scheme: dark) {
                    .dark\\:bg-dots-lighter {
                        background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(255,255,255,0.07)'/%3E%3C/svg%3E");
                    }
                }
            `}</style>
    </>
  )
}
