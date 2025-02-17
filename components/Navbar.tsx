import Link from "next/link";
import Image from "next/image";
import { auth, signOut, signIn } from "@/auth";
import { BadgePlus, LogOut, LogIn } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-5 py-3 bg-slate-100 shadow-2xl font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo1.png" alt="logo" width={144} height={30} />
        </Link>

        {/* Flex container for Create, Logout/Login, Avatar */}
        <div className="flex items-center gap-3 text-black">
          {session && session?.user ? (
            <>
              {/* Create Button */}
              <Link href="/startup/create" className="flex items-center">
                <span className="hidden sm:flex relative px-2 py-2 font-semibold text-black rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-900 hover:to-blue-800 hover:text-white hover:shadow-lg hover:scale-105">
                  Create
                </span>
                <BadgePlus className="size-6 sm:hidden" />
              </Link>

              {/* Logout Button */}
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
                className="flex items-center"
              >
                <button
                  type="submit"
                  className="relative px-2 py-2 font-semibold text-black rounded-lg flex items-center gap-2 transition-all duration-300
                            sm:hover:bg-gradient-to-r sm:hover:from-purple-900 sm:hover:to-blue-800 sm:hover:text-white 
                            sm:hover:shadow-lg sm:hover:scale-105"
                >
                  <span className="hidden sm:inline">Logout</span>
                  {/* Text only on large screens */}
                  <LogOut className="size-6 sm:size-5 sm:hidden" />
                  {/* Icon only on small screens */}
                </button>
              </form>

              {/* Avatar */}
              <Link href={`/user/${session?.id}`} className="flex items-center">
                <Avatar className="size-10">
                  <AvatarImage
                    src={session?.user?.image || ""}
                    alt={session?.user?.name || ""}
                  />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            /* Login Button */
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
              className="flex items-center"
            >
              <button
                type="submit"
                className="relative px-5 py-2 font-semibold text-black rounded-lg flex items-center gap-2 transition-all duration-300
                          sm:hover:bg-gradient-to-r sm:hover:from-purple-900 sm:hover:to-blue-800 sm:hover:text-white 
                          sm:hover:shadow-lg sm:hover:scale-105"
              >
                <span className="hidden sm:inline text-lg">Login</span>
                {/* Text only on large screens */}
                <LogIn className="size-6 sm:size-5 sm:hidden" />
                {/* Icon only on small screens */}
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
