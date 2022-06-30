import chapter_template from "./cards.js";
import initialize_cards_ui from "./cards_ui.js";
import initialize_cards_filters from "./card_filters.js";

const remove_accents = (str) => str.normalize("NFD").replace(/\p{Diacritic}/gu, "");
const data_format = (data) => {
	return {
		title: data.chapter_title,
		cards: data.cards_content.map((card) => {
			return {
				title: card.type,
				chapter: remove_accents(data.chapter_title).toLowerCase(),
				description: card.description,
				url: card.url,
				type: card.type.toLowerCase() === "teorica" ? "theory" : "practice",
			};
		}),
	};
};

fetch("./fisica-1-todo-fiuba/db/data.json") // Github Pages require repo name before file name
	.then((data) => data.json())
	.then((json) => {
		const chapters_html = json.chapters.map((chapter, id) => chapter_template(data_format(chapter), id));
		document.body.innerHTML += chapters_html.join("");
		initialize_cards_ui();
        initialize_cards_filters();
	});
