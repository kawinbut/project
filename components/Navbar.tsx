<<<<<<< HEAD
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
    name: string;
    email: string;
    role: "admin" | "user";
};

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        async function loadUser() {
            const res = await fetch("/api/auth/me");
            const data = await res.json();
            setUser(data.user);
        }

        loadUser();
    }, []);

    async function logout() {
        await fetch("/api/auth/logout", {
            method: "POST",
        });

        setUser(null);
        router.push("/login");
        router.refresh();
    }

    return (
        <nav className="navbar">
            <div className="nav-container">

                <Link href="/" className="logo">
                    VIDEO SHOP
                </Link>

                <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
                    ☰
                </button>

                <ul className={menuOpen ? "nav-links active" : "nav-links"}>
                    <li>
                        <Link href="/" >Home</Link>
                    </li>
                    <li>
                        <Link href="/about">About</Link>
                    </li>
                    <li>
                        <Link href="/contact">Contact</Link>
                    </li>
                    <li>
                        <Link href="/products">สินค้า</Link>
                    </li>
                    <li>
                        <Link href="/blogs">บทความ</Link>
                    </li>

                    {user && (
                        <li>
                            <Link href="/dashboard">Dashboard</Link>
                        </li>
                    )}

                    {user?.role === "admin" && (
                        <>
                            <li>
                                <Link href="/admin/blogs">เพิ่มบทความ</Link>
                            </li>
                            <li>
                                <Link href="/admin/categories">เพิ่มประเภทสินค้า</Link>
                            </li>
                            <li>
                                <Link href="/admin/products">เพิ่มสินค้า</Link>
                            </li>
                        </>
                    )}

                    {!user ? (
                        <>
                            <li>
                                <Link href="/login">Login</Link>
                            </li>
                            <li>
                                <Link href="/register"> Register </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link href="/profile"> {user.name} ({user.role}) </Link>
                            </li>
                            <li>
                                <button onClick={logout} className="btn-logout">
                                    Logout
                                </button>
                            </li>
                        </>
                    )}

                </ul>
            </div>
        </nav>
    );
}
=======
<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" aria-disabled="true">Disabled</a>
        </li>
      </ul>
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
>>>>>>> a7241388b495671ff166cda30d0bb823fba17ad3
