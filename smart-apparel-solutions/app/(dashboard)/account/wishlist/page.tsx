
"use client";

import Link from "next/link";
import Image from "next/image";
import AccountPanel from "@/components/account/AccountPanel";
import { useWishlist } from "@/hooks/useWishlist";
import { products } from "@/data/products";
import { formatCurrency } from "@/lib/utils/helpers";
import { Heart, Trash2 } from "lucide-react";

export default function WishlistPage() {
  const { wishlist, remove } = useWishlist();

  const savedProducts = products.filter((product) =>
    wishlist.includes(product.id)
  );

  return (
    <AccountPanel
      title="Saved equipment"
      description="Your shortlist for the next workshop upgrade."
    >
      {savedProducts.length === 0 ? (
        <div className="page-card empty-state">
          <h2>Your shortlist is empty</h2>
          <p>Save machines while you compare specifications and pricing.</p>
          <Link href="/products" className="btn btn-primary">
            Browse equipment
          </Link>
        </div>
      ) : (
        <div className="wishlist-grid">
          {savedProducts.map((product) => (
            <article className="wishlist-item" key={product.id}>
              <Link href={`/products/${product.slug}`}>
                <div className="wishlist-image">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 200px"
                  />
                </div>
              </Link>

              <div className="wishlist-details">
                <p className="product-brand">{product.brand}</p>
                <h3>
                  <Link href={`/products/${product.slug}`}>
                    {product.name}
                  </Link>
                </h3>
                <strong>{formatCurrency(product.price)}</strong>
              </div>

              <button
                type="button"
                className="wishlist-remove"
                onClick={() => remove(product.id)}
                aria-label={`Remove ${product.name} from wishlist`}
              >
                <Trash2 size={18} />
              </button>
            </article>
          ))}
        </div>
      )}
    </AccountPanel>
  );
}
