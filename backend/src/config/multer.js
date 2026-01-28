const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {

        // Handling Images
        if (file.mimetype.startsWith("image/")) {
            return {
                folder: "NANYA/images",
                resource_type: "image",
                allowedFormats: ["png", "jpg", "jpeg", "webp"],
                transformation: [{ width: 500, height: 500, crop: "limit" }],
            };
        }

        // Handling PDFs
        else if (file.mimetype === "application/pdf") {
            return {
                folder: "NANYA/documents",
                resource_type: "image", // PDF ke liye Cloudinary "image" use karta hai transformations ke liye
                allowedFormats: ["pdf"],
            };
        }
    },
});

export const upload = multer({ storage });