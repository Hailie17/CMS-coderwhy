import{e as s,d as a,o as u,c as _,b as n,t as o,u as c}from"./index.509d8252.js";import{_ as i}from"./_plugin-vue_export-helper.cdc0426e.js";const d=s("counter",{state:()=>({counter:100}),getters:{doubleCounter(e){return e.counter*2}},actions:{changeCounterAction(e){this.counter=e}}}),l={class:"main"},p=a({__name:"Main",setup(e){const t=d();function r(){t.changeCounterAction(999)}return(m,f)=>(u(),_("div",l,[n("h2",null,"main: "+o(c(t).counter)+"-"+o(c(t).doubleCounter),1),n("button",{onClick:r},"\u4FEE\u6539counter")]))}});const b=i(p,[["__scopeId","data-v-e287400b"]]);export{b as default};
