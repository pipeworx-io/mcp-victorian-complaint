interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
}

/**
 * victorian-complaint MCP — wraps StupidAPIs (requires X-API-Key)
 *
 * Any complaint, maximum Victorian indignation. The wifi being slow has never been
 */


const API_KEY = '6e0ddbe88486dc354370290979829dc892b0386bd789ae5a';

const tools: McpToolExport['tools'] = [
  {
    name: 'victorian_complaint_generate',
    description: 'Any complaint, maximum Victorian indignation. The wifi being slow has never been taken more seriously.',
    inputSchema: {
      type: 'object' as const,
      properties: {"complaint": {"type": "string"}, "recipient": {"type": "string"}, "indignation": {"type": "string", "enum": ["mild", "considerable", "severe", "maximum"]}, "complaint_type": {"type": "string", "enum": ["service", "neighbor", "technology", "food", "abstract", "government"]}, "length": {"type": "string", "enum": ["brief", "standard", "excessive"]}},
      required: ["complaint"],
    },
  },
];

async function callApi(url: string, args: Record<string, unknown>): Promise<unknown> {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(args)) {
    if (v !== undefined && v !== null && v !== '') {
      params.set(k, String(v));
    }
  }
  const fullUrl = params.toString() ? url + '?' + params.toString() : url;
  const res = await fetch(fullUrl, {
    headers: { 'X-API-Key': API_KEY },
  });
  if (!res.ok) throw new Error('victorian-complaint API error: ' + res.status);
  return res.json();
}

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case 'victorian_complaint_generate':
      return callApi('https://api.stupidapis.com/victorian-complaint/generate', args);
    default:
      throw new Error('Unknown tool: ' + name);
  }
}

export default { tools, callTool } satisfies McpToolExport;
