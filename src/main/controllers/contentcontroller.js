import $ from "jquery";
import { PageConstants } from "../constants/pageconstants";

export class ContentController {
    
    #id;
    #element;

    #contentTypes = ["dummy.txt", "dummy2.txt", "dummy3.txt"];

    constructor() {
        this.#bindEvents();
    }

    #bindEvents() {

    }

    // #changeContent(type) {

    //     var data = $.ajax({
    //         method: "GET",
    //         url: PageConstants.DATA_URL + type,
    //         dataType: "text",
    //     })

    //     .done(() => {
    //         content.innerHTML = data.responseText;
    //     });
    // }
}