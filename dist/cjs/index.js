"use strict";var n=require("react"),r=require("styled-components");function t(n,r){return Object.defineProperty?Object.defineProperty(n,"raw",{value:r}):n.raw=r,n}n.createContext({state:{_global:{treeVisible:!0,selectedNode:" ",loading:!1,error:!1}},dispatch:function(){return null}});var e="#346187",o="#DB2777",i="#F9F9F9",a=r.button((function(){return{color:e,position:"relative",backgroundColor:"transparent",border:0,cursor:"pointer",padding:"0.25rem 0.5rem",transition:"0.25s","&:hover":{backgroundColor:"#DDD"}}}));r.span((function(){var n;return(n={opacity:0,pointerEvents:"none",position:"absolute",fontSize:"0.75rem",textWrap:"nowrap",top:"-1.25rem",left:"50%",transform:"translateX(-50%)",backgroundColor:e,color:"#FFF",borderRadius:"5px",transition:"0.25s"})["".concat(a,":hover &")]={opacity:1,padding:"0.25rem 0.5rem"},n})),r.div((function(){return{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%",height:"2rem",padding:"0 0.5rem",marginBottom:"0.5rem",boxShadow:"0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",backgroundColor:"#FFF"}}));var d="600px",c="900px",s="1280px",l="1440px",p="1920px",b={xs:"(max-width: ".concat("400px",")"),sm:"(max-width: ".concat(d,")"),md:"(max-width: ".concat(c,")"),lg:"(max-width: ".concat(s,")"),xl:"(max-width: ".concat(l,")"),xxl:"(max-width: ".concat(p,")")};r.div((function(n){var r;return(r={display:"flex",flexDirection:"column",height:"100%",border:"1px solid #DDD",backgroundColor:i,transition:"0.25s",width:n.isToggled?"20%":"0%",opacity:n.isToggled?n.isLoading||n.error?.5:1:0,pointerEvents:n.isLoading||n.error?"none":"auto"})["@media (".concat(b.sm,")")]={width:n.isToggled?"100%":"0%",height:n.isToggled?"100%":"0%"},r})),r.div((function(){return{display:"flex",alignItems:"center"}}));var g,u=r.input.attrs({type:"checkbox"})(g||(g=t(["\n    position: absolute;\n    opacity: 0;\n"],["\n    position: absolute;\n    opacity: 0;\n"])));r.label((function(){var n;return(n={cursor:"pointer",padding:"0.25rem 0.5rem",border:"1px solid #ccc",borderRadius:"0.25rem",transition:"background-color 0.25s, color 0.25s, border 0.25s","&:hover":{backgroundColor:"#DDD"}})["".concat(u,":checked + &")]={backgroundColor:e,borderColor:e,color:"#FFF"},n})),r.div((function(){return{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%",height:"2rem",padding:"0 0.5rem",marginBottom:"0.5rem",boxShadow:"0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",backgroundColor:"#FFF","& > div":{display:"flex",alignItems:"center"}}})),r.div((function(){return{marginLeft:"1rem",display:"flex",columnGap:"0.25rem"}})),r.div((function(n){var r;return(r={display:"flex",flexDirection:"column",flex:5,height:"100%",border:"1px solid #ddd",backgroundColor:i,opacity:n.isLoading||n.error?.5:1,pointerEvents:n.isLoading||n.error?"none":"auto"})["@media (".concat(b.sm,")")]={flexDirection:"column"},r}));var x,m,f,h,y=r.keyframes(x||(x=t(["\n  to {\n    transform: rotate(1turn);\n  }\n"],["\n  to {\n    transform: rotate(1turn);\n  }\n"])));r.div((function(){return{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)"}})),r.div(f||(f=t(["\n    width: 50px;\n    aspect-ratio: 1;\n    border-radius: 50%;\n    padding: 1px;\n    background: conic-gradient(#0000 10%, ",") content-box;\n    -webkit-mask: \n      repeating-conic-gradient(#0000 0deg, #000 1deg 20deg, #0000 21deg 36deg),\n      radial-gradient(farthest-side, #0000 calc(100% - "," - 1px), #000 calc(100% - ","));\n    -webkit-mask-composite: destination-in;\n    animation: ",";\n"],["\n    width: 50px;\n    aspect-ratio: 1;\n    border-radius: 50%;\n    padding: 1px;\n    background: conic-gradient(#0000 10%, ",") content-box;\n    -webkit-mask: \n      repeating-conic-gradient(#0000 0deg, #000 1deg 20deg, #0000 21deg 36deg),\n      radial-gradient(farthest-side, #0000 calc(100% - "," - 1px), #000 calc(100% - ","));\n    -webkit-mask-composite: destination-in;\n    animation: ",";\n"])),e,"8px","8px",(function(){return r.css(m||(m=t([""," 1s infinite steps(10);"],[""," 1s infinite steps(10);"])),y)})),r.span((function(){return{position:"absolute",display:"flex",flexDirection:"column",left:"50%",top:"50%",transform:"translate(-50%, -50%)",color:o,fontSize:"1.25rem"}})),r.button((function(){return{display:"flex",alignSelf:"center",justifyContent:"center",alignItems:"center",backgroundColor:"transparent",border:"0",width:"3rem",height:"3rem",fontSize:"2.5rem",color:o,cursor:"pointer",transition:"1s",opacity:.6,"&:hover":{opacity:1,transform:"rotate(360deg)"}}})),r.main((function(n){var r;return(r={position:"relative",display:"flex",width:"100%",height:"100%",boxShadow:"0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"})["@media (".concat(b.sm,")")]={flexDirection:"column"},r})),r.createGlobalStyle(h||(h=t(["\n    \n    html {\n        box-sizing: border-box;\n    }\n    *, *:before, *:after {\n        box-sizing: inherit;\n    }\n    body {\n        font-family: 'SFProDisplayLight', sans-serif;\n        font-weight: 300;\n        font-size: 15px;\n    }\n    body ::-webkit-scrollbar {\n        border-radius: 10px;\n        width: 10px;\n    }\n    \n    body ::-webkit-scrollbar-thumb {\n        background: #ccc !important;\n        border-radius: 10px;\n    }\n"],["\n    \n    html {\n        box-sizing: border-box;\n    }\n    *, *:before, *:after {\n        box-sizing: inherit;\n    }\n    body {\n        font-family: 'SFProDisplayLight', sans-serif;\n        font-weight: 300;\n        font-size: 15px;\n    }\n    body ::-webkit-scrollbar {\n        border-radius: 10px;\n        width: 10px;\n    }\n    \n    body ::-webkit-scrollbar-thumb {\n        background: #ccc !important;\n        border-radius: 10px;\n    }\n"])));
//# sourceMappingURL=index.js.map
