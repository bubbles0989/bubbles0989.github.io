$(function () {
	const $gallery = $(".gif-gallery");
	const dialogElement = $(".gif-dialog").get(0);
	const $dialog = $(dialogElement);
	const $entries = $gallery.find(".gif-entry");

	$entries.on("click", function () {
		const $entry = $(this);
		const $image = $entry.find("img");
		const imageElement = $image.get(0);

		$("#gif-dialog-title").text($entry.data("title"));
		$(".gif-dialog-image")
			.attr("src", imageElement.currentSrc || imageElement.src)
			.attr("alt", $image.attr("alt"));
		$("#gif-dialog-description").text($entry.data("description"));
		$(".gif-dialog-filename").text($entry.data("filename"));
		dialogElement.showModal();
	});

	$(".gif-dialog-close").on("click", function () {
		dialogElement.close();
	});

	$dialog.on("keydown", function (event) {
		if (event.key === "Escape") {
			event.preventDefault();
			dialogElement.close();
		}
	});

	$dialog.on("click", function (event) {
		if (event.target === dialogElement) {
			dialogElement.close();
		}
	});

	if ("IntersectionObserver" in window) {
		const observer = new IntersectionObserver((observedEntries, currentObserver) => {
			observedEntries.forEach((entry) => {
				if (entry.isIntersecting) {
					$(entry.target).addClass("is-visible");
					currentObserver.unobserve(entry.target);
				}
			});
		}, { rootMargin: "0px 0px -40px 0px", threshold: 0.1 });

		$("body").addClass("gif-gallery-ready");
		$entries.each(function () {
			observer.observe(this);
		});
	} else {
		$entries.addClass("is-visible");
	}
});
