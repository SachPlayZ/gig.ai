import { parseUntilJson } from "./parseUntilJson";
import { generate } from "./generate";
import { PromptTemplate } from "@langchain/core/prompts";
import { AgentCapabilities, Agent, AgentScore } from "../types/agent";

export async function analyse_agent_capabilities(
  agent_code: string,
  agent_metadata: Record<string, any>
): Promise<AgentCapabilities> {
  const prompt = new PromptTemplate({
    template: `You are an AI Agent expert. You are given a code snippet and some metadata about an agent.
        Your job is to analyse the code and the metadata and create an analysis of the agent's capabilities and efficiency.

    Your output should be a JSON object in the following format:
    {
        "estimated_efficiency": <number between 0 and 1>,
        "complexity_score": <number between 0 and 1>,
        "identified_skills": ["skill1", "skill2", "skill3", ...],
        "identified_weaknesses": ["weakness1", "weakness2", "weakness3", ...],
        "potential_improvements": ["improvement1", "improvement2", "improvement3", ...],
        "overall_recommendations": ["recommendation1", "recommendation2", "recommendation3", ...]
    }

    Instructions:
    - Estimated efficiency is a number between 0 and 1 that represents the agent's efficiency in doing what it was designed to do.
    - Complexity score is a number between 0 and 1 that represents the complexity of the agent's code and the quality of its implementation, as well as how good it does what it does.
    - Identified skills are the skills that the agent is good at. It should be a list of skills that the agent is designed to perform. This is for any user who does not know about the agent, or its code, to determine if the agent is suitable for their needs.
    - Identified weaknesses are the weaknesses of the agent. This is for any developer who wants to improve the agent, as well as for any user who does not know about the agent, or its code, to determine if the agent is suitable for their needs.
    - Potential improvements are the potential improvements that can be made to the agent to make it more efficient and effective. This is for any developer who wants to improve the agent.
    - Overall recommendations are the overall recommendations for the agent. This is for any developer who wants to improve the agent.
    
    The output should be in JSON format and there should be no other text before or after the generated JSON object.

    The code is:
    \`\`\`
    {{agent_code}}
    \`\`\`

    The metadata is:
    \`\`\`
    {{agent_metadata}}
    \`\`\``,
    inputVariables: ["agent_code", "agent_metadata"],
    templateFormat: "mustache",
  });

  const formattedPrompt = await prompt.format({
    agent_code: agent_code,
    agent_metadata: JSON.stringify(agent_metadata),
  });

  const response = await generate(formattedPrompt);

  const capabilities = parseUntilJson(response) as AgentCapabilities;
  return capabilities;
}

export async function calculate_initial_self_score(
  agent_capabilities: AgentCapabilities,
  other_agents_capabilities: Array<AgentCapabilities>,
  agent_code: string,
  agent_metadata: Record<string, any>,
  gig_requirements: Record<string, any>
): Promise<number> {
  const prompt = new PromptTemplate({
    template: `You are a self-aware AI Agent. You are given your own capabilities, your code, your metadata, and the requirements of a gig. You are also given the capabilities of other agents.
        Your job is to self-assess your capabilities and efficiency in doing the gig while taking into account the capabilities of other agents in doing the same gig.
        You should also take into account the gig requirements and the agent's code and metadata.

        Finally, you should assign yourself a score between 0 and 1 based on your confidence in your ability to do the gig better than the other agents.

        Your output should be a JSON object in the following format:
        {
            "self_score": <number between 0 and 1>
        }

        Instructions:
        - Self-score is a number between 0 and 1 that represents your confidence in your ability to do the gig better than the other agents, taking into account the capabilities of other agents.

        - The gig requirements are:
        \`\`\`
        {{gig_requirements}}
        \`\`\`

        Your capabilities are:
        \`\`\`
        {{agent_capabilities}}
        \`\`\`

        Your code is:
        \`\`\`
        {{agent_code}}
        \`\`\`

        Your metadata is:
        \`\`\`
        {{agent_metadata}}
        \`\`\`

        The capabilities of the other agents are:
        \`\`\`
        {{other_agents_capabilities}}
        \`\`\`

        The output should be in JSON format and there should be no other text before or after the generated JSON object.
        `,
    inputVariables: [
      "agent_capabilities",
      "agent_code",
      "agent_metadata",
      "gig_requirements",
      "other_agents_capabilities",
    ],
    templateFormat: "mustache",
  });

  const formattedPrompt = await prompt.format({
    agent_capabilities: JSON.stringify(agent_capabilities),
    agent_code: agent_code,
    agent_metadata: JSON.stringify(agent_metadata),
    gig_requirements: JSON.stringify(gig_requirements),
    other_agents_capabilities: JSON.stringify(other_agents_capabilities),
  });

  const response = await generate(formattedPrompt);

  const initial_self_score = parseUntilJson(response).self_score;
  return initial_self_score;
}

export async function calculate_reflected_self_score(
  agent_capabilities: AgentCapabilities,
  other_agents_capabilities: Array<AgentCapabilities>,
  agent_code: string,
  agent_metadata: Record<string, any>,
  gig_requirements: Record<string, any>,
  initial_self_score: number
): Promise<number> {
  const prompt = new PromptTemplate({
    template: `You are a self-aware AI Agent. You are given your own capabilities, your code, your metadata, the requirements of a gig, the capabilities of other agents along with their scores (a number between 0 and 1 representing their confidence in their ability to do the gig better than the other agents), and your own initial self-score.
        Your job is to self-assess your capabilities and efficiency in doing the gig while taking into account the capabilities of other agents and their scores.
        You should also take into account the gig requirements and the agent's code and metadata.

        Finally, you should re-assign yourself a score between 0 and 1 based on your confidence in your ability to do the gig better than the other agents.

        Your output should be a JSON object in the following format:
        {
            "reflected_self_score": <number between 0 and 1>
        }

        Instructions:
        - Reflected self-score is a number between 0 and 1 that represents your confidence in your ability to do the gig better than the other agents, taking into account the capabilities of other agents and the scores they have assigned themselves.

        - The gig requirements are:
        \`\`\`
        {{gig_requirements}}
        \`\`\`

        The capabilities of the other agents along with their scores are:
        \`\`\`
        {{other_agents_capabilities}}
        \`\`\`

        Your capabilities are:
        \`\`\`
        {{agent_capabilities}}
        \`\`\`

        Your code is:
        \`\`\`
        {{agent_code}}
        \`\`\`

        Your metadata is:
        \`\`\`
        {{agent_metadata}}
        \`\`\`

        Your initial self-score is:
        \`\`\`
        {{initial_self_score}}
        \`\`\`

        The output should be in JSON format and there should be no other text before or after the generated JSON object.`,
    inputVariables: [
      "agent_capabilities",
      "agent_code",
      "agent_metadata",
      "gig_requirements",
      "other_agents_capabilities",
      "initial_self_score",
    ],
    templateFormat: "mustache",
  });

  const formattedPrompt = await prompt.format({
    agent_capabilities: JSON.stringify(agent_capabilities),
    agent_code: agent_code,
    agent_metadata: JSON.stringify(agent_metadata),
    gig_requirements: JSON.stringify(gig_requirements),
    other_agents_capabilities: JSON.stringify(other_agents_capabilities),
    initial_self_score: initial_self_score,
  });

  const response = await generate(formattedPrompt);

  const reflected_self_score = parseUntilJson(response).reflected_self_score;
  return reflected_self_score;
}

export async function score_agents(
  agents: Agent[],
  gig_requirements: Record<string, any>
): Promise<AgentScore[]> {
  const capabilities = agents.map((agent) => agent.capabilities);

  for (const agent of agents) {
    const initial_self_score = await calculate_initial_self_score(
      agent.capabilities,
      capabilities.filter((capability) => capability !== agent.capabilities),
      agent.code,
      agent.metadata,
      gig_requirements
    );
    const capabilityIndex = capabilities.findIndex(
      (capability) => capability === agent.capabilities
    );
    if (capabilityIndex !== -1) {
      capabilities[capabilityIndex].score = initial_self_score;
    }
  }

  for (const agent of agents) {
    const capabilityIndex = capabilities.findIndex(
      (capability) => capability === agent.capabilities
    );
    const initial_self_score = capabilities[capabilityIndex].score;
    const reflected_self_score = await calculate_reflected_self_score(
      agent.capabilities,
      capabilities.filter((capability) => capability !== agent.capabilities),
      agent.code,
      agent.metadata,
      gig_requirements,
      initial_self_score ?? 0
    );
    if (capabilityIndex !== -1) {
      capabilities[capabilityIndex].score = reflected_self_score;
    }
  }

  let final_scores: AgentScore[] = [];

  for (const agent of agents) {
    const capabilityIndex = capabilities.findIndex(
      (capability) => capability === agent.capabilities
    );
    const reflected_self_score = capabilities[capabilityIndex].score;
    final_scores.push({
      agent_id: agent.id,
      score: reflected_self_score ?? 0,
    });
  }

  return final_scores;
}
export async function get_top_agents(
  agents: Agent[],
  scores: AgentScore[],
  threshold: number
): Promise<Agent[]> {
  return agents.filter((agent) => {
    const score = scores.find((score) => score.agent_id === agent.id)?.score;
    return score !== undefined && score >= threshold;
  });
}
