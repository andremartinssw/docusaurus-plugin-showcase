/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */import React,{useState,useMemo,useEffect}from'react';import clsx from'clsx';import ExecutionEnvironment from'@docusaurus/ExecutionEnvironment';import Translate,{translate}from'@docusaurus/Translate';import{useHistory,useLocation}from'@docusaurus/router';import{usePluralForm}from'@docusaurus/theme-common';import Layout from'@theme/Layout';import FavoriteIcon from'@site/src/components/svgIcons/FavoriteIcon';import{sortedUsers,Tags,TagList}from'../../data/users';import ShowcaseTagSelect,{readSearchTags}from'./_components/ShowcaseTagSelect';import ShowcaseFilterToggle,{readOperator}from'./_components/ShowcaseFilterToggle';import ShowcaseCard from'./_components/ShowcaseCard';import ShowcaseTooltip from'./_components/ShowcaseTooltip';import styles from'./styles.module.css';var TITLE=translate({message:'SignalWire Guide Showcase'});var DESCRIPTION=translate({message:"This is SignalWire's list of guides for all products and all languages."});function restoreUserState(userState){var _document$getElementB;var _ref=userState!=null?userState:{scrollTopPosition:0,focusedElementId:undefined},scrollTopPosition=_ref.scrollTopPosition,focusedElementId=_ref.focusedElementId;// @ts-expect-error: if focusedElementId is undefined it returns null
(_document$getElementB=document.getElementById(focusedElementId))==null?void 0:_document$getElementB.focus();window.scrollTo({top:scrollTopPosition});}export function prepareUserState(){if(ExecutionEnvironment.canUseDOM){var _document$activeEleme;return{scrollTopPosition:window.scrollY,focusedElementId:(_document$activeEleme=document.activeElement)==null?void 0:_document$activeEleme.id};}return undefined;}var SearchNameQueryKey='name';function readSearchName(search){return new URLSearchParams(search).get(SearchNameQueryKey);}function filterUsers(users,selectedTags,operator,searchName){if(searchName){// eslint-disable-next-line no-param-reassign
users=users.filter(function(user){return user.title.toLowerCase().includes(searchName.toLowerCase());});}if(selectedTags.length===0){return users;}return users.filter(function(user){if(user.tags.length===0){return false;}if(operator==='AND'){return selectedTags.every(function(tag){return user.tags.includes(tag);});}return selectedTags.some(function(tag){return user.tags.includes(tag);});});}function useFilteredUsers(){var location=useLocation();var _useState=useState('OR'),operator=_useState[0],setOperator=_useState[1];// On SSR / first mount (hydration) no tag is selected
var _useState2=useState([]),selectedTags=_useState2[0],setSelectedTags=_useState2[1];var _useState3=useState(null),searchName=_useState3[0],setSearchName=_useState3[1];// Sync tags from QS to state (delayed on purpose to avoid SSR/Client
// hydration mismatch)
useEffect(function(){setSelectedTags(readSearchTags(location.search));setOperator(readOperator(location.search));setSearchName(readSearchName(location.search));restoreUserState(location.state);},[location]);return useMemo(function(){return filterUsers(sortedUsers,selectedTags,operator,searchName);},[selectedTags,operator,searchName]);}function ShowcaseHeader(){return/*#__PURE__*/React.createElement("section",{className:"margin-top--lg margin-bottom--lg text--center"},/*#__PURE__*/React.createElement("h1",null,TITLE),/*#__PURE__*/React.createElement("p",null,DESCRIPTION));}function useSiteCountPlural(){var _usePluralForm=usePluralForm(),selectMessage=_usePluralForm.selectMessage;return function(sitesCount){return selectMessage(sitesCount,translate({id:'showcase.filters.resultCount',description:'Pluralized label for the number of sites found on the showcase. Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',message:'1 guide|{sitesCount} guides'},{sitesCount:sitesCount}));};}function ShowcaseFilters(){var filteredUsers=useFilteredUsers();var siteCountPlural=useSiteCountPlural();var FilteredTagList;return/*#__PURE__*/React.createElement("section",{className:"container margin-top--l margin-bottom--lg"},/*#__PURE__*/React.createElement("div",{className:clsx('margin-bottom--sm',styles.filterCheckbox)},/*#__PURE__*/React.createElement("div",null,/*#__PURE__*/React.createElement("h2",null,/*#__PURE__*/React.createElement(Translate,{id:"showcase.filters.title"},"Filters")),/*#__PURE__*/React.createElement("span",null,siteCountPlural(filteredUsers.length))),/*#__PURE__*/React.createElement(ShowcaseFilterToggle,null)),/*#__PURE__*/React.createElement("h4",{style:{marginBottom:'auto'}},/*#__PURE__*/React.createElement(Translate,{id:"showcase.filters.title"},"Product")),/*#__PURE__*/React.createElement("ul",{className:clsx('clean-list',styles.checkboxList)},TagList.filter(function(tag){return tag.includes('prod');}).map(function(tag,i){var _Tags$tag=Tags[tag],label=_Tags$tag.label,description=_Tags$tag.description,color=_Tags$tag.color;var id="showcase_checkbox_id_"+tag;return/*#__PURE__*/React.createElement("li",{key:i,className:styles.checkboxListItem},/*#__PURE__*/React.createElement(ShowcaseTooltip,{id:id,text:description,anchorEl:"#__docusaurus"},/*#__PURE__*/React.createElement(ShowcaseTagSelect,{tag:tag,id:id,label:label,icon:tag==='favorite'?/*#__PURE__*/React.createElement(FavoriteIcon,{svgClass:styles.svgIconFavoriteXs}):/*#__PURE__*/React.createElement("span",{style:{backgroundColor:color,width:10,height:10,borderRadius:'50%',marginLeft:8}})})));})),/*#__PURE__*/React.createElement("h4",{style:{marginBottom:'auto'}},/*#__PURE__*/React.createElement(Translate,{id:"showcase.filters.title"},"SDK")),/*#__PURE__*/React.createElement("ul",{className:clsx('clean-list',styles.checkboxList)},TagList.filter(function(tag){return tag.includes('sdk');}).map(function(tag,i){var _Tags$tag2=Tags[tag],label=_Tags$tag2.label,description=_Tags$tag2.description,color=_Tags$tag2.color;var id="showcase_checkbox_id_"+tag;return/*#__PURE__*/React.createElement("li",{key:i,className:styles.checkboxListItem},/*#__PURE__*/React.createElement(ShowcaseTooltip,{id:id,text:description,anchorEl:"#__docusaurus"},/*#__PURE__*/React.createElement(ShowcaseTagSelect,{tag:tag,id:id,label:label,icon:tag==='favorite'?/*#__PURE__*/React.createElement(FavoriteIcon,{svgClass:styles.svgIconFavoriteXs}):/*#__PURE__*/React.createElement("span",{style:{backgroundColor:color,width:10,height:10,borderRadius:'50%',marginLeft:8}})})));})),/*#__PURE__*/React.createElement("h4",{style:{marginBottom:'auto'}},/*#__PURE__*/React.createElement(Translate,{id:"showcase.filters.title"},"Language")),/*#__PURE__*/React.createElement("ul",{className:clsx('clean-list',styles.checkboxList)},TagList.filter(function(tag){return tag.includes('lang');}).map(function(tag,i){var _Tags$tag3=Tags[tag],label=_Tags$tag3.label,description=_Tags$tag3.description,color=_Tags$tag3.color;var id="showcase_checkbox_id_"+tag;return/*#__PURE__*/React.createElement("li",{key:i,className:styles.checkboxListItem},/*#__PURE__*/React.createElement(ShowcaseTooltip,{id:id,text:description,anchorEl:"#__docusaurus"},/*#__PURE__*/React.createElement(ShowcaseTagSelect,{tag:tag,id:id,label:label,icon:tag==='favorite'?/*#__PURE__*/React.createElement(FavoriteIcon,{svgClass:styles.svgIconFavoriteXs}):/*#__PURE__*/React.createElement("span",{style:{backgroundColor:color,width:10,height:10,borderRadius:'50%',marginLeft:8}})})));})));}var favoriteUsers=sortedUsers.filter(function(user){return user.tags.includes('favorite');});var otherUsers=sortedUsers.filter(function(user){return!user.tags.includes('favorite');});function SearchBar(){var history=useHistory();var location=useLocation();var _useState4=useState(null),value=_useState4[0],setValue=_useState4[1];useEffect(function(){setValue(readSearchName(location.search));},[location]);return/*#__PURE__*/React.createElement("div",{className:styles.searchContainer},/*#__PURE__*/React.createElement("input",{id:"searchbar",placeholder:translate({message:'Search for a guide by name...',id:'showcase.searchBar.placeholder'}),value:value!=null?value:undefined,onInput:function onInput(e){setValue(e.currentTarget.value);var newSearch=new URLSearchParams(location.search);newSearch["delete"](SearchNameQueryKey);if(e.currentTarget.value){newSearch.set(SearchNameQueryKey,e.currentTarget.value);}history.push(Object.assign({},location,{search:newSearch.toString(),state:prepareUserState()}));setTimeout(function(){var _document$getElementB2;(_document$getElementB2=document.getElementById('searchbar'))==null?void 0:_document$getElementB2.focus();},0);}}));}function ShowcaseCards(){var filteredUsers=useFilteredUsers();if(filteredUsers.length===0){return/*#__PURE__*/React.createElement("section",{className:"margin-top--lg margin-bottom--xl"},/*#__PURE__*/React.createElement("div",{className:"container padding-vert--md text--center"},/*#__PURE__*/React.createElement("h2",null,/*#__PURE__*/React.createElement(Translate,{id:"showcase.usersList.noResult"},"No result")),/*#__PURE__*/React.createElement(SearchBar,null)));}return/*#__PURE__*/React.createElement("section",{className:"margin-top--lg margin-bottom--xl"},filteredUsers.length===sortedUsers.length?/*#__PURE__*/React.createElement(React.Fragment,null,/*#__PURE__*/React.createElement("div",{className:styles.showcaseFavorite},/*#__PURE__*/React.createElement("div",{className:"container"},/*#__PURE__*/React.createElement("div",{className:clsx('margin-bottom--md',styles.showcaseFavoriteHeader)},/*#__PURE__*/React.createElement("h2",null,/*#__PURE__*/React.createElement(Translate,{id:"showcase.favoritesList.title"},"Our favorites")),/*#__PURE__*/React.createElement(FavoriteIcon,{svgClass:styles.svgIconFavorite}),/*#__PURE__*/React.createElement(SearchBar,null)),/*#__PURE__*/React.createElement("ul",{className:clsx('container','clean-list',styles.showcaseList)},favoriteUsers.map(function(user){return/*#__PURE__*/React.createElement(ShowcaseCard,{key:user.title,user:user});})))),/*#__PURE__*/React.createElement("div",{className:"container margin-top--lg"},/*#__PURE__*/React.createElement("h2",{className:styles.showcaseHeader},/*#__PURE__*/React.createElement(Translate,{id:"showcase.usersList.allUsers"},"All guides")),/*#__PURE__*/React.createElement("ul",{className:clsx('clean-list',styles.showcaseList)},otherUsers.map(function(user){return/*#__PURE__*/React.createElement(ShowcaseCard,{key:user.title,user:user});})))):/*#__PURE__*/React.createElement("div",{className:"container"},/*#__PURE__*/React.createElement("div",{className:clsx('margin-bottom--md',styles.showcaseFavoriteHeader)},/*#__PURE__*/React.createElement(SearchBar,null)),/*#__PURE__*/React.createElement("ul",{className:clsx('clean-list',styles.showcaseList)},filteredUsers.map(function(user){return/*#__PURE__*/React.createElement(ShowcaseCard,{key:user.title,user:user});}))));}export default function Showcase(){return/*#__PURE__*/React.createElement(Layout,null,/*#__PURE__*/React.createElement("main",{className:"margin-vert--lg"},/*#__PURE__*/React.createElement(ShowcaseHeader,null),/*#__PURE__*/React.createElement(ShowcaseFilters,null),/*#__PURE__*/React.createElement(ShowcaseCards,null)));}