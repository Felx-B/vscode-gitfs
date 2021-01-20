
import * as vscode from 'vscode';
import { FileSystem } from './fileSystem';

export function activate(context: vscode.ExtensionContext) {
	const fs = new FileSystem();
	context.subscriptions.push(fs);
}

// this method is called when your extension is deactivated
export function deactivate() {}
