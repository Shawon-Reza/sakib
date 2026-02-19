import { FaTelegram, FaWhatsapp } from 'react-icons/fa'
import { FiFacebook, FiInstagram, FiLinkedin, FiTwitter } from 'react-icons/fi'

function Footer() {
    return (
        <footer className="bg-slate-50 text-slate-700">
            <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3 lg:px-8">
                <div>
                    <h3 className="text-lg font-semibold text-slate-900">InvoicePro</h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                        Professional invoicing and memo tools designed for small businesses, freelancers, and growing teams.
                    </p>
                </div>

                <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-900">Quick Links</h4>
                    <ul className="mt-3 space-y-2 text-sm">
                        <li><a className="hover:text-slate-900" href="/">Home</a></li>
                        <li><a className="hover:text-slate-900" href="/about">About Us</a></li>
                        <li><a className="hover:text-slate-900" href="/services">Services</a></li>
                        <li><a className="hover:text-slate-900" href="/contact">Contact</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-900">Contact</h4>
                    <div className="mt-3 space-y-2 text-sm text-slate-600">
                        <p>123 Business Avenue, Suite 10, Dhaka</p>
                        <p><a className="hover:text-slate-900" href="mailto:hello@invoicepro.com">hello@invoicepro.com</a></p>
                        <p><a className="hover:text-slate-900" href="tel:+8801000000000">+880 10 0000 0000</a></p>
                    </div>
                    <div className="mt-4 flex items-center gap-3 text-slate-600">
                        <a className="rounded-full border border-slate-200 p-2 hover:border-slate-400 hover:text-slate-900" href="https://facebook.com" aria-label="Facebook">
                            <FiFacebook className="h-4 w-4" />
                        </a>
                        <a className="rounded-full border border-slate-200 p-2 hover:border-slate-400 hover:text-slate-900" href="https://twitter.com" aria-label="Twitter">
                            <FaWhatsapp className="h-4 w-4" />
                        </a>
                        <a className="rounded-full border border-slate-200 p-2 hover:border-slate-400 hover:text-slate-900" href="https://instagram.com" aria-label="Instagram">
                            <FiInstagram className="h-4 w-4" />
                        </a>
                        <a className="rounded-full border border-slate-200 p-2 hover:border-slate-400 hover:text-slate-900" href="https://linkedin.com" aria-label="LinkedIn">
                            <FaTelegram className="h-4 w-4" />
                        </a>

                    </div>
                </div>
            </div>

            <div className="border-t border-slate-200 bg-slate-50">
                <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-slate-500 sm:flex-row sm:px-6 lg:px-8">
                    <span>© 2026 InvoicePro. All rights reserved.</span>
                    <span>Built for business invoicing. Built by Shawon Reza</span>
                </div>
            </div>
        </footer>
    )
}

export default Footer
