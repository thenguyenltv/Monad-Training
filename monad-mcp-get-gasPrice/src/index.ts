/**
 * Monad MCP Tutorial
 * 
 * This file demonstrates how to create a Model Context Protocol (MCP) server
 * that interacts with the Monad blockchain testnet to check MON balances.
 */

// Import necessary dependencies
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { createPublicClient, formatUnits, http } from "viem";
import { monadTestnet } from "viem/chains";

// Create a public client to interact with the Monad testnet
const publicClient = createPublicClient({
    chain: monadTestnet,
    transport: http(),
});

// Initialize the MCP server with a name, version, and capabilities
const server = new McpServer({
    name: "monad-mcp-tutorial",
    version: "0.0.1",
    // Array of supported tool names that clients can call
    capabilities: ["get-gas-price"]
});

// Define a tool that retrieves the current gas price on the Monad testnet
server.tool(
    // Tool ID
    "get-gas-price",
    // Description of what the tool does
    "Get the current gas price on Monad testnet",
    // Input schema (no input required in this case)
    {},
    // Tool implementation
    async () => {
        try {
            // Fetch the current gas price
            const gasPrice = await publicClient.getGasPrice();

            // Return a human-friendly message indicating the gas price
            return {
                content: [
                    {
                        type: "text",
                        text: `Current gas price: ${formatUnits(gasPrice, 9)} Gwei`,
                    },
                ],
            };
        } catch (error) {
            // Handle errors gracefully
            return {
                content: [
                    {
                        type: "text",
                        text: `Failed to retrieve gas price. Error: ${error instanceof Error ? error.message : String(error)}`,
                    },
                ],
            };
        }
    }
);


/**
 * Main function to start the MCP server
 * Uses stdio for communication with LLM clients
 */
async function main() {
    // Create a transport layer using standard input/output
    const transport = new StdioServerTransport();

    // Connect the server to the transport
    await server.connect(transport);

    console.error("Monad testnet MCP Server running on stdio");
}

// Start the server and handle any fatal errors
main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});
