import ringImage from "../assets/product-ring.png";
import necklaceImage from "../assets/product-necklace.png";
import weddingImage from "../assets/product-wedding.png";
import braceletImage from "../assets/product-bracelet.png";
import medallionImage from "../assets/product-medallion.png";

export type ProductCategory = "반지" | "목걸이" | "예물" | "순금";

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  priceCheckedAt: string;
  image: ImageMetadata;
  description: string;
  material: string;
}

export const products: Product[] = [
  {
    id: "sample-ring",
    name: "화이트골드 솔리테어 반지",
    category: "반지",
    price: 880000,
    priceCheckedAt: "2026-06-18",
    image: ringImage,
    description: "단정한 여섯 발 세팅으로 빛을 또렷하게 살린 클래식 반지입니다.",
    material: "화이트골드 · 큐빅 0.3ct",
  },
  {
    id: "sample-necklace",
    name: "14K 원포인트 목걸이",
    category: "목걸이",
    price: 430000,
    priceCheckedAt: "2026-06-18",
    image: necklaceImage,
    description: "매일 편안하게 착용하기 좋은 작은 원포인트 목걸이입니다.",
    material: "14K 골드 · 큐빅",
  },
  {
    id: "sample-wedding",
    name: "14K 커플 웨딩밴드",
    category: "예물",
    price: 1280000,
    priceCheckedAt: "2026-06-18",
    image: weddingImage,
    description: "잔잔한 망치 질감이 손끝의 온기를 담아내는 한 쌍의 밴드입니다.",
    material: "14K 로즈골드 · 2개 세트",
  },
  {
    id: "sample-bracelet",
    name: "순금 체인 팔찌",
    category: "순금",
    price: 1210000,
    priceCheckedAt: "2026-06-18",
    image: braceletImage,
    description: "묵직한 체인 결을 정교하게 다듬은 순금 팔찌입니다.",
    material: "순금 24K · 11.25g",
  },
  {
    id: "sample-medallion",
    name: "순금 플라워 메달",
    category: "순금",
    price: 465000,
    priceCheckedAt: "2026-06-18",
    image: medallionImage,
    description: "차분한 꽃 문양을 새긴 선물용 순금 메달입니다.",
    material: "순금 24K · 3.75g",
  },
];

export const isPriceFresh = (checkedAt: string, now = new Date()) => {
  const checked = new Date(`${checkedAt}T00:00:00+09:00`);
  const age = now.getTime() - checked.getTime();
  return age <= 14 * 24 * 60 * 60 * 1000;
};

export const formatPrice = (price: number) => `${price.toLocaleString("ko-KR")}원`;

export const formatCheckedAt = (date: string) => date.replaceAll("-", ".");
