import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Code2, Menu, X } from "lucide-react";
import { useState } from "react";

export const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-primary/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <Code2 className="h-6 w-6 text-primary group-hover:text-primary-glow transition-colors" />
            <span className="text-xl font-bold gradient-text">TechDebt</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/about") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              About Us
            </Link>
            <Link
              to="/editor"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/editor") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Code Editor
            </Link>
            <Link to="/auth">
              <Button variant="outline" size="sm" className="border-primary/50 hover:bg-primary/10">
                Login
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-primary/20">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className={`block text-sm font-medium transition-colors hover:text-primary ${
                isActive("/") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={() => setIsOpen(false)}
              className={`block text-sm font-medium transition-colors hover:text-primary ${
                isActive("/about") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              About Us
            </Link>
            <Link
              to="/editor"
              onClick={() => setIsOpen(false)}
              className={`block text-sm font-medium transition-colors hover:text-primary ${
                isActive("/editor") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Code Editor
            </Link>
            <Link to="/auth" onClick={() => setIsOpen(false)}>
              <Button variant="outline" size="sm" className="w-full border-primary/50 hover:bg-primary/10">
                Login
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
