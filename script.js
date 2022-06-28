const card_template = (card, id) =>
	`
    <div class="card">
        <div class="card-header">
            <div class="card-header-wrapper">
                <p class="card-title">${card.title}</p>
                <i
                    class="fa-regular fa-star"
                    id="${card.chapter}-${id}-fav"
                ></i>
            </div>
            <p class="card-description">${card.description}</p>
        </div>
        <div class="card-body">
            <a
                class="card-watch-btn"
                href="${card.url}"
                target="_blank"
                id="${card.chapter}-${id}-watch"
            >Ver</a>
            <div class="card-body-wrapper">
                <span
                    class="card-pill ${card.type}"
                ></span>
                <span
                    class="card-pill card-pill-clickable"
                    id="${card.chapter}-${id}-status"
                ></span>
            </div>
        </div>
    </div>
`;

const chapter_template = (chapter, id) =>
	`
    <section class="chapter" id="chapter-${id}">
        <h2 class="chapter-title">${chapter.title}</h2>
        <div class="card-container">
            ${chapter.cards.map((card, id) => card_template(card, id)).join("")}
        </div>
    </section>
`;

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

const pill_state_update_ui = (pill, force_state) => {
	pill.classList.toggle("complete");
	if (pill.classList.contains("complete")) pill.classList.remove("incomplete");
	else pill.classList.add("incomplete");

	if (force_state !== undefined) {
		pill.classList.remove("complete");
		pill.classList.remove("incomplete");
		pill.classList.add(force_state);
	}

	localStorage.setItem(pill.id, pill.classList.contains("complete"));
};

const set_card_state = () => {
	document.querySelectorAll(".card-watch-btn").forEach((btn) => {
		btn.addEventListener("click", (e) => {
			const pill_id = e.target.id.replace("-watch", "-status");
			pill_state_update_ui(document.getElementById(pill_id), "complete");
		});
	});

	document.querySelectorAll(".card-pill-clickable").forEach((pill) => {
		pill.addEventListener("click", (e) => pill_state_update_ui(e.target));
	});

	document.querySelectorAll(".fa-star").forEach((star) => {
		star.addEventListener("click", (e) => {
			const star_clicked = e.target;

			star_clicked.classList.toggle("fa-regular");
			if (star_clicked.classList.contains("fa-regular")) star_clicked.classList.remove("fa-solid");
			else star_clicked.classList.add("fa-solid");

			localStorage.setItem(star_clicked.id, star_clicked.classList.contains("fa-solid"));
		});
	});

	get_card_state_from_local_storage();
};

const get_card_state_from_local_storage = () => {
	document.querySelectorAll(".card-pill-clickable").forEach((pill) => {
		if (localStorage.getItem(pill.id) === "true") pill.classList.add("complete");
		else if (localStorage.getItem(pill.id) === "false") pill.classList.add("incomplete");
	});

	document.querySelectorAll(".fa-star").forEach((star) => {
		if (localStorage.getItem(star.id) === "true") star.classList.add("fa-solid");
		else if (localStorage.getItem(star.id) === "false") star.classList.add("fa-regular");
	});
};

fetch("./data.json")
	.then((data) => data.json())
	.then((json) => {
		const chapters = json.chapters.map((chapter, id) => chapter_template(data_format(chapter), id));
		const container = document.body;
		container.innerHTML += chapters.join("");
		set_card_state();

		document.querySelectorAll(".chapter").forEach((chapter) => {
			const chapter_title = chapter.querySelector(".chapter-title");
			const pills = chapter.querySelectorAll(".card-pill-clickable");
			const pills_completed = Array.from(pills).filter((pill) => pill.classList.contains("complete")).length;
			chapter_title.innerHTML += ` (${pills_completed}/${pills.length})`;
		});
	});
