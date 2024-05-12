import { cookies } from "next/dist/client/components/headers";
import { prisma } from "./prisma";
import { Cart, Prisma } from "@prisma/client";

export type CartWithProductTypes = Prisma.CartGetPayload<{
  include: { items: { include: { product: true } } };
}>;

export type ShoppingCartType = CartWithProductTypes & {
  size: number;
  subtotal: number;
};

export async function getCart(): Promise<ShoppingCartType | null> {
  const localCartId = cookies().get("localCartId")?.value;
  const cart = localCartId
    ? await prisma.cart.findUnique({
        where: { id: localCartId },
        include: { items: { include: { product: true } } },
      })
    : null;

  if (!cart) return null;

  return {
    ...cart,
    size: cart.items.reduce((acc, curr) => acc + curr.quantity, 0),
    subtotal: cart.items.reduce(
      (acc, curr) => acc + curr.quantity * curr.product.price,
      0
    ),
  };
}

export async function createCart(): Promise<ShoppingCartType> {
  const newCart = await prisma.cart.create({
    data: {},
  });

  //? Notes needs encryption + secure settings in real productions app
  cookies().set("localCartId", newCart.id);

  return {
    ...newCart,
    items: [],
    size: 0,
    subtotal: 0,
  };
}
