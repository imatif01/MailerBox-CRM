import React, { useState, useContext, useEffect, useMemo, useRef } from 'react';
import styled from 'styled-components/macro';
import { useMediaPredicate } from 'react-media-hook';
import { format } from 'date-fns';
import Skeleton from 'react-loading-skeleton';
import { useParams } from 'react-router-dom';
import debounce from 'lodash/debounce';
import Grid from 'components/atoms/Grid';
import GridCol from 'components/atoms/GridCol';
import Field from 'components/molecules/Field';
import Select from 'components/atoms/Select';
import { FiltersContext } from 'context/filtersContext';
import Button from 'components/atoms/Button';
import Form, { useForm } from 'components/molecules/Form';
import Tooltip from 'components/atoms/Tooltip';
import Nav from './filtersData.json';
import Toast from 'components/molecules/Toast';
import { AuthContext } from 'context/authContext';
import PermissionsForm from 'components/organisms/PermissionsForm';
import RolesForm from 'components/organisms/RolesForm';
import ModalContainer from 'components/molecules/ModalContainer';
import userService from 'services/adminService';
import AdminForm from 'components/organisms/AdminForm';
import BlogForm from 'components/organisms/BlogForm';
import CategoryForm from 'components/organisms/CategoryForm';
import AuthorForm from 'components/organisms/AuthorForm';
import topNavData from 'nav.json';
import { LoadingContext } from 'context/loadingContext';
import TestimonialForm from 'components/organisms/TestimonialForm';
import ToasterForm from 'components/organisms/ToasterForm';

const FiltersHolder = styled.div`
  gap: 20px;
  padding: 0px 0rem 1.2rem;
  align-items: end;
  justify-content: space-between;
  display: grid;
  grid-template-columns: 1fr;
  max-width: 1000px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 10px;
    padding: 0;
  }
  .btn-style {
    background-color: var(--white);
    border-radius: 12px;
    padding: 8px 22px;
    min-height: 45px;
    transition: all 0.4s ease-in;
  }
`;

const ButtonHolder = styled.div`
  display: flex;
  justify-content: flex-start;
  grid-gap: 20px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  max-width: 140px;
  background-color: var(--white);
  padding: 7px 15px;
  margin-bottom: 0px;
  border-radius: 12px;
  height: 45px;
`;

const UploadWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  max-width: 140px;
  background-color: var(--primary-btn-background);
  padding: 8px 17px;
  margin-bottom: 20px;
  border-radius: 5px;
  input {
    cursor: pointer;
    display: none;
  }
  label {
    cursor: pointer;
  }
`;

const CreateButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: flex-end;
  margin: 0 0 10px;
`;

function Filters({ onChangeFilters, customFilterKey = '', extraFilters }) {
  const { filterState, setFilterToggle } = useContext(FiltersContext);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [searchText, setSearchText] = useState('');
  let { view, child, view: title } = useParams();
  const [form] = useForm();
  const debounceRef = useRef(0);

  if (customFilterKey) {
    view = customFilterKey;
  } else if (child) {
    view = child;
  }

  const MinWidth992 = useMediaPredicate('(min-width: 992px)');
  const MaxWidth991 = useMediaPredicate('(max-width: 991px)');
  const [loadingFilters, setLoadingFilter] = useState(false);
  const [filtersState, setFiltersState] = useState({});
  const [filterOptions, setFilterOptions] = useState({});

  const currentFilter = useMemo(() => Nav.find(({ key }) => key === view), [Nav, view]);

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
      const { call, param, returnKey } = current;
      let options = [];

      const [serviceFile, functionName] = call.split('.');
      const serviceCall = await import(`services/${serviceFile}`);
      try {
        const response = await serviceCall.default[functionName]({ [param]: input });

        options = response[returnKey].map(_ => ({
          value: param === 'searchableCustomerName' ? _?._id : _,
          label: param === 'searchableCustomerName' ? `${_?.full_name} (${_?.email})` : _,
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

  const onSubmit = values => {
    const pageFilters = currentFilter.filters.filter(key => key.toLowerCase().includes('filter'));
    const searchableFilters = currentFilter.filters.filter(key => key.toLowerCase().includes('searchable'));
    let fields = {};
    if (currentFilter?.filters?.includes('text')) {
      fields.searchText = values?.searchText;
    }
    if (currentFilter?.filters?.includes('date')) {
      fields.startDate = values?.dateRange && values?.dateRange[0] ? format(values.dateRange[0], 'yyyy-MM-dd') : '';
      fields.endDate = values?.dateRange && values?.dateRange[1] ? format(values.dateRange[1], 'yyyy-MM-dd') : '';
    }
    if (pageFilters?.length > 0) {
      pageFilters.forEach(filter => {
        fields = { ...fields, [filter]: values[filter]?.value ?? '' };
      });
    }
    if (searchableFilters?.length > 0) {
      searchableFilters.forEach(filter => {
        fields = { ...fields, [filter]: values[filter]?.value ?? '' };
      });
      fields = { ...fields, getFiltered: true };
    }
    if (currentFilter?.filters?.includes('filterRegion')) {
      fields.searchText = values?.filterRegion?.value;
    }
    onChangeFilters(fields);
  };
  // Filtering logic function
  const applyFilters = values => {
    const pageFilters = currentFilter.filters.filter(key => key.toLowerCase().includes('filter'));
    const searchableFilters = currentFilter.filters.filter(key => key.toLowerCase().includes('searchable'));

    let fields = {};

    if (currentFilter?.filters?.includes('text')) {
      fields.searchText = values?.searchText || '';
    }

    if (currentFilter?.filters?.includes('date')) {
      fields.startDate = values?.dateRange && values?.dateRange[0] ? format(values.dateRange[0], 'yyyy-MM-dd') : '';
      fields.endDate = values?.dateRange && values?.dateRange[1] ? format(values.dateRange[1], 'yyyy-MM-dd') : '';
    }

    if (pageFilters?.length > 0) {
      pageFilters.forEach(filter => {
        fields[filter] = values[filter]?.value ?? '';
      });
    }

    if (searchableFilters?.length > 0) {
      searchableFilters.forEach(filter => {
        fields[filter] = values[filter]?.value ?? '';
      });
      fields.getFiltered = true;
    }

    if (currentFilter?.filters?.includes('filterRegion')) {
      fields.searchText = values?.filterRegion?.value;
    }

    onChangeFilters(fields);
  };

  const [searchQuery, setSearchQuery] = useState({
    page: 1,
    pageSize: 10,
    searchText: '',
    startDate: '',
    endDate: '',
    filterText: '',
  });

  const { refetch, hasPermission } = useContext(AuthContext);

  let { buttons = [], subNav = [] } = topNavData.find(({ file }) => file === title);

  if (subNav?.length) {
    const { buttons: subNavButtons } = subNav.find(({ file }) => file === child) ?? { buttons: [] };
    if (child) {
      buttons = [...subNavButtons];
    } else {
      buttons = [...buttons, ...subNavButtons];
    }
  }

  const { isLoading } = useContext(LoadingContext);
  if (view === 'dashboard') {
    return null; // Or any other component you wish to render for the dashboard
  }

  return (
    filterState && (
      <>
        <CreateButtonContainer>
          {isLoading ? (
            <Skeleton rectangle height={40} width={131} css="border-radius:8px !important;" />
          ) : (
            <>
              {buttons.includes('create-permission') && hasPermission('permission.create') && (
                <ModalContainer
                  lg
                  title="Create Permission"
                  btnComponent={({ onClick }) => (
                    <Button
                      type="outline"
                      onClick={onClick}
                      iconMobile
                      prefix={<i className="material-icons-outlined">add</i>}>
                      <span className="text">Create Permission</span>
                    </Button>
                  )}
                  content={({ onClose }) => <PermissionsForm onClose={onClose} />}
                />
              )}

              {buttons.includes('create-admin') && hasPermission('admin.create') && (
                <ModalContainer
                  lg
                  title="Create Admin"
                  btnComponent={({ onClick }) => (
                    <Button
                      type="outline"
                      onClick={onClick}
                      iconMobile
                      prefix={<i className="material-icons-outlined">add</i>}>
                      <span className="text">Create Admin</span>
                    </Button>
                  )}
                  content={({ onClose }) => <AdminForm onClose={onClose} />}
                />
              )}
              {buttons.includes('create-role') && hasPermission('role.create') && (
                <ModalContainer
                  lg
                  title="Create Role"
                  btnComponent={({ onClick }) => (
                    <Button
                      type="outline"
                      onClick={onClick}
                      iconMobile
                      prefix={<i className="material-icons-outlined">add</i>}>
                      <span className="text">Create Role</span>
                    </Button>
                  )}
                  content={({ onClose }) => <RolesForm onClose={onClose} />}
                />
              )}

              {buttons.includes('create-testimonial') && hasPermission('testimonial.create') && (
                <ModalContainer
                  lg
                  title="Create Testimonial"
                  btnComponent={({ onClick }) => (
                    <Button
                      type="outline"
                      onClick={onClick}
                      iconMobile
                      prefix={<i className="material-icons-outlined">add</i>}>
                      <span className="text">Create Testimonial</span>
                    </Button>
                  )}
                  content={({ onClose }) => <TestimonialForm onClose={onClose} />}
                />
              )}

              {buttons.includes('create-post') && hasPermission('post.create') && (
                <ModalContainer
                  lg
                  title="Create Post"
                  btnComponent={({ onClick }) => (
                    <Button
                      type="outline"
                      onClick={onClick}
                      iconMobile
                      prefix={<i className="material-icons-outlined">add</i>}>
                      <span className="text">Create Post</span>
                    </Button>
                  )}
                  content={({ onClose }) => <BlogForm onClose={onClose} />}
                />
              )}

              {buttons.includes('create-category') && hasPermission('category.create') && (
                <ModalContainer
                  lg
                  title="Create Category"
                  btnComponent={({ onClick }) => (
                    <Button
                      type="outline"
                      onClick={onClick}
                      iconMobile
                      prefix={<i className="material-icons-outlined">add</i>}>
                      <span className="text">Create Category</span>
                    </Button>
                  )}
                  content={({ onClose }) => <CategoryForm onClose={onClose} />}
                />
              )}
              {buttons.includes('create-author') && hasPermission('author.create') && (
                <ModalContainer
                  lg
                  title="Create Author"
                  btnComponent={({ onClick }) => (
                    <Button
                      type="outline"
                      onClick={onClick}
                      iconMobile
                      prefix={<i className="material-icons-outlined">add</i>}>
                      <span className="text">Create Author</span>
                    </Button>
                  )}
                  content={({ onClose }) => <AuthorForm onClose={onClose} />}
                />
              )}
              {buttons.includes('create-toaster') && (
                // && hasPermission('author.create')
                <ModalContainer
                  lg
                  title="Add New Toaster"
                  btnComponent={({ onClick }) => (
                    <Button
                      type="outline"
                      onClick={onClick}
                      iconMobile
                      prefix={<i className="material-icons-outlined">add</i>}>
                      <span className="text">Add New Toaster</span>
                    </Button>
                  )}
                  content={({ onClose }) => <ToasterForm onClose={onClose} />}
                />
              )}
            </>
          )}
        </CreateButtonContainer>
        <FiltersHolder>
          <Form form={form} onSubmit={onSubmit}>
            <Grid lg={24} xl={24} gap={14}>
              {currentFilter?.filters?.includes('text') && (
                <GridCol lg={12} xl={6}>
                  <Form.Item
                    sm
                    noMargin
                    label="Search"
                    type="search"
                    name="searchText"
                    placeholder={`Search ${currentFilter.key}`}
                    value={searchText}
                    onChange={({ target: { value } }) => {
                      setSearchText(value);
                      form.setFieldsValue({ searchText: value });
                      onSearchCallText(value.trim());
                    }}
                    prefix={<i className="material-icons-outlined">search</i>}
                    clear={searchText}>
                    <Field maxLength="150" />
                  </Form.Item>
                </GridCol>
              )}

              {currentFilter?.filters?.includes('date') && (
                <GridCol lg={12} xl={6}>
                  <Form.Item
                    prefix={<i className="material-icons-outlined">date_range</i>}
                    placeholderText="Select date range"
                    type="datepicker"
                    label="Date Range"
                    name="dateRange"
                    noMargin
                    sm
                    selectsRange
                    clear={startDate || endDate}
                    startDate={startDate}
                    endDate={endDate}
                    style={{ width: '100%' }}
                    onChange={({ target: { value } }) => {
                      setDateRange(value);
                      form.setFieldsValue({ dateRange: value });
                      if (value?.length === 2 && value[0] && value[1]) {
                        applyFilters({ ...form.getFieldsValue(), dateRange: value });
                      }
                      if (value?.length === 2 && value[0] === null) {
                        applyFilters({ ...form.getFieldsValue(), dateRange: [null, null] });
                      }
                    }}>
                    <Field />
                  </Form.Item>
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
                  /// dont show status field
                  return key.toLowerCase().includes('filter') && key !== 'filterText';
                })
                .map((filter, index) => (
                  <GridCol lg={12} xl={6} key={index}>
                    <Form.Item
                      sm
                      noMargin
                      defaultOptions
                      name={`${filter}`}
                      label={`${currentFilter?.filtersData[filter]?.label}`}
                      isDisabled={loadingFilters}
                      loading={loadingFilters}
                      options={filterOptions[filter]}
                      placeholder={`${currentFilter.filtersData[filter].label}`}
                      value={filtersState[filter]}
                      prefix={<i className="material-icons-outlined">{currentFilter.filtersData[filter].icon}</i>}
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
                        form.setFieldsValue({ [filter]: value });
                        applyFilters({ ...form.getFieldsValue(), [filter]: value });
                      }}>
                      <Select />
                    </Form.Item>
                  </GridCol>
                ))}
              {currentFilter.filters
                .filter(key => key.toLowerCase().includes('searchable'))
                .map((filter, index) => (
                  <GridCol lg={12} xl={6} key={index}>
                    <Form.Item
                      sm
                      async
                      noMargin
                      defaultOptions
                      name={`${filter}`}
                      loadOptions={e => handleRequest(e, currentFilter.filtersData[filter])}
                      isDisabled={loadingFilters}
                      loading={loadingFilters}
                      options={filterOptions[filter]}
                      placeholder={`${currentFilter.filtersData[filter].label}`}
                      value={filtersState[filter] ?? { value: '', label: 'All' }}
                      prefix={<i className="material-icons-outlined">{currentFilter.filtersData[filter].icon}</i>}
                      label={currentFilter.filtersData[filter].label}
                      clear={filtersState[filter] && filtersState[filter].value}
                      onChange={({ target: { value } }) => {
                        setFiltersState(prevState => ({
                          ...prevState,
                          [filter]: value,
                        }));
                        form.setFieldsValue({ [filter]: value });
                        onChangeFilters({
                          [filter]: value?.value ?? '',
                          getFiltered: true,
                        });
                      }}>
                      <Select />
                    </Form.Item>
                  </GridCol>
                ))}

              {extraFilters}
            </Grid>
          </Form>
        </FiltersHolder>
      </>
    )
  );
}

export default Filters;
