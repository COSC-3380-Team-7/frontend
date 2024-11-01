export function calculateAge(dob) {
	const birthDate = new Date(dob);
	const today = new Date();
	let age = today.getFullYear() - birthDate.getFullYear();
	const monthDiff = today.getMonth() - birthDate.getMonth();
	if (
		monthDiff < 0 ||
		(monthDiff === 0 && today.getDate() < birthDate.getDate())
	) {
		age--;
	}
	return age;
}

export function formatDate(dateTimeString) {
	const date = new Date(dateTimeString);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	return `${month}/${day}/${year}`;
}
export function convertTo12Hour(timeString) {
	const [hours, minutes, seconds] = timeString.split(":");
	let hour = parseInt(hours);
	const ampm = hour >= 12 ? "PM" : "AM";
	hour = hour % 12 || 12; // Convert hour to 12-hour format
	return `${hour}:${minutes} ${ampm}`;
}
