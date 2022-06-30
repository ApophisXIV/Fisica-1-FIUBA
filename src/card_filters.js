const filter_card_by = (filter_btn, filter_target, filter_type) => {
	filter_btn.addEventListener("change", (btn) => {
		const is_checked = btn.target.checked;
		const cards = document.querySelectorAll(".card");
		cards.forEach((card) => {
			const pass_filter = card.querySelector(filter_target).classList.contains(filter_type);
			if (is_checked && pass_filter) card.style.display = "block";
			else if (!is_checked) card.style.display = "block";
			else card.style.display = "none";
		});
	});
};

const initialize_cards_filters = () => {
	const filter_complete_btn = document.getElementById("filter-complete");
	const filter_incomplete_btn = document.querySelector("#filter-incomplete");
	const filter_favorite_btn = document.querySelector("#filter-favs");
	filter_card_by(filter_complete_btn, ".card-pill-clickable", "complete");
	filter_card_by(filter_incomplete_btn, ".card-pill-clickable", "incomplete");
	filter_card_by(filter_favorite_btn, ".fa-star", "fa-solid");

	const reset_all_btn = document.querySelector("#reset-all");
	reset_all_btn.addEventListener("click", () => {
		filter_complete_btn.checked = false;
		filter_incomplete_btn.checked = false;
		filter_favorite_btn.checked = false;
		const cards = document.querySelectorAll(".card");
		cards.forEach((card) => (card.style.display = "block"));
		setTimeout(() => (reset_all_btn.checked = false), 400);
	});
};

export default initialize_cards_filters;
