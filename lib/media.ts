const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;

export const CLOUD_VIDEO = {
  background: "video_background_eqbycq",
} as const;

export const CLOUD_IMAGE = {
  permaculture: "image_agriculture_copguj",
  aquaculture: "image_fishes_nadfnx",
  accommodation: "image_accomodation_g0bhuo",
  freshFood: "image_food_gmkvm6",
  education: "image_children_sc28mb",
  drawnLake: "image_drawn_lake_yignkr",
  strongholdIcon: "icon_stronghold_qnzpvi",
} as const;

export type CloudVideoId = (typeof CLOUD_VIDEO)[keyof typeof CLOUD_VIDEO];
export type CloudImageId = (typeof CLOUD_IMAGE)[keyof typeof CLOUD_IMAGE];

export function buildVideoUrl(
  publicId: string,
  transformations = "q_auto:good,w_1920",
  extension = "mp4",
) {
  return `https://res.cloudinary.com/${CLOUD}/video/upload/${transformations}/${publicId}.${extension}`;
}
