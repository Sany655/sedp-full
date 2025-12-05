
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import DropdownUser from "./DropdownUser";
import Image from 'next/image';
import remarkLogo from '@/app/public/images/remark.png';
const Header = ({ title, sidebarOpen, setSidebarOpen }) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b shadow-sm dark:border-muted">
      <div className="flex items-center justify-between px-4 py-3 md:px-6 lg:px-8">
        {/* Sidebar Toggle Button (Mobile only) */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
            className=""
          >
            {sidebarOpen ? (
              <GiHamburgerMenu className="h-5 w-5 text-foreground" />
            ) : (
              <MdClose className="h-5 w-5 text-foreground" />
            )}
          </button>

           <Link href="/" className="flex items-center gap-3">
              <Image
                className="w-6 h-5 rounded-lg"
                src={remarkLogo}
                priority
                alt="Logo"
              />
            
            </Link>

        </div>

        {/* Page Title */}
        <h1 className="text-lg md:text-2xl font-bold text-foreground truncate">
          {title}
        </h1>

        {/* Right Icons / Settings Area */}
        <div className="flex items-center gap-4">
          {/* Placeholder for user menu, dark mode toggle, etc. */}
          <DropdownUser />
          {/* <DarkModeToggle /> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
