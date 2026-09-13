/* content.js 의 데이터를 화면에 그리는 스크립트. 내용 수정은 content.js 에서 합니다. */
(function () {
  const C = window.CONTENT;
  if (!C) { document.body.innerHTML = "<p style='padding:40px'>content.js 를 찾을 수 없습니다.</p>"; return; }

  const esc = (s) => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const nl = (s) => esc(s).replace(/\n/g, "<br>");
  const list = (arr, cls) => arr && arr.length ? `<ul class="${cls}">${arr.map(x => `<li>${nl(x)}</li>`).join("")}</ul>` : "";
  const badge = (t, kind = "secondary") => `<span class="badge badge--${kind}">${esc(t)}</span>`;
  const chev = `<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>`;

  const $ = (id) => document.getElementById(id);
  const icoCopy = `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
  const icoCheck = `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>`;

  /* 상단 이름 · 문서 제목 */
  document.title = `${C.profile.name} · 경력 기술서`;
  $("nav-name").textContent = C.profile.name;

  /* 히어로 */
  const p = C.profile;
  $("hero").innerHTML = `
    <div class="hero__ident">
      <div class="avatar ${p.avatar ? "avatar--photo" : ""}">${p.avatar
        ? `<img src="${esc(p.avatar)}" alt="${esc(p.name)}">`
        : `<span>${esc(p.initials || p.name.slice(0, 1))}</span>`}</div>
      <div>
        <h1 class="hero__name">${esc(p.name)}</h1>
        <div class="hero__meta">
          <span class="mono">${esc(p.nameEn)}</span>
          <span class="dot" aria-hidden="true"></span>
          <span>${esc(p.role)}</span>
        </div>
      </div>
    </div>
    <p class="hero__headline">${esc(p.headline)}</p>
    <p class="hero__summary">${nl(p.summary)}</p>
    <div class="hero__links">
      ${p.email ? `<button type="button" class="btn btn--primary" data-copy="${esc(p.email)}" data-label="이메일 주소 복사">${icoCopy}<span>이메일 주소 복사</span></button><a class="btn btn--outline print-only" href="mailto:${esc(p.email)}">${esc(p.email)}</a>` : ""}
      ${(p.links || []).map(l => `<a class="btn btn--outline" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} ↗</a>`).join("")}
    </div>
    ${p.stats && p.stats.length ? `<div class="stats">${p.stats.map(s => `
      <div class="stat"><div class="stat__value">${esc(s.value)}</div><div class="stat__label">${esc(s.label)}</div></div>`).join("")}</div>` : ""}
    <div class="timeline">
      ${(C.timeline || []).map(t => `
        <div class="timeline__row">
          <div class="timeline__period">${esc(t.period)}</div>
          <div class="timeline__main"><span class="timeline__org">${esc(t.org)}</span><span class="timeline__note">${esc(t.note)}</span></div>
        </div>`).join("")}
    </div>`;

  /* 업무 판단 기준 */
  const pr = C.principles;
  $("principles").innerHTML = `
    <p class="quote">${nl(pr.quote)}</p>
    <div class="principles">
      ${pr.items.map(i => `
        <div class="principle card">
          <span class="principle__kw badge badge--outline">${esc(i.keyword)}</span>
          <p class="principle__claim">${nl(i.claim)}</p>
          <p class="principle__body">${nl(i.body)}</p>
        </div>`).join("")}
    </div>
    ${pr.goal ? `<div class="goal"><span class="goal__label">${esc(pr.goal.label || "인생 목표")}</span><span class="goal__title">${esc(pr.goal.title)}</span></div>` : ""}`;

  /* 작업 이력 */
  $("skills").innerHTML = `<div class="skills">${(C.skills || []).map(g => `
    <div class="skill"><div class="skill__group">${esc(g.group)}</div><ul>${(g.items || []).map(i => `<li>${badge(i, "secondary")}</li>`).join("")}</ul></div>`).join("")}</div>`;

  /* 경력 */
  const sub = (x) => `
    <details class="sub">
      <summary><span><span class="sub__title">${esc(x.title)}</span>${x.slogan ? `<span class="sub__slogan">${esc(x.slogan)}</span>` : ""}</span>${chev}</summary>
      <div class="sub__body">${x.lead ? `<p class="work__lead">${nl(x.lead)}</p>` : ""}${list(x.points, "work__points")}</div>
    </details>`;

  const work = (w) => `
    <details class="work">
      <summary>
        <div>
          <div class="work__title">${esc(w.title)}</div>
          ${w.slogan ? `<div class="work__slogan">${esc(w.slogan)}</div>` : ""}
        </div>
        ${chev}
      </summary>
      <div class="work__body">
        ${w.lead ? `<p class="work__lead">${nl(w.lead)}</p>` : ""}
        ${list(w.points, "work__points")}
        ${w.subs && w.subs.length ? `<div class="subs">${w.subs.map(sub).join("")}</div>` : ""}
        ${w.lesson ? `<div class="work__lesson"><strong>배운 점</strong>${nl(w.lesson)}</div>` : ""}
      </div>
    </details>`;

  const project = (pj) => `
    <article class="project card">
      <div class="project__top ${pj.image ? "has-img" : ""}">
        <div>
          <h4 class="project__name">${esc(pj.name)}</h4>
          <div class="project__tags">${pj.engine ? badge(pj.engine, "outline") : ""}</div>
          <div class="project__genre">${nl(pj.genre)}</div>
          ${pj.duties && pj.duties.length ? `<div class="project__label">담당 업무</div>${list(pj.duties, "project__duties")}` : ""}
        </div>
        ${pj.image ? `<div class="project__img ${/logo/.test(pj.image) ? "project__img--contain" : ""}"><img src="${esc(pj.image)}" alt="${esc(pj.imageAlt || pj.name)}" loading="lazy"></div>` : ""}
      </div>
      <div class="project__main">${(pj.works || []).map(work).join("")}</div>
    </article>`;

  $("careers").innerHTML = (C.careers || []).map(c => `
    <section class="career" id="career-${esc(c.id)}">
      <div class="career__head">
        <h3 class="career__org">${esc(c.org)}</h3>
        <span class="career__meta">${esc(c.period)}</span>
        <span class="career__role">${esc(c.role)}</span>
      </div>
      ${c.projects.map(project).join("")}
    </section>`).join("");

  /* 개인 프로젝트 · 상용작 기반 설계 (같은 카드 형태) */
  const rich = (s) => nl(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  const pcard = (pp) => {
    const links = pp.links || (pp.link ? [pp.link] : []);
    return `
    <article class="personal card">
      <div class="personal__top ${pp.thumb ? "has-thumb" : ""}">
        <div>
          <div class="personal__head">
            <h4 class="personal__name">${esc(pp.name)}</h4>
            ${pp.status ? badge(pp.status, "default") : ""}
          </div>
          ${(pp.tags && pp.tags.length) || pp.engine ? `<div class="personal__tags">${(pp.tags || []).map(t => badge(t, "secondary")).join("")}${pp.engine ? badge(pp.engine, "outline") : ""}</div>` : ""}
          <div class="personal__genre">${nl(pp.genre)}</div>
        </div>
        ${pp.thumb ? `<div class="personal__thumb"><img src="${esc(pp.thumb)}" alt="${esc(pp.thumbAlt || pp.name)}" loading="lazy"></div>` : ""}
      </div>
      ${pp.image ? `<div class="personal__img"><img src="${esc(pp.image)}" alt="${esc(pp.imageAlt || pp.name)}" loading="lazy"></div>` : ""}
      ${pp.slogan ? `<p class="personal__slogan">${esc(pp.slogan)}</p>` : ""}
      ${pp.lead ? `<p class="personal__lead">${nl(pp.lead)}</p>` : ""}
      ${list(pp.points, "personal__points")}
      ${pp.blocks && pp.blocks.length ? `<div class="blocks">${pp.blocks.map(b => `
        <div class="block">
          <div class="block__label">${esc(b.label)}</div>
          ${b.items && b.items.length ? `<ul>${b.items.map(i => `<li>${rich(i)}</li>`).join("")}</ul>` : ""}
        </div>`).join("")}</div>` : ""}
      ${pp.gallery && pp.gallery.length ? `
        <div class="gallery">${pp.gallery.map(g => `<figure><img src="${esc(g.src)}" alt="${esc(g.caption)}" loading="lazy"><figcaption>${esc(g.caption)}</figcaption></figure>`).join("")}</div>
        ${pp.galleryNote ? `<div class="gallery__note">${esc(pp.galleryNote)}</div>` : ""}` : ""}
      ${links.length ? `<div class="personal__links">${links.map(l => `<a class="btn btn--outline btn--sm" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} ↗</a>`).join("")}</div>` : ""}
    </article>`;
  };

  $("personal").innerHTML = (C.personal || []).map(pcard).join("");

  if (C.designPortfolio && C.designPortfolio.length) {
    $("design-portfolio").innerHTML = C.designPortfolio.map(pcard).join("");
  } else {
    $("design-section").hidden = true;
  }

  /* 마무리 */
  $("closing").innerHTML = `
    ${(C.closing && C.closing.lines || []).map(l => `<p>${nl(l)}</p>`).join("")}
    <div class="contact">
      ${p.email ? `<button type="button" class="btn btn--primary btn--sm" data-copy="${esc(p.email)}" data-label="${esc(p.email)}" aria-label="이메일 주소 복사: ${esc(p.email)}">${icoCopy}<span>${esc(p.email)}</span></button><a class="btn btn--outline btn--sm print-only" href="mailto:${esc(p.email)}">${esc(p.email)}</a>` : ""}
      ${(p.links || []).map(l => `<a class="btn btn--outline btn--sm" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} ↗</a>`).join("")}
    </div>`;
  $("footer").textContent = `© ${new Date().getFullYear()} ${p.name}`;

  /* 이메일 주소 복사 */
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.setAttribute("role", "status");
  toast.setAttribute("aria-live", "polite");
  toast.hidden = true;
  document.body.appendChild(toast);
  let toastTimer;
  const showToast = (html, ms) => {
    toast.innerHTML = html;
    toast.hidden = false;
    requestAnimationFrame(() => toast.classList.add("is-on"));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove("is-on");
      setTimeout(() => { toast.hidden = true; }, 200);
    }, ms);
  };

  const copyText = async (text) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch (e) { /* 아래 방식으로 재시도 */ }
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      ta.remove();
      return ok;
    } catch (e) {
      return false;
    }
  };

  document.addEventListener("click", async (ev) => {
    const btn = ev.target.closest("[data-copy]");
    if (!btn) return;
    const text = btn.getAttribute("data-copy");
    const label = btn.getAttribute("data-label") || text;
    if (await copyText(text)) {
      btn.innerHTML = `${icoCheck}<span>복사했습니다</span>`;
      setTimeout(() => { btn.innerHTML = `${icoCopy}<span>${esc(label)}</span>`; }, 1800);
      showToast(`이메일 주소를 복사했습니다 <span class="toast__sub">${esc(text)}</span>`, 2200);
    } else {
      showToast(`복사가 막혀 있습니다. 주소를 직접 복사해 주세요 <span class="toast__sub toast__sel">${esc(text)}</span>`, 6000);
    }
  });
  /* 인쇄 · PDF: 접힌 항목을 모두 펼칩니다. 주소 끝에 ?print 를 붙이면 처음부터 펼친 상태로 열립니다 */
  const openAll = () => document.querySelectorAll("details").forEach((d) => {
    if (!d.open) { d.dataset.printOpened = "1"; d.open = true; }
  });
  const closeOpened = () => document.querySelectorAll("details[data-print-opened]").forEach((d) => {
    d.open = false; delete d.dataset.printOpened;
  });
  window.addEventListener("beforeprint", openAll);
  window.addEventListener("afterprint", closeOpened);
  if (/[?&]print\b/.test(location.search)) openAll();
})();
