"use client";
import { useEffect, useState } from "react";

const links=[
  ["inicio","Inicio"],["bitacora","Bitácora"],["origen","El oficio"],
  ["recomendador","Tu puro"],["puros","La jauría"],["conservacion","Cava"],
];
const basePath=process.env.NEXT_PUBLIC_BASE_PATH||"";

export default function Experience(){
 const[open,setOpen]=useState(false);const[progress,setProgress]=useState(0);
 useEffect(()=>{
  const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const targets=[...document.querySelectorAll("main>section:not(.hero),.journal-grid article,.product,.other-lines article")];
  targets.forEach(node=>node.classList.add("reveal-ready"));
  const observer=reduce?null:new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("revealed");observer?.unobserve(entry.target)}}),{rootMargin:"0px 0px -9% 0px",threshold:.08});
  if(observer)targets.forEach(node=>observer.observe(node));else targets.forEach(node=>node.classList.add("revealed"));
  const onScroll=()=>{const available=document.documentElement.scrollHeight-window.innerHeight;setProgress(available>0?window.scrollY/available*100:0);document.body.classList.toggle("page-scrolled",window.scrollY>80)};
  onScroll();window.addEventListener("scroll",onScroll,{passive:true});
  return()=>{observer?.disconnect();window.removeEventListener("scroll",onScroll);document.body.classList.remove("page-scrolled")};
 },[]);
 function go(id:string){setOpen(false);document.getElementById(id)?.scrollIntoView({behavior:"smooth"})}
 return <><div className="reading-progress" style={{transform:`scaleX(${progress/100})`}}/><div className="smoke-atmosphere" aria-hidden="true"><i/><i/><i/></div><button className={`mobile-menu-trigger ${open?"open":""}`} onClick={()=>setOpen(!open)} aria-label={open?"Cerrar menú":"Abrir menú"} aria-expanded={open}><span/><span/></button><div className={`mobile-menu ${open?"open":""}`} aria-hidden={!open}><img className="mobile-menu-logo" src={`${basePath}/images/logo-perro-negro.svg`} alt="Tabaco Perro Negro"/><p>Explora Tabaco Perro Negro</p><nav>{links.map(([id,label],index)=><button key={id} onClick={()=>go(id)}><small>{String(index+1).padStart(2,"0")}</small><span>{label}</span><b>→</b></button>)}</nav><small>Tabaco ecuatoriano · Solo +18</small></div></>
}
