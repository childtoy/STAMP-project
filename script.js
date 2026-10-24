const clips = [
 ['scenario-boxing','Boxing','Ready stance → Light jog → Lateral footwork → Advancing jab → Hook → Defensive crouch → Hook → Advancing jab','hardware'],
 ['scenario-speech','Keynote speech','Walk onstage → Greet the audience → Explain with gestures → Walk and present → Point to the screen','hardware'],
 ['scenario-traffic','Traffic control','Patrol → Scan while walking → Stop signal → Check the opposite direction → Direct traffic → Step back cautiously → Lateral footwork → Ready stance','hardware'],
 ['scenario-exploration','Exploration','Ready stance → Spot a clue → Crouch to inspect → Check a second clue → Point and compare → Identify a target → Move forward','hardware'],
 ['boxing','Boxing','Different sequences composed from the same motion primitives.','compilation'],
 ['traffic','Traffic Control I','Different sequences composed from the same motion primitives.','compilation'],
 ['traffic-alt','Traffic Control II','Different sequences composed from the same motion primitives.','compilation'],
 ['rank1','Alignment candidate · Rank 1','Lowest predicted transition cost in this qualitative candidate set.','alignment'],
 ['rank50','Alignment candidate · Rank 50','An alternative position, heading, and transition duration.','alignment'],
 ['rank200','Alignment candidate · Rank 200','Explore the motion generated under a different boundary arrangement.','alignment'],
 ['rank486','Alignment candidate · Rank 486','A lower-ranked arrangement from the supplied candidate visualization.','alignment']
];
function card([id,title,description,category]) {
 const el=document.createElement('article');el.className='clip';el.dataset.category=category;
 el.innerHTML=`<video src="${id}.mp4?v=20261022-5" poster="${id}.jpg" controls muted loop playsinline preload="none" aria-label="${title}"></video><h3>${title}</h3><p class="${id.startsWith('scenario-')?'sequence':''}">${description}</p>`;return el;
}
clips.forEach(c=>document.querySelector(c[3]==='alignment'?'#alignment-clips':c[3]==='compilation'?'#compilation-clips':'#clips').append(card(c)));
[['to-human','Robot → Human','Transfer the input robot motion to the shared human rig.',''],['rank1','Generated human transition','Generate the connecting motion in human space under the selected alignment.',''],['to-robot','Human → Robot','Transfer the completed human-space sequence back to the robot.','']].forEach(c=>document.querySelector('#retargeting').append(card(c)));
const mainVideo=document.querySelector('.hero-video');
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
const visibleDemos=new Set();
const manuallyPaused=new WeakSet();
function startDemo(video){
 if(document.hidden||reducedMotion.matches||manuallyPaused.has(video))return;
 video.muted=true;
 video.play().catch(()=>{});
}
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
 const video=entry.target;
 if(entry.isIntersecting&&entry.intersectionRatio>=0.35){visibleDemos.add(video);startDemo(video);}
 else{visibleDemos.delete(video);video.pause();}
}),{threshold:[0,0.35]});
document.querySelectorAll('video').forEach(video=>{
 {
  video.muted=true;
  video.addEventListener('pause',()=>{if(visibleDemos.has(video)&&!document.hidden&&!video.ended)manuallyPaused.add(video);});
  video.addEventListener('play',()=>manuallyPaused.delete(video));
 }
 observer.observe(video);
});
document.addEventListener('visibilitychange',()=>{
 if(document.hidden)document.querySelectorAll('video').forEach(video=>video.pause());
 else visibleDemos.forEach(startDemo);
});
