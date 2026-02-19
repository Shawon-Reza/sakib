import { useEffect, useRef, useState } from 'react'
import { FiBell, FiChevronDown, FiMenu, FiSearch, FiX } from 'react-icons/fi'
import { NavLink } from 'react-router'

const navigationItems = [
    { label: 'Home', to: '/' },
    { label: 'Create Invoice', to: '/create-invoice' },
    { label: 'Invoices', to: '/invoices' },
    { label: 'Customers', to: '/customers' },
    { label: 'Products', to: '/products' },
    { label: 'Reports', to: '/reports' },
    { label: 'Settings', to: '/settings' },
]

function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false)
    const [profileOpen, setProfileOpen] = useState(false)
    const profileRef = useRef(null)

    useEffect(() => {
        function handleClickOutside(event) {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setProfileOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    function closeMobileMenu() {
        setMobileOpen(false)
    }

    return (
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">

            <nav className="mx-auto flex h-16 items-center justify-between px-4 sm:px-8 lg:px-16" aria-label="Main Navigation">
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 bg-white text-sm font-semibold text-slate-800">
                        IP
                    </div>
                    <div>
                        <p className="text-base font-semibold tracking-tight text-slate-900">InvoicePro</p>
                        <p className="text-xs text-slate-500">Business Invoicing</p>
                    </div>
                </div>

                <div className="hidden items-center gap-1 md:flex lg:gap-2">
                    {navigationItems.map((item) => {
                        return (
                            <NavLink
                                key={item.label}
                                to={item.to}
                                onClick={closeMobileMenu}
                                className={({ isActive }) => `rounded-md border-b-2 px-3 py-2 text-sm font-medium transition ${isActive
                                    ? 'border-slate-900 text-slate-900 shadow-2xl bg-slate-100 hover:text-slate-900'
                                    : 'border-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                    }`}
                            >
                                {item.label}
                            </NavLink>
                        )
                    })}
                </div>

                <div className="hidden items-center gap-1 sm:gap-2 md:flex">
                    <button
                        type="button"
                        className="rounded-md p-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                        aria-label="Search"
                    >
                        <FiSearch className="h-5 w-5" />
                    </button>
                    <button
                        type="button"
                        className="rounded-md p-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                        aria-label="Notifications"
                    >
                        <FiBell className="h-5 w-5" />
                    </button>

                    <div className="relative" ref={profileRef}>
                        <button
                            type="button"
                            onClick={() => setProfileOpen((previousState) => !previousState)}
                            className="ml-1 flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm text-slate-700 transition hover:bg-slate-100"
                            aria-haspopup="menu"
                            aria-expanded={profileOpen}
                        >
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                                RS
                            </span>
                            <span className="hidden text-sm font-medium text-slate-700 lg:inline">Reza</span>
                            <FiChevronDown className="h-4 w-4" />
                        </button>

                        {profileOpen ? (
                            <div className="absolute right-0 mt-2 w-44 rounded-lg border border-slate-200 bg-white py-1 shadow-md" role="menu">
                                <button type="button" className="block w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-100">
                                    Profile
                                </button>
                                <button type="button" className="block w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-100">
                                    Business Info
                                </button>
                                <button type="button" className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50">
                                    Logout
                                </button>
                            </div>
                        ) : null}
                    </div>
                </div>

                <button
                    type="button"
                    className="rounded-md p-2 text-slate-700 hover:bg-slate-100 md:hidden"
                    aria-label="Open menu"
                    onClick={() => setMobileOpen((previousState) => !previousState)}
                >
                    {mobileOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
                </button>
            </nav>

            {mobileOpen ? (
                <div className="border-t border-slate-200 bg-white md:hidden">
                    <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
                        {navigationItems.map((item) => {
                            return (
                                <NavLink
                                    key={item.label}
                                    to={item.to}
                                    onClick={closeMobileMenu}
                                    className={({ isActive }) => `rounded-md px-3 py-2 text-left text-sm font-medium ${isActive ? 'bg-slate-100 text-slate-900' : 'text-slate-700 hover:bg-slate-100'
                                        }`}
                                >
                                    {item.label}
                                </NavLink>
                            )
                        })}

                        <div className="mt-3 border-t border-slate-200 pt-3">
                            <button type="button" className="block w-full rounded-md px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100">
                                Profile
                            </button>
                            <button type="button" className="block w-full rounded-md px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100">
                                Business Info
                            </button>
                            <button type="button" className="block w-full rounded-md px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}
        </header>
    )
}

export default Navbar
