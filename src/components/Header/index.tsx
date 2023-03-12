import { NavItem } from "./components/NavItem";

export function Header() {
  return (
    <header className="flex flex-col gap-4 mb-4 pb-2 border-b border-b-gray-50">
      <h1 className="text-3xl font-semibold">Controle de Estoque</h1>

      <nav className="flex gap-8 duration-300">
        <NavItem label="Estoque" link="/" />
        <NavItem label="Saída do Estoque" link="/stock-output" />
      </nav>
    </header>
  );
}
