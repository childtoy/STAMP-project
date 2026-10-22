const clips = [
 ['scenario-boxing','Boxing','Ready stance → Light jog → Lateral footwork → Advancing jab → Hook → Defensive crouch → Hook → Advancing jab','hardware'],
 ['scenario-speech','Keynote speech','Walk onstage → Greet the audience → Explain with gestures → Walk and present → Point to the screen','hardware'],
 ['scenario-traffic','Traffic control','Patrol → Scan while walking → Stop signal → Check the opposite direction → Direct traffic → Step back cautiously → Lateral footwork → Ready stance','hardware'],
 ['scenario-exploration','Exploration','Ready stance → Spot a clue → Crouch to inspect → Check a second clue → Point and compare → Identify a target → Move forward','hardware'],
 ['rank1','Alignment candidate · Rank 1','Lowest predicted transition cost in this qualitative candidate set.','alignment'],
 ['rank50','Alignment candidate · Rank 50','An alternative position, heading, and transition duration.','alignment'],
 ['rank200','Alignment candidate · Rank 200','Explore the motion generated under a different boundary arrangement.','alignment'],
 ['rank486','Alignment candidate · Rank 486','A lower-ranked arrangement from the supplied candidate visualization.','alignment']
];
function card([id,title,description,category]) {
 const el=document.createElement('article');el.className='clip';el.dataset.category=category;
 el.innerHTML=`<video src="${id}.mp4?v=20261022-2" poster="${id}.jpg" controls muted loop playsinline preload="none" aria-label="${title}"></video><h3>${title}</h3><p class="${id.startsWith('scenario-')?'sequence':''}">${description}</p>`;return el;
}
clips.forEach(c=>document.querySelector(c[3]==='alignment'?'#alignment-clips':'#clips').append(card(c)));
[['to-human','Robot → Human','Transfer the input robot motion to the shared human rig.',''],['rank1','Generated human transition','Generate the connecting motion in human space under the selected alignment.',''],['to-robot','Human → Robot','Transfer the completed human-space sequence back to the robot.','']].forEach(c=>document.querySelector('#retargeting').append(card(c)));
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)entry.target.pause();}),{threshold:0.05});
document.querySelectorAll('video').forEach(v=>observer.observe(v));
