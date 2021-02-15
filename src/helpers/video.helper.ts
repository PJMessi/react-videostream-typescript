export const formatVideoSize = (videoSize: number) => {
    const sizeInBits = videoSize;
    if (sizeInBits < 8) return `${parseFloat(sizeInBits.toFixed(2)) + 0} bits`;

    const sizeInBytes = sizeInBits / 1024;
    if (sizeInBytes < 1024) return `${parseFloat(sizeInBytes.toFixed(2)) + 0} bytes`;

    const sizeInMegaBytes = sizeInBytes / 1024;
    if (sizeInMegaBytes < 1024) return `${parseFloat(sizeInMegaBytes.toFixed(2)) + 0} MB`

    const sizeInGigaBytes = sizeInMegaBytes / 1024;
    return `${parseFloat(sizeInGigaBytes.toFixed(2)) + 0} GB`;
}