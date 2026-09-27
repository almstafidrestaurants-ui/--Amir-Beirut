/* =========================================================
   AMIR BEIRUT - MAIN JS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const menuScreen =
        document.querySelector(".menu");

    const secondScreen =
        document.querySelector(".second-screen");

    const categoryScreen =
        document.getElementById("categoryScreen");

    const progress =
        document.querySelector(".loading-progress");

    const exploreButton =
        document.getElementById("exploreButton");

    const menuButton =
        document.getElementById("menuButton");

    const categoryBack =
        document.getElementById("categoryBack");

    const categories =
        document.querySelectorAll(".category");

    /* SEARCH BUTTON */

    const categorySearch =
        document.getElementById("categorySearch");


    /* =====================================================
       LOADING SCREEN
    ===================================================== */

    if (menuScreen) {

        menuScreen.style.opacity = "1";
        menuScreen.style.display = "flex";

    }


    /* =====================================================
       PROGRESS BAR
       0% → 100%
    ===================================================== */

    if (progress) {

        progress.style.width = "0%";

        progress.style.transition =
            "width 2.9s linear";


        setTimeout(function () {

            progress.style.width = "100%";

        }, 50);

    }


    /* =====================================================
       AFTER LOADING
    ===================================================== */

    setTimeout(function () {

        console.log(
            "Loading finished - 3 seconds"
        );


        /* SHOW SECOND SCREEN */

        if (secondScreen) {

            secondScreen.classList.add(
                "show"
            );

        }


        /* HIDE LOADING SCREEN */

        if (menuScreen) {

            menuScreen.style.transition =
                "opacity 0.6s ease";

            menuScreen.style.opacity =
                "0";


            setTimeout(function () {

                menuScreen.style.display =
                    "none";

            }, 200);

        }

    }, 1050);


    /* =====================================================
       CATEGORY SYSTEM
    ===================================================== */

    categories.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                categories.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                this.classList.add(
                    "active"
                );


                const category =
                    this.dataset.category;


                console.log(
                    "Selected category:",
                    category
                );

            }
        );

    });


    /* =====================================================
       CATEGORY ITEMS MODAL
    ===================================================== */

    const itemsModal =
        document.getElementById("itemsModal");

    const itemsModalBack =
        document.getElementById("itemsModalBack");

    const menuCategories =
        document.querySelectorAll(".menu-category");

    const itemCategoryContents =
        document.querySelectorAll(
            ".items-category-content"
        );


    /* =====================================================
       SEARCH VARIABLES
    ===================================================== */

    let searchBox = null;

    let searchInput = null;

    let searchResults = null;


    /* =====================================================
       CREATE SEARCH BOX
    ===================================================== */

    if (
        categoryScreen &&
        categorySearch
    ) {

        /* SEARCH CONTAINER */

        searchBox =
            document.createElement("div");

        searchBox.className =
            "category-search-box";


        /* INPUT */

        searchInput =
            document.createElement("input");

        searchInput.type =
            "search";

        searchInput.className =
            "category-search-input";

        searchInput.placeholder =
            "Search menu...";

        searchInput.autocomplete =
            "off";


        /* RESULTS */

        searchResults =
            document.createElement("div");

        searchResults.className =
            "category-search-results";


        /* ADD INPUT + RESULTS */

        searchBox.appendChild(
            searchInput
        );

        searchBox.appendChild(
            searchResults
        );


        /* FIND HEADER */

        const categoryHeader =
            categoryScreen.querySelector(
                ".category-header"
            );


        /* INSERT AFTER HEADER */

        if (categoryHeader) {

            categoryHeader.insertAdjacentElement(
                "afterend",
                searchBox
            );

        }

    }


    /* =====================================================
       OPEN / CLOSE SEARCH
    ===================================================== */

    if (categorySearch) {

        categorySearch.addEventListener(
            "click",
            function () {

                if (!searchBox) {

                    return;

                }


                const isOpen =
                    searchBox.classList.contains(
                        "show"
                    );


                /* =========================================
                   CLOSE SEARCH
                ========================================= */

                if (isOpen) {

                    searchBox.classList.remove(
                        "show"
                    );


                    searchResults.classList.remove(
                        "show"
                    );


                    searchResults.innerHTML =
                        "";


                    searchInput.value =
                        "";


                    return;

                }


                /* =========================================
                   OPEN SEARCH
                ========================================= */

                searchBox.classList.add(
                    "show"
                );


                setTimeout(
                    function () {

                        searchInput.focus();

                    },
                    100
                );

            }
        );

    }


    /* =====================================================
       SEARCH MENU ITEMS
    ===================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            function () {

                const value =
                    this.value
                        .trim()
                        .toLowerCase();


                /* =========================================
                   EMPTY SEARCH
                ========================================= */

                if (!value) {

                    searchResults.innerHTML =
                        "";

                    searchResults.classList.remove(
                        "show"
                    );

                    return;

                }


                /* =========================================
                   GET ALL MENU ITEMS
                ========================================= */

                const allItems =
                    document.querySelectorAll(
                        ".menu-item-card"
                    );


                const matches = [];


                /* =========================================
                   CHECK EVERY ITEM
                ========================================= */

                allItems.forEach(
                    function (item) {


                        /* ITEM NAME */

                        const nameElement =
                            item.querySelector(
                                ".menu-item-name"
                            );


                        /* ARABIC NAME */

                        const arabicElement =
                            item.querySelector(
                                ".menu-item-name-ar"
                            );


                        /* DESCRIPTION */

                        const descriptionElement =
                            item.querySelector(
                                ".menu-item-description"
                            );


                        const name =
                            nameElement
                                ? nameElement.textContent
                                : "";


                        const arabic =
                            arabicElement
                                ? arabicElement.textContent
                                : "";


                        const description =
                            descriptionElement
                                ? descriptionElement.textContent
                                : "";


                        /* =================================
                           SEARCHABLE TEXT
                        ================================= */

                        const searchableText =
                            (
                                name +
                                " " +
                                arabic +
                                " " +
                                description
                            )
                            .toLowerCase();


                        /* =================================
                           MATCH
                        ================================= */

                        if (
                            searchableText.includes(
                                value
                            )
                        ) {


                            /* FIND CATEGORY */

                            const content =
                                item.closest(
                                    ".items-category-content"
                                );


                            const category =
                                content
                                    ? content.dataset.content
                                    : "";


                            let categoryName =
                                category;


                            /* GET CATEGORY TITLE */

                            if (content) {

                                const title =
                                    content.querySelector(
                                        ".items-category-title"
                                    );


                                if (title) {

                                    categoryName =
                                        title.textContent
                                            .trim();

                                }

                            }


                            /* ADD RESULT */

                            matches.push({

                                item:
                                    item,

                                name:
                                    name.trim(),

                                arabic:
                                    arabic.trim(),

                                category:
                                    categoryName

                            });

                        }

                    }
                );


                /* =========================================
                   CLEAR OLD RESULTS
                ========================================= */

                searchResults.innerHTML =
                    "";


                /* =========================================
                   NO RESULTS
                ========================================= */

                if (
                    matches.length === 0
                ) {

                    searchResults.innerHTML =

                        '<div class="search-no-results">' +
                        'No items found' +
                        '</div>';


                    searchResults.classList.add(
                        "show"
                    );


                    return;

                }


                /* =========================================
                   SHOW RESULTS
                ========================================= */

                matches.forEach(
                    function (result) {


                        const resultButton =
                            document.createElement(
                                "div"
                            );


                        resultButton.className =
                            "search-result";


                        resultButton.innerHTML =

                            '<div class="search-result-name">' +

                            escapeSearchHTML(
                                result.name
                            ) +

                            '</div>' +


                            (
                                result.arabic

                                    ? '<div class="search-result-ar">' +

                                      escapeSearchHTML(
                                          result.arabic
                                      ) +

                                      '</div>'

                                    : ""
                            ) +


                            '<div class="search-result-category">' +

                            escapeSearchHTML(
                                result.category
                            ) +

                            '</div>';


                        /* =================================
                           CLICK RESULT
                        ================================= */

                        resultButton.addEventListener(
                            "click",
                            function () {

                                openSearchResult(
                                    result.item
                                );

                            }
                        );


                        searchResults.appendChild(
                            resultButton
                        );

                    }
                );


                searchResults.classList.add(
                    "show"
                );

            }
        );

    }


    /* =====================================================
       SEARCH HTML SAFE
    ===================================================== */

    function escapeSearchHTML(text) {

        return String(text)
            .replace(
                /&/g,
                "&amp;"
            )
            .replace(
                /</g,
                "&lt;"
            )
            .replace(
                />/g,
                "&gt;"
            )
            .replace(
                /"/g,
                "&quot;"
            )
            .replace(
                /'/g,
                "&#039;"
            );

    }


    /* =====================================================
       OPEN SEARCH RESULT
    ===================================================== */

    function openSearchResult(item) {

        if (!item) {

            return;

        }


        /* FIND CATEGORY */

        const content =
            item.closest(
                ".items-category-content"
            );


        if (!content) {

            return;

        }


        /* CLOSE SEARCH */

        if (searchBox) {

            searchBox.classList.remove(
                "show"
            );

        }


        if (searchResults) {

            searchResults.classList.remove(
                "show"
            );

            searchResults.innerHTML =
                "";

        }


        if (searchInput) {

            searchInput.value =
                "";

        }


        /* HIDE ALL CATEGORY CONTENT */

        itemCategoryContents.forEach(
            function (contentItem) {

                contentItem.classList.remove(
                    "active"
                );

            }
        );


        /* SHOW SELECTED CATEGORY */

        content.classList.add(
            "active"
        );


        /* SHOW MODAL */

        if (itemsModal) {

            itemsModal.classList.add(
                "show"
            );

        }


        /* STOP BODY SCROLL */

        document.body.style.overflow =
            "hidden";


        /* SCROLL TO ITEM */

        setTimeout(
            function () {

                item.scrollIntoView({

                    behavior:
                        "smooth",

                    block:
                        "center"

                });

            },
            100
        );

    }


    /* =====================================================
       EXPLORE OUR MENU
    ===================================================== */

    if (exploreButton) {

        exploreButton.addEventListener(
            "click",
            function () {

                console.log(
                    "Explore Our Menu clicked"
                );


                /* SHOW CATEGORY SCREEN */

                if (categoryScreen) {

                    categoryScreen.classList.add(
                        "show"
                    );

                }


                /* HIDE SECOND SCREEN */

                if (secondScreen) {

                    secondScreen.classList.remove(
                        "show"
                    );

                }


                /* SCROLL TOP */

                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }
        );

    }


    /* =====================================================
       MENU BUTTON
    ===================================================== */

    if (menuButton) {

        menuButton.addEventListener(
            "click",
            function () {

                console.log(
                    "Menu button clicked"
                );

            }
        );

    }


    /* =====================================================
       BACK BUTTON
    ===================================================== */

    if (categoryBack) {

        categoryBack.addEventListener(
            "click",
            function () {

                console.log(
                    "Back button clicked"
                );


                /* HIDE CATEGORY SCREEN */

                if (categoryScreen) {

                    categoryScreen.classList.remove(
                        "show"
                    );

                }


                /* CLOSE SEARCH IF OPEN */

                if (searchBox) {

                    searchBox.classList.remove(
                        "show"
                    );

                }


                if (searchResults) {

                    searchResults.classList.remove(
                        "show"
                    );

                    searchResults.innerHTML =
                        "";

                }


                if (searchInput) {

                    searchInput.value =
                        "";

                }


                /* SHOW SECOND SCREEN */

                if (secondScreen) {

                    secondScreen.classList.add(
                        "show"
                    );

                }

            }
        );

    }


    /* =====================================================
       OPEN CATEGORY ITEMS
    ===================================================== */

    menuCategories.forEach(
        function (categoryButton) {

            categoryButton.addEventListener(
                "click",
                function () {


                    const category =
                        this.dataset.category;


                    console.log(
                        "Opening category:",
                        category
                    );


                    /* HIDE ALL CONTENT */

                    itemCategoryContents.forEach(
                        function (content) {

                            content.classList.remove(
                                "active"
                            );

                        }
                    );


                    /* FIND SELECTED CATEGORY */

                    const selectedContent =
                        document.querySelector(
                            '.items-category-content[data-content="' +
                            category +
                            '"]'
                        );


                    if (!selectedContent) {

                        console.warn(
                            "No items found for:",
                            category
                        );

                        return;

                    }


                    /* SHOW SELECTED CATEGORY */

                    selectedContent.classList.add(
                        "active"
                    );


                    /* SHOW MODAL */

                    if (itemsModal) {

                        itemsModal.classList.add(
                            "show"
                        );

                    }


                    /* STOP BODY SCROLL */

                    document.body.style.overflow =
                        "hidden";


                    /* SCROLL MODAL TOP */

                    if (itemsModal) {

                        itemsModal.scrollTop =
                            0;

                    }

                }
            );

        }
    );


    /* =====================================================
       CLOSE CATEGORY ITEMS
    ===================================================== */

    if (itemsModalBack) {

        itemsModalBack.addEventListener(
            "click",
            function () {


                /* CLOSE MODAL */

                if (itemsModal) {

                    itemsModal.classList.remove(
                        "show"
                    );

                }


                /* RESTORE BODY SCROLL */

                document.body.style.overflow =
                    "";


                /* CLOSE SEARCH */

                if (searchBox) {

                    searchBox.classList.remove(
                        "show"
                    );

                }


                if (searchResults) {

                    searchResults.classList.remove(
                        "show"
                    );

                    searchResults.innerHTML =
                        "";

                }


                if (searchInput) {

                    searchInput.value =
                        "";

                }


                /* SCROLL CATEGORY SCREEN TOP */

                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }
        );

    }

});