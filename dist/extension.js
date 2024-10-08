"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/extension.ts
var extension_exports = {};
__export(extension_exports, {
  activate: () => activate,
  deactivate: () => deactivate
});
module.exports = __toCommonJS(extension_exports);
var vscode = __toESM(require("vscode"));
var fs = __toESM(require("fs"));
var path = __toESM(require("path"));
var import_child_process = require("child_process");
function activate(context) {
  let disposable = vscode.commands.registerCommand("createLanggraphStructure", async () => {
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
    const folders = ["utils"];
    const files = [
      {
        path: `utils/tools.py`,
        content: `# Tools for your graph in ${agentName}
`
      },
      {
        path: `utils/nodes.py`,
        content: `from ${agentName}.utils.state import GraphState

def agent(state: GraphState):
    return state
`
      },
      {
        path: `utils/state.py`,
        content: `from typing import TypedDict

class GraphState(TypedDict):
    # The state of the graph
    pass
`
      },
      {
        path: `requirements.txt`,
        content: `langchain_community
langchain_openai
langgraph
`
      },
      {
        path: `agent.py`,
        content: `from langgraph.graph import StateGraph, START, END
from ${agentName}.utils.state import GraphState

workflow = StateGraph(GraphState)

# ----------------------------------------
#
# Define your graph here
#
# ----------------------------------------

graph = workflow.compile()
`
      }
    ];
    try {
      if (!fs.existsSync(agentFolderPath)) {
        fs.mkdirSync(agentFolderPath);
      }
      folders.forEach((folder) => {
        const folderPath = path.join(agentFolderPath, folder);
        if (!fs.existsSync(folderPath)) {
          fs.mkdirSync(folderPath);
        }
      });
      files.forEach((file) => {
        const filePath = path.join(agentFolderPath, file.path);
        fs.writeFileSync(filePath, file.content);
      });
      vscode.window.showInformationMessage(`Langgraph structure created for ${agentName}`);
    } catch (err) {
      vscode.window.showErrorMessage(`Error creating langgraph structure: ${err.message}`);
    }
  });
  let saveDisposable = vscode.workspace.onDidSaveTextDocument(async (document) => {
    const fileName = path.basename(document.fileName);
    if (fileName === "agent.py") {
      const agentFolderPath = path.dirname(document.fileName);
      const agentName = path.basename(agentFolderPath);
      const outputFilePath = path.join(agentFolderPath, "graph.png");
      const scriptPath = path.join(context.extensionPath, "scripts", "display_graph.py");
      try {
        const command = `python ${scriptPath} ${document.fileName} ${outputFilePath}`;
        (0, import_child_process.exec)(command, (error, stdout, stderr) => {
          if (error) {
            vscode.window.showErrorMessage(`Could not create graph image: ${error.message}`);
            return;
          }
          if (stderr) {
            vscode.window.showErrorMessage(`Python stderr: ${stderr}`);
            return;
          }
          if (fs.existsSync(outputFilePath)) {
            vscode.window.showInformationMessage(`Graph image generated for ${agentName}: ${outputFilePath}`);
          } else {
            vscode.window.showErrorMessage("Failed to create the graph image.");
          }
        });
      } catch (err) {
        vscode.window.showErrorMessage(`Error running graph generation: ${err.message}`);
      }
    }
  });
  context.subscriptions.push(disposable);
  context.subscriptions.push(saveDisposable);
}
function deactivate() {
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activate,
  deactivate
});
//# sourceMappingURL=extension.js.map
