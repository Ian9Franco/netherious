import { useState, useEffect } from 'react';

interface GitHubAsset {
    name: string;
    browser_download_url: string;
}

interface GitHubRelease {
    tag_name: string;
    assets: GitHubAsset[];
}

export function useGitHubLatestRelease(repo: string) {
    const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchLatestRelease() {
            try {
                setLoading(true);
                const response = await fetch(`https://api.github.com/repos/${repo}/releases/latest`);

                if (!response.ok) {
                    throw new Error('Failed to fetch latest release');
                }

                const data: GitHubRelease = await response.json();

                // Buscamos el primer asset que sea un .zip
                const zipAsset = data.assets.find(asset => asset.name.endsWith('.zip'));

                if (zipAsset) {
                    setDownloadUrl(zipAsset.browser_download_url);
                } else {
                    setError('No zip file found in latest release');
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        }

        if (repo) {
            fetchLatestRelease();
        }
    }, [repo]);

    return { downloadUrl, loading, error };
}
