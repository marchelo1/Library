// Cover images

const rootStyles = window.getComputedStyle(document.documentElement);

if (rootStyles.getPropertyValue('--book-cover-width-large') != null && rootStyles.getPropertyValue('--book-cover-width-large') !== '') {
    ready()
} else {
    document.getElementById('main-css').addEventListener('load', ready)
};


// Insert FilePond for img Preview, img Resize, img Encode
function ready() {
    const coverWidth = parseFloat(rootStyles.getPropertyValue('--book-cover-width-large'))
    const coverAspectRatio = parseFloat(rootStyles.getPropertyValue('--book-cover-aspect-ratio'))
    const coverHeight = coverWidth / coverAspectRatio
    FilePond.registerPlugin(
        FilePondPluginImagePreview,
        FilePondPluginImageResize,
        FilePondPluginFileEncode,
    );

    // Set img Aspect Ratio
    FilePond.setOptions({
        stylePanelAspectRatio: 1 / coverAspectRatio,
        imageResizeTargetWidth: coverWidth,
        imageResizeTargetHeight: coverHeight
    });

    FilePond.parse(document.body);

};