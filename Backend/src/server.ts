import express, { Request, Response } from "express";
import morgan from "morgan";
import {
  analyse_agent_capabilities,
  get_top_agents,
  score_agents,
} from "./utils/functions";
import { Agent, AgentScore } from "./types/agent";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.post("/analyse", async (req: Request, res: Response) => {
  const { agent_code, agent_metadata } = req.body;
  console.log(agent_code, agent_metadata);
  const analysis = await analyse_agent_capabilities(agent_code, agent_metadata);
  res.json(analysis);
});

app.post("/score", async (req: Request, res: Response) => {
  const {
    agents,
    gig_requirements,
  }: { agents: Agent[]; gig_requirements: Record<string, any> } = req.body;
  const scores: AgentScore[] = await score_agents(agents, gig_requirements);
  res.json(scores);
});

app.post("/top-agents", async (req: Request, res: Response) => {
  const {
    agents,
    gig_requirements,
  }: { agents: Agent[]; gig_requirements: Record<string, any> } = req.body;
  const scores: AgentScore[] = await score_agents(agents, gig_requirements);
  const top_agents: Agent[] = await get_top_agents(agents, scores, 0.7);
  res.json(top_agents);
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
