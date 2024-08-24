import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('createLanggraphStructure', async () => {
        const agentName = await vscode.window.showInputBox({
            prompt: "Enter the name of the graph/agent",
            placeHolder: "AgentName"
        });

        if (!agentName) {
            vscode.window.showErrorMessage("Agent name is required!");
            return;
        }

        const rootPath = vscode.workspace.rootPath;
        if (!rootPath) {
            vscode.window.showErrorMessage("No folder or workspace opened");
            return;
        }

        const agentFolderPath = path.join(rootPath, agentName);
        const folders = ['utils'];
        const files = [
            { 
                path: `utils/tools.py`, 
                content: `# Tools for your graph in ${agentName}\n` 
            },
            { 
                path: `utils/nodes.py`, 
                content: `from ${agentName}.utils.state import GraphState\n\n` +
                         `def agent(state: GraphState):\n` +
                         `    return state\n`
            },
            { 
                path: `utils/state.py`, 
                content: `from typing import TypedDict\n\n` +
                         `class GraphState(TypedDict):\n` +
                         `    # The state of the graph\n` +
                         `    pass\n`
            },
            { 
                path: `requirements.txt`, 
                content: `langchain_community\n` +
                         `langchain_openai\n` +
                         `langgraph\n`
            },
            { 
                path: `agent.py`, 
                content: `from langgraph.graph import StateGraph, START, END\n` +
                         `from ${agentName}.utils.state import GraphState\n\n` +
                         `workflow = StateGraph(GraphState)\n\n` +
                         `# ----------------------------------------\n` +
                         `#\n` +
                         `# Define your graph here\n` +
                         `#\n` +
                         `# ----------------------------------------\n\n` +
                         `graph = workflow.compile()\n`
            },
        ];

        try {
            if (!fs.existsSync(agentFolderPath)) {
                fs.mkdirSync(agentFolderPath);
            }

            folders.forEach(folder => {
                const folderPath = path.join(agentFolderPath, folder);
                if (!fs.existsSync(folderPath)) {
                    fs.mkdirSync(folderPath);
                }
            });

            files.forEach(file => {
                const filePath = path.join(agentFolderPath, file.path);
                fs.writeFileSync(filePath, file.content);
            });

            vscode.window.showInformationMessage(`Langgraph structure created for ${agentName}`);
        } catch (err) {
            vscode.window.showErrorMessage(`Error creating langgraph structure: ${(err as Error).message}`);
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
