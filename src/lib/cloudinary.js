import { Cloudinary } from "@cloudinary/url-gen";

export const cldClientSide = new Cloudinary({
	cloud: {
		cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
	},
});
