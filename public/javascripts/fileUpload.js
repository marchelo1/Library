// Insert FilePond for img Preview, img Resize, img Encode
FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginFileEncode,
);

// Set img Aspect Ratio
FilePond.setOptions({
    stylePanelAspectRatio: 150 / 100,
    imageResizeTargetWidth: 100,
    imageResizeTargetHeight: 150
});

FilePond.parse(document.body);