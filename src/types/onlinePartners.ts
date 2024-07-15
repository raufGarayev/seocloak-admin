import { IGametype } from "./gametypes";
import { IHighlight } from "./highlights";

export interface IOnlinePartnersState {
    gameTypeId: number | null,
    onlinePartners: IOnlinePartner[],
    loading: boolean,
    selectedOnlinePartner: IOnlinePartner | null,
    selectedOnlinePartners: IOnlinePartner[]
}

export interface IOnlinePartner {
    id: number;
    partnerName: string;
    partnerLogo: string;
    rating: number;
    highlights: IHighlight[] | null;
    partnerUrl: string;
    bonusText: string;
    stars: number;
    isMobile: boolean;
    review: string;
    order: number;
    gametype: IGametype | number | null;
}