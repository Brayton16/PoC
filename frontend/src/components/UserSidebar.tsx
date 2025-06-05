import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Briefcase, LineChart, User, Bot } from 'lucide-react';

export default function Sidebar() {
    const links = [
        { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={24} /> },
        { name: 'Activos', path: '/activos', icon: <Briefcase size={24} /> },
        { name: 'Simulacion', path: '/simulacion', icon: <Bot size={24} /> },
        { name: 'Perfil', path: '/Perfil', icon: <User size={24} /> }
    ];

  return (
    <aside className="w-50 bg-white dark:bg-neutral-900 shadow-lg pt-20 hidden md:flex flex-col space-y-6">
        <ul className="space-y-20 text-center justify-center items-center">
            {links.map((link) => (
                <li key={link.name}>
                    <NavLink
                        to={link.path}
                        className={({ isActive }) =>
                            `flex justify-center items-center hover:text-red-500 dark:hover:text-yellow-500 transition ${isActive ? 'dark:text-yellow-500 text-red-500' : ''}`
                        }
                    >
                    <span className="flex items-center gap-2">
                        {link.icon}
                        {link.name}
                    </span>
                    </NavLink>
                </li>
            ))}
        </ul>
    </aside>
  );
}