window.addEventListener("load", function() {
    const canvas = document.getElementById("canvas-2");
    const uploadFile = document.getElementById("upload-file-2");
    let img = new Image();
    let threshold = 100;
    let kernelSize = 3;
    let fileName = "";
    // upload File
    uploadFile.addEventListener("change", () => {
        const ctx = canvas.getContext("2d");
        const file = document.getElementById("upload-file-2").files[0];
        // init FileReader API
        const reader = new FileReader();
        if (file) {
            fileName = file.name;
            // read data as URL
            reader.readAsDataURL(file);
        }

        // add image to canvas
        reader.addEventListener("load", () => {
            img = new Image();
            img.src = reader.result;
            img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);
            };
        }, false);
    });

    const downloadBtn = document.getElementById("download-2");
    downloadBtn.addEventListener("click", () => {
        const fileExtension = fileName.slice(-4);
        let newFilename;

        if (fileExtension === ".jpg" || fileExtension === ".png") {
            newFilename = fileName.substring(0, fileName.length - 4) + "-ukraine.jpg";
        }

        const link = document.createElement("a");
        link.download = newFilename;
        link.href = canvas.toDataURL("image/jpeg", 0.8);
        link.dispatchEvent(new MouseEvent("click"));
    });

    const thresholdSlider = document.getElementById("threshold-2");
    thresholdSlider.addEventListener(('change'), (e) => {
        threshold = parseInt(e.target.value);
        maskButton.click();
    });

    const kernelSlider = document.getElementById("kernel-2");
    kernelSlider.addEventListener(('change'), (e) => {
        kernelSize = parseInt(e.target.value);
        maskButton.click();
    });

    const maskButton = document.getElementById("mask-2");
    maskButton.addEventListener("click", () => {
        const value = document.querySelector('input[name="method-2"]:checked').value;
        if(value === 'kernel') kernelmask(img, canvas, threshold, kernelSize);
        if(value === 'pixelGraph') pixelGraphMask(img, canvas, threshold, kernelSize*10);
        if(value === 'pixel') pixelMask(img, canvas, threshold);
    });

    const subtractButton = document.getElementById("subtract-2");
    subtractButton.addEventListener("click", () => {
        // read from canvas 1 and write to this one
        subtractMask(document.getElementById("canvas-1"), canvas, img);
    });
});
