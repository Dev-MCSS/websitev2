/** Current membership sponsors, in the order supplied by MCSS. */
export type SponsorItem = {
  name: string;
  /** Cloudinary public ID. */
  image: string;
  discount: string;
} & ({ address: string } | { addresses: string[] });
export function sponsorAddresses(item: SponsorItem): string[] {
  return "addresses" in item ? item.addresses : [item.address];
}
export type SponsorCategory = { span: string; items: SponsorItem[] };
export const sponsors: Record<string, SponsorCategory> = {
  Restaurants: { span: "Restaurants", items: [
    { name: "Tsujiri", image: "mcss/sponsors/tsujiri", discount: "10% off", address: "1418 Rue Crescent, Montréal, QC" },
    { name: "Yen Cuisine Japonaise", image: "mcss/sponsors/yen_cuisine_japonaise", discount: "10% off", address: "2157 Rue Mackay, Montréal, QC" },
    { name: "San-O Brasserie", image: "mcss/sponsors/san_o_brasserie", discount: "10% off, excluding alcohol", address: "1350 Rue Mazurette, Unit 104, Montréal, QC" },
    { name: "Charyū Tea House", image: "mcss/sponsors/charyu_tea_house", discount: "10% off", address: "6872 Rue Saint-Hubert, Montréal, QC" },
    { name: "Thés Guru Store", image: "mcss/sponsors/thes_guru_store", discount: "10% off", address: "1289 Rue Beaubien E, Montréal, QC" },
    { name: "Mai Thai Cuisine", image: "mcss/sponsors/mai_thai_cuisine", discount: "12% off", address: "1743 Rue Saint-Denis, Montréal, QC" },
    { name: "Restaurant Pinophyta", image: "mcss/sponsors/pinophyta", discount: "10% off", address: "1186 Avenue Union, Montréal, QC" },
    { name: "Onigiri Shop Concordia", image: "mcss/sponsors/onigiri_shop_concordia", discount: "15% off", address: "2285 Rue Saint-Mathieu, Suite 105, Montréal, QC" },
    { name: "Le Restaurant Dumpling Shop", image: "mcss/sponsors/dumpling_shop", discount: "15% off", address: "3575 Avenue du Parc, Montréal, QC" },
    { name: "Oh Dumplings Express Concordia", image: "mcss/sponsors/oh_dumplings_express_concordia", discount: "15% off and a free canned drink", address: "2065B Rue Bishop, Montréal, QC" },
    { name: "New Oriental", image: "mcss/sponsors/new_oriental", discount: "10% off", address: "2350 Rue Guy, Montréal, QC" },
    { name: "Nouilles Zhonghua", image: "mcss/sponsors/nouilles_zhonghua", discount: "10% off", address: "908 Rue Sherbrooke O, Montréal, QC" },
    { name: "DONDONYA", image: "mcss/sponsors/dondonya", discount: "10% off", address: "1433A Rue Bishop, Montréal, QC" },
    { name: "Cuisine Formosa", image: "mcss/sponsors/cuisine_formosa", discount: "10% off", address: "2230 Rue Guy, Montréal, QC" },
    { name: "#Tea Shop", image: "mcss/sponsors/teashop", discount: "10% off by card, 20% off with cash", address: "52C Rue De la Gauchetière O, Montréal, QC" },
    { name: "MajesThé", image: "mcss/sponsors/majesthe", discount: "10% off", address: "575 Boulevard de Maisonneuve O, Montréal, QC" },
    { name: "Café Noya", image: "mcss/sponsors/cafe_noya", discount: "15% off", address: "2053 Rue Peel, Montréal, QC" },
    { name: "Accio Cup", image: "mcss/sponsors/accio_cup", discount: "10% off", address: "2155 Rue Mackay, Montréal, QC" },
  ] },
  Others: { span: "Others", items: [
    { name: "Salon Rium", image: "mcss/sponsors/salon_rium", discount: "5% off haircuts, 10% off other services", address: "570 Avenue du Président-Kennedy, Montréal, QC" },
    { name: "Marché Newon Downtown", image: "mcss/sponsors/marche_newon_downtown", discount: "10% off, except milk, yogurt, eggs, bread, rice, discounted items, and weekly specials", address: "1616 Rue Sainte-Catherine O, Suite 302, Montréal, QC" },
  ] },
};
export const MEMBERSHIP_CARD_SPONSOR_PREVIEW_COUNT = 5;
const allSponsorItemsOrdered = Object.values(sponsors).flatMap((category) => category.items);
export const sponsorTotalCount = allSponsorItemsOrdered.length;
export const sponsorPreviewForMembershipCard = allSponsorItemsOrdered.slice(0, MEMBERSHIP_CARD_SPONSOR_PREVIEW_COUNT);
