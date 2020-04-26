import { PageConstants } from '../constants/pageconstants';
import { Accordion } from '../components/accordion';
import { TabBar } from '../components/tabbar';

export class TabController {

    #explorerAccordion;
    #tabBar;

    constructor() {
        this.#explorerAccordion = new Accordion(PageConstants.EXPLORER_ID, PageConstants.EXPLORER_HEADER_SELECTOR, PageConstants.EXPLORER_ITEM_SELECTOR);
        this.#tabBar = new TabBar(PageConstants.TAB_AREA_SELECTOR);

        document.body.addEventListener(PageConstants.E_ACCORDION_ITEM_CLICKED, (e) => {
            this.#tabBar.addTab(e.detail);
        });

        document.body.addEventListener(PageConstants.E_TAB_REMOVE_CLICKED, (e) => {
            this.#tabBar.removeTab(e.detail);
        });
    }
}