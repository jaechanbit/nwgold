import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID?.trim();
const dataset = import.meta.env.PUBLIC_SANITY_DATASET?.trim() || "production";

export const isSanityConfigured = Boolean(projectId);

export const sanityClient = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion: "2026-06-19",
      useCdn: true,
    })
  : null;

const imageBuilder = projectId ? createImageUrlBuilder({ projectId, dataset }) : null;

export const sanityImageUrl = (source: unknown) => {
  if (!imageBuilder || !source) return null;
  return imageBuilder
    .image(source)
    .width(900)
    .height(900)
    .fit("crop")
    .auto("format")
    .url();
};
