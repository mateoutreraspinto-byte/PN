"use client";
import { useState } from "react";

type Answers={experience:string;strength:string;time:string;journey:string};
const initial:Answers={experience:"",strength:"",time:"",journey:""};
const basePath=process.env.NEXT_PUBLIC_BASE_PATH||"";

const recommendations=[
 {name:"Faldero",image:"faldero",match:(a:Answers)=>a.strength==="suave"||a.experience==="nuevo",why:"Su perfil moderado y casual ofrece una entrada amable a la jauría."},
 {name:"Cachorro",image:"cachorro",match:(a:Answers)=>a.journey==="cambiante"&&a.time==="corto",why:"Pequeño, juguetón y ascendente: cambia de expresión sin exigir una fumada larga."},
 {name:"Mestizo",image:"mestizo",match:(a:Answers)=>a.strength==="media"&&a.journey==="equilibrada",why:"Su mezcla armónica reúne cuerpo, balance y carácter ecuatoriano."},
 {name:"Vagabundo",image:"vagabundo",match:(a:Answers)=>a.journey==="constante"&&a.time!=="corto",why:"Recorre su cepo sin prisa, con una evolución ordenada y constante."},
 {name:"Goloso",image:"goloso",match:(a:Answers)=>a.strength==="alta"&&a.time==="corto",why:"Corta distancia, gran calibre y matices saturados para una experiencia concentrada."},
 {name:"Arisco",image:"arisco",match:(a:Answers)=>a.strength==="alta"&&a.journey==="cambiante",why:"Intenso desde el encendido y con capas que continúan sorprendiendo."},
 {name:"Revoltoso",image:"revoltoso",match:(a:Answers)=>a.experience==="experto"&&a.journey==="cambiante",why:"Viaja de lo ligero a lo complejo y premia a quien disfruta leer cada tercio."},
 {name:"Ocioso",image:"ocioso",match:(a:Answers)=>a.time==="largo"&&a.journey==="equilibrada",why:"Tercios definidos y complejidad sosegada para fumar sin apuro."},
 {name:"Alevoso",image:"alevoso",match:(a:Answers)=>a.experience==="experto"&&a.strength==="alta",why:"Fortaleza constante y presencia prominente para paladares habituados."},
 {name:"Callejero",image:"callejero",match:(a:Answers)=>a.time==="largo"&&a.journey==="constante",why:"Cuerpo robusto, madurez y armonía para una fumada contemplativa."},
];

const questions=[
 {key:"experience",title:"Tu experiencia",options:[["nuevo","Estoy empezando"],["ocasional","Fumo ocasionalmente"],["experto","Conozco bien los puros"]]},
 {key:"strength",title:"La intensidad que buscas",options:[["suave","Suave y aromática"],["media","Media y equilibrada"],["alta","Alta y firme"]]},
 {key:"time",title:"Cuánto tiempo tienes",options:[["corto","Un momento corto"],["medio","Sin mucha prisa"],["largo","Una fumada larga"]]},
 {key:"journey",title:"Cómo prefieres el recorrido",options:[["equilibrada","Armónico y redondo"],["cambiante","Cambiante por tercios"],["constante","Constante y sereno"]]},
] as const;

export default function Matcher(){
 const[answers,setAnswers]=useState<Answers>(initial);const[step,setStep]=useState(0);const[result,setResult]=useState<typeof recommendations[number]|null>(null);
 const question=questions[step];
 function choose(value:string){const next={...answers,[question.key]:value};setAnswers(next);if(step<questions.length-1)setStep(step+1);else setResult(recommendations.find(item=>item.match(next))||recommendations[2]);}
 function reset(){setAnswers(initial);setStep(0);setResult(null)}
 return <section className="matcher" id="recomendador"><div className="matcher-intro"><p className="section-number">Tu carácter · 03</p><h2>Encuentra a tu<br/><em>Perro Negro.</em></h2><p>Cuatro preguntas para acercarte a la pieza que mejor encaja con tu experiencia, ritmo e intensidad preferida.</p></div><div className="matcher-card">{result?<div className="match-result"><img src={`${basePath}/images/${result.image}.svg`} alt={`Puro recomendado ${result.name}`}/><div><p className="eyebrow">Tu compañero es</p><h3>{result.name}</h3><p>{result.why}</p><div className="match-actions"><a href="#puros">Ver en la jauría</a><button onClick={reset}>Repetir guía</button></div></div></div>:<><div className="match-progress"><span>{String(step+1).padStart(2,"0")} / 04</span><div><i style={{width:`${(step+1)*25}%`}}/></div></div><p className="eyebrow">{question.title}</p><h3>¿Cuál te representa mejor?</h3><div className="match-options">{question.options.map(([value,label])=><button key={value} onClick={()=>choose(value)}><span>{label}</span><b>→</b></button>)}</div></>}</div></section>
}
