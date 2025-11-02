const { BedrockAgentRuntimeClient, RetrieveAndGenerateCommand } = require('@aws-sdk/client-bedrock-agent-runtime');

const client = new BedrockAgentRuntimeClient({ region: 'us-east-1' });

async function retrieveFromKnowledgeBase(query) {
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

    try {
        const command = new RetrieveAndGenerateCommand(params);
        const response = await client.send(command);
        return response.output.text;
    } catch (error) {
        console.error('Error retrieving from knowledge base:', error);
        throw error;
    }
}

module.exports = { retrieveFromKnowledgeBase };