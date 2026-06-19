import { defineField, defineType } from "sanity";

export const productType = defineType({
  name: "product",
  title: "상품",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "상품명",
      type: "string",
      validation: (rule) => rule.required().min(2).max(80),
    }),
    defineField({
      name: "category",
      title: "분류",
      type: "string",
      options: {
        list: ["반지", "목걸이", "예물", "순금"],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "mainImage",
      title: "대표 사진",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "price",
      title: "판매 가격(원)",
      type: "number",
      description: "쉼표 없이 원 단위 숫자로 입력합니다.",
      validation: (rule) => rule.required().integer().min(0),
    }),
    defineField({
      name: "priceCheckedAt",
      title: "가격 확인일",
      type: "date",
      description: "14일이 지나면 사이트에서 자동으로 숨겨집니다.",
      options: { dateFormat: "YYYY-MM-DD" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "material",
      title: "소재·중량·옵션",
      type: "string",
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: "description",
      title: "짧은 소개",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(240),
    }),
    defineField({
      name: "sortOrder",
      title: "노출 순서",
      type: "number",
      initialValue: 100,
      validation: (rule) => rule.required().integer().min(0),
    }),
    defineField({
      name: "published",
      title: "사이트에 공개",
      type: "boolean",
      initialValue: false,
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: "노출 순서",
      name: "sortOrderAsc",
      by: [{ field: "sortOrder", direction: "asc" }],
    },
    {
      title: "가격 확인일 최신순",
      name: "priceCheckedAtDesc",
      by: [{ field: "priceCheckedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "category",
      media: "mainImage",
      published: "published",
      priceCheckedAt: "priceCheckedAt",
    },
    prepare({ title, subtitle, media, published, priceCheckedAt }) {
      return {
        title,
        subtitle: `${published ? "공개" : "비공개"} · ${subtitle} · 가격 확인 ${priceCheckedAt || "미입력"}`,
        media,
      };
    },
  },
});
