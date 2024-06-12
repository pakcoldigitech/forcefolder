const vscode = require('vscode');
const path = require('path');

exports.activate = function activate(context) {
    // If a file is opened instead of a folder, open the file's containing folder
    async function openWorkspace() {
        if (vscode.window.activeTextEditor && vscode.workspace.name === undefined) {
            await vscode.commands.executeCommand("vscode.openFolder", vscode.Uri.file(
                path.dirname(vscode.window.activeTextEditor.document.fileName)
            ));
            // Can't reopen the file as the extension host is restarted when opening the new window
            // await vscode.commands.executeCommand("vscode.open", vscode.window.activeTextEditor.document.uri);
        }
    }
    openWorkspace();
    vscode.window.onDidChangeActiveTextEditor(openWorkspace);
}
