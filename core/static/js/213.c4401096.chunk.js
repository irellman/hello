"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[213],{8349:function(e,n,t){t.d(n,{Z:function(){return c}});var r=t(2791),a=t(4164),o="Modal_modal_wrapper__MFou9",s=t(184),c=function(e){var n=e.open,t=e.onMouseDown,c=e.children,i=document.querySelector("body"),u=(0,r.useRef)();(0,r.useEffect)((function(){var e=document.querySelector("body");return function(){e.removeAttribute("style")}}),[]),(0,r.useEffect)((function(){var e=document.querySelector("body");n?e.style.overflow="hidden":e.removeAttribute("style")}),[n]);var l=function(e){e.target===u.current&&t()};return(0,a.createPortal)(n?(0,s.jsx)("div",{className:o,onMouseDown:function(e){return l(e)},ref:u,children:c}):(0,s.jsx)(s.Fragment,{}),i)}},2931:function(e,n,t){t.d(n,{Z:function(){return N}});var r=t(2791),a=t(4302),o=t(6156),s=t(5861),c=t(885),i=t(7757),u=t.n(i),l=t(6871),d=t(8660),p=t(3374),f=t(2357),v=t(1932),h=t(4569),_=t.n(h),x=function(){var e=(0,l.UO)(),n=(0,r.useState)("string"===typeof e.id&&"all-posts"!==e.id?Number(e.id):0),t=(0,c.Z)(n,1)[0],a=(0,d.C)((function(e){return e.collectionsReducer})).find((function(e){return e.id===t})),o=null===a||void 0===a?void 0:a.posts.posts,i=(0,r.useState)(Math.floor((null===o||void 0===o?void 0:o.length)/12)),h=(0,c.Z)(i,2),x=h[0],m=h[1],g=null===a||void 0===a?void 0:a.posts.hasNextPage,N=(0,d.T)(),w=(0,r.useRef)(),j=(0,p.Z)((0,s.Z)(u().mark((function e(){var n,r,a,o,s,c;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=new FormData,r=v.x.actions,a=r.addPosts,o=r.setHasNextPage,n.append("collection_id",String(t)),n.append("page",String(x)),e.next=6,_().post("http://127.0.0.1:8000/api/collection/get",n);case 6:s=e.sent,c=s.data,N(a({id:t,posts:c.posts})),c.hasNextPage||N(o({id:t,value:c.hasNextPage}));case 10:case"end":return e.stop()}}),e)})))),C=(0,c.Z)(j,3),M=C[0],b=C[1];C[2];return(0,f.Z)(w,b,g,(function(){m((function(e){return e+1}))})),(0,r.useEffect)((function(){M()}),[x]),{posts:o,isFetching:b,hasNextPage:g,lastElement:w}},m=t(274),g=t(184),N=function(){var e=x(),n=e.posts,t=e.hasNextPage,r=e.lastElement;return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(a.Z,{posts:n}),t&&n.length>0&&(0,g.jsx)("div",{className:m.Z.loader,ref:r,children:(0,g.jsx)(o.c,{})})]})}},1787:function(e,n,t){t.d(n,{LU:function(){return p},P4:function(){return d},Yu:function(){return u},bG:function(){return l},iu:function(){return f}});var r=t(5861),a=t(7757),o=t.n(a),s=t(4569),c=t.n(s),i=t(1932),u=function(e){return function(){var n=(0,r.Z)(o().mark((function n(t){var r,a,s,u;return o().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=i.x.actions.addCollection,(a=new FormData).append("collection_name",e),n.next=5,c().post("http://127.0.0.1:8000/api/collection/create",a);case 5:s=n.sent,u=s.data,t(r(u));case 8:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}()},l=function(){return function(){var e=(0,r.Z)(o().mark((function e(n){var t,r,a;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=i.x.actions.setCollections,e.next=3,c().post("http://127.0.0.1:8000/api/collections/get");case 3:r=e.sent,(a=r.data).length&&n(t(a));case 6:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}()},d=function(e){return function(){var n=(0,r.Z)(o().mark((function n(t){var r,a,s;return o().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=new FormData,a=i.x.actions.removeCollection,r.append("collection_id",String(e)),n.next=5,c().post("http://127.0.0.1:8000/api/collection/delete",r);case 5:s=n.sent,"ok"===s.data.status&&t(a(e));case 8:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}()},p=function(e,n){return function(){var t=(0,r.Z)(o().mark((function t(r){var a,s,u;return o().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=new FormData,s=i.x.actions.renameCollection,a.append("collection_id",String(e)),a.append("collection_name",n),t.next=6,c().post("http://127.0.0.1:8000/api/collection/rename",a);case 6:u=t.sent,"ok"===u.data.status&&r(s({id:Number(e),name:n}));case 9:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},f=function(e,n){return function(){var t=(0,r.Z)(o().mark((function t(r){var a,s,u,l,d,p;return o().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=new FormData,s=i.x.actions,u=s.addPosts,l=s.setHasNextPage,a.append("collection_id",String(e)),a.append("page",String(n)),t.next=6,c().post("http://127.0.0.1:8000/api/collection/get",a);case 6:d=t.sent,p=d.data,r(u({id:Number(e),posts:p.posts})),p.hasNextPage||r(l({id:Number(e),value:p.hasNextPage}));case 10:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}},213:function(e,n,t){t.r(n),t.d(n,{default:function(){return G}});var r=t(885),a=t(2791),o=t(8660),s=t(1787),c="Saved_container__hHT2f",i="Saved_nothing__rLm5W",u="Saved_title__EFz+M",l="Saved_subtitle__+NsMd",d=t(8349),p=t(5861),f=t(7757),v=t.n(f),h="NewCollectionModal_modal__GbwL1",_="NewCollectionModal_header__GtK+q",x="NewCollectionModal_body__sx0St",m="NewCollectionModal_input__d1gPL",g="NewCollectionModal_button__S+fD3",N="NewCollectionModal_button_disabled__mqKgv",w=t(184),j=function(e){var n=e.setModalIsOpen,t=(0,a.useState)(""),c=(0,r.Z)(t,2),i=c[0],u=c[1],l=(0,o.T)(),d=function(){var e=(0,p.Z)(v().mark((function e(){return v().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(i.length){e.next=2;break}return e.abrupt("return");case 2:l((0,s.Yu)(i)),n(!1);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return(0,w.jsxs)("div",{className:h,onMouseDown:function(e){return e.stopPropagation()},children:[(0,w.jsx)("div",{className:_,children:"\u041d\u043e\u0432\u0430\u044f \u043f\u043e\u0434\u0431\u043e\u0440\u043a\u0430"}),(0,w.jsx)("div",{className:x,children:(0,w.jsx)("input",{className:m,type:"text",placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u043f\u043e\u0434\u0431\u043e\u0440\u043a\u0438",value:i,onChange:function(e){return u(e.target.value)}})}),(0,w.jsx)("div",{className:i.length?g:N,onClick:function(){return d()},children:"\u0421\u043e\u0437\u0434\u0430\u0442\u044c"})]})},C=j,M=t(3504),b="Collections_collections__m+CZK",Z="Collections_collection__aHoef",y="Collections_overlay__3JxRQ",S="Collections_name__pFYcc",k=function(){var e=(0,o.C)((function(e){return e.collectionsReducer}));return(0,w.jsx)("div",{className:b,children:e.map((function(e,n){return(0,w.jsx)("div",{className:Z,style:{backgroundImage:"url(http://127.0.0.1:8000".concat(e.image,")")},children:(0,w.jsx)(M.rU,{className:y,to:"/saved/".concat(0===e.id?"all-posts":e.id),children:(0,w.jsx)("div",{className:S,children:e.name})})},n)}))})},P=t(4483),F=t(3174),D="MainHeader_wrapper__78gaa",H="MainHeader_container__H1-8P",E="MainHeader_title__xBgJq",q="MainHeader_add__p7UXO",O=function(e){var n=e.setModalIsOpen;return(0,w.jsx)("div",{className:D,children:(0,w.jsxs)("div",{className:H,children:[(0,w.jsx)("div",{className:E,children:"\u0421\u043f\u0438\u0441\u043e\u043a \u0441\u043e\u0445\u0440\u0430\u043d\u0435\u043d\u043d\u043e\u0433\u043e \u0432\u0438\u0434\u0435\u043d \u0442\u043e\u043b\u044c\u043a\u043e \u0432\u0430\u043c"}),(0,w.jsx)("div",{className:q,onClick:function(){return n(!0)},children:(0,w.jsx)(P.G,{icon:F.r8p})})]})})},R=t(2931),G=function(){var e=(0,a.useState)(!1),n=(0,r.Z)(e,2),t=n[0],p=n[1],f=(0,o.C)((function(e){return e.collectionsReducer})),v=(0,o.T)();return(0,a.useEffect)((function(){0===f.length&&v((0,s.bG)())}),[]),(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(O,{setModalIsOpen:p}),(0,w.jsxs)("div",{className:c,children:[0===f.length&&(0,w.jsxs)("div",{className:i,children:[(0,w.jsx)("div",{className:u,children:"\u0421\u043e\u0445\u0440\u0430\u043d\u044f\u0439\u0442\u0435"}),(0,w.jsx)("div",{className:l,children:"\u0421\u043e\u0445\u0440\u0430\u043d\u044f\u0439\u0442\u0435 \u0444\u043e\u0442\u043e \u0438 \u0432\u0438\u0434\u0435\u043e, \u043a\u043e\u0442\u043e\u0440\u044b\u0435 \u0445\u043e\u0442\u0438\u0442\u0435 \u043f\u043e\u0441\u043c\u043e\u0442\u0440\u0435\u0442\u044c \u0441\u043d\u043e\u0432\u0430. \u041d\u0438\u043a\u0442\u043e \u043d\u0435 \u043f\u043e\u043b\u0443\u0447\u0438\u0442 \u0443\u0432\u0435\u0434\u043e\u043c\u043b\u0435\u043d\u0438\u044f \u043e\u0431 \u044d\u0442\u043e\u043c, \u0430 \u0441\u043e\u0445\u0440\u0430\u043d\u0435\u043d\u043d\u044b\u0435 \u043e\u0431\u044a\u0435\u043a\u0442\u044b \u0441\u043c\u043e\u0436\u0435\u0442\u0435 \u0432\u0438\u0434\u0435\u0442\u044c \u0442\u043e\u043b\u044c\u043a\u043e \u0432\u044b."})]}),f.length>1?(0,w.jsx)(k,{}):(0,w.jsx)(R.Z,{})]}),(0,w.jsx)(d.Z,{open:t,onMouseDown:function(){return p(!1)},children:(0,w.jsx)(C,{setModalIsOpen:p})})]})}}}]);
//# sourceMappingURL=213.c4401096.chunk.js.map