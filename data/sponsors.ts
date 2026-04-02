/**
 * Static sponsor listings (Cloudinary public IDs under `image`).
 * Import in server or client components as needed.
 */

/** Single location, or multiple when a sponsor has more than one. */
export type SponsorItem = {
  name: string;
  /** Cloudinary public ID, e.g. "mcss/sponsors/bistro_japonais_furusato" */
  image: string;
  discount: string;
} & ({ address: string } | { addresses: string[] });

/** Normalize to a list for rendering (one or many lines). */
export function sponsorAddresses(item: SponsorItem): string[] {
  return "addresses" in item ? item.addresses : [item.address];
}

export type SponsorCategory = {
  span: string;
  items: SponsorItem[];
};

export const sponsors: Record<string, SponsorCategory> = {
  Restaurants: {
    span: "Restaurants",
    items: [
      {
          name: "Bistro Japonais Furusato",
          image: "mcss/sponsors/bistro_japonais_furusato",
          discount: "10% off, except nabemono and sushi",
          address: "1265 Rue Beaubien E"
      },
      {
          name: "Cafe Noya",
          image: "mcss/sponsors/cafe_noya",
          discount: "15% off",
          address: "2053 Peel St"
      },
      {
          name: "Canada Best",
          image: "mcss/sponsors/canada_best",
          discount: "15% off + 1 drink",
          address: "997 Av. Ogilvy"
      },
      {
          name: "Cup Montreal",
          image: "mcss/sponsors/cup_montreal",
          discount: "15% off",
          address: "404 Av. Duluth E"
      },
      {
          name: "DONDONYA",
          image: "mcss/sponsors/dondonya",
          discount: "10% off",
          address: "1433A Bishop Street"
      },
      {
          name: "Foofoo noodz",
          image: "mcss/sponsors/foofoo_noodz",
          discount: "10% off",
          address: "6565 Av. Somerled"
      },
      {
          name: "Krapow",
          image: "mcss/sponsors/krapow",
          discount: "10% off",
          address: "4449 Mentana St"
      },
      {
          name: "Restaurant Phoenix Oriental",
          image: "mcss/sponsors/phoenix_oriental",
          discount: "10% off",
          address: "7230 Bd Maurice-Duplessis"
      },
      {
          name: "Restaurant Pinophyta",
          image: "mcss/sponsors/pinophyta",
          discount: "10% off",
          address: "1186 Av. Union"
      },
      {
          name: "Mai Thai Cuisine",
          image: "mcss/sponsors/mai_thai_cuisine",
          discount: "10% off",
          address: "1743 R. Saint-Denis"
      },
      {
          name: "Nos Thés (Ste-Cath/Guy)",
          image: "mcss/sponsors/nos_thes",
          discount: "10% off",
          address: "1609 Saint-Catherine St W"
      },
      {
          name: "Pho Anh",
          image: "mcss/sponsors/pho_anh",
          discount: "10% off",
          address: "1765 R. Saint Denis"
      },
      {
          name: "Ramen Isshin (all locations)",
          image: "mcss/sponsors/ramen_isshin",
          discount: "15% off",
          addresses: [
              "1861 Rue Sainte-Catherine O",
              "1217 Mont-Royal Ave E",
              "3876 Wellington St"
          ]
      },
      {
          name: "Satu Lagi",
          image: "mcss/sponsors/satu_lagi",
          discount: "10% off",
          address: "1361 Mont-Royal Ave E"
      },
      {
          name: "Yen Cuisine Japonaise",
          image: "mcss/sponsors/yen_cuisine_japonaise",
          discount: "10% off",
          address: "2157 Mackay St"
      },
      {
          name: "Délicieux Mei Mei",
          image: "mcss/sponsors/mei_mei",
          discount: "10% off card, 15% off cash",
          address: "2188 Rue Ste-Catherine O"
      },
      {
          name: "Le Restaurant Dumpling Shop",
          image: "mcss/sponsors/dumpling_shop",
          discount: "10% off",
          address: "3575 Park Ave"
      },
      {
          name: "Sansotei Ramen",
          image: "mcss/sponsors/sansotei_ramen_sm",
          discount: "10% off",
          addresses: [
              "370 Saint-Catherine St W",
              "1453 Saint-Catherine St W"
          ]
      },
    ],
  },
  "Drinks & Desserts": {
        span: "Drinks & Desserts",
        items: [
            {
                name: "Tsujiri",
                image: "mcss/sponsors/tsujiri",
                discount: "10% off except retail products & whole cakes",
                address: "1418 Rue Crescent"
            },
            {
                name: "Charyu tea house",
                image: "mcss/sponsors/charyu_tea_house",
                discount: "10% off on tea bags",
                address: "6872 Rue St-Hubert"
            },
            {
                name: "La Muse (Lincoln Ave)",
                image: "mcss/sponsors/la_muse",
                discount: "Free drinks during happy hour",
                address: "1608 Av. Lincoln"
            },
            {
                name: "Lakafe",
                image: "mcss/sponsors/lakafe",
                discount: "10% off",
                address: "2115 Boul. Saint-Laurent"
            },
            {
                name: "Matcha Zanmai",
                image: "mcss/sponsors/matcha_zanmai_sm",
                discount: "10% off",
                address: "1428 Mackay St"
            },
            {
                name: "OCHA (Ste-Cath W)",
                image: "mcss/sponsors/ocha",
                discount: "15% off",
                address: "1651 Rue Ste-Catherine O"
            },
            {
                name: "Oishi Bar à Matcha chain",
                image: "mcss/sponsors/oishi_bar_matcha",
                discount: "10% off foods and drinks",
                address: "1289 Rue Beaubien E"
            },
            {
                name: "Pâtisserie Amaïro",
                image: "mcss/sponsors/patisserie_amairo",
                discount: "10% off (1 cake + 1 drink)",
                address: "3911 Rue Saint-Jacques"
            },
            {
                name: "Pâtisserie Bao Bao Dim Sum",
                image: "mcss/sponsors/patisserie_bao_bao_dim_sum",
                discount: "10% off",
                address: "83 Rue De la Gauchetiere O"
            },
            {
                name: "Pâtisserie Bervig Inc.",
                image: "mcss/sponsors/patisserie_bervig_inc",
                discount: "10% off",
                address: "33 R. Notre Dame O"
            },
            {
                name: "San-O Brasserie",
                image: "mcss/sponsors/san_o_brasserie",
                discount: "10% off",
                address: "1350 Rue Mazurette Unit 104"
            },
            {
                name: "#Teashop",
                image: "mcss/sponsors/teashop",
                discount: "20% off",
                address: "52C Rue De la Gauchetiere O"
            },
            {
                name: "Thes Guru Store",
                image: "mcss/sponsors/thes_guru_store",
                discount: "10% off on loose-leaf teas",
                address: "1289 Rue Beaubien E"
            },
        ]
    }
};

/** Logos in the membership card grid (first N across all categories; avoids loading every asset). */
export const MEMBERSHIP_CARD_SPONSOR_PREVIEW_COUNT = 15;

const allSponsorItemsOrdered: SponsorItem[] = Object.values(sponsors).flatMap(
  (c) => c.items,
);

export const sponsorTotalCount = allSponsorItemsOrdered.length;

export const sponsorPreviewForMembershipCard: SponsorItem[] =
  allSponsorItemsOrdered.slice(0, MEMBERSHIP_CARD_SPONSOR_PREVIEW_COUNT);
