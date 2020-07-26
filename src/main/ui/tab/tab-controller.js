import { Component } from '../component';
import { TabButton } from './tab-button';
import { TabContent } from './tab-content';

export class TabController extends Component {

    static buttonNamespace = 'tab-button';
    static contentGroupNamespace = 'tab-content-group';
    static buttonInstances = [];
    static contentGroupInstances = [];

    constructor(node) {
        super(node);
    }

    static init(scope = document.body) {
        scope.querySelectorAll('[' + ['data', TabController.contentGroupNamespace, 'id'].join('-') + ']')
        .forEach(node => TabController.contentGroupInstances.push(new TabContent(node)));

        scope.querySelectorAll('[' + ['data', TabController.buttonNamespace, 'id'].join('-') + ']')
        .forEach(node => TabController.buttonInstances.push(new TabButton(node, scope, TabController.contentGroupInstances)));
    }
}