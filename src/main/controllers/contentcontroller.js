import $ from "jquery";
import { PageConstants } from "../constants/pageconstants";

export class ContentController {
    
    #id;
    #element;

    #contentTypes = ["dummy.txt", "dummy2.txt", "dummy3.txt"];

    constructor() {
        this.#element = document.getElementById(this.#id);

        this.#bindEvents();
    }

    #bindEvents() {
        const button = document.getElementById("lol");

        button.addEventListener("click", () => {
            this.#changeContent(this.#contentTypes[Math.round(Math.random() * (this.#contentTypes.length - 1))]);
        });
    }

    #changeContent(type) {
        const content = document.getElementById("content");

        var data = $.ajax({
            method: "GET",
            url: PageConstants.DATA_URL + type,
            dataType: "text",
        })

        .done(() => {
            content.innerHTML = data.responseText;
        });
    }
}