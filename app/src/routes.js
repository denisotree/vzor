import React from "react";
import {Route, Switch} from "react-router-dom";

import Home from "./containers/Home/Home";
import VideoListView from "./containers/VideoListView/VideoListView";
import VideoDetailView from "./containers/VideoDetailView/VideoDetailView";
import CategoryListView from './containers/CategoryListView/CategoryListView';
import CategoryDetailView from './containers/CategoryDetailView/CategoryDetailView';
import AuthorListView from './containers/AuthorListView';
import AuthorDetailView from './containers/AuthorDetailView/AuthorDetailView';
import Login from './containers/Login';
import Signup from './containers/Signup';
import PagesDetailView from "./containers/PagesDetailView";
import AuthorDashboard from "./containers/AuthorDashboard";
import NoMatch from "./containers/NoMatch";


const BaseRouter = () => (
    <Switch>
        <Route exact path="/" component={Home}/>{" "}
        <Route exact path="/login/" component={Login}/>{" "}
        <Route exact path="/signup/" component={Signup}/>{" "}
        <Route exact path="/video/" component={VideoListView}/>{" "}
        <Route path="/video/:video/" component={VideoDetailView}/>{" "}
        <Route exact path="/categories/" component={CategoryListView}/>{" "}
        <Route path="/categories/:category/" component={CategoryDetailView}/>{" "}
        <Route exact path="/authors/" component={AuthorListView}/>{" "}
        <Route path="/authors/:author/" component={AuthorDetailView}/>{" "}
        <Route path="/dashboard/" component={AuthorDashboard}/>{" "}
        <Route path="/dashboard/:user/" component={AuthorDashboard}/>{" "}
        <Route path="/:page/" component={PagesDetailView}/>{" "}
        <Route component={NoMatch} />
    </Switch>
);

export default BaseRouter;
