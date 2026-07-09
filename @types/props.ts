import { ICompany, TopOffer, IOffer, IPaginatedResponse } from "./interface"

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

export interface DashboardRecentCandidate {
    id: string
    candidateName: string
    candidateEmail: string
    appliedDate: string
    score: number
    status: string
}

export interface DashboardContentProps {
    statsData: { key: string; label: string; value: number }[]
    chartData: { month: string; value: number; label?: string }[]
    lineChartData: { month: string; value: number; label?: string }[]
    recentCandidates: DashboardRecentCandidate[]
    topOffers: TopOffer[]
    recentOffers: IOffer[]
}

export type AnnonceContentProps = {
    init: IPaginatedResponse<IOffer>
}