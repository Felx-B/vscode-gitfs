import * as vscode from "vscode";
// import {} from 'isomorphic-git';
// import FS from '@isomorphic-git/lightning-fs';
import * as BrowserFS from "browserfs";

export class FileSystem
  implements vscode.FileSystemProvider, vscode.Disposable {
  private readonly disposable: vscode.Disposable;
  //   private fs = new FS("testfs");

  private fs = {};

  constructor() {
    this.disposable = vscode.Disposable.from(
      vscode.workspace.registerFileSystemProvider("cfs", this, {
        isCaseSensitive: true,
        isReadonly: false,
      })
    );

    BrowserFS.install(this.fs);
    BrowserFS.configure(
      {
        fs: "IndexedDB",
        options: {}
      },
      function (e) {
        if (e) {
          // An error happened!
          throw e;
        }
        // Otherwise, BrowserFS is ready-to-use!
      }
    );
  }

  dispose() {
    this.disposable?.dispose();
  }

  // onDidChangeFile: vscode.Event<vscode.FileChangeEvent[]>;
  private _emitter = new vscode.EventEmitter<vscode.FileChangeEvent[]>();
  readonly onDidChangeFile: vscode.Event<vscode.FileChangeEvent[]> = this
    ._emitter.event;

  watch(
    uri: vscode.Uri,
    options: { recursive: boolean; excludes: string[] }
  ): vscode.Disposable {
    // ignore, fires for all changes...
    return new vscode.Disposable(() => {});
  }
  stat(uri: vscode.Uri): vscode.FileStat | Thenable<vscode.FileStat> {
    throw new Error("Method not implemented.");
  }
  readDirectory(
    uri: vscode.Uri
  ): [string, vscode.FileType][] | Thenable<[string, vscode.FileType][]> {
    throw new Error("Method not implemented.");
  }
  createDirectory(uri: vscode.Uri): void | Thenable<void> {
    throw new Error("Method not implemented.");
  }
  readFile(uri: vscode.Uri): Uint8Array | Thenable<Uint8Array> {
    throw new Error("Method not implemented.");
  }
  writeFile(
    uri: vscode.Uri,
    content: Uint8Array,
    options: { create: boolean; overwrite: boolean }
  ): void | Thenable<void> {
    throw new Error("Method not implemented.");
  }
  delete(
    uri: vscode.Uri,
    options: { recursive: boolean }
  ): void | Thenable<void> {
    throw new Error("Method not implemented.");
  }
  rename(
    oldUri: vscode.Uri,
    newUri: vscode.Uri,
    options: { overwrite: boolean }
  ): void | Thenable<void> {
    throw new Error("Method not implemented.");
  }
}
