import { PageConstants } from './constants/pageconstants';
// Controllers
import { TabController } from './controllers/tabcontroller';
import { ContentController } from './controllers/contentcontroller';
//Components

document.addEventListener("DOMContentLoaded", () => {
    new ContentController();
    new TabController();
});