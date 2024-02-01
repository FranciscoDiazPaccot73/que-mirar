import Link from "next/link"
import { Film } from "lucide-react"

export default function Component() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-main-bg text-white">
      <Film className="h-24 w-24 text-gray-300" />
      <h1 className="mt-8 text-6xl font-bold">404</h1>
      <p className="mt-2 text-xl">Pagina no encontrada</p>
      <Link
        className="mt-8 inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
        href="/"
      >
        Volver al inicio
      </Link>
    </div>
  )
}
