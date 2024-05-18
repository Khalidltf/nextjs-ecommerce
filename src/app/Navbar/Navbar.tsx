import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/logo.png";
import { redirect } from "next/navigation";
import { getCart } from "@/lib/db/cart";
import ShoppingCartButton from "./ShoppingCartButton";

async function searchProducts(formData: FormData) {
  "use server";

  const searchQuery = formData.get("searchQuery")?.toString();
  if (searchQuery) {
    redirect("/search?query=" + searchQuery);
  }
}

export default async function Navbar() {
  const cart = await getCart();

  return (
    <div className="bg-base-100">
      <div className="navbar m-auto max-w-7xl flex-col gap-2 sm:flex-row">
        <div className="flex-1">
          <Link href="/" className="btn-ghost btn text-xl normal-case">
            <Image
              src={Logo}
              width={40}
              height={40}
              alt="nextjs Ecommerce web app"
            />
            ke-commeerce nextjs
          </Link>
        </div>
        <div className="flex-none gap-2">
          <form action={searchProducts}>
            <div className="form-control">
              <input
                type="text"
                name="searchQuery"
                placeholder="search"
                className="input-bordered input w-full min-w-[100px]"
              />
            </div>
          </form>
          <ShoppingCartButton cart={cart} />
        </div>
      </div>
    </div>
  );
}
