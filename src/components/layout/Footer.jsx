import { Link } from "react-router-dom";
import {
  FaEnvelope,
  FaLocationDot,
  FaPhone,
} from "react-icons/fa6";

const contactInfo = {
  address: "Uyo, Akwa Ibom State",
  phone: "+234 9034205387",
  email: "saviouribok2@gmail.com",
};

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link
              to="/"
              className="text-xl font-bold"
            >
              Saviour's Kitchen
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-gray-400">
              Order your foods fresh and delicious.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-white">
              Quick Links
            </h2>

            <nav className="mt-4 flex flex-col gap-3">
              <Link
                to="/"
                className="text-sm text-gray-400 transition hover:text-white"
              >
                Home
              </Link>

              <Link
                to="/cart"
                className="text-sm text-gray-400 transition hover:text-white"
              >
                Cart
              </Link>

              <Link
                to="/profile"
                className="text-sm text-gray-400 transition hover:text-white"
              >
                Profile
              </Link>

              <Link
                to="/about"
                className="text-sm text-gray-400 transition hover:text-white"
              >
                About
              </Link>
            </nav>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-white">
              Contact
            </h2>

            <div className="mt-4 flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <FaLocationDot className="mt-1 shrink-0 text-yellow-500" />

                <span className="text-sm text-gray-400">
                  {contactInfo.address}
                </span>
              </div>

              <a
                href={`tel:${contactInfo.phone}`}
                className="flex items-center gap-3 text-sm text-gray-400 transition hover:text-white"
              >
                <FaPhone className="shrink-0 text-yellow-500" />

                <span>{contactInfo.phone}</span>
              </a>

              <a
                href={`mailto:${contactInfo.email}`}
                className="flex items-center gap-3 text-sm text-gray-400 transition hover:text-white"
              >
                <FaEnvelope className="shrink-0 text-yellow-500" />

                <span>{contactInfo.email}</span>
              </a>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-white">
              Information
            </h2>

            <p className="mt-4 text-sm leading-6 text-gray-400">
              More information about ordering, delivery,
              payments, and policies will be available here.
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="text-center text-xs text-gray-500">
            © {new Date().getFullYear()} Saviour's Kitchen.
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}