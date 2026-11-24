
document.addEventListener("DOMContentLoaded", () => {
    const nahled = document.getElementById("nahled");
    const velkyObrazek =
        document.getElementById("velky-obrazek");
    const zavrit = document.getElementById("zavrit");

    if (!nahled || !velkyObrazek || !zavrit) {
        return;
    }

    const fotografie =
        document.querySelectorAll(".galerie-obrazek");

    function zavriNahled() {
        nahled.hidden = true;
        velkyObrazek.removeAttribute("src");
    }

    fotografie.forEach((foto) => {
        foto.addEventListener("click", () => {
            velkyObrazek.src = foto.src;
            velkyObrazek.alt = foto.alt;
            nahled.hidden = false;
            zavrit.focus();
        });
    });

    zavrit.addEventListener("click", zavriNahled);

    nahled.addEventListener("click", (udalost) => {
        if (udalost.target === nahled) {
            zavriNahled();
        }
    });

    document.addEventListener("keydown", (udalost) => {
        if (udalost.key === "Escape" && !nahled.hidden) {
            zavriNahled();
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const tlacitka = document.querySelectorAll("[data-filtr]");
    const fotky = document.querySelectorAll(
        ".galerie figure[data-rada]"
    );

    tlacitka.forEach((tlacitko) => {
        tlacitko.addEventListener("click", () => {
            const filtr = tlacitko.dataset.filtr;

            fotky.forEach((foto) => {
                foto.hidden =
                    filtr !== "vse" &&
                    foto.dataset.rada !== filtr;
            });

            tlacitka.forEach((btn) => {
                btn.classList.toggle(
                    "aktivni",
                    btn === tlacitko
                );
            });
        });
    });
});
// Tmavý režim

(() => {
    const prepinac = document.getElementById("theme-toggle");

    function aktualizujRezim() {
        const tmavy = document.body.classList.contains("dark-mode");

        if (prepinac) {
            prepinac.textContent = tmavy
                ? "☀️ Světlý režim"
                : "🌙 Tmavý režim";

            prepinac.setAttribute("aria-pressed", String(tmavy));
        }
    }

    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    }

    aktualizujRezim();

    if (prepinac) {
        prepinac.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");

            localStorage.setItem(
                "theme",
                document.body.classList.contains("dark-mode")
                    ? "dark"
                    : "light"
            );

            aktualizujRezim();
        });
    }
})();
// Zvětšování fotografií

document.querySelectorAll("main img").forEach(foto => {

    foto.addEventListener("click", () => {

        const lightbox = document.createElement("div");
        lightbox.className = "lightbox";

        const obrazek = document.createElement("img");
        obrazek.src = foto.src;
        obrazek.alt = foto.alt;

        const zavrit = document.createElement("button");
        zavrit.className = "lightbox-close";
        zavrit.textContent = "×";
        zavrit.setAttribute("aria-label", "Zavřít fotografii");

        function zavriLightbox() {
            lightbox.remove();
            document.removeEventListener("keydown", klavesa);
        }

        function klavesa(e) {
            if (e.key === "Escape") {
                zavriLightbox();
            }
        }

        lightbox.appendChild(obrazek);
        lightbox.appendChild(zavrit);
        document.body.appendChild(lightbox);

        lightbox.addEventListener("click", zavriLightbox);
        document.addEventListener("keydown", klavesa);

        zavrit.focus();
    });
});
// Animované statistiky

(() => {
    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;
            const cil = Number(counter.dataset.target);
            const start = performance.now();

            function animace(cas) {

                const prubeh = Math.min(
                    (cas - start) / 1500, 1
                );

                counter.textContent = Math.round(
                    cil * prubeh
                );

                if (prubeh < 1) {
                    requestAnimationFrame(animace);
                }
            }

            requestAnimationFrame(animace);
            observer.unobserve(counter);

        });

    }, { threshold: 0.5 });

    document.querySelectorAll(".counter").forEach(counter => {
        observer.observe(counter);
    });
})();