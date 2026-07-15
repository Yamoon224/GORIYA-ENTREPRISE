import { apiRequest } from "@/lib/api-client-http"

export interface ICandidateAssessment {
    id: string
    candidatureId: string
    technicalScore: number | null
    softSkillsScore: number | null
    culturalFitScore: number | null
    overallScore: number | null
    skillsTest: { question: string; type: "TECHNIQUE" | "COMPORTEMENTAL" }[] | null
    softSkillsFeedback: string | null
    reportPath: string | null
    status: "PENDING" | "COMPLETED" | "FAILED"
    createdAt: string
}

export interface ICandidateRanking {
    name: string
    rank: number
    reason: string
}

export const candidateAssessmentService = {
    generate: async (candidatureId: string, exchangeNotes?: string) => {
        return apiRequest<ICandidateAssessment>({
            endpoint: `/candidatures/${candidatureId}/assessment`,
            method: "POST",
            data: exchangeNotes ? { exchangeNotes } : undefined,
        })
    },

    get: async (candidatureId: string) => {
        return apiRequest<ICandidateAssessment>({
            endpoint: `/candidatures/${candidatureId}/assessment`,
            method: "GET",
        })
    },

    // Le rapport .docx est streamé (Content-Disposition: attachment) — pas de
    // JSON à parser, donc pas d'appel via apiRequest : un lien <a> vers le
    // proxy interne suffit (le navigateur suit la redirection avec les
    // cookies de session déjà en place).
    reportUrl: (candidatureId: string) => `/api/proxy/candidatures/${candidatureId}/assessment/report`,

    compareForJobOffer: async (jobOfferId: string) => {
        return apiRequest<ICandidateRanking[]>({
            endpoint: `/job-offers/${jobOfferId}/candidate-assessments/compare`,
            method: "GET",
        })
    },
}
