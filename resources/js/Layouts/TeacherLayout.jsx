import { useState } from 'react'
import ApplicationLogo from '@/Components/ApplicationLogo'
import Dropdown from '@/Components/Dropdown'
import NavLink from '@/Components/NavLink'
import ResponsiveNavLink from '@/Components/ResponsiveNavLink'
import { Link } from '@inertiajs/react'

export default function TeacherLayout({ user, header, children }) {
  const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(
    false,
  )

  return (
    <div className="flex h-screen bg-gray-200">
      <aside className="w-64 bg-gray-800">
        <div className="flex flex-col items-center justify-center mt-10">
          <ApplicationLogo className="block h-16 w-auto fill-current text-gray-800" />
          <Link
            href={route('dashboard')}
            className="text-white text-2xl font-semibold"
          >
            Panel del Profesor
          </Link>
        </div>
        <nav className="mt-10">
          <div
            onClick={() =>
              setShowingNavigationDropdown((previousState) => !previousState)
            }
          >
            <div className="pt-2 pb-3 space-y-1">
              <ResponsiveNavLink
                href={route('teacher.dashboard')}
                active={route().current('teacher.dashboard')}
              >
                Panel
              </ResponsiveNavLink>
            </div>

            <div className="pt-4 pb-1 border-t border-gray-200">
              <div className="px-4">
                <div className="font-medium text-base text-gray-200">
                  {user.name}
                </div>
                <div className="font-medium text-sm text-gray-200">
                  {user.email}
                </div>
              </div>

              <div className="mt-3 space-y-1">
                <ResponsiveNavLink href={route('teacher.profile.edit')}
                >
                  Perfil
                </ResponsiveNavLink>
                <ResponsiveNavLink
                  method="post"
                  href={route('logout')}
                  as="button"
                >
                  Cerrar Sesión
                </ResponsiveNavLink>
              </div>
            </div>
          </div>
        </nav>
      </aside>
      <div className="flex-1">
        <main className="h-full p-4">{children}</main>
      </div>
    </div>
  )
}
