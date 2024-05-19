// server action in server component

import SubmitButton from "@/components/SubmitButton";
import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export const metadata = {
  title: "product - Ecommerce",
};

async function addProduct(formData: FormData) {
  "use server";

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/product");
  }

  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const price = Number(formData.get("price") || 0);

  if (!name || !description || !imageUrl || !price) {
    throw new Error("data no valid");
  }

  await prisma.product.create({
    data: { name, description, imageUrl, price },
  });

  redirect("/");
}

const AddProduct = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/product");
  }

  return (
    <div>
      <h1 className="mb-3 text-lg font-bold">Add product</h1>
      <form action={addProduct}>
        <input
          type="text"
          name="name"
          placeholder="name"
          className="input-bordered input mb-3 w-full "
          required
        />
        <textarea
          name="description"
          placeholder="description"
          className="textarea-bordered textarea  mb-3 w-full"
          required
        ></textarea>
        <input
          type="url"
          name="imageUrl"
          placeholder="https://image.url"
          className="input-bordered input mb-3 w-full"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="price"
          className="input-bordered input mb-3 w-full"
          required
        />
        <SubmitButton className="btn-block ">add product</SubmitButton>
      </form>
    </div>
  );
};

export default AddProduct;
