export class PageConstants {
    // Stored data
    static DATA_URL = "http://phoenixmee.com/data/"

    // Event Names
    static E_ACCORDION_ITEM_CLICKED = 'AccordionItemClicked';

    // Explorer
    static EXPLORER_ID = 'explorerList';
    static EXPLORER_HEADER_SELECTOR = '[data-accordion-toggle]';
    static EXPLORER_ITEM_SELECTOR = 'li:not([data-accordion-toggle])';

    // TabBar
    static TAB_AREA_SELECTOR = '[data-tab-container]';

    // Tab
    static E_TAB_REMOVE_CLICKED = 'TabRemoveClicked';
    static E_TAB_CLICKED = 'TabClicked';
}