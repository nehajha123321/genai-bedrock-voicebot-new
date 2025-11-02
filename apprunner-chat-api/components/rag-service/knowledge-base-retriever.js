const { BedrockAgentRuntimeClient, RetrieveAndGenerateCommand } = require('@aws-sdk/client-bedrock-agent-runtime');

const client = new BedrockAgentRuntimeClient({ region: 'us-east-1' });

async function retrieveFromKnowledgeBase(query) {
    console.log("[DEBUG] retrieveFromKnowledgeBase() called with query:", query);
    const params = {
        input: {
            text: query
        },
        retrieveAndGenerateConfiguration: {
            type: 'KNOWLEDGE_BASE',
            knowledgeBaseConfiguration: {
                knowledgeBaseId: 'BXRZZXSY7P',
                modelArn: 'arn:aws:bedrock:us-east-1::foundation-model/anthropic.claude-3-sonnet-20240229-v1:0'
            }
        }
    };
    console.log("[DEBUG] Knowledge base params:", JSON.stringify(params, null, 2));

    try {
        const command = new RetrieveAndGenerateCommand(params);
        console.log("[DEBUG] Sending command to Bedrock Agent Runtime...");
        const response = await client.send(command);
        console.log("[DEBUG] Knowledge base response:", {
            outputText: response.output.text?.substring(0, 200) + '...',
            citations: response.citations?.length || 0
        });
        return response.output.text;
    } catch (error) {
        console.error('[DEBUG] Error retrieving from knowledge base:', error);
        throw error;
    }
}

module.exports = { retrieveFromKnowledgeBase };
