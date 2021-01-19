
import * as vscode from 'vscode';
import { FileSystem } from './fileSystem';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "gitfs" is now active!');

	// // The command has been defined in the package.json file
	// // Now provide the implementation of the command with registerCommand
	// // The commandId parameter must match the command field in package.json
	// let disposable = vscode.commands.registerCommand('gitfs.helloWorld', () => {
	// 	// The code you place here will be executed every time your command is executed

	// 	// Display a message box to the user
	// 	vscode.window.showInformationMessage('Hello World from gitfs!');
	// });

	const fs = new FileSystem();
	context.subscriptions.push(fs);

	// context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
