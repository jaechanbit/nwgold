import {
  isPriceFresh,
  products as sampleProducts,
  type Product,
  type ProductCategory,
} from "../data/products";
import { isSanityConfigured, sanityClient, sanityImageUrl } from "./sanity";

interface SanityProduct {
  _id: string;
  name: string;
  category: ProductCategory;
  price: number;
  priceCheckedAt: string;
  mainImage: unknown;
  description: string;
  material: string;
}

const PRODUCT_QUERY = `
  *[_type == "product" && published == true]
  | order(sortOrder asc, _createdAt desc) {
    _id,
    name,
    category,
    price,
    priceCheckedAt,
    mainImage,
    description,
    material
  }
`;

export interface ProductContent {
  products: Product[];
  source: "sample" | "sanity";
}

export interface StoreContent {
  storeName: string;
  address: string;
  phone: string;
  businessHours: string;
  closedDays: string;
  temporaryNotice: string;
  kakaoUrl: string;
}

const defaultStoreContent: StoreContent = {
  storeName: "남원금방",
  address: "전북 남원시 의총로 100",
  phone: "063-626-9060",
  businessHours: "월~토 10:00~18:00",
  closedDays: "매주 일요일",
  temporaryNotice: "",
  kakaoUrl: "",
};

const STORE_QUERY = `
  *[_type == "storeSettings"][0] {
    storeName,
    address,
    phone,
    businessHours,
    closedDays,
    temporaryNotice,
    kakaoUrl
  }
`;

export async function getProductContent(): Promise<ProductContent> {
  if (!isSanityConfigured || !sanityClient) {
    return {
      products: sampleProducts.filter((product) => isPriceFresh(product.priceCheckedAt)),
      source: "sample",
    };
  }

  const documents = await sanityClient.fetch<SanityProduct[]>(PRODUCT_QUERY);
  const products = documents.flatMap<Product>((document) => {
    const image = sanityImageUrl(document.mainImage);
    if (!image || !isPriceFresh(document.priceCheckedAt)) return [];

    return [{
      id: document._id,
      name: document.name,
      category: document.category,
      price: document.price,
      priceCheckedAt: document.priceCheckedAt,
      image,
      description: document.description,
      material: document.material,
      isSample: false,
    }];
  });

  return { products, source: "sanity" };
}

export async function getStoreContent(): Promise<StoreContent> {
  if (!isSanityConfigured || !sanityClient) return defaultStoreContent;

  const document = await sanityClient.fetch<Partial<StoreContent> | null>(STORE_QUERY);
  if (!document) return defaultStoreContent;

  return {
    ...defaultStoreContent,
    ...Object.fromEntries(
      Object.entries(document).filter(([, value]) => typeof value === "string" && value.trim()),
    ),
  };
}
