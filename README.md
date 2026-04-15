# mcp-victorian-complaint

victorian-complaint MCP — wraps StupidAPIs (requires X-API-Key)

Part of the [Pipeworx](https://pipeworx.io) open MCP gateway.

## Tools

| Tool | Description |
|------|-------------|
| `victorian_complaint_generate` | Any complaint, maximum Victorian indignation. The wifi being slow has never been taken more seriously. |

## Quick Start

Add to your MCP client config:

```json
{
  "mcpServers": {
    "victorian-complaint": {
      "url": "https://gateway.pipeworx.io/victorian-complaint/mcp"
    }
  }
}
```

Or use the CLI:

```bash
npx pipeworx use victorian-complaint
```

## License

MIT
