import { lazy, useState, useEffect, Suspense, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Toast from '../components/molecules/Toast';
import PageTemplate from '../components/templates/PageTemplate';
import Loaders from '../components/atoms/Loaders';
import pages from '../nav.json';
import { AuthContext } from 'context/authContext';

const importView = async file =>
  lazy(() =>
    import(`./${file}`).catch(() => {
      Toast({
        type: 'error',
        message: `Error in importing ${file}`,
      });
    }),
  );

export default function Index() {
  const [selectedView, setSelectedView] = useState([]);
  const { view, child } = useParams();

  const history = useNavigate();

  const { allowedPages: __allowedPages, loading_user, user } = useContext(AuthContext);

  const metaViewData = pages;

  async function loadView(filtered) {
    const promise = filtered.map(async _view => {
      const View = await importView(_view?.file);

      return <View key={_view.id} selectView={selectView} />;
    });
    Promise.all(promise).then(setSelectedView);
  }

  async function selectView(file) {
    const filtered = metaViewData
      .map(({ subNav = [], ...item }) => [item, ...subNav])
      .flat(Infinity)
      .filter(elem => elem.file === file);
    loadView([filtered[0]]);
  }

  useEffect(() => {
    if (user?.email && !loading_user) {
      let fileToLoad = view;
      
      const allowedPages = __allowedPages;
      const normalizedAllowed = __allowedPages.map(p => p.replace(/^\//, "")); // remove leading "/"
    if (!normalizedAllowed.includes(fileToLoad)) {
        fileToLoad = allowedPages.length > 0 ? allowedPages[0] : 'no-permissions';
      }
      if (
        !metaViewData
          .filter(({ live }) => live)
          .map(({ file, subNav = [] }) => [file, ...subNav.filter(({ live }) => live).map(({ file }) => file)])
          .flat(Infinity)
          .includes(fileToLoad) ||
        !fileToLoad ||
        fileToLoad === 'null' ||
        fileToLoad === 'dashboard/null'
      ) {
        fileToLoad = 'dashboard';
      }
      if (allowedPages.length === 1 && allowedPages[0] === 'no-permissions') {
        fileToLoad = 'no-permissions';
      }
      if (allowedPages.includes(fileToLoad)) {
        fileToLoad = allowedPages[allowedPages.indexOf(fileToLoad)];
      }
      if (child) {
        history(`/${view}/${child}`, { replace: true });
      } else {
        history(`/${fileToLoad}`, { replace: true });
      }

      selectView(child || fileToLoad);
    }
  }, [view, loading_user, child]);

  return loading_user ? (
    <Loaders buttonLoader={undefined} height={undefined} loading={undefined} children={undefined} />
  ) : (
    <PageTemplate
      title={view}
      showTemplate={
        metaViewData?.filter(elem => elem.file === view)[0]?.navigations ||
        metaViewData?.filter(elem => elem.file === view)[0]?.subNav?.filter(({ file }) => file === view)[0]?.navigations
      }
      topBar>
      <Suspense fallback={<Loaders />}>{selectedView}</Suspense>
    </PageTemplate>
  );
}
