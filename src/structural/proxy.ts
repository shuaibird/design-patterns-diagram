interface IDownloader {
    download(query: string): string;
}

class Downloader implements IDownloader {
    public download(query: string): string {
        return query;
    }
}

class DownloaderProxy implements IDownloader {
    #downloader: Downloader;
    #cache: Record<string, string>;

    public constructor(downloader: Downloader) {
        this.#downloader = downloader;
    }
    public download(query: string): string {
        if (!this.#cache[query]) {
            this.#cache[query] = this.#downloader.download(query);
        }
        return this.#cache[query];
    }
}

const downloaderWithCache = new DownloaderProxy(new Downloader());
