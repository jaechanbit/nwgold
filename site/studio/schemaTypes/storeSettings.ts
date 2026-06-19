import { defineField, defineType } from "sanity";

export const storeSettingsType = defineType({
  name: "storeSettings",
  title: "점포 정보",
  type: "document",
  fields: [
    defineField({ name: "storeName", title: "점포명", type: "string", initialValue: "남원금방", validation: (rule) => rule.required() }),
    defineField({ name: "address", title: "주소", type: "string", initialValue: "전북 남원시 의총로 100", validation: (rule) => rule.required() }),
    defineField({ name: "phone", title: "전화번호", type: "string", initialValue: "063-626-9060", validation: (rule) => rule.required() }),
    defineField({ name: "businessHours", title: "영업시간", type: "string", initialValue: "월~토 10:00~18:00", validation: (rule) => rule.required() }),
    defineField({ name: "closedDays", title: "정기 휴무", type: "string", initialValue: "매주 일요일", validation: (rule) => rule.required() }),
    defineField({ name: "temporaryNotice", title: "임시 공지", type: "text", rows: 3 }),
    defineField({ name: "kakaoUrl", title: "카카오톡 채널 링크", type: "url" }),
  ],
  preview: {
    select: { title: "storeName", subtitle: "businessHours" },
  },
});
