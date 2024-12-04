import { NavLink } from "react-router";

const links = [
  { href: "/", title: "Menu" },
  { href: "/orders", title: "Orders" },
];

export const SideBar = () => {
  return (
    <div className="md:w-2/5 xl:w-1/5 bg-gray-800">
      <div className="p-6">
        <p className="uppercase text-white text-2xl tracking-wide text-center font-bold">
          RestaurantApp
        </p>
        <p className="mt-3 text-gray-600">
          Administra tu restaurante en las siguientes opciones:
        </p>
        <nav>
          {links.map((link) => (
            <NavLink
              className={({ isActive }) =>
                `p-1 block hover:bg-blue-400 hover:text-gray-900 ${isActive ? "text-blue-500" : "text-gray-400"}`
              }
              key={link.href}
              to={link.href}
            >
              {link.title}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};
