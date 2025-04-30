# Mission 2: MCP Madness

This is a Monad MCP server that allows you to query the real-time gas price of the Monad Testnet network. While Monad's testnet uses a fixed `gasPrice` of 52 gwei, this script aims to be adaptable for mainnet environments where gas prices fluctuate dynamically.

> ⚠️ **Disclaimer**: This is an experimental feature built as part of my learning journey with Monad.

As a novice, I developed the `get-gas-price` feature using the [monad-mcp-tutorial](https://github.com/monad-developers/monad-mcp-tutorial) as a reference.  
It's designed to fetch and log the current gas price.


## Features

- Get real-time gas price
- Easy integration with Claude Desktop

## Getting start 

1. Install dependencies:

```
npm install
```

2. Build the project

```shell
npm run build
```

The server is now ready to use!

### Adding the MCP server to Claude Desktop

1. Open "Claude Desktop"

![claude desktop](/monad-mcp-get-gasPrice/static/1.png)

2. Open Settings

Claude > Settings > Developer

![claude settings](/monad-mcp-get-gasPrice/static/claude_settings.gif)

3. Open `claude_desktop_config.json` 

![claude config](/monad-mcp-get-gasPrice/static/config.gif)

4. Add details about the MCP server and save the file.

```json
{
  "mcpServers": {
    ...
    "monad-mcp": {
      "command": "node",
      "args": [
        "/<path-to-project>/build/index.js"
      ]
    }
  }
}
```

5. Restart "Claude Desktop"

