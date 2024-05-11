import { Product } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import PriceTag from "./PriceTag";

interface ProductInterface {
  product: Product;
}

const ProductCard = ({ product }: ProductInterface) => {
  const { id, description, imageUrl, name, price, createdAt, updatedAt } =
    product;
  const isNew =
    Date.now() - new Date(createdAt).getTime() < 1000 * 60 * 60 * 24 * 7;

  return (
    <>
      <Link
        href={`/products/${id}`}
        className="card w-full bg-base-100 transition hover:shadow-xl"
      >
        <figure>
          <Image src={imageUrl} width={800} height={400} alt={name} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          {isNew && <div className="badge badge-secondary">NEW</div>}{" "}
          <p>{description}</p>
          <PriceTag price={price} />
        </div>
      </Link>
    </>
  );
};

export default ProductCard;
