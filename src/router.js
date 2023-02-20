import React from 'react';
import Loadable from 'react-loadable';

const Loading = () => <div>Loading...</div>;


const Home = Loadable({
    loader: () => import('./Component/Home/Home'),
    loading: Loading,
});
const FilmDetail = Loadable({
    loader: () => import('./Component/FilmDetail/FilmDetail'),
    loading: Loading,
});
const SystemCinema = Loadable({
    loader: () => import('./Component/SystemCinema/SystemCinema'),
    loading: Loading,
});
const InfoSysCinema = Loadable({
    loader: () => import('./Component/SystemCinema/InfoSysCinema'),
    loading: Loading,
});

const Router = [
    {
        path: "/home",
        element: <Home />,
    },
    {
        path: "/film/:id/",
        element: <FilmDetail />,
    },
    {
        path: "/SystemCinema/",
        element: <SystemCinema />,
    },
    {
        path: "/SystemCinema/:slug/",
        element: <InfoSysCinema />,
    },
]
export default Router;