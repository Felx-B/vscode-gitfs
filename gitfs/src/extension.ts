
import * as vscode from 'vscode';
import { IndexedDBFileSystem } from './fileSystem';
import {clone } from 'isomorphic-git';
import * as http from 'isomorphic-git/http/web';
import {Buffer} from 'buffer';


export function activate(context: vscode.ExtensionContext) {
	// window as any
	const indexedFS = new IndexedDBFileSystem();
	context.subscriptions.push(indexedFS);

	// ugly fix for isomorphic git using Buffer
	 eval('(e) => { this.Buffer = e }')(Buffer); //(Buffer);


	clone({ fs: indexedFS.fs, http, dir: '/', url: 'https://github.com/Felx-B/vscode-gitfs', corsProxy: 'https://cors.isomorphic-git.org' }).then(console.log);

}

// this method is called when your extension is deactivated
export function deactivate() {}
