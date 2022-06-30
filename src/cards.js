const card_template = (card, id) => {
	card.chapter = card.chapter.replace(/\s/g, "-");
	return `
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
                class="card-watch-btn btn btn-secondary"
                href="${card.url}"
                target="_blank"
                id="${card.chapter}-${id}-watch"
            >Ver</a>
            <div class="card-body-wrapper">
                <span
                    class="card-pill ${card.type}"
                ></span>
                <span
                    class="card-pill card-pill-clickable incomplete"
                    id="${card.chapter}-${id}-status"
                ></span>
            </div>
        </div>
    </div>
`;
};

const chapter_template = (chapter, id) =>
	`
    <section class="chapter" id="chapter-${id}">
        <h2 class="chapter-title">${chapter.title}</h2>
        <div class="card-container">
            ${chapter.cards.map((card, id) => card_template(card, id)).join("")}
        </div>
    </section>
`;

export default chapter_template;
