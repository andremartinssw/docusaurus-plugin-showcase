import _createForOfIteratorHelperLoose from"/home/martins/Code/docusaurus-plugin-showcase/node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelperLoose.js";import _regeneratorRuntime from"/home/martins/Code/docusaurus-plugin-showcase/node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js";import _asyncToGenerator from"/home/martins/Code/docusaurus-plugin-showcase/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js";var _require=require('@docusaurus/utils'),parseMarkdownString=_require.parseMarkdownString,normalizeUrl=_require.normalizeUrl;var fs=require('fs-extra');var fg=require('fast-glob');var path=require('path');var DEFAULT_OPTIONS={include:"**/*.{md,mdx}",// Extensions to include.
path:"docs",// Path to data on filesystem, relative to site dir.
routeBasePath:"docs"// URL Route.
};var articles=[];module.exports=function(context,options){return{name:'docusaurus-plugin-showcase',processMetadata:function processMetadata(filePath,siteDir){return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(){var fileStringPromise,contents,_parseMarkdownString,_parseMarkdownString$,frontMatter,contentTitle,excerpt,article;return _regeneratorRuntime().wrap(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:fileStringPromise=fs.readFile(filePath,'utf-8');_context.next=3;return fileStringPromise;case 3:contents=_context.sent;_parseMarkdownString=parseMarkdownString(contents,{removeContentTitle:true}),_parseMarkdownString$=_parseMarkdownString.frontMatter,frontMatter=_parseMarkdownString$===void 0?{}:_parseMarkdownString$,contentTitle=_parseMarkdownString.contentTitle,excerpt=_parseMarkdownString.excerpt;console.log(contentTitle,excerpt);article={};if(!(frontMatter["x-custom"]!=undefined&&frontMatter["x-custom"]["tags"]!=undefined)){_context.next=11;break;}article.tags=frontMatter["x-custom"]["tags"];_context.next=13;break;case 11:console.log(filePath,"IS MISSING PROPER TAGS");return _context.abrupt("return");case 13:if(!(frontMatter.title!=undefined)){_context.next=17;break;}article.title=frontMatter.title;_context.next=23;break;case 17:if(!(contentTitle!=undefined)){_context.next=21;break;}article.title=contentTitle;_context.next=23;break;case 21:console.log(filePath,"IS MISSING A TITLE");return _context.abrupt("return");case 23:if(!(frontMatter.description!=undefined)){_context.next=27;break;}article.description=frontMatter.description;_context.next=33;break;case 27:if(!(excerpt!=undefined)){_context.next=31;break;}article.description=excerpt;_context.next=33;break;case 31:console.log(filePath,"IS MISSING A DESCRIPTION");return _context.abrupt("return");case 33:if(!(frontMatter.slug!=undefined)){_context.next=37;break;}article.website=frontMatter.slug;_context.next=39;break;case 37:console.log(filePath,"IS MISSING A SLUG");return _context.abrupt("return");case 39:if(frontMatter["x-custom"]!=undefined&&frontMatter["x-custom"]["repo"]!=undefined){article.source=frontMatter["x-custom"]["repo"];}console.log("ADDING ARTICLE",article);articles.push(article);case 42:case"end":return _context.stop();}}},_callee);}))();},loadContent:function loadContent(){var _this=this;return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(){var siteDir,docsFiles,_iterator,_step,filePath;return _regeneratorRuntime().wrap(function _callee2$(_context2){while(1){switch(_context2.prev=_context2.next){case 0:siteDir=context.siteDir;console.log(siteDir);_context2.next=4;return fg(path.join(siteDir,DEFAULT_OPTIONS.path,DEFAULT_OPTIONS.include),{ignore:['**/node_modules/**']});case 4:docsFiles=_context2.sent;console.log(docsFiles);_iterator=_createForOfIteratorHelperLoose(docsFiles);case 7:if((_step=_iterator()).done){_context2.next=13;break;}filePath=_step.value;_context2.next=11;return _this.processMetadata(filePath,siteDir);case 11:_context2.next=7;break;case 13:fs.writeFile(siteDir+'/src/data/articles.json',JSON.stringify(articles,null,2));case 14:case"end":return _context2.stop();}}},_callee2);}))();},contentLoaded:function contentLoaded(_ref){return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(){var addRoute;return _regeneratorRuntime().wrap(function _callee3$(_context3){while(1){switch(_context3.prev=_context3.next){case 0:addRoute=_ref.actions.addRoute;console.log(normalizeUrl(['showcase']));addRoute({path:'/showcase',component:'docusaurus-plugin-showcase/src/pages/showcase',exact:true});case 3:case"end":return _context3.stop();}}},_callee3);}))();}};};