export const UPDATE_CATEGORIES = 'UPDATE_CATEGORIES'
export const CLEAR_CATEGORIES = 'CLEAR_CATEGORIES'
export const UPDATE_CATEGORY_POPULARITY = 'UPDATE_CATEGORY_POPULARITY'

export const updateCategories = categories => ({ type: UPDATE_CATEGORIES, categories })
export const clearCategories = () => ({ type: CLEAR_CATEGORIES })
export const updateCategoryPopularity = (category, amount) => ({ type: UPDATE_CATEGORY_POPULARITY, category, amount })

export const updateMarketCategoryPopularity = (marketID, amount) => (dispatch, getState) => {
  const market = getState().marketsData[marketID]
  if (market && market.category !== undefined) {
    if (market.category !== null) dispatch(updateCategoryPopularity(market.category, Number(amount)))
  } else {
    dispatch(updateCategoryPopularity(market.category, Number(amount)))
  }
}
