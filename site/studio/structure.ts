import type { StructureResolver } from "sanity/structure";

const PRICE_VALID_DAYS = 14;

export const structure: StructureResolver = (S) => {
  const cutoff = new Date(Date.now() - PRICE_VALID_DAYS * 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10);

  return S.list()
    .title("남원금방 관리")
    .items([
      S.listItem()
        .title("가격 확인 필요")
        .child(
          S.documentList()
            .title("가격 확인 필요")
            .schemaType("product")
            .filter('_type == "product" && (!defined(priceCheckedAt) || priceCheckedAt < $cutoff)')
            .params({ cutoff })
            .defaultOrdering([{ field: "priceCheckedAt", direction: "asc" }]),
        ),
      S.listItem()
        .title("공개 상품")
        .child(
          S.documentList()
            .title("공개 상품")
            .schemaType("product")
            .filter('_type == "product" && published == true')
            .defaultOrdering([{ field: "sortOrder", direction: "asc" }]),
        ),
      S.documentTypeListItem("product").title("전체 상품"),
      S.divider(),
      S.listItem()
        .title("점포 정보")
        .child(
          S.document()
            .schemaType("storeSettings")
            .documentId("storeSettings")
            .title("점포 정보"),
        ),
    ]);
};
