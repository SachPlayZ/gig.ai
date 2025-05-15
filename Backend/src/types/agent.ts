export interface AgentCapabilities {
    estimated_efficiency: number;
    complexity_score: number;
    identified_skills: string[];
    identified_weaknesses: string[];
    potential_improvements: string[];
    overall_recommendations: string[];
    score?: number;
}

export interface Agent {
    id: string;
    capabilities: AgentCapabilities;
    code: string;
    metadata: Record<string, any>;
}

export interface AgentScore {
    agent_id: string;
    score: number;
}