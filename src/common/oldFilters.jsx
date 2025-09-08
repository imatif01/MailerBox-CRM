import React, { useState, useContext, useEffect, useMemo, useRef } from 'react';
import debounce from 'lodash/debounce';
import styled from 'styled-components/macro';
import { useMediaPredicate } from 'react-media-hook';
import { format } from 'date-fns';
import Grid from 'components/atoms/Grid';
import GridCol from 'components/atoms/GridCol';
import Field from 'components/molecules/Field';
import Select from 'components/atoms/Select';
import { FiltersContext } from 'context/filtersContext';
import { useParams } from 'react-router-dom';
import Nav from './filtersData.json';

const FiltersHolder = styled.div`
  padding: 0.9375rem 0;
`;

function Filters({ onChangeFilters, customFilterKey = '', extraFilters }) {
  const { filterState, setFilterToggle } = useContext(FiltersContext);
  const [searchText, setSearchText] = useState('');
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [searchAmount, setSearchAmount] = useState('');
  // eslint-disable-next-line prefer-const
  let { view, child } = useParams();

  if (customFilterKey) {
    view = customFilterKey;
  } else if (child) {
    view = child;
  }
  const MinWidth992 = useMediaPredicate('(min-width: 992px)');
  const MaxWidth991 = useMediaPredicate('(max-width: 991px)');
  const debounceRef = useRef(0);
  const [loadingFilters, setLoadingFilter] = useState(false);
  const [filtersState, setFiltersState] = useState({});
  const [filterOptions, setFilterOptions] = useState({});
  useEffect(() => {
    if (MinWidth992) {
      setFilterToggle(true);
    }
    if (MaxWidth991) {
      setFilterToggle(false);
    }
  }, [MaxWidth991, MinWidth992, setFilterToggle]);

  const onSearchCallText = useMemo(
    () =>
      debounce(value => {
        debounceRef.current += 1;
        const LocalRef = debounceRef.current;
        setTimeout(() => {
          if (LocalRef === debounceRef.current) {
            onChangeFilters({ searchText: value });
          }
        }, 1);
      }, 300),
    [],
  );
  const onSearchCallAmount = useMemo(
    () =>
      debounce(value => {
        debounceRef.current += 1;
        const LocalRef = debounceRef.current;
        setTimeout(() => {
          if (LocalRef === debounceRef.current) {
            onChangeFilters({ searchAmount: value });
          }
        }, 1);
      }, 300),
    [],
  );
  const currentFilter = useMemo(() => Nav.find(({ key }) => key === view), [Nav]);
  const getFiltersData = async ({ filters, filtersData }) => {
    const state = {};
    try {
      await Promise.all(
        filters
          .filter(key => key.toLowerCase().includes('filter'))
          .map(async key => {
            const { isDynamic, options, params, call, returnKey } = filtersData[key];
            if (!isDynamic) {
              state[key] = options.map(x => {
                const [value, label] = Object.entries(x)[0];
                return { label, value };
              });
            } else {
              const [serviceFile, functionName] = call.split('.');
              const serviceCall = await import(`services/${serviceFile}`);
              try {
                state[key] = (await serviceCall.default[functionName](params))[returnKey];
                options.forEach(x => {
                  const [value, label] = Object.entries(x)[0];
                  state[key].unshift({ label, value });
                });
                // state[key].unshift({ label: 'All', value: '' });
              } catch (ex) {
                state[key] = [{ label: 'All', value: '' }];
              }
            }
          }),
      );
      return state;
    } catch (ex) {
      return state;
    }
  };

  const handleRequest = async (input, current) => {
    if (input !== null && input.length > 3) {
      const { call, param } = current;
      let options = [];

      const [serviceFile, functionName] = call.split('.');
      const serviceCall = await import(`services/${serviceFile}`);
      try {
        const response = (await serviceCall.default[functionName]({ [param]: input }))[param];

        options = response.map(_ => ({
          value: _,
          label: _,
        }));
      } catch (ex) {
        options = [{ label: 'All', value: '' }];
      }

      return options;
    }

    return [{ label: 'All', value: '' }];
  };

  useEffect(() => {
    setLoadingFilter(true);
    getFiltersData(currentFilter).then(res => {
      setFilterOptions(res);
      Object.entries(res).forEach(([key, value]) => setFiltersState(_ => ({ ..._, [key]: value[0] })));
      setLoadingFilter(false);
    });
  }, [currentFilter]);

  return (
    filterState && (
      <FiltersHolder>
        <Grid lg={24} xl={25} gap={14}>
          {currentFilter?.filters?.includes('text') && (
            <GridCol lg={12} xl={5}>
              <Field
                type="search"
                placeholder="Search"
                noMargin
                value={searchText}
                onChange={({ target: { value } }) => {
                  setSearchText(value);
                  onSearchCallText(value.trim());
                }}
                label="Search"
                sm
                prefix={<i className="material-icons-outlined">search</i>}
                clear={searchText}
                maxLength="150"
              />
            </GridCol>
          )}

          {currentFilter?.filters?.includes('date') && (
            <GridCol lg={12} xl={5}>
              <Field
                selectsRange
                startDate={startDate}
                endDate={endDate}
                onChange={({ target: { value } }) => {
                  setDateRange(value);
                  if (value[0] && value[1]) {
                    onChangeFilters({
                      startDate: value[0] ? format(value[0], 'yyyy-MM-dd') : '',
                      endDate: value[1] ? format(value[1], 'yyyy-MM-dd') : '',
                    });
                  } else if (!value[0] && !value[1]) {
                    onChangeFilters({
                      startDate: '',
                      endDate: '',
                    });
                  }
                }}
                prefix={<i className="material-icons-outlined">date_range</i>}
                placeholderText="Select date range"
                type="datepicker"
                label="Date Range"
                noMargin
                sm
                clear={startDate || endDate}
              />
            </GridCol>
          )}
          {currentFilter?.filters
            ?.filter(key => {
              if (currentFilter?.filtersData) {
                const item = currentFilter?.filtersData[key];
                const show = item?.show;
                if (show) {
                  return (
                    !Object.entries(show)
                      .map(e => filtersState[e[0]]?.value === e[1])
                      .includes(false) && key.toLowerCase().includes('filter')
                  );
                }
              }
              return key.toLowerCase().includes('filter');
            })
            .map((filter, index) => (
              <GridCol lg={12} xl={5} key={index}>
                <Select
                  isDisabled={loadingFilters}
                  loading={loadingFilters}
                  options={filterOptions[filter]}
                  placeholder={`${currentFilter.filtersData[filter].label}`}
                  sm
                  value={filtersState[filter]}
                  noMargin
                  name={`${filter}`}
                  prefix={<i className="material-icons-outlined">{currentFilter.filtersData[filter].icon}</i>}
                  label={`${currentFilter.filtersData[filter].label}`}
                  clear={filtersState[filter] && filtersState[filter].value}
                  onChange={({ target: { value } }) => {
                    const s = {};
                    if (value?.value === '') {
                      const filtered = currentFilter?.filtersData[filter]?.depends;
                      if (filtered) {
                        s[filtered] = { label: 'All', value: '' };
                      }
                    }
                    s[filter] = value;
                    setFiltersState(prevState => ({
                      ...prevState,
                      ...s,
                    }));
                    const settt = {};
                    Object.keys(s).forEach(v => {
                      settt[v] = value.value;
                    });

                    onChangeFilters(settt);
                  }}
                />
              </GridCol>
            ))}
          {currentFilter.filters
            .filter(key => key.toLowerCase().includes('searchable'))
            .map((filter, index) => (
              <GridCol lg={12} xl={5} key={index}>
                <Select
                  defaultOptions
                  async
                  loadOptions={e => handleRequest(e, currentFilter.filtersData[filter])}
                  isDisabled={loadingFilters}
                  loading={loadingFilters}
                  options={filterOptions[filter]}
                  placeholder={`${currentFilter.filtersData[filter].label}`}
                  sm
                  value={filtersState[filter] ?? { value: '', label: 'All' }}
                  noMargin
                  name={`${filter}`}
                  prefix={<i className="material-icons-outlined">{currentFilter.filtersData[filter].icon}</i>}
                  label={currentFilter.filtersData[filter].label}
                  clear={filtersState[filter] && filtersState[filter].value}
                  onChange={({ target: { value } }) => {
                    setFiltersState(prevState => ({
                      ...prevState,
                      [filter]: value,
                      [currentFilter.filtersData[filter].param]: value,
                    }));
                    onChangeFilters({
                      [filter]: value?.value ?? '',
                      [currentFilter.filtersData[filter].param]: value?.value ?? '',
                      getFilterOnly: true,
                    });
                  }}
                />
              </GridCol>
            ))}
          {filtersState.filterAccountNumber && filtersState.filterAccountNumber.value !== ''
            ? currentFilter?.filters?.includes('Amount') && (
                <GridCol lg={12} xl={5}>
                  <Field
                    type="Number"
                    placeholder="Amount Search"
                    noMargin
                    value={searchAmount}
                    onChange={({ target: { value } }) => {
                      setSearchAmount(value);
                      onSearchCallAmount(value.trim());
                    }}
                    label="Search"
                    sm
                    prefix={<i className="material-icons-outlined">search</i>}
                    clear={searchAmount}
                    maxLength="150"
                  />
                </GridCol>
              )
            : null}
          {extraFilters}
        </Grid>
      </FiltersHolder>
    )
  );
}

export default Filters;
