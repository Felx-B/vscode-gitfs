import * as vscode from "vscode";
import * as FS from "@isomorphic-git/lightning-fs";

export class FileSystem
  implements vscode.FileSystemProvider, vscode.Disposable {
  private readonly disposable: vscode.Disposable;

  private fs = new FS("testfs", {});

  constructor() {
    this.disposable = vscode.Disposable.from(
      vscode.workspace.registerFileSystemProvider("cfs", this, {
        isCaseSensitive: true,
        isReadonly: false,
      })
    );
  }

  dispose() {
    this.disposable?.dispose();
  }
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
  async stat(uri: vscode.Uri): Promise<vscode.FileStat> {
    try {
      const stats = await this.fs.promises.stat(uri.path);
      const result: vscode.FileStat = {
        type: stats.isDirectory() ? 2 : 1,
        ctime: stats.ctimeMs,
        mtime: stats.mtimeMs,
        size: stats.size,
      };

      return result;
    } catch (e) {
      throw vscode.FileSystemError.FileNotFound(uri);
    }
  }

  async readDirectory(uri: vscode.Uri): Promise<[string, vscode.FileType][]> {
    const content = await this.fs.promises.readdir(uri.path);
    const result: [string, vscode.FileType][] = [];

    for (let item of content) {
      const type = (
        await this.fs.promises.stat(`${uri.path}/${item}`)
      ).isDirectory()
        ? 2
        : 1;
      result.push([item, type]);
    }

    return result;
  }
  async createDirectory(uri: vscode.Uri): Promise<void> {
    await this.fs.promises.mkdir(uri.path);
  }
  async readFile(uri: vscode.Uri): Promise<Uint8Array> {
    return (await this.fs.promises.readFile(uri.path)) as Uint8Array;
  }
  async writeFile(
    uri: vscode.Uri,
    content: Uint8Array,
    options: { create: boolean; overwrite: boolean }
  ): Promise<void> {
    await this.fs.promises.writeFile(uri.path, content);
  }
  async delete(
    uri: vscode.Uri,
    options: { recursive: boolean }
  ): Promise<void> {
    const stat = await this.stat(uri);
    if (stat.type === vscode.FileType.Directory) {
      await this.fs.promises.rmdir(uri.path);
    } else {
      await this.fs.promises.unlink(uri.path);
    }
  }
  async rename(
    oldUri: vscode.Uri,
    newUri: vscode.Uri,
    options: { overwrite: boolean }
  ): Promise<void> {
    await this.fs.promises.rename(oldUri.path, newUri.path);
  }
}
