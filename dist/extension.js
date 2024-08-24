"use strict";var l=Object.create;var c=Object.defineProperty;var u=Object.getOwnPropertyDescriptor;var w=Object.getOwnPropertyNames;var y=Object.getPrototypeOf,S=Object.prototype.hasOwnProperty;var v=(t,n)=>{for(var e in n)c(t,e,{get:n[e],enumerable:!0})},g=(t,n,e,i)=>{if(n&&typeof n=="object"||typeof n=="function")for(let o of w(n))!S.call(t,o)&&o!==e&&c(t,o,{get:()=>n[o],enumerable:!(i=u(n,o))||i.enumerable});return t};var f=(t,n,e)=>(e=t!=null?l(y(t)):{},g(n||!t||!t.__esModule?c(e,"default",{value:t,enumerable:!0}):e,t)),E=t=>g(c({},"__esModule",{value:!0}),t);var k={};v(k,{activate:()=>x,deactivate:()=>G});module.exports=E(k);var r=f(require("vscode")),a=f(require("fs")),h=f(require("path"));function x(t){let n=r.commands.registerCommand("createLanggraphStructure",async()=>{let e=await r.window.showInputBox({prompt:"Enter the name of the graph/agent",placeHolder:"AgentName"});if(!e){r.window.showErrorMessage("Agent name is required!");return}let i=r.workspace.rootPath;if(!i){r.window.showErrorMessage("No folder or workspace opened");return}let o=h.join(i,e),d=["utils"],m=[{path:"utils/tools.py",content:`# Tools for your graph in ${e}
`},{path:"utils/nodes.py",content:`from ${e}.utils.state import GraphState

def agent(state: GraphState):
    return state
`},{path:"utils/state.py",content:`from typing import TypedDict

class GraphState(TypedDict):
    # The state of the graph
    pass
`},{path:"requirements.txt",content:`langchain_community
langchain_openai
langgraph
`},{path:"agent.py",content:`from langgraph.graph import StateGraph, START, END
from ${e}.utils.state import GraphState

workflow = StateGraph(GraphState)

# ----------------------------------------
#
# Define your graph here
#
# ----------------------------------------

graph = workflow.compile()
`}];try{a.existsSync(o)||a.mkdirSync(o),d.forEach(s=>{let p=h.join(o,s);a.existsSync(p)||a.mkdirSync(p)}),m.forEach(s=>{let p=h.join(o,s.path);a.writeFileSync(p,s.content)}),r.window.showInformationMessage(`Langgraph structure created for ${e}`)}catch(s){r.window.showErrorMessage(`Error creating langgraph structure: ${s.message}`)}});t.subscriptions.push(n)}function G(){}0&&(module.exports={activate,deactivate});
