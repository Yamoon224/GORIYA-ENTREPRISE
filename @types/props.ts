import { ICompany, TopOffer, IOffer, ICandidate, IPaginatedResponse } from "./interface"

export interface SignupStepperProps {
    currentStep: number
    steps: string[]
}

export interface ProfilContentProps {
    company: ICompany
}

export interface PosterOffreContentProps {
    companyId: string
}

export interface DashboardContentProps {
    statsData: { label: string; value: string; icon: any; color: string }[]
    chartData: { name: string; value: number }[]
    lineChartData: { name: string; value: number }[]
    recentCandidates: ICandidate[]
    topOffers: TopOffer[]
    recentOffers: IOffer[]
}

export type AnnonceContentProps = {
    init: IPaginatedResponse<IOffer>
    token: string
}