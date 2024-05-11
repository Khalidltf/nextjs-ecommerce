import { formatPrice } from "@/lib/formatPrice";

interface PriceTagInterface {
  price: number;
  className?: string;
}

export default function PriceTag({ price, className }: PriceTagInterface) {
  return <span className={`badge ${className}`}> {formatPrice(price)} </span>;
}
