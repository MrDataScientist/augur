import { UPDATE_MARKETS_DATA } from '../../markets/actions/update-markets-data';
import { UPDATE_OUTCOME_PRICE } from '../../markets/actions/update-outcome-price';

export default function(outcomes = {}, action) {
    switch (action.type) {
        case UPDATE_MARKETS_DATA:
            return {
                ...outcomes,
                ...action.outcomesData
            };

        case UPDATE_OUTCOME_PRICE:
        	if (!outcomes || !outcomes[action.marketID] || !outcomes[action.marketID][action.outcomeID]) {
        		return outcomes;
        	}
        	return {
        		...outcomes,
        		[action.marketID]: {
        			...outcomes[action.marketID],
        			[action.outcomeID]: {
        				...outcomes[action.marketID][action.outcomeID],
        				price: action.price
        			}
        		}
        	};

        default:
            return outcomes;
    }
}