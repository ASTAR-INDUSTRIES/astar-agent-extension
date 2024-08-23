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

        const folders = [
            'utils'
        ];

        const files = [
            { path: `__init__.py`, content: `# Initialization for ${agentName}` },
            { path: `utils/__init__.py`, content: `# Initialization for utilities in ${agentName}` },
            { path: `utils/tools.py`, content: `# Tools for your graph in ${agentName}` },
            { path: `utils/nodes.py`, content: `# Node functions for your graph in ${agentName}` },
            { path: `utils/state.py`, content: `# State definition of your graph in ${agentName}` },
            { path: `requirements.txt`, content: `# Package dependencies for ${agentName}` },
            { path: `agent.py`, content: `# Code for constructing your graph in ${agentName}` },
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
