import { UPDATE_SELECTED_PAGE_NUM } from '../../markets/actions/update-selected-page-num';
import { UPDATE_SELECTED_SORT } from '../../markets/actions/update-selected-sort';
import { UPDATE_KEYWORDS } from '../../markets/actions/update-keywords';
import { TOGGLE_FILTER } from '../../markets/actions/toggle-filter';
import { UPDATED_SELECTED_MARKETS_HEADER } from '../../markets/actions/update-selected-markets-header';

import { SHOW_LINK } from '../../link/actions/link-actions';

export default function(pagination = { selectedPageNum: 1, numPerPage: 10 }, action) {
    switch (action.type) {
        case UPDATE_SELECTED_PAGE_NUM:
            return {
                ...pagination,
                selectedPageNum: action.selectedPageNum
            };

        case UPDATE_SELECTED_SORT:
        case UPDATE_KEYWORDS:
        case TOGGLE_FILTER:
        case UPDATED_SELECTED_MARKETS_HEADER:
            return {
                ...pagination,
                selectedPageNum: 1
            };

        default:
            return pagination;
    }
}