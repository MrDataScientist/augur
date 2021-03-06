import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Input from 'modules/common/components/input/input'

import parseQuery from 'modules/routes/helpers/parse-query'
import makeQuery from 'modules/routes/helpers/make-query'

import filterBySearch from 'modules/filter-sort/helpers/filter-by-search'
import { isEqual } from 'lodash'

import { FILTER_SEARCH_PARAM } from 'modules/filter-sort/constants/param-names'

import Styles from 'modules/filter-sort/components/filter-search/filter-search.styles'

export default class FilterSearch extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    items: PropTypes.array.isRequired,
    updateIndices: PropTypes.func.isRequired,
    searchKeys: PropTypes.array.isRequired,
    searchPlaceholder: PropTypes.string
  }

  constructor(props) {
    super(props)

    this.state = {
      search: ''
    }

    this.updateQuery = this.updateQuery.bind(this)
  }

  componentWillMount() {
    const search = parseQuery(this.props.location.search)[FILTER_SEARCH_PARAM]
    if (search) this.setState({ search })
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.search !== nextState.search) {
      this.updateQuery(nextState.search, nextProps.location)

      nextProps.updateIndices({
        indices: filterBySearch(nextState.search, nextProps.searchKeys, nextProps.items),
        type: FILTER_SEARCH_PARAM
      })
    }

    if (!isEqual(this.props.items, nextProps.items)) {
      nextProps.updateIndices({
        indices: filterBySearch(nextState.search, nextProps.searchKeys, nextProps.items),
        type: FILTER_SEARCH_PARAM
      })
    }
  }

  updateQuery(search, location) {
    let updatedSearch = parseQuery(location.search)

    if (search === '') {
      delete updatedSearch[FILTER_SEARCH_PARAM]
    } else {
      updatedSearch[FILTER_SEARCH_PARAM] = search
    }

    updatedSearch = makeQuery(updatedSearch)

    this.props.history.push({
      ...location,
      search: updatedSearch
    })
  }

  render() {
    const p = this.props
    const s = this.state

    return (
      <article className={Styles.FilterSearch}>
        <Input
          className={Styles.FilterSearch__input}
          isSearch
          isClearable
          placeholder={p.searchPlaceholder || 'Search'}
          value={s.search}
          onChange={search => this.setState({ search })}
        />
      </article>
    )
  }
}
