export interface ChapterConfig {
  index: number;
  id: string;
  label: string;
  numeral: string;
  headline: string;
  subline?: string;
  videoDuration: number; // seconds
  videoUrl: string | null; // null = static image only
  staticImage: string;
  pinHeightVh: number;
  breather?: {
    stat: string;
    label: string;
  };
}

export const CHAPTERS: ChapterConfig[] = [
  {
    index: 0,
    id: "dawn",
    label: "Dawn",
    numeral: "01",
    headline: "Engineered for reality.",
    videoDuration: 8,
    videoUrl:
      "https://d8j0ntlcm91z4.cloudfront.net/user_3GSk4Z8RmdvNGsBlVgLkC7JLui6/hf_20260827_021140_19f014b4-425c-4e07-a138-1cf287f4148b.mp4",
    staticImage:
      "https://d8j0ntlcm91z4.cloudfront.net/user_3GSk4Z8RmdvNGsBlVgLkC7JLui6/hf_20260827_020819_2761accf-9f65-4080-b1b7-785444e1a9e7.png",
    pinHeightVh: 200,
    breather: {
      stat: "14 DAYS",
      label: "Average time from napkin sketch to working prototype.",
    },
  },
  {
    index: 1,
    id: "arrival",
    label: "Arrival",
    numeral: "02",
    headline: "But first, the concept.",
    videoDuration: 8,
    videoUrl:
      "https://d8j0ntlcm91z4.cloudfront.net/user_3GSk4Z8RmdvNGsBlVgLkC7JLui6/hf_20260827_021142_154bd21c-b6a3-4e36-bfa4-58b9a329c6ba.mp4",
    staticImage:
      "https://d8j0ntlcm91z4.cloudfront.net/user_3GSk4Z8RmdvNGsBlVgLkC7JLui6/hf_20260827_020819_fb558005-a208-41df-8782-8a658e8c70fa.png",
    pinHeightVh: 150,
  },
  {
    index: 2,
    id: "thework",
    label: "The Work",
    numeral: "03",
    headline: "Digital infrastructure.\nPhysical prototyping.\nRapid iteration.",
    videoDuration: 15,
    videoUrl:
      "https://d8j0ntlcm91z4.cloudfront.net/user_3GSk4Z8RmdvNGsBlVgLkC7JLui6/hf_20260827_021143_495e3c13-5c86-4024-b886-9ba4ae52fdf7.mp4",
    staticImage:
      "https://d8j0ntlcm91z4.cloudfront.net/user_3GSk4Z8RmdvNGsBlVgLkC7JLui6/hf_20260827_020820_fbc665f7-7f31-4bcb-8e4c-e07545f8ec31.png",
    pinHeightVh: 300,
  },
  {
    index: 3,
    id: "reveal",
    label: "The Reveal",
    numeral: "04",
    headline: "The physical proof of concept.",
    videoDuration: 10,
    videoUrl:
      "https://d8j0ntlcm91z4.cloudfront.net/user_3GSk4Z8RmdvNGsBlVgLkC7JLui6/hf_20260827_021144_93e2bedb-9346-493f-8b3d-d1252843258d.mp4",
    staticImage:
      "https://d8j0ntlcm91z4.cloudfront.net/user_3GSk4Z8RmdvNGsBlVgLkC7JLui6/hf_20260827_020821_bfca665c-ad93-455a-b2c6-cad6c08fe161.png",
    pinHeightVh: 200,
  },
  {
    index: 4,
    id: "dusk",
    label: "Dusk",
    numeral: "05",
    headline: "Your vision has a blueprint.\nLet's build it.",
    videoDuration: 10,
    videoUrl:
      "https://d8j0ntlcm91z4.cloudfront.net/user_3GSk4Z8RmdvNGsBlVgLkC7JLui6/hf_20260827_021145_a62f1706-322d-4f77-bbb3-b25d88bbbe70.mp4",
    staticImage:
      "https://d8j0ntlcm91z4.cloudfront.net/user_3GSk4Z8RmdvNGsBlVgLkC7JLui6/hf_20260827_020822_0a63ea0e-3229-4eba-90b4-c3feba79d91f.png",
    pinHeightVh: 250,
  },
];
