import { Loader2 } from "lucide-react";
import PropTypes from "prop-types";

export default function Loading({ text }) {
	return (
		<div className="w-full flex min-h-custom -m-12 items-center justify-center">
			<Loader2 className="mr-2 animate-spin h-7 w-7" />
			<p className="text-2xl font-medium">{text}</p>
		</div>
	);
}

Loading.propTypes = {
	text: PropTypes.string.isRequired,
};
