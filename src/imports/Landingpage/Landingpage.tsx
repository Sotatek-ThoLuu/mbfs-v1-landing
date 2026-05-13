import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import svgPaths from "./svg-fpdiavvsjr";

gsap.registerPlugin(ScrollTrigger);

function useArrowAnimation() {
  useEffect(() => {
    const arrows = gsap.utils.toArray<HTMLElement>(
      '[data-name="Button"] [data-name="lue/arrow-right"], .arrow-btn [data-name="lue/arrow-right"]'
    );
    if (!arrows.length) return;

    const timelines: gsap.core.Timeline[] = [];

    arrows.forEach((arrow) => {
      const tl = gsap.timeline({ paused: true, delay: 0.5 });
      tl.to(arrow, { x: 5, duration: 0.8, ease: "power3.out" });
      tl.to(arrow, { x: 0, duration: 1, ease: "power2.in" });
      tl.to(arrow, { x: 4, duration: 0.7, ease: "power2.out" }, "+=1");
      tl.to(arrow, { x: 0, duration: 0.9, ease: "power1.in" });

      ScrollTrigger.create({
        trigger: arrow,
        start: "top 90%",
        once: true,
        onEnter: () => tl.restart(),
      });

      const btn = arrow.closest('[data-name="Button"], .arrow-btn') as HTMLElement | null;
      if (!btn) return;

      btn.addEventListener("mouseenter", () => {
        gsap.to(arrow, { x: 4, duration: 0.25, ease: "power2.out", overwrite: true });
      });
      btn.addEventListener("mouseleave", () => {
        gsap.to(arrow, { x: 0, duration: 0.25, ease: "power2.inOut", overwrite: true });
      });

      timelines.push(tl);
    });

    return () => {
      timelines.forEach((t) => t.kill());
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);
}

function useTitleReveal() {
  useEffect(() => {
    const accents = gsap.utils.toArray<HTMLElement>(".title-accent");
    accents.forEach((el) => {
      gsap.fromTo(
        el,
        { color: "#1a1c21" },
        {
          color: "#7a1f36",
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        }
      );
    });
    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);
}

function useCountUp(
  targetValue: number,
  options?: { prefix?: string; suffix?: string; decimals?: number; separator?: string }
) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obj = { val: 0 };
    const decimals = options?.decimals ?? 0;
    const prefix = options?.prefix ?? "";
    const separator = options?.separator ?? ".";

    const tween = gsap.to(obj, {
      val: targetValue,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        once: true,
      },
      onUpdate: () => {
        const raw = decimals > 0
          ? obj.val.toFixed(decimals).replace(".", ",")
          : Math.round(obj.val).toLocaleString("vi-VN").replace(/\./g, separator);
        el.textContent = prefix + raw + (options?.suffix ?? "");
      },
    });

    return () => { tween.kill(); };
  }, []);

  return ref;
}

function useProcessSection() {
  useEffect(() => {
    const title = document.querySelector<HTMLElement>('[data-name="process-title"]');
    const line = document.querySelector<SVGLineElement>('[data-name="progress-active"] line');
    const steps = gsap.utils.toArray<HTMLElement>('[data-step]');
    const container = document.querySelector<HTMLElement>('[data-name="Landingpage"]');
    if (!line || !steps.length) return;

    gsap.set(line, { strokeDasharray: 726, strokeDashoffset: 726 });

    gsap.to(line, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: steps[0],
        start: "top 130px",
        endTrigger: steps[steps.length - 1],
        end: "top 20%",
        scrub: 1,
        onUpdate: (self) => {
          const p = self.progress;
          steps.forEach((s, i) => {
            const threshold = Math.max(0, i / (steps.length - 1) - 0.05);
            s.toggleAttribute("data-active", p >= threshold);
          });
        },
      },
    });

    if (title && container) {
      ScrollTrigger.create({
        trigger: title,
        start: "top 120px",
        endTrigger: steps[steps.length - 1],
        end: "bottom 100px",
        onUpdate: (self) => {
          const offset = container.getBoundingClientRect().left;
          const progress = self.progress;

          if (progress <= 0) {
            gsap.set(title, { position: "absolute", top: 4421, left: 209, clearProps: "transform", zIndex: "" });
          } else if (progress >= 1) {
            const endY = self.end as number;
            gsap.set(title, { position: "absolute", top: endY + 120, left: 209, clearProps: "transform", zIndex: "" });
          } else {
            gsap.set(title, { position: "fixed", top: 130, left: 209 + offset, zIndex: 10 });
          }
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);
}

import imgRectangle7 from "./4f06a5e79fa81814d968eca1e7cf29df3170d4b9.png";
import imgFiaLogo from "./c4a7bf0dfe4112ce3057cdef870af9a4c8382e40.png";
import imgImage27 from "./b7d7eec955c61953c37607db4f32c3da2b1acac4.png";
import imgHanoiBlankMapSvg1 from "./c92182e4c25d6ce28a58e526218c723f85bf97a9.png";
import imgAnh11 from "./8f5011770a41bb269c4b11d22fb885e855a49476.png";
import img87733Bdd95954Fb79Df67Aba4B0Ab3501 from "./60f11fd261d8e7f7b4d558722e91b7269d626a2a.png";
import imgEllipse5 from "./34e641601d57335c15aa523f9492aa1726ab312d.png";
import imgLutSaDiBSungMtSDiuCaLutThuGiaTrGiaTangToThunLiChoKinhDoanh from "./bd4eb509d4196a58b4ad7bbea88640c30e2ede64.png";
import imgRectangle12 from "./7b0b2b9c414fe682261622e980873fb4bbd3110c.png";
import imgRectangle13 from "./3ac68e1d76387706b11cd0ffae6e7c18c30d3223.png";
import imgRectangle14 from "./ebe9ab1f5653ae5c9903549cec05f53c3d1d8330.png";
import imgRectangle15 from "./debc71a0169834b8561ab975df8e7ddd3b56906f.png";
import imgImage from "./a55b9528f6d3519125e017338185cab2c4ba96e4.png";
import imgImage1 from "./5b20a0bc0191797dc07d5e661f1c8e565a8b0f6c.png";
import imgImage2 from "./ec3e20d4edf24735a56bfca5346c68fb44a253b7.png";
import imgIllustration0 from "./0.png";
import imgIllustration1 from "./1.png";
import imgIllustration2 from "./2.png";
import imgIllustration3 from "./3.png";

function Frame110() {
  return (
    <div className="-translate-x-1/2 absolute h-[366px] left-1/2 opacity-8 top-[3890px] w-[748px]">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 748 366"
      >
        <g id="Group 34110">
          <path
            d={svgPaths.p486ff00}
            fill="var(--fill-0, #FFFAEC)"
            id="path16"
          />
          <path
            d={svgPaths.p2bb97980}
            fill="var(--fill-0, #FFFAEC)"
            id="path18"
          />
          <path
            d={svgPaths.p23a6ba80}
            fill="var(--fill-0, #FFFAEC)"
            id="path20"
          />
          <path
            d={svgPaths.p3afac2f0}
            fill="var(--fill-0, #FFFAEC)"
            id="path22"
          />
          <path
            d={svgPaths.p1165df00}
            fill="var(--fill-0, #FFFAEC)"
            id="path24"
          />
          <path
            d={svgPaths.p1b3ef100}
            fill="var(--fill-0, #FFFAEC)"
            id="path26"
          />
          <path
            d={svgPaths.p34521a80}
            fill="var(--fill-0, #FFFAEC)"
            id="path28"
          />
          <path
            d={svgPaths.p2363cf00}
            fill="var(--fill-0, #FFFAEC)"
            id="path30"
          />
          <path
            d={svgPaths.p322e5300}
            fill="var(--fill-0, #FFFAEC)"
            id="path32"
          />
          <path
            d={svgPaths.p35e15c00}
            fill="var(--fill-0, #FFFAEC)"
            id="path34"
          />
          <path
            d={svgPaths.p21787780}
            fill="var(--fill-0, #FFFAEC)"
            id="path36"
          />
          <path
            d={svgPaths.pf2e4300}
            fill="var(--fill-0, #FFFAEC)"
            id="path38"
          />
          <path
            d={svgPaths.p15edfc00}
            fill="var(--fill-0, #FFFAEC)"
            id="path40"
          />
          <path
            d={svgPaths.p22ffc300}
            fill="var(--fill-0, #FFFAEC)"
            id="path42"
          />
          <path
            d={svgPaths.p1a061670}
            fill="var(--fill-0, #FFFAEC)"
            id="path44"
          />
          <path
            d={svgPaths.p3c00a780}
            fill="var(--fill-0, #FFFAEC)"
            id="path46"
          />
          <path
            d={svgPaths.p1fe98200}
            fill="var(--fill-0, #FFFAEC)"
            id="path48"
          />
          <path
            d={svgPaths.p17824680}
            fill="var(--fill-0, #FFFAEC)"
            id="path50"
          />
          <path
            d={svgPaths.p3ef9e700}
            fill="var(--fill-0, #FFFAEC)"
            id="path52"
          />
          <path
            d={svgPaths.p132fe400}
            fill="var(--fill-0, #FFFAEC)"
            id="path54"
          />
          <path
            d={svgPaths.p314c6200}
            fill="var(--fill-0, #FFFAEC)"
            id="path56"
          />
          <path
            d={svgPaths.p3e8ee400}
            fill="var(--fill-0, #FFFAEC)"
            id="path58"
          />
          <path
            d={svgPaths.p5ac9480}
            fill="var(--fill-0, #FFFAEC)"
            id="path60"
          />
          <path
            d={svgPaths.p773d500}
            fill="var(--fill-0, #FFFAEC)"
            id="path62"
          />
          <path
            d={svgPaths.pde23a00}
            fill="var(--fill-0, #FFFAEC)"
            id="path64"
          />
          <path
            d={svgPaths.p1cc114b0}
            fill="var(--fill-0, #FFFAEC)"
            id="path66"
          />
          <path
            d={svgPaths.p1aaf7e80}
            fill="var(--fill-0, #FFFAEC)"
            id="path68"
          />
          <path
            d={svgPaths.p29ca7400}
            fill="var(--fill-0, #FFFAEC)"
            id="path70"
          />
          <path
            d={svgPaths.p5330c00}
            fill="var(--fill-0, #FFFAEC)"
            id="path72"
          />
          <path
            d={svgPaths.p31955600}
            fill="var(--fill-0, #FFFAEC)"
            id="path74"
          />
          <path
            d={svgPaths.p3f7eb400}
            fill="var(--fill-0, #FFFAEC)"
            id="path76"
          />
          <path
            d={svgPaths.pb745f80}
            fill="var(--fill-0, #FFFAEC)"
            id="path78"
          />
          <path
            d={svgPaths.p3a1af900}
            fill="var(--fill-0, #FFFAEC)"
            id="path80"
          />
          <path
            d={svgPaths.p2d075e00}
            fill="var(--fill-0, #FFFAEC)"
            id="path82"
          />
          <path
            d={svgPaths.p2ad70300}
            fill="var(--fill-0, #FFFAEC)"
            id="path84"
          />
          <path
            d={svgPaths.p23224600}
            fill="var(--fill-0, #FFFAEC)"
            id="path86"
          />
          <path
            d={svgPaths.p2f032400}
            fill="var(--fill-0, #FFFAEC)"
            id="path88"
          />
          <path
            d={svgPaths.p3f516d00}
            fill="var(--fill-0, #FFFAEC)"
            id="path90"
          />
          <path
            d={svgPaths.p34ac7300}
            fill="var(--fill-0, #FFFAEC)"
            id="path92"
          />
          <path
            d={svgPaths.pe848a00}
            fill="var(--fill-0, #FFFAEC)"
            id="path94"
          />
          <path
            d={svgPaths.p2b8e0000}
            fill="var(--fill-0, #FFFAEC)"
            id="path96"
          />
          <path
            d={svgPaths.p3ae2de00}
            fill="var(--fill-0, #FFFAEC)"
            id="path98"
          />
          <path
            d={svgPaths.p2eb98f00}
            fill="var(--fill-0, #FFFAEC)"
            id="path100"
          />
          <path
            d={svgPaths.p10d40f00}
            fill="var(--fill-0, #FFFAEC)"
            id="path102"
          />
          <path
            d={svgPaths.p259cc600}
            fill="var(--fill-0, #FFFAEC)"
            id="path104"
          />
          <path
            d={svgPaths.pf793e80}
            fill="var(--fill-0, #FFFAEC)"
            id="path106"
          />
          <path
            d={svgPaths.p2d984600}
            fill="var(--fill-0, #FFFAEC)"
            id="path108"
          />
          <path
            d={svgPaths.pacad300}
            fill="var(--fill-0, #FFFAEC)"
            id="path110"
          />
          <path
            d={svgPaths.pbd09200}
            fill="var(--fill-0, #FFFAEC)"
            id="path112"
          />
          <path
            d={svgPaths.p34880700}
            fill="var(--fill-0, #FFFAEC)"
            id="path114"
          />
          <path
            d={svgPaths.p3ecff80}
            fill="var(--fill-0, #FFFAEC)"
            id="path116"
          />
          <path
            d={svgPaths.p4a42f80}
            fill="var(--fill-0, #FFFAEC)"
            id="path118"
          />
          <path
            d={svgPaths.p1810d40}
            fill="var(--fill-0, #FFFAEC)"
            id="path120"
          />
          <path
            d={svgPaths.p2969c800}
            fill="var(--fill-0, #FFFAEC)"
            id="path122"
          />
          <path
            d={svgPaths.p1211a800}
            fill="var(--fill-0, #FFFAEC)"
            id="path124"
          />
          <path
            d={svgPaths.p33a0d600}
            fill="var(--fill-0, #FFFAEC)"
            id="path126"
          />
          <path
            d={svgPaths.p1c238480}
            fill="var(--fill-0, #FFFAEC)"
            id="path128"
          />
          <path
            d={svgPaths.p21d3ee80}
            fill="var(--fill-0, #FFFAEC)"
            id="path130"
          />
          <path
            d={svgPaths.p143cf300}
            fill="var(--fill-0, #FFFAEC)"
            id="path132"
          />
          <path
            d={svgPaths.p2f589980}
            fill="var(--fill-0, #FFFAEC)"
            id="path134"
          />
          <path
            d={svgPaths.p36f82500}
            fill="var(--fill-0, #FFFAEC)"
            id="path136"
          />
          <path
            d={svgPaths.p248ab980}
            fill="var(--fill-0, #FFFAEC)"
            id="path138"
          />
          <path
            d={svgPaths.p311c6a00}
            fill="var(--fill-0, #FFFAEC)"
            id="path140"
          />
          <path
            d={svgPaths.p3c936500}
            fill="var(--fill-0, #FFFAEC)"
            id="path142"
          />
          <path
            d={svgPaths.p565a80}
            fill="var(--fill-0, #FFFAEC)"
            id="path144"
          />
          <path
            d={svgPaths.p3785f5c0}
            fill="var(--fill-0, #FFFAEC)"
            id="path146"
          />
          <path
            d={svgPaths.pd082a00}
            fill="var(--fill-0, #FFFAEC)"
            id="path148"
          />
          <path
            d={svgPaths.pf760900}
            fill="var(--fill-0, #FFFAEC)"
            id="path150"
          />
          <path
            d={svgPaths.p372bfa80}
            fill="var(--fill-0, #FFFAEC)"
            id="path152"
          />
          <path
            d={svgPaths.p35434b00}
            fill="var(--fill-0, #FFFAEC)"
            id="path154"
          />
          <path
            d={svgPaths.p14137a00}
            fill="var(--fill-0, #FFFAEC)"
            id="path156"
          />
          <path
            d={svgPaths.p1d43bb00}
            fill="var(--fill-0, #FFFAEC)"
            id="path158"
          />
          <path
            d={svgPaths.p1a5c3d80}
            fill="var(--fill-0, #FFFAEC)"
            id="path160"
          />
          <path
            d={svgPaths.p31e5e080}
            fill="var(--fill-0, #FFFAEC)"
            id="path162"
          />
          <path
            d={svgPaths.p1149fb00}
            fill="var(--fill-0, #FFFAEC)"
            id="path164"
          />
          <path
            d={svgPaths.pd512780}
            fill="var(--fill-0, #FFFAEC)"
            id="path166"
          />
          <path
            d={svgPaths.p1008ee00}
            fill="var(--fill-0, #FFFAEC)"
            id="path168"
          />
          <path
            d={svgPaths.pc500f00}
            fill="var(--fill-0, #FFFAEC)"
            id="path170"
          />
          <path
            d={svgPaths.p38087f00}
            fill="var(--fill-0, #FFFAEC)"
            id="path172"
          />
          <path
            d={svgPaths.p1fc89700}
            fill="var(--fill-0, #FFFAEC)"
            id="path174"
          />
          <path
            d={svgPaths.p1df8e480}
            fill="var(--fill-0, #FFFAEC)"
            id="path176"
          />
          <path
            d={svgPaths.p105612c0}
            fill="var(--fill-0, #FFFAEC)"
            id="path178"
          />
          <path
            d={svgPaths.p352e3500}
            fill="var(--fill-0, #FFFAEC)"
            id="path180"
          />
          <path
            d={svgPaths.p15635800}
            fill="var(--fill-0, #FFFAEC)"
            id="path182"
          />
          <path
            d={svgPaths.p3f750100}
            fill="var(--fill-0, #FFFAEC)"
            id="path184"
          />
          <path
            d={svgPaths.p13a7cc80}
            fill="var(--fill-0, #FFFAEC)"
            id="path186"
          />
          <path
            d={svgPaths.p25176a00}
            fill="var(--fill-0, #FFFAEC)"
            id="path188"
          />
          <path
            d={svgPaths.p27de0180}
            fill="var(--fill-0, #FFFAEC)"
            id="path190"
          />
          <path
            d={svgPaths.pd394980}
            fill="var(--fill-0, #FFFAEC)"
            id="path192"
          />
          <path
            d={svgPaths.p22da58c0}
            fill="var(--fill-0, #FFFAEC)"
            id="path194"
          />
          <path
            d={svgPaths.p3b368f80}
            fill="var(--fill-0, #FFFAEC)"
            id="path196"
          />
          <path
            d={svgPaths.p1e3d3280}
            fill="var(--fill-0, #FFFAEC)"
            id="path198"
          />
          <path
            d={svgPaths.p1e6f8200}
            fill="var(--fill-0, #FFFAEC)"
            id="path200"
          />
          <path
            d={svgPaths.p33e9e800}
            fill="var(--fill-0, #FFFAEC)"
            id="path202"
          />
          <path
            d={svgPaths.p24a0ca00}
            fill="var(--fill-0, #FFFAEC)"
            id="path204"
          />
          <path
            d={svgPaths.p7c3c780}
            fill="var(--fill-0, #FFFAEC)"
            id="path206"
          />
          <path
            d={svgPaths.p540d000}
            fill="var(--fill-0, #FFFAEC)"
            id="path208"
          />
          <path
            d={svgPaths.p2903c280}
            fill="var(--fill-0, #FFFAEC)"
            id="path210"
          />
          <path
            d={svgPaths.p1019c380}
            fill="var(--fill-0, #FFFAEC)"
            id="path212"
          />
          <path
            d={svgPaths.p1ef4df40}
            fill="var(--fill-0, #FFFAEC)"
            id="path214"
          />
          <path
            d={svgPaths.p2efa9400}
            fill="var(--fill-0, #FFFAEC)"
            id="path216"
          />
          <path
            d={svgPaths.p1cda9e70}
            fill="var(--fill-0, #FFFAEC)"
            id="path218"
          />
          <path
            d={svgPaths.p47ec100}
            fill="var(--fill-0, #FFFAEC)"
            id="path220"
          />
          <path
            d={svgPaths.p7a98de0}
            fill="var(--fill-0, #FFFAEC)"
            id="path222"
          />
          <path
            d={svgPaths.p119bc800}
            fill="var(--fill-0, #FFFAEC)"
            id="path224"
          />
          <path
            d={svgPaths.p107fde80}
            fill="var(--fill-0, #FFFAEC)"
            id="path226"
          />
          <path
            d={svgPaths.p15c6a780}
            fill="var(--fill-0, #FFFAEC)"
            id="path228"
          />
          <path
            d={svgPaths.p3ccad100}
            fill="var(--fill-0, #FFFAEC)"
            id="path230"
          />
          <path
            d={svgPaths.p4233680}
            fill="var(--fill-0, #FFFAEC)"
            id="path232"
          />
          <path
            d={svgPaths.p76c0980}
            fill="var(--fill-0, #FFFAEC)"
            id="path234"
          />
          <path
            d={svgPaths.p2e9aec80}
            fill="var(--fill-0, #FFFAEC)"
            id="path236"
          />
          <path
            d={svgPaths.pc29bc0}
            fill="var(--fill-0, #FFFAEC)"
            id="path238"
          />
          <path
            d={svgPaths.p3f027a80}
            fill="var(--fill-0, #FFFAEC)"
            id="path240"
          />
          <path
            d={svgPaths.p3aa8e700}
            fill="var(--fill-0, #FFFAEC)"
            id="path242"
          />
          <path
            d={svgPaths.p3ec40300}
            fill="var(--fill-0, #FFFAEC)"
            id="path244"
          />
          <path
            d={svgPaths.p150e8100}
            fill="var(--fill-0, #FFFAEC)"
            id="path246"
          />
          <path
            d={svgPaths.p3ded8a80}
            fill="var(--fill-0, #FFFAEC)"
            id="path248"
          />
          <path
            d={svgPaths.p127d4f00}
            fill="var(--fill-0, #FFFAEC)"
            id="path250"
          />
          <path
            d={svgPaths.p2df07b00}
            fill="var(--fill-0, #FFFAEC)"
            id="path252"
          />
          <path
            d={svgPaths.p1a7c6f80}
            fill="var(--fill-0, #FFFAEC)"
            id="path254"
          />
          <path
            d={svgPaths.p2d3a7480}
            fill="var(--fill-0, #FFFAEC)"
            id="path256"
          />
          <path
            d={svgPaths.p31cc0000}
            fill="var(--fill-0, #FFFAEC)"
            id="path258"
          />
          <path
            d={svgPaths.p378b7a00}
            fill="var(--fill-0, #FFFAEC)"
            id="path260"
          />
          <path
            d={svgPaths.p3d2f5040}
            fill="var(--fill-0, #FFFAEC)"
            id="path262"
          />
          <path
            d={svgPaths.p2db65380}
            fill="var(--fill-0, #FFFAEC)"
            id="path264"
          />
          <path
            d={svgPaths.p1ad59e00}
            fill="var(--fill-0, #FFFAEC)"
            id="path266"
          />
          <path
            d={svgPaths.p1bd38c00}
            fill="var(--fill-0, #FFFAEC)"
            id="path268"
          />
          <path
            d={svgPaths.pb0bb2f0}
            fill="var(--fill-0, #FFFAEC)"
            id="path270"
          />
          <path
            d={svgPaths.p2756bd00}
            fill="var(--fill-0, #FFFAEC)"
            id="path272"
          />
          <path
            d={svgPaths.p3d0638d0}
            fill="var(--fill-0, #FFFAEC)"
            id="path274"
          />
          <path
            d={svgPaths.p14352880}
            fill="var(--fill-0, #FFFAEC)"
            id="path276"
          />
          <path
            d={svgPaths.p2cabfa00}
            fill="var(--fill-0, #FFFAEC)"
            id="path278"
          />
          <path
            d={svgPaths.p3bad3580}
            fill="var(--fill-0, #FFFAEC)"
            id="path280"
          />
          <path
            d={svgPaths.p4ceeff0}
            fill="var(--fill-0, #FFFAEC)"
            id="path282"
          />
          <path
            d={svgPaths.p2bc50e80}
            fill="var(--fill-0, #FFFAEC)"
            id="path284"
          />
          <path
            d={svgPaths.p2a187dc0}
            fill="var(--fill-0, #FFFAEC)"
            id="path286"
          />
          <path
            d={svgPaths.p2861a800}
            fill="var(--fill-0, #FFFAEC)"
            id="path288"
          />
          <path
            d={svgPaths.pc5980}
            fill="var(--fill-0, #FFFAEC)"
            id="path290"
          />
          <path
            d={svgPaths.p8991000}
            fill="var(--fill-0, #FFFAEC)"
            id="path292"
          />
          <path
            d={svgPaths.p10f95c00}
            fill="var(--fill-0, #FFFAEC)"
            id="path294"
          />
          <path
            d={svgPaths.p261a3c00}
            fill="var(--fill-0, #FFFAEC)"
            id="path296"
          />
          <path
            d={svgPaths.pe62100}
            fill="var(--fill-0, #FFFAEC)"
            id="path298"
          />
          <path
            d={svgPaths.pcf70b00}
            fill="var(--fill-0, #FFFAEC)"
            id="path300"
          />
          <path
            d={svgPaths.p2b654e00}
            fill="var(--fill-0, #FFFAEC)"
            id="path302"
          />
          <path
            d={svgPaths.p24e0b7f0}
            fill="var(--fill-0, #FFFAEC)"
            id="path304"
          />
          <path
            d={svgPaths.p33732b00}
            fill="var(--fill-0, #FFFAEC)"
            id="path306"
          />
          <path
            d={svgPaths.p1dd5e300}
            fill="var(--fill-0, #FFFAEC)"
            id="path308"
          />
          <path
            d={svgPaths.p3bee8e00}
            fill="var(--fill-0, #FFFAEC)"
            id="path310"
          />
          <path
            d={svgPaths.p8e70e00}
            fill="var(--fill-0, #FFFAEC)"
            id="path312"
          />
          <path
            d={svgPaths.p292a6600}
            fill="var(--fill-0, #FFFAEC)"
            id="path314"
          />
          <path
            d={svgPaths.p29e90980}
            fill="var(--fill-0, #FFFAEC)"
            id="path316"
          />
          <path
            d={svgPaths.p1ca96c00}
            fill="var(--fill-0, #FFFAEC)"
            id="path318"
          />
          <path
            d={svgPaths.p1b38e370}
            fill="var(--fill-0, #FFFAEC)"
            id="path320"
          />
          <path
            d={svgPaths.p1ca40700}
            fill="var(--fill-0, #FFFAEC)"
            id="path322"
          />
          <path
            d={svgPaths.p4dd3a00}
            fill="var(--fill-0, #FFFAEC)"
            id="path324"
          />
          <path
            d={svgPaths.p33d2ee00}
            fill="var(--fill-0, #FFFAEC)"
            id="path326"
          />
          <path
            d={svgPaths.pba2d300}
            fill="var(--fill-0, #FFFAEC)"
            id="path328"
          />
          <path
            d={svgPaths.pf410400}
            fill="var(--fill-0, #FFFAEC)"
            id="path330"
          />
          <path
            d={svgPaths.p37147200}
            fill="var(--fill-0, #FFFAEC)"
            id="path332"
          />
          <path
            d={svgPaths.p17e7b600}
            fill="var(--fill-0, #FFFAEC)"
            id="path334"
          />
          <path
            d={svgPaths.p1967ba00}
            fill="var(--fill-0, #FFFAEC)"
            id="path336"
          />
          <path
            d={svgPaths.p2aab9000}
            fill="var(--fill-0, #FFFAEC)"
            id="path338"
          />
          <path
            d={svgPaths.p27bb0100}
            fill="var(--fill-0, #FFFAEC)"
            id="path340"
          />
          <path
            d={svgPaths.p1ca0c5f0}
            fill="var(--fill-0, #FFFAEC)"
            id="path342"
          />
          <path
            d={svgPaths.pc76300}
            fill="var(--fill-0, #FFFAEC)"
            id="path344"
          />
          <path
            d={svgPaths.p15b26100}
            fill="var(--fill-0, #FFFAEC)"
            id="path346"
          />
          <path
            d={svgPaths.p2375fa00}
            fill="var(--fill-0, #FFFAEC)"
            id="path348"
          />
          <path
            d={svgPaths.p102b7700}
            fill="var(--fill-0, #FFFAEC)"
            id="path350"
          />
          <path
            d={svgPaths.p1351700}
            fill="var(--fill-0, #FFFAEC)"
            id="path352"
          />
          <path
            d={svgPaths.p34c5c80}
            fill="var(--fill-0, #FFFAEC)"
            id="path354"
          />
          <path
            d={svgPaths.p2651fd00}
            fill="var(--fill-0, #FFFAEC)"
            id="path356"
          />
          <path
            d={svgPaths.p9d7f800}
            fill="var(--fill-0, #FFFAEC)"
            id="path358"
          />
          <path
            d={svgPaths.p3956f500}
            fill="var(--fill-0, #FFFAEC)"
            id="path360"
          />
          <path
            d={svgPaths.p17648700}
            fill="var(--fill-0, #FFFAEC)"
            id="path362"
          />
          <path
            d={svgPaths.pe59bc00}
            fill="var(--fill-0, #FFFAEC)"
            id="path364"
          />
          <path
            d={svgPaths.pbff2080}
            fill="var(--fill-0, #FFFAEC)"
            id="path366"
          />
          <path
            d={svgPaths.pd108900}
            fill="var(--fill-0, #FFFAEC)"
            id="path368"
          />
          <path
            d={svgPaths.p1ffa9bf0}
            fill="var(--fill-0, #FFFAEC)"
            id="path370"
          />
          <path
            d={svgPaths.pf471300}
            fill="var(--fill-0, #FFFAEC)"
            id="path372"
          />
          <path
            d={svgPaths.p3ed2e7f0}
            fill="var(--fill-0, #FFFAEC)"
            id="path374"
          />
          <path
            d={svgPaths.p1f2c4e00}
            fill="var(--fill-0, #FFFAEC)"
            id="path376"
          />
          <path
            d={svgPaths.p28704900}
            fill="var(--fill-0, #FFFAEC)"
            id="path378"
          />
          <path
            d={svgPaths.p23e4d500}
            fill="var(--fill-0, #FFFAEC)"
            id="path380"
          />
          <path
            d={svgPaths.p35e3ec00}
            fill="var(--fill-0, #FFFAEC)"
            id="path382"
          />
          <path
            d={svgPaths.p3d3bd100}
            fill="var(--fill-0, #FFFAEC)"
            id="path384"
          />
          <path
            d={svgPaths.p9e09500}
            fill="var(--fill-0, #FFFAEC)"
            id="path386"
          />
          <path
            d={svgPaths.p1cb25200}
            fill="var(--fill-0, #FFFAEC)"
            id="path388"
          />
          <path
            d={svgPaths.p1afe7180}
            fill="var(--fill-0, #FFFAEC)"
            id="path390"
          />
          <path
            d={svgPaths.p13bf4e40}
            fill="var(--fill-0, #FFFAEC)"
            id="path392"
          />
          <path
            d={svgPaths.p231cec00}
            fill="var(--fill-0, #FFFAEC)"
            id="path394"
          />
          <path
            d={svgPaths.p35b9bf00}
            fill="var(--fill-0, #FFFAEC)"
            id="path396"
          />
          <path
            d={svgPaths.p3102df80}
            fill="var(--fill-0, #FFFAEC)"
            id="path398"
          />
          <path
            d={svgPaths.pad95e00}
            fill="var(--fill-0, #FFFAEC)"
            id="path400"
          />
          <path
            d={svgPaths.p3bcb900}
            fill="var(--fill-0, #FFFAEC)"
            id="path402"
          />
          <path
            d={svgPaths.p33424c00}
            fill="var(--fill-0, #FFFAEC)"
            id="path404"
          />
          <path
            d={svgPaths.p1ae1b300}
            fill="var(--fill-0, #FFFAEC)"
            id="path406"
          />
          <path
            d={svgPaths.p218d7e00}
            fill="var(--fill-0, #FFFAEC)"
            id="path408"
          />
          <path
            d={svgPaths.p23ce6b80}
            fill="var(--fill-0, #FFFAEC)"
            id="path410"
          />
          <path
            d={svgPaths.p599f40}
            fill="var(--fill-0, #FFFAEC)"
            id="path412"
          />
          <path
            d={svgPaths.p2821b400}
            fill="var(--fill-0, #FFFAEC)"
            id="path414"
          />
          <path
            d={svgPaths.p1c989980}
            fill="var(--fill-0, #FFFAEC)"
            id="path416"
          />
          <path
            d={svgPaths.p86b9180}
            fill="var(--fill-0, #FFFAEC)"
            id="path418"
          />
          <path
            d={svgPaths.p1bcfc800}
            fill="var(--fill-0, #FFFAEC)"
            id="path420"
          />
          <path
            d={svgPaths.p3100c500}
            fill="var(--fill-0, #FFFAEC)"
            id="path422"
          />
          <path
            d={svgPaths.p35561080}
            fill="var(--fill-0, #FFFAEC)"
            id="path424"
          />
          <path
            d={svgPaths.p258bec80}
            fill="var(--fill-0, #FFFAEC)"
            id="path426"
          />
          <path
            d={svgPaths.p10cf4c00}
            fill="var(--fill-0, #FFFAEC)"
            id="path428"
          />
          <path
            d={svgPaths.p34cdab00}
            fill="var(--fill-0, #FFFAEC)"
            id="path430"
          />
          <path
            d={svgPaths.p38bbaa00}
            fill="var(--fill-0, #FFFAEC)"
            id="path432"
          />
          <path
            d={svgPaths.p1561a580}
            fill="var(--fill-0, #FFFAEC)"
            id="path434"
          />
          <path
            d={svgPaths.p2184d280}
            fill="var(--fill-0, #FFFAEC)"
            id="path436"
          />
          <path
            d={svgPaths.p11466200}
            fill="var(--fill-0, #FFFAEC)"
            id="path438"
          />
          <path
            d={svgPaths.p253bfa00}
            fill="var(--fill-0, #FFFAEC)"
            id="path440"
          />
          <path
            d={svgPaths.p392e22f0}
            fill="var(--fill-0, #FFFAEC)"
            id="path442"
          />
          <path
            d={svgPaths.pa452400}
            fill="var(--fill-0, #FFFAEC)"
            id="path444"
          />
          <path
            d={svgPaths.p1590c000}
            fill="var(--fill-0, #FFFAEC)"
            id="path446"
          />
          <path
            d={svgPaths.p8768600}
            fill="var(--fill-0, #FFFAEC)"
            id="path448"
          />
          <path
            d={svgPaths.p3389f800}
            fill="var(--fill-0, #FFFAEC)"
            id="path450"
          />
          <path
            d={svgPaths.p3b34fa00}
            fill="var(--fill-0, #FFFAEC)"
            id="path452"
          />
          <path
            d={svgPaths.p32d43c00}
            fill="var(--fill-0, #FFFAEC)"
            id="path454"
          />
          <path
            d={svgPaths.p224af300}
            fill="var(--fill-0, #FFFAEC)"
            id="path456"
          />
          <path
            d={svgPaths.p1d8c7900}
            fill="var(--fill-0, #FFFAEC)"
            id="path458"
          />
          <path
            d={svgPaths.p2f062a00}
            fill="var(--fill-0, #FFFAEC)"
            id="path460"
          />
          <path
            d={svgPaths.pfde3280}
            fill="var(--fill-0, #FFFAEC)"
            id="path462"
          />
          <path
            d={svgPaths.p1d241000}
            fill="var(--fill-0, #FFFAEC)"
            id="path464"
          />
          <path
            d={svgPaths.p310ed880}
            fill="var(--fill-0, #FFFAEC)"
            id="path466"
          />
          <path
            d={svgPaths.p3b621980}
            fill="var(--fill-0, #FFFAEC)"
            id="path468"
          />
          <path
            d={svgPaths.p9195380}
            fill="var(--fill-0, #FFFAEC)"
            id="path470"
          />
          <path
            d={svgPaths.p12b5a580}
            fill="var(--fill-0, #FFFAEC)"
            id="path472"
          />
          <path
            d={svgPaths.p169c4380}
            fill="var(--fill-0, #FFFAEC)"
            id="path474"
          />
          <path
            d={svgPaths.p36cd1600}
            fill="var(--fill-0, #FFFAEC)"
            id="path476"
          />
          <path
            d={svgPaths.p36855580}
            fill="var(--fill-0, #FFFAEC)"
            id="path478"
          />
          <path
            d={svgPaths.p287c7c80}
            fill="var(--fill-0, #FFFAEC)"
            id="path480"
          />
          <path
            d={svgPaths.p2a171d00}
            fill="var(--fill-0, #FFFAEC)"
            id="path482"
          />
          <path
            d={svgPaths.pd2f1600}
            fill="var(--fill-0, #FFFAEC)"
            id="path484"
          />
          <path
            d={svgPaths.p32af2680}
            fill="var(--fill-0, #FFFAEC)"
            id="path486"
          />
          <path
            d={svgPaths.p356bec00}
            fill="var(--fill-0, #FFFAEC)"
            id="path488"
          />
          <path
            d={svgPaths.p291a5680}
            fill="var(--fill-0, #FFFAEC)"
            id="path490"
          />
          <path
            d={svgPaths.p5330300}
            fill="var(--fill-0, #FFFAEC)"
            id="path492"
          />
          <path
            d={svgPaths.pf66d000}
            fill="var(--fill-0, #FFFAEC)"
            id="path494"
          />
          <path
            d={svgPaths.p2b049d00}
            fill="var(--fill-0, #FFFAEC)"
            id="path496"
          />
          <path
            d={svgPaths.p78a2c00}
            fill="var(--fill-0, #FFFAEC)"
            id="path498"
          />
          <path
            d={svgPaths.p1e6a7100}
            fill="var(--fill-0, #FFFAEC)"
            id="path500"
          />
          <path
            d={svgPaths.p26310940}
            fill="var(--fill-0, #FFFAEC)"
            id="path502"
          />
          <path
            d={svgPaths.p38ac23f0}
            fill="var(--fill-0, #FFFAEC)"
            id="path504"
          />
          <path
            d={svgPaths.p2ba39600}
            fill="var(--fill-0, #FFFAEC)"
            id="path506"
          />
          <path
            d={svgPaths.p2ba357f0}
            fill="var(--fill-0, #FFFAEC)"
            id="path508"
          />
          <path
            d={svgPaths.p3d857c00}
            fill="var(--fill-0, #FFFAEC)"
            id="path510"
          />
          <path
            d={svgPaths.p3b574880}
            fill="var(--fill-0, #FFFAEC)"
            id="path512"
          />
          <path
            d={svgPaths.p3e818c0}
            fill="var(--fill-0, #FFFAEC)"
            id="path514"
          />
          <path
            d={svgPaths.p1edee940}
            fill="var(--fill-0, #FFFAEC)"
            id="path516"
          />
          <path
            d={svgPaths.p1a314940}
            fill="var(--fill-0, #FFFAEC)"
            id="path518"
          />
          <path
            d={svgPaths.pee8bd00}
            fill="var(--fill-0, #FFFAEC)"
            id="path520"
          />
          <path
            d={svgPaths.p28fdac00}
            fill="var(--fill-0, #FFFAEC)"
            id="path522"
          />
          <path
            d={svgPaths.p15a65c00}
            fill="var(--fill-0, #FFFAEC)"
            id="path524"
          />
          <path
            d={svgPaths.p1758b900}
            fill="var(--fill-0, #FFFAEC)"
            id="path526"
          />
          <path
            d={svgPaths.p3de14c80}
            fill="var(--fill-0, #FFFAEC)"
            id="path528"
          />
          <path
            d={svgPaths.p21406680}
            fill="var(--fill-0, #FFFAEC)"
            id="path530"
          />
          <path
            d={svgPaths.pe67f300}
            fill="var(--fill-0, #FFFAEC)"
            id="path532"
          />
          <path
            d={svgPaths.p2b60d000}
            fill="var(--fill-0, #FFFAEC)"
            id="path534"
          />
          <path
            d={svgPaths.p7c45600}
            fill="var(--fill-0, #FFFAEC)"
            id="path536"
          />
          <path
            d={svgPaths.p1f19dcf0}
            fill="var(--fill-0, #FFFAEC)"
            id="path538"
          />
          <path
            d={svgPaths.p26f80000}
            fill="var(--fill-0, #FFFAEC)"
            id="path540"
          />
          <path
            d={svgPaths.p5dbd480}
            fill="var(--fill-0, #FFFAEC)"
            id="path542"
          />
          <path
            d={svgPaths.p2bc39f00}
            fill="var(--fill-0, #FFFAEC)"
            id="path544"
          />
          <path
            d={svgPaths.p1321580}
            fill="var(--fill-0, #FFFAEC)"
            id="path546"
          />
          <path
            d={svgPaths.p212f4a00}
            fill="var(--fill-0, #FFFAEC)"
            id="path548"
          />
          <path
            d={svgPaths.p3ce98600}
            fill="var(--fill-0, #FFFAEC)"
            id="path550"
          />
          <path
            d={svgPaths.p28247270}
            fill="var(--fill-0, #FFFAEC)"
            id="path552"
          />
          <path
            d={svgPaths.p1ce08800}
            fill="var(--fill-0, #FFFAEC)"
            id="path554"
          />
          <path
            d={svgPaths.p1e1d4f70}
            fill="var(--fill-0, #FFFAEC)"
            id="path556"
          />
          <path
            d={svgPaths.p28bf180}
            fill="var(--fill-0, #FFFAEC)"
            id="path558"
          />
          <path
            d={svgPaths.p359cda00}
            fill="var(--fill-0, #FFFAEC)"
            id="path560"
          />
          <path
            d={svgPaths.pad26c00}
            fill="var(--fill-0, #FFFAEC)"
            id="path562"
          />
          <path
            d={svgPaths.p2aff2c80}
            fill="var(--fill-0, #FFFAEC)"
            id="path564"
          />
          <path
            d={svgPaths.p304cd00}
            fill="var(--fill-0, #FFFAEC)"
            id="path566"
          />
          <path
            d={svgPaths.p2b021ac0}
            fill="var(--fill-0, #FFFAEC)"
            id="path568"
          />
          <path
            d={svgPaths.p2be7e900}
            fill="var(--fill-0, #FFFAEC)"
            id="path570"
          />
          <path
            d={svgPaths.p33563700}
            fill="var(--fill-0, #FFFAEC)"
            id="path572"
          />
          <path
            d={svgPaths.p34aa5100}
            fill="var(--fill-0, #FFFAEC)"
            id="path574"
          />
          <path
            d={svgPaths.p15fa400}
            fill="var(--fill-0, #FFFAEC)"
            id="path576"
          />
          <path
            d={svgPaths.p3ba81280}
            fill="var(--fill-0, #FFFAEC)"
            id="path578"
          />
          <path
            d={svgPaths.p1ddae940}
            fill="var(--fill-0, #FFFAEC)"
            id="path580"
          />
          <path
            d={svgPaths.p21fe5980}
            fill="var(--fill-0, #FFFAEC)"
            id="path582"
          />
          <path
            d={svgPaths.p368c4cf0}
            fill="var(--fill-0, #FFFAEC)"
            id="path584"
          />
          <path
            d={svgPaths.p28c10800}
            fill="var(--fill-0, #FFFAEC)"
            id="path586"
          />
          <path
            d={svgPaths.pa1d6f80}
            fill="var(--fill-0, #FFFAEC)"
            id="path588"
          />
          <path
            d={svgPaths.p6e1d2b0}
            fill="var(--fill-0, #FFFAEC)"
            id="path590"
          />
          <path
            d={svgPaths.p1900c400}
            fill="var(--fill-0, #FFFAEC)"
            id="path592"
          />
          <path
            d={svgPaths.p1ff908c0}
            fill="var(--fill-0, #FFFAEC)"
            id="path594"
          />
          <path
            d={svgPaths.p7431100}
            fill="var(--fill-0, #FFFAEC)"
            id="path596"
          />
          <path
            d={svgPaths.p147fdd00}
            fill="var(--fill-0, #FFFAEC)"
            id="path598"
          />
          <path
            d={svgPaths.p5509900}
            fill="var(--fill-0, #FFFAEC)"
            id="path600"
          />
          <path
            d={svgPaths.p11519d00}
            fill="var(--fill-0, #FFFAEC)"
            id="path602"
          />
          <path
            d={svgPaths.pd6fe280}
            fill="var(--fill-0, #FFFAEC)"
            id="path604"
          />
          <path
            d={svgPaths.p1f1e7280}
            fill="var(--fill-0, #FFFAEC)"
            id="path606"
          />
          <path
            d={svgPaths.p21dcc300}
            fill="var(--fill-0, #FFFAEC)"
            id="path608"
          />
          <path
            d={svgPaths.p3f51a500}
            fill="var(--fill-0, #FFFAEC)"
            id="path610"
          />
          <path
            d={svgPaths.p1f2b0400}
            fill="var(--fill-0, #FFFAEC)"
            id="path612"
          />
          <path
            d={svgPaths.p29784000}
            fill="var(--fill-0, #FFFAEC)"
            id="path614"
          />
          <path
            d={svgPaths.p28276680}
            fill="var(--fill-0, #FFFAEC)"
            id="path616"
          />
          <path
            d={svgPaths.pdaf9b00}
            fill="var(--fill-0, #FFFAEC)"
            id="path618"
          />
          <path
            d={svgPaths.p26e2e500}
            fill="var(--fill-0, #FFFAEC)"
            id="path620"
          />
          <path
            d={svgPaths.p3cfc2c80}
            fill="var(--fill-0, #FFFAEC)"
            id="path622"
          />
          <path
            d={svgPaths.p3d981570}
            fill="var(--fill-0, #FFFAEC)"
            id="path624"
          />
          <path
            d={svgPaths.p374c1500}
            fill="var(--fill-0, #FFFAEC)"
            id="path626"
          />
          <path
            d={svgPaths.p34915800}
            fill="var(--fill-0, #FFFAEC)"
            id="path628"
          />
          <path
            d={svgPaths.p396e8f00}
            fill="var(--fill-0, #FFFAEC)"
            id="path630"
          />
          <path
            d={svgPaths.p2cee3cf0}
            fill="var(--fill-0, #FFFAEC)"
            id="path632"
          />
          <path
            d={svgPaths.pff65180}
            fill="var(--fill-0, #FFFAEC)"
            id="path634"
          />
          <path
            d={svgPaths.p3154fe00}
            fill="var(--fill-0, #FFFAEC)"
            id="path636"
          />
          <path
            d={svgPaths.p3299a200}
            fill="var(--fill-0, #FFFAEC)"
            id="path638"
          />
          <path
            d={svgPaths.p39ad2a80}
            fill="var(--fill-0, #FFFAEC)"
            id="path640"
          />
          <path
            d={svgPaths.p2ecfd800}
            fill="var(--fill-0, #FFFAEC)"
            id="path642"
          />
          <path
            d={svgPaths.p28d96f50}
            fill="var(--fill-0, #FFFAEC)"
            id="path644"
          />
          <path
            d={svgPaths.p33609480}
            fill="var(--fill-0, #FFFAEC)"
            id="path646"
          />
          <path
            d={svgPaths.pf36e040}
            fill="var(--fill-0, #FFFAEC)"
            id="path648"
          />
          <path
            d={svgPaths.p17fcf780}
            fill="var(--fill-0, #FFFAEC)"
            id="path650"
          />
          <path
            d={svgPaths.p366a5180}
            fill="var(--fill-0, #FFFAEC)"
            id="path652"
          />
          <path
            d={svgPaths.p2bb1be50}
            fill="var(--fill-0, #FFFAEC)"
            id="path654"
          />
          <path
            d={svgPaths.p2e835c00}
            fill="var(--fill-0, #FFFAEC)"
            id="path656"
          />
          <path
            d={svgPaths.p48a3470}
            fill="var(--fill-0, #FFFAEC)"
            id="path658"
          />
          <path
            d={svgPaths.p1c740700}
            fill="var(--fill-0, #FFFAEC)"
            id="path660"
          />
          <path
            d={svgPaths.p56f9380}
            fill="var(--fill-0, #FFFAEC)"
            id="path662"
          />
          <path
            d={svgPaths.p3f4fbc80}
            fill="var(--fill-0, #FFFAEC)"
            id="path664"
          />
          <path
            d={svgPaths.pb7f5500}
            fill="var(--fill-0, #FFFAEC)"
            id="path666"
          />
          <path
            d={svgPaths.p38723680}
            fill="var(--fill-0, #FFFAEC)"
            id="path668"
          />
          <path
            d={svgPaths.pefe4100}
            fill="var(--fill-0, #FFFAEC)"
            id="path670"
          />
          <path
            d={svgPaths.p1d64ce00}
            fill="var(--fill-0, #FFFAEC)"
            id="path672"
          />
          <path
            d={svgPaths.p120d620}
            fill="var(--fill-0, #FFFAEC)"
            id="path674"
          />
          <path
            d={svgPaths.p2155b180}
            fill="var(--fill-0, #FFFAEC)"
            id="path676"
          />
          <path
            d={svgPaths.p1d4cb200}
            fill="var(--fill-0, #FFFAEC)"
            id="path678"
          />
          <path
            d={svgPaths.p8b4a080}
            fill="var(--fill-0, #FFFAEC)"
            id="path680"
          />
          <path
            d={svgPaths.p21ca3500}
            fill="var(--fill-0, #FFFAEC)"
            id="path682"
          />
          <path
            d={svgPaths.p39ed2100}
            fill="var(--fill-0, #FFFAEC)"
            id="path684"
          />
          <path
            d={svgPaths.p2875ac70}
            fill="var(--fill-0, #FFFAEC)"
            id="path686"
          />
          <path
            d={svgPaths.p26b09300}
            fill="var(--fill-0, #FFFAEC)"
            id="path688"
          />
          <path
            d={svgPaths.p2792b900}
            fill="var(--fill-0, #FFFAEC)"
            id="path690"
          />
          <path
            d={svgPaths.p16e5b500}
            fill="var(--fill-0, #FFFAEC)"
            id="path692"
          />
          <path
            d={svgPaths.pbf78b80}
            fill="var(--fill-0, #FFFAEC)"
            id="path694"
          />
          <path
            d={svgPaths.p24fa6180}
            fill="var(--fill-0, #FFFAEC)"
            id="path696"
          />
          <path
            d={svgPaths.p29859700}
            fill="var(--fill-0, #FFFAEC)"
            id="path698"
          />
          <path
            d={svgPaths.p151da860}
            fill="var(--fill-0, #FFFAEC)"
            id="path700"
          />
          <path
            d={svgPaths.ped88d80}
            fill="var(--fill-0, #FFFAEC)"
            id="path702"
          />
          <path
            d={svgPaths.p3adda280}
            fill="var(--fill-0, #FFFAEC)"
            id="path704"
          />
          <path
            d={svgPaths.p3de48080}
            fill="var(--fill-0, #FFFAEC)"
            id="path706"
          />
          <path
            d={svgPaths.p66daf00}
            fill="var(--fill-0, #FFFAEC)"
            id="path708"
          />
          <path
            d={svgPaths.p2e7c5980}
            fill="var(--fill-0, #FFFAEC)"
            id="path710"
          />
          <path
            d={svgPaths.p33f9b100}
            fill="var(--fill-0, #FFFAEC)"
            id="path712"
          />
          <path
            d={svgPaths.p3da2b580}
            fill="var(--fill-0, #FFFAEC)"
            id="path714"
          />
          <path
            d={svgPaths.p33590a00}
            fill="var(--fill-0, #FFFAEC)"
            id="path716"
          />
          <path
            d={svgPaths.p2913a000}
            fill="var(--fill-0, #FFFAEC)"
            id="path718"
          />
          <path
            d={svgPaths.p2c7f5500}
            fill="var(--fill-0, #FFFAEC)"
            id="path720"
          />
          <path
            d={svgPaths.p2a334500}
            fill="var(--fill-0, #FFFAEC)"
            id="path722"
          />
          <path
            d={svgPaths.p2f262500}
            fill="var(--fill-0, #FFFAEC)"
            id="path724"
          />
          <path
            d={svgPaths.p3feff280}
            fill="var(--fill-0, #FFFAEC)"
            id="path726"
          />
          <path
            d={svgPaths.p1cdc4d00}
            fill="var(--fill-0, #FFFAEC)"
            id="path728"
          />
          <path
            d={svgPaths.p2ee08d00}
            fill="var(--fill-0, #FFFAEC)"
            id="path730"
          />
          <path
            d={svgPaths.p10292e00}
            fill="var(--fill-0, #FFFAEC)"
            id="path732"
          />
          <path
            d={svgPaths.p5a67380}
            fill="var(--fill-0, #FFFAEC)"
            id="path734"
          />
          <path
            d={svgPaths.p36e1af00}
            fill="var(--fill-0, #FFFAEC)"
            id="path736"
          />
          <path
            d={svgPaths.p333b7400}
            fill="var(--fill-0, #FFFAEC)"
            id="path738"
          />
          <path
            d={svgPaths.p19ff2a00}
            fill="var(--fill-0, #FFFAEC)"
            id="path740"
          />
          <path
            d={svgPaths.p1ad7a680}
            fill="var(--fill-0, #FFFAEC)"
            id="path742"
          />
          <path
            d={svgPaths.p39732a00}
            fill="var(--fill-0, #FFFAEC)"
            id="path744"
          />
          <path
            d={svgPaths.p3dfa0770}
            fill="var(--fill-0, #FFFAEC)"
            id="path746"
          />
          <path
            d={svgPaths.p2688db00}
            fill="var(--fill-0, #FFFAEC)"
            id="path748"
          />
          <path
            d={svgPaths.p1ad2ae00}
            fill="var(--fill-0, #FFFAEC)"
            id="path750"
          />
          <path
            d={svgPaths.p13d8b320}
            fill="var(--fill-0, #FFFAEC)"
            id="path752"
          />
          <path
            d={svgPaths.p36a00500}
            fill="var(--fill-0, #FFFAEC)"
            id="path754"
          />
          <path
            d={svgPaths.p2d0327a0}
            fill="var(--fill-0, #FFFAEC)"
            id="path756"
          />
          <path
            d={svgPaths.p21208900}
            fill="var(--fill-0, #FFFAEC)"
            id="path758"
          />
          <path
            d={svgPaths.p116a46f2}
            fill="var(--fill-0, #FFFAEC)"
            id="path760"
          />
          <path
            d={svgPaths.p2d9fcc00}
            fill="var(--fill-0, #FFFAEC)"
            id="path762"
          />
          <path
            d={svgPaths.p28cb8a00}
            fill="var(--fill-0, #FFFAEC)"
            id="path764"
          />
          <path
            d={svgPaths.p3a1b2280}
            fill="var(--fill-0, #FFFAEC)"
            id="path766"
          />
          <path
            d={svgPaths.p37d71c00}
            fill="var(--fill-0, #FFFAEC)"
            id="path768"
          />
          <path
            d={svgPaths.p29c61c0}
            fill="var(--fill-0, #FFFAEC)"
            id="path770"
          />
          <path
            d={svgPaths.p3ad52200}
            fill="var(--fill-0, #FFFAEC)"
            id="path772"
          />
          <path
            d={svgPaths.p933b870}
            fill="var(--fill-0, #FFFAEC)"
            id="path774"
          />
          <path
            d={svgPaths.p5c9de30}
            fill="var(--fill-0, #FFFAEC)"
            id="path776"
          />
          <path
            d={svgPaths.p2b4d6ec0}
            fill="var(--fill-0, #FFFAEC)"
            id="path778"
          />
          <path
            d={svgPaths.p2889fc0}
            fill="var(--fill-0, #FFFAEC)"
            id="path780"
          />
          <path
            d={svgPaths.p32a81f00}
            fill="var(--fill-0, #FFFAEC)"
            id="path782"
          />
          <path
            d={svgPaths.p18933a70}
            fill="var(--fill-0, #FFFAEC)"
            id="path784"
          />
          <path
            d={svgPaths.p315e6480}
            fill="var(--fill-0, #FFFAEC)"
            id="path786"
          />
          <path
            d={svgPaths.paa778f0}
            fill="var(--fill-0, #FFFAEC)"
            id="path788"
          />
          <path
            d={svgPaths.p14a1d880}
            fill="var(--fill-0, #FFFAEC)"
            id="path790"
          />
          <path
            d={svgPaths.p4bf1ec0}
            fill="var(--fill-0, #FFFAEC)"
            id="path792"
          />
          <path
            d={svgPaths.p3961a500}
            fill="var(--fill-0, #FFFAEC)"
            id="path794"
          />
          <path
            d={svgPaths.p7da5800}
            fill="var(--fill-0, #FFFAEC)"
            id="path796"
          />
          <path
            d={svgPaths.p2fc77600}
            fill="var(--fill-0, #FFFAEC)"
            id="path798"
          />
          <path
            d={svgPaths.p184a3500}
            fill="var(--fill-0, #FFFAEC)"
            id="path800"
          />
          <path
            d={svgPaths.pc2247c0}
            fill="var(--fill-0, #FFFAEC)"
            id="path802"
          />
          <path
            d={svgPaths.p4ec7ac0}
            fill="var(--fill-0, #FFFAEC)"
            id="path804"
          />
          <path
            d={svgPaths.p4cea640}
            fill="var(--fill-0, #FFFAEC)"
            id="path806"
          />
          <path
            d={svgPaths.p33a74c00}
            fill="var(--fill-0, #FFFAEC)"
            id="path808"
          />
          <path
            d={svgPaths.p3723f8c0}
            fill="var(--fill-0, #FFFAEC)"
            id="path810"
          />
          <path
            d={svgPaths.p3b110800}
            fill="var(--fill-0, #FFFAEC)"
            id="path812"
          />
          <path
            d={svgPaths.p2fb6380}
            fill="var(--fill-0, #FFFAEC)"
            id="path814"
          />
          <path
            d={svgPaths.p15627200}
            fill="var(--fill-0, #FFFAEC)"
            id="path816"
          />
          <path
            d={svgPaths.p9f69e80}
            fill="var(--fill-0, #FFFAEC)"
            id="path818"
          />
          <path
            d={svgPaths.p17cb8480}
            fill="var(--fill-0, #FFFAEC)"
            id="path820"
          />
          <path
            d={svgPaths.p30ec83f2}
            fill="var(--fill-0, #FFFAEC)"
            id="path822"
          />
          <path
            d={svgPaths.p2d8dabf0}
            fill="var(--fill-0, #FFFAEC)"
            id="path824"
          />
          <path
            d={svgPaths.p2fc7c700}
            fill="var(--fill-0, #FFFAEC)"
            id="path826"
          />
          <path
            d={svgPaths.p34c7600}
            fill="var(--fill-0, #FFFAEC)"
            id="path828"
          />
          <path
            d={svgPaths.p1c580600}
            fill="var(--fill-0, #FFFAEC)"
            id="path830"
          />
          <path
            d={svgPaths.p3d1eef00}
            fill="var(--fill-0, #FFFAEC)"
            id="path832"
          />
          <path
            d={svgPaths.p1907dd00}
            fill="var(--fill-0, #FFFAEC)"
            id="path834"
          />
          <path
            d={svgPaths.p3f19900}
            fill="var(--fill-0, #FFFAEC)"
            id="path836"
          />
          <path
            d={svgPaths.p1606ae00}
            fill="var(--fill-0, #FFFAEC)"
            id="path838"
          />
          <path
            d={svgPaths.p9da8a00}
            fill="var(--fill-0, #FFFAEC)"
            id="path840"
          />
          <path
            d={svgPaths.p33d62000}
            fill="var(--fill-0, #FFFAEC)"
            id="path842"
          />
          <path
            d={svgPaths.p240bd600}
            fill="var(--fill-0, #FFFAEC)"
            id="path844"
          />
          <path
            d={svgPaths.p2bbe4780}
            fill="var(--fill-0, #FFFAEC)"
            id="path846"
          />
          <path
            d={svgPaths.p64efb00}
            fill="var(--fill-0, #FFFAEC)"
            id="path848"
          />
          <path
            d={svgPaths.p283fe380}
            fill="var(--fill-0, #FFFAEC)"
            id="path850"
          />
          <path
            d={svgPaths.p5014400}
            fill="var(--fill-0, #FFFAEC)"
            id="path852"
          />
          <path
            d={svgPaths.p16d51280}
            fill="var(--fill-0, #FFFAEC)"
            id="path854"
          />
          <path
            d={svgPaths.p328d6680}
            fill="var(--fill-0, #FFFAEC)"
            id="path856"
          />
          <path
            d={svgPaths.p217546c0}
            fill="var(--fill-0, #FFFAEC)"
            id="path858"
          />
          <path
            d={svgPaths.p3a8cd500}
            fill="var(--fill-0, #FFFAEC)"
            id="path860"
          />
          <path
            d={svgPaths.p25285c00}
            fill="var(--fill-0, #FFFAEC)"
            id="path862"
          />
          <path
            d={svgPaths.p27aca500}
            fill="var(--fill-0, #FFFAEC)"
            id="path864"
          />
          <path
            d={svgPaths.p93d29b0}
            fill="var(--fill-0, #FFFAEC)"
            id="path866"
          />
          <path
            d={svgPaths.p3308000}
            fill="var(--fill-0, #FFFAEC)"
            id="path868"
          />
          <path
            d={svgPaths.p27f3880}
            fill="var(--fill-0, #FFFAEC)"
            id="path870"
          />
          <path
            d={svgPaths.p215d8560}
            fill="var(--fill-0, #FFFAEC)"
            id="path872"
          />
          <path
            d={svgPaths.p2f794580}
            fill="var(--fill-0, #FFFAEC)"
            id="path874"
          />
          <path
            d={svgPaths.p60bca80}
            fill="var(--fill-0, #FFFAEC)"
            id="path876"
          />
          <path
            d={svgPaths.p1d302600}
            fill="var(--fill-0, #FFFAEC)"
            id="path878"
          />
          <path
            d={svgPaths.p2d8efb00}
            fill="var(--fill-0, #FFFAEC)"
            id="path880"
          />
          <path
            d={svgPaths.pbf72580}
            fill="var(--fill-0, #FFFAEC)"
            id="path882"
          />
          <path
            d={svgPaths.p1ed83b00}
            fill="var(--fill-0, #FFFAEC)"
            id="path884"
          />
          <path
            d={svgPaths.p1cc78600}
            fill="var(--fill-0, #FFFAEC)"
            id="path886"
          />
          <path
            d={svgPaths.p67b80}
            fill="var(--fill-0, #FFFAEC)"
            id="path888"
          />
          <path
            d={svgPaths.p1c807300}
            fill="var(--fill-0, #FFFAEC)"
            id="path890"
          />
          <path
            d={svgPaths.p3d6332f0}
            fill="var(--fill-0, #FFFAEC)"
            id="path892"
          />
          <path
            d={svgPaths.p2f5be300}
            fill="var(--fill-0, #FFFAEC)"
            id="path894"
          />
          <path
            d={svgPaths.p348976e0}
            fill="var(--fill-0, #FFFAEC)"
            id="path896"
          />
          <path
            d={svgPaths.p3c4edb80}
            fill="var(--fill-0, #FFFAEC)"
            id="path898"
          />
          <path
            d={svgPaths.p34d5300}
            fill="var(--fill-0, #FFFAEC)"
            id="path900"
          />
          <path
            d={svgPaths.p21033b00}
            fill="var(--fill-0, #FFFAEC)"
            id="path902"
          />
          <path
            d={svgPaths.p202d99c0}
            fill="var(--fill-0, #FFFAEC)"
            id="path904"
          />
          <path
            d={svgPaths.p3f9df500}
            fill="var(--fill-0, #FFFAEC)"
            id="path906"
          />
          <path
            d={svgPaths.p2a0c2100}
            fill="var(--fill-0, #FFFAEC)"
            id="path908"
          />
          <path
            d={svgPaths.p31403e00}
            fill="var(--fill-0, #FFFAEC)"
            id="path910"
          />
          <path
            d={svgPaths.pefafe00}
            fill="var(--fill-0, #FFFAEC)"
            id="path912"
          />
          <path
            d={svgPaths.p1cd13af0}
            fill="var(--fill-0, #FFFAEC)"
            id="path914"
          />
          <path
            d={svgPaths.p547f380}
            fill="var(--fill-0, #FFFAEC)"
            id="path916"
          />
          <path
            d={svgPaths.p2fa32500}
            fill="var(--fill-0, #FFFAEC)"
            id="path918"
          />
          <path
            d={svgPaths.p731c280}
            fill="var(--fill-0, #FFFAEC)"
            id="path920"
          />
          <path
            d={svgPaths.p2aa43300}
            fill="var(--fill-0, #FFFAEC)"
            id="path922"
          />
          <path
            d={svgPaths.p19bb7ec0}
            fill="var(--fill-0, #FFFAEC)"
            id="path924"
          />
          <path
            d={svgPaths.p2860e480}
            fill="var(--fill-0, #FFFAEC)"
            id="path926"
          />
          <path
            d={svgPaths.pd83f100}
            fill="var(--fill-0, #FFFAEC)"
            id="path928"
          />
          <path
            d={svgPaths.p39ae0c00}
            fill="var(--fill-0, #FFFAEC)"
            id="path930"
          />
          <path
            d={svgPaths.p1ea47700}
            fill="var(--fill-0, #FFFAEC)"
            id="path932"
          />
          <path
            d={svgPaths.p1cb97d80}
            fill="var(--fill-0, #FFFAEC)"
            id="path934"
          />
          <path
            d={svgPaths.p223a0d00}
            fill="var(--fill-0, #FFFAEC)"
            id="path936"
          />
          <path
            d={svgPaths.p320a300}
            fill="var(--fill-0, #FFFAEC)"
            id="path938"
          />
          <path
            d={svgPaths.p2ac10500}
            fill="var(--fill-0, #FFFAEC)"
            id="path940"
          />
          <path
            d={svgPaths.p16022700}
            fill="var(--fill-0, #FFFAEC)"
            id="path942"
          />
          <path
            d={svgPaths.pac29800}
            fill="var(--fill-0, #FFFAEC)"
            id="path944"
          />
          <path
            d={svgPaths.p3a7c8700}
            fill="var(--fill-0, #FFFAEC)"
            id="path946"
          />
          <path
            d={svgPaths.p7f979f0}
            fill="var(--fill-0, #FFFAEC)"
            id="path948"
          />
          <path
            d={svgPaths.pa3a0680}
            fill="var(--fill-0, #FFFAEC)"
            id="path950"
          />
          <path
            d={svgPaths.p276c0200}
            fill="var(--fill-0, #FFFAEC)"
            id="path952"
          />
          <path
            d={svgPaths.p3b38ba80}
            fill="var(--fill-0, #FFFAEC)"
            id="path954"
          />
          <path
            d={svgPaths.p2ec7bd80}
            fill="var(--fill-0, #FFFAEC)"
            id="path956"
          />
          <path
            d={svgPaths.pdc24400}
            fill="var(--fill-0, #FFFAEC)"
            id="path958"
          />
          <path
            d={svgPaths.p15099f80}
            fill="var(--fill-0, #FFFAEC)"
            id="path960"
          />
          <path
            d={svgPaths.p3556cc80}
            fill="var(--fill-0, #FFFAEC)"
            id="path962"
          />
          <path
            d={svgPaths.p246d2a00}
            fill="var(--fill-0, #FFFAEC)"
            id="path964"
          />
          <path
            d={svgPaths.p884d500}
            fill="var(--fill-0, #FFFAEC)"
            id="path966"
          />
          <path
            d={svgPaths.p3695b00}
            fill="var(--fill-0, #FFFAEC)"
            id="path968"
          />
          <path
            d={svgPaths.p2db8c800}
            fill="var(--fill-0, #FFFAEC)"
            id="path970"
          />
          <path
            d={svgPaths.p3cbde780}
            fill="var(--fill-0, #FFFAEC)"
            id="path972"
          />
          <path
            d={svgPaths.p1d09bc00}
            fill="var(--fill-0, #FFFAEC)"
            id="path974"
          />
          <path
            d={svgPaths.p38766e80}
            fill="var(--fill-0, #FFFAEC)"
            id="path976"
          />
          <path
            d={svgPaths.pbc5a700}
            fill="var(--fill-0, #FFFAEC)"
            id="path978"
          />
          <path
            d={svgPaths.p121caa00}
            fill="var(--fill-0, #FFFAEC)"
            id="path980"
          />
          <path
            d={svgPaths.p2fa5ad00}
            fill="var(--fill-0, #FFFAEC)"
            id="path982"
          />
          <path
            d={svgPaths.p8bdb80}
            fill="var(--fill-0, #FFFAEC)"
            id="path984"
          />
          <path
            d={svgPaths.p22050400}
            fill="var(--fill-0, #FFFAEC)"
            id="path986"
          />
          <path
            d={svgPaths.p3251f3b0}
            fill="var(--fill-0, #FFFAEC)"
            id="path988"
          />
          <path
            d={svgPaths.p20d53600}
            fill="var(--fill-0, #FFFAEC)"
            id="path990"
          />
          <path
            d={svgPaths.p2d1cf3f1}
            fill="var(--fill-0, #FFFAEC)"
            id="path992"
          />
          <path
            d={svgPaths.p3897e00}
            fill="var(--fill-0, #FFFAEC)"
            id="path994"
          />
          <path
            d={svgPaths.p276cd00}
            fill="var(--fill-0, #FFFAEC)"
            id="path996"
          />
          <path
            d={svgPaths.p6664780}
            fill="var(--fill-0, #FFFAEC)"
            id="path998"
          />
          <path
            d={svgPaths.p254f5a80}
            fill="var(--fill-0, #FFFAEC)"
            id="path1000"
          />
          <path
            d={svgPaths.p2a3e0b00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1002"
          />
          <path
            d={svgPaths.p10bd5280}
            fill="var(--fill-0, #FFFAEC)"
            id="path1004"
          />
          <path
            d={svgPaths.p1be4d400}
            fill="var(--fill-0, #FFFAEC)"
            id="path1006"
          />
          <path
            d={svgPaths.p1fdead00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1008"
          />
          <path
            d={svgPaths.p141a2c70}
            fill="var(--fill-0, #FFFAEC)"
            id="path1010"
          />
          <path
            d={svgPaths.p1a56b280}
            fill="var(--fill-0, #FFFAEC)"
            id="path1012"
          />
          <path
            d={svgPaths.p16acfa00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1014"
          />
          <path
            d={svgPaths.p388d9e00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1016"
          />
          <path
            d={svgPaths.p2755fdd0}
            fill="var(--fill-0, #FFFAEC)"
            id="path1018"
          />
          <path
            d={svgPaths.p2dda2600}
            fill="var(--fill-0, #FFFAEC)"
            id="path1020"
          />
          <path
            d={svgPaths.p6d13e00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1022"
          />
          <path
            d={svgPaths.p327f7a80}
            fill="var(--fill-0, #FFFAEC)"
            id="path1024"
          />
          <path
            d={svgPaths.p239b4900}
            fill="var(--fill-0, #FFFAEC)"
            id="path1026"
          />
          <path
            d={svgPaths.p2e9efa00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1028"
          />
          <path
            d={svgPaths.pc297580}
            fill="var(--fill-0, #FFFAEC)"
            id="path1030"
          />
          <path
            d={svgPaths.p8bb8200}
            fill="var(--fill-0, #FFFAEC)"
            id="path1032"
          />
          <path
            d={svgPaths.pbaf6a80}
            fill="var(--fill-0, #FFFAEC)"
            id="path1034"
          />
          <path
            d={svgPaths.p32b68c80}
            fill="var(--fill-0, #FFFAEC)"
            id="path1036"
          />
          <path
            d={svgPaths.p2aebe300}
            fill="var(--fill-0, #FFFAEC)"
            id="path1038"
          />
          <path
            d={svgPaths.p35131a00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1040"
          />
          <path
            d={svgPaths.p2d93cd00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1042"
          />
          <path
            d={svgPaths.pdd74700}
            fill="var(--fill-0, #FFFAEC)"
            id="path1044"
          />
          <path
            d={svgPaths.p2f9e5d80}
            fill="var(--fill-0, #FFFAEC)"
            id="path1046"
          />
          <path
            d={svgPaths.p13456500}
            fill="var(--fill-0, #FFFAEC)"
            id="path1048"
          />
          <path
            d={svgPaths.p29af500}
            fill="var(--fill-0, #FFFAEC)"
            id="path1050"
          />
          <path
            d={svgPaths.p19b17900}
            fill="var(--fill-0, #FFFAEC)"
            id="path1052"
          />
          <path
            d={svgPaths.p246a7d00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1054"
          />
          <path
            d={svgPaths.pb7f4400}
            fill="var(--fill-0, #FFFAEC)"
            id="path1056"
          />
          <path
            d={svgPaths.p3448f800}
            fill="var(--fill-0, #FFFAEC)"
            id="path1058"
          />
          <path
            d={svgPaths.p26d10280}
            fill="var(--fill-0, #FFFAEC)"
            id="path1060"
          />
          <path
            d={svgPaths.p3e94e400}
            fill="var(--fill-0, #FFFAEC)"
            id="path1062"
          />
          <path
            d={svgPaths.p14b90600}
            fill="var(--fill-0, #FFFAEC)"
            id="path1064"
          />
          <path
            d={svgPaths.p2d521d00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1066"
          />
          <path
            d={svgPaths.p4ff1d00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1068"
          />
          <path
            d={svgPaths.p11825900}
            fill="var(--fill-0, #FFFAEC)"
            id="path1070"
          />
          <path
            d={svgPaths.p760a000}
            fill="var(--fill-0, #FFFAEC)"
            id="path1072"
          />
          <path
            d={svgPaths.p1c758100}
            fill="var(--fill-0, #FFFAEC)"
            id="path1074"
          />
          <path
            d={svgPaths.p1d88cb00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1076"
          />
          <path
            d={svgPaths.p1d5eff00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1078"
          />
          <path
            d={svgPaths.p378a4a60}
            fill="var(--fill-0, #FFFAEC)"
            id="path1080"
          />
          <path
            d={svgPaths.p2b916400}
            fill="var(--fill-0, #FFFAEC)"
            id="path1082"
          />
          <path
            d={svgPaths.p27266080}
            fill="var(--fill-0, #FFFAEC)"
            id="path1084"
          />
          <path
            d={svgPaths.p2708100}
            fill="var(--fill-0, #FFFAEC)"
            id="path1086"
          />
          <path
            d={svgPaths.p32376f80}
            fill="var(--fill-0, #FFFAEC)"
            id="path1088"
          />
          <path
            d={svgPaths.p2c9b0b00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1090"
          />
          <path
            d={svgPaths.p3f741c80}
            fill="var(--fill-0, #FFFAEC)"
            id="path1092"
          />
          <path
            d={svgPaths.p3db0e200}
            fill="var(--fill-0, #FFFAEC)"
            id="path1094"
          />
          <path
            d={svgPaths.p9f43100}
            fill="var(--fill-0, #FFFAEC)"
            id="path1096"
          />
          <path
            d={svgPaths.p1a3aaf80}
            fill="var(--fill-0, #FFFAEC)"
            id="path1098"
          />
          <path
            d={svgPaths.p26fcce00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1100"
          />
          <path
            d={svgPaths.p8257a00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1102"
          />
          <path
            d={svgPaths.p1054300}
            fill="var(--fill-0, #FFFAEC)"
            id="path1104"
          />
          <path
            d={svgPaths.p38fe7d00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1106"
          />
          <path
            d={svgPaths.p3c725980}
            fill="var(--fill-0, #FFFAEC)"
            id="path1108"
          />
          <path
            d={svgPaths.pf3a3500}
            fill="var(--fill-0, #FFFAEC)"
            id="path1110"
          />
          <path
            d={svgPaths.p97fcd00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1112"
          />
          <path
            d={svgPaths.p2ed85a00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1114"
          />
          <path
            d={svgPaths.p2e61f000}
            fill="var(--fill-0, #FFFAEC)"
            id="path1116"
          />
          <path
            d={svgPaths.p217f4000}
            fill="var(--fill-0, #FFFAEC)"
            id="path1118"
          />
          <path
            d={svgPaths.p1ed09500}
            fill="var(--fill-0, #FFFAEC)"
            id="path1120"
          />
          <path
            d={svgPaths.p39158b80}
            fill="var(--fill-0, #FFFAEC)"
            id="path1122"
          />
          <path
            d={svgPaths.p36575900}
            fill="var(--fill-0, #FFFAEC)"
            id="path1124"
          />
          <path
            d={svgPaths.p5c09b80}
            fill="var(--fill-0, #FFFAEC)"
            id="path1126"
          />
          <path
            d={svgPaths.p20304900}
            fill="var(--fill-0, #FFFAEC)"
            id="path1128"
          />
          <path
            d={svgPaths.p16aae700}
            fill="var(--fill-0, #FFFAEC)"
            id="path1130"
          />
          <path
            d={svgPaths.p1ea47f80}
            fill="var(--fill-0, #FFFAEC)"
            id="path1132"
          />
          <path
            d={svgPaths.pe01d380}
            fill="var(--fill-0, #FFFAEC)"
            id="path1134"
          />
          <path
            d={svgPaths.pcbddf00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1136"
          />
          <path
            d={svgPaths.p12fe4000}
            fill="var(--fill-0, #FFFAEC)"
            id="path1138"
          />
          <path
            d={svgPaths.p21696300}
            fill="var(--fill-0, #FFFAEC)"
            id="path1140"
          />
          <path
            d={svgPaths.p3e199a00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1142"
          />
          <path
            d={svgPaths.p1053a800}
            fill="var(--fill-0, #FFFAEC)"
            id="path1144"
          />
          <path
            d={svgPaths.p1c21ae70}
            fill="var(--fill-0, #FFFAEC)"
            id="path1146"
          />
          <path
            d={svgPaths.p17a3b080}
            fill="var(--fill-0, #FFFAEC)"
            id="path1148"
          />
          <path
            d={svgPaths.p75c200}
            fill="var(--fill-0, #FFFAEC)"
            id="path1150"
          />
          <path
            d={svgPaths.p24a86e00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1152"
          />
          <path
            d={svgPaths.p1ca60680}
            fill="var(--fill-0, #FFFAEC)"
            id="path1154"
          />
          <path
            d={svgPaths.p7440000}
            fill="var(--fill-0, #FFFAEC)"
            id="path1156"
          />
          <path
            d={svgPaths.p20ccea70}
            fill="var(--fill-0, #FFFAEC)"
            id="path1158"
          />
          <path
            d={svgPaths.pfec8a80}
            fill="var(--fill-0, #FFFAEC)"
            id="path1160"
          />
          <path
            d={svgPaths.p3161fe00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1162"
          />
          <path
            d={svgPaths.p30f2ba80}
            fill="var(--fill-0, #FFFAEC)"
            id="path1164"
          />
          <path
            d={svgPaths.pe8c8b00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1166"
          />
          <path
            d={svgPaths.p1b804280}
            fill="var(--fill-0, #FFFAEC)"
            id="path1168"
          />
          <path
            d={svgPaths.p1a702570}
            fill="var(--fill-0, #FFFAEC)"
            id="path1170"
          />
          <path
            d={svgPaths.p1d0eab80}
            fill="var(--fill-0, #FFFAEC)"
            id="path1172"
          />
          <path
            d={svgPaths.p2dfce580}
            fill="var(--fill-0, #FFFAEC)"
            id="path1174"
          />
          <path
            d={svgPaths.p9dc4480}
            fill="var(--fill-0, #FFFAEC)"
            id="path1176"
          />
          <path
            d={svgPaths.p743400}
            fill="var(--fill-0, #FFFAEC)"
            id="path1178"
          />
          <path
            d={svgPaths.p1d3c5b00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1180"
          />
          <path
            d={svgPaths.p288f680}
            fill="var(--fill-0, #FFFAEC)"
            id="path1182"
          />
          <path
            d={svgPaths.pa97b00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1184"
          />
          <path
            d={svgPaths.pb6b1d00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1186"
          />
          <path
            d={svgPaths.p1e710a80}
            fill="var(--fill-0, #FFFAEC)"
            id="path1188"
          />
          <path
            d={svgPaths.p2b35cd80}
            fill="var(--fill-0, #FFFAEC)"
            id="path1190"
          />
          <path
            d={svgPaths.p2a8ac100}
            fill="var(--fill-0, #FFFAEC)"
            id="path1192"
          />
          <path
            d={svgPaths.p3610e570}
            fill="var(--fill-0, #FFFAEC)"
            id="path1194"
          />
          <path
            d={svgPaths.p10507f00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1196"
          />
          <path
            d={svgPaths.p16da6000}
            fill="var(--fill-0, #FFFAEC)"
            id="path1198"
          />
          <path
            d={svgPaths.p2ac46480}
            fill="var(--fill-0, #FFFAEC)"
            id="path1200"
          />
          <path
            d={svgPaths.p8005f00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1202"
          />
          <path
            d={svgPaths.p35438800}
            fill="var(--fill-0, #FFFAEC)"
            id="path1204"
          />
          <path
            d={svgPaths.p343e7b80}
            fill="var(--fill-0, #FFFAEC)"
            id="path1206"
          />
          <path
            d={svgPaths.p1b12dc00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1208"
          />
          <path
            d={svgPaths.p25e6db00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1210"
          />
          <path
            d={svgPaths.p2a19e180}
            fill="var(--fill-0, #FFFAEC)"
            id="path1212"
          />
          <path
            d={svgPaths.p69f8a80}
            fill="var(--fill-0, #FFFAEC)"
            id="path1214"
          />
          <path
            d={svgPaths.pb8b8300}
            fill="var(--fill-0, #FFFAEC)"
            id="path1216"
          />
          <path
            d={svgPaths.p657a080}
            fill="var(--fill-0, #FFFAEC)"
            id="path1218"
          />
          <path
            d={svgPaths.p3ee006f2}
            fill="var(--fill-0, #FFFAEC)"
            id="path1220"
          />
          <path
            d={svgPaths.p183d5d00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1222"
          />
          <path
            d={svgPaths.p2927fb00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1224"
          />
          <path
            d={svgPaths.p1d77da00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1226"
          />
          <path
            d={svgPaths.p13ffc500}
            fill="var(--fill-0, #FFFAEC)"
            id="path1228"
          />
          <path
            d={svgPaths.p11955ef0}
            fill="var(--fill-0, #FFFAEC)"
            id="path1230"
          />
          <path
            d={svgPaths.p18c83a00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1232"
          />
          <path
            d={svgPaths.pf9d7600}
            fill="var(--fill-0, #FFFAEC)"
            id="path1234"
          />
          <path
            d={svgPaths.p22bbbc00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1236"
          />
          <path
            d={svgPaths.p3a4b6780}
            fill="var(--fill-0, #FFFAEC)"
            id="path1238"
          />
          <path
            d={svgPaths.p205bb900}
            fill="var(--fill-0, #FFFAEC)"
            id="path1240"
          />
          <path
            d={svgPaths.p1c83980}
            fill="var(--fill-0, #FFFAEC)"
            id="path1242"
          />
          <path
            d={svgPaths.p3150c000}
            fill="var(--fill-0, #FFFAEC)"
            id="path1244"
          />
          <path
            d={svgPaths.p8a55780}
            fill="var(--fill-0, #FFFAEC)"
            id="path1246"
          />
          <path
            d={svgPaths.peb6cdf0}
            fill="var(--fill-0, #FFFAEC)"
            id="path1248"
          />
          <path
            d={svgPaths.p16078900}
            fill="var(--fill-0, #FFFAEC)"
            id="path1250"
          />
          <path
            d={svgPaths.p3b5fee00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1252"
          />
          <path
            d={svgPaths.p280b0680}
            fill="var(--fill-0, #FFFAEC)"
            id="path1254"
          />
          <path
            d={svgPaths.p3ed45f00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1256"
          />
          <path
            d={svgPaths.p11f85380}
            fill="var(--fill-0, #FFFAEC)"
            id="path1258"
          />
          <path
            d={svgPaths.p3e2c8000}
            fill="var(--fill-0, #FFFAEC)"
            id="path1260"
          />
          <path
            d={svgPaths.p29f25900}
            fill="var(--fill-0, #FFFAEC)"
            id="path1262"
          />
          <path
            d={svgPaths.p1db32c00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1264"
          />
          <path
            d={svgPaths.p358bc700}
            fill="var(--fill-0, #FFFAEC)"
            id="path1266"
          />
          <path
            d={svgPaths.p1b7e0880}
            fill="var(--fill-0, #FFFAEC)"
            id="path1268"
          />
          <path
            d={svgPaths.p2b4b8d80}
            fill="var(--fill-0, #FFFAEC)"
            id="path1270"
          />
          <path
            d={svgPaths.p30d9ba40}
            fill="var(--fill-0, #FFFAEC)"
            id="path1272"
          />
          <path
            d={svgPaths.p312cbb70}
            fill="var(--fill-0, #FFFAEC)"
            id="path1274"
          />
          <path
            d={svgPaths.p31d718f0}
            fill="var(--fill-0, #FFFAEC)"
            id="path1276"
          />
          <path
            d={svgPaths.p28426000}
            fill="var(--fill-0, #FFFAEC)"
            id="path1278"
          />
          <path
            d={svgPaths.p3e691780}
            fill="var(--fill-0, #FFFAEC)"
            id="path1280"
          />
          <path
            d={svgPaths.p148da680}
            fill="var(--fill-0, #FFFAEC)"
            id="path1282"
          />
          <path
            d={svgPaths.p18cb4500}
            fill="var(--fill-0, #FFFAEC)"
            id="path1284"
          />
          <path
            d={svgPaths.p2add95c0}
            fill="var(--fill-0, #FFFAEC)"
            id="path1286"
          />
          <path
            d={svgPaths.p3d529800}
            fill="var(--fill-0, #FFFAEC)"
            id="path1288"
          />
          <path
            d={svgPaths.p2f0dbc00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1290"
          />
          <path
            d={svgPaths.p35016220}
            fill="var(--fill-0, #FFFAEC)"
            id="path1292"
          />
          <path
            d={svgPaths.p2cef2800}
            fill="var(--fill-0, #FFFAEC)"
            id="path1294"
          />
          <path
            d={svgPaths.p12f76b80}
            fill="var(--fill-0, #FFFAEC)"
            id="path1296"
          />
          <path
            d={svgPaths.p5e95600}
            fill="var(--fill-0, #FFFAEC)"
            id="path1298"
          />
          <path
            d={svgPaths.p147f0200}
            fill="var(--fill-0, #FFFAEC)"
            id="path1300"
          />
          <path
            d={svgPaths.p8fdc400}
            fill="var(--fill-0, #FFFAEC)"
            id="path1302"
          />
          <path
            d={svgPaths.p28fe3f00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1304"
          />
          <path
            d={svgPaths.p122b1700}
            fill="var(--fill-0, #FFFAEC)"
            id="path1306"
          />
          <path
            d={svgPaths.p282ff340}
            fill="var(--fill-0, #FFFAEC)"
            id="path1308"
          />
          <path
            d={svgPaths.p25209700}
            fill="var(--fill-0, #FFFAEC)"
            id="path1310"
          />
          <path
            d={svgPaths.p3ec79c00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1312"
          />
          <path
            d={svgPaths.p3bbbc000}
            fill="var(--fill-0, #FFFAEC)"
            id="path1314"
          />
          <path
            d={svgPaths.p20634d00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1316"
          />
          <path
            d={svgPaths.p10255e80}
            fill="var(--fill-0, #FFFAEC)"
            id="path1318"
          />
          <path
            d={svgPaths.p1118fd80}
            fill="var(--fill-0, #FFFAEC)"
            id="path1320"
          />
          <path
            d={svgPaths.p307dab80}
            fill="var(--fill-0, #FFFAEC)"
            id="path1322"
          />
          <path
            d={svgPaths.p15631f70}
            fill="var(--fill-0, #FFFAEC)"
            id="path1324"
          />
          <path
            d={svgPaths.pff47b00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1326"
          />
          <path
            d={svgPaths.p37032480}
            fill="var(--fill-0, #FFFAEC)"
            id="path1328"
          />
          <path
            d={svgPaths.p2db44f80}
            fill="var(--fill-0, #FFFAEC)"
            id="path1330"
          />
          <path
            d={svgPaths.p17769100}
            fill="var(--fill-0, #FFFAEC)"
            id="path1332"
          />
          <path
            d={svgPaths.p191c2100}
            fill="var(--fill-0, #FFFAEC)"
            id="path1334"
          />
          <path
            d={svgPaths.p39930180}
            fill="var(--fill-0, #FFFAEC)"
            id="path1336"
          />
          <path
            d={svgPaths.p2760d140}
            fill="var(--fill-0, #FFFAEC)"
            id="path1338"
          />
          <path
            d={svgPaths.pe11d880}
            fill="var(--fill-0, #FFFAEC)"
            id="path1340"
          />
          <path
            d={svgPaths.pe8b880}
            fill="var(--fill-0, #FFFAEC)"
            id="path1342"
          />
          <path
            d={svgPaths.p282f6700}
            fill="var(--fill-0, #FFFAEC)"
            id="path1344"
          />
          <path
            d={svgPaths.p2a8d6d00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1346"
          />
          <path
            d={svgPaths.p236f6300}
            fill="var(--fill-0, #FFFAEC)"
            id="path1348"
          />
          <path
            d={svgPaths.p3d04c900}
            fill="var(--fill-0, #FFFAEC)"
            id="path1350"
          />
          <path
            d={svgPaths.p2d8c5400}
            fill="var(--fill-0, #FFFAEC)"
            id="path1352"
          />
          <path
            d={svgPaths.pd43d200}
            fill="var(--fill-0, #FFFAEC)"
            id="path1354"
          />
          <path
            d={svgPaths.p10a56000}
            fill="var(--fill-0, #FFFAEC)"
            id="path1356"
          />
          <path
            d={svgPaths.peb0c080}
            fill="var(--fill-0, #FFFAEC)"
            id="path1358"
          />
          <path
            d={svgPaths.pc44f100}
            fill="var(--fill-0, #FFFAEC)"
            id="path1360"
          />
          <path
            d={svgPaths.p9571500}
            fill="var(--fill-0, #FFFAEC)"
            id="path1362"
          />
          <path
            d={svgPaths.p30dcfa00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1364"
          />
          <path
            d={svgPaths.pc572080}
            fill="var(--fill-0, #FFFAEC)"
            id="path1366"
          />
          <path
            d={svgPaths.p19b34c80}
            fill="var(--fill-0, #FFFAEC)"
            id="path1368"
          />
          <path
            d={svgPaths.p20dbbf00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1370"
          />
          <path
            d={svgPaths.p2b4102c0}
            fill="var(--fill-0, #FFFAEC)"
            id="path1372"
          />
          <path
            d={svgPaths.p37955a80}
            fill="var(--fill-0, #FFFAEC)"
            id="path1374"
          />
          <path
            d={svgPaths.p3734c80}
            fill="var(--fill-0, #FFFAEC)"
            id="path1376"
          />
          <path
            d={svgPaths.p3f59d900}
            fill="var(--fill-0, #FFFAEC)"
            id="path1378"
          />
          <path
            d={svgPaths.pca16500}
            fill="var(--fill-0, #FFFAEC)"
            id="path1380"
          />
          <path
            d={svgPaths.pd7b3b00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1382"
          />
          <path
            d={svgPaths.p2a45b880}
            fill="var(--fill-0, #FFFAEC)"
            id="path1384"
          />
          <path
            d={svgPaths.p24a90b00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1386"
          />
          <path
            d={svgPaths.p37bbe680}
            fill="var(--fill-0, #FFFAEC)"
            id="path1388"
          />
          <path
            d={svgPaths.p333a6f00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1390"
          />
          <path
            d={svgPaths.pa5a7200}
            fill="var(--fill-0, #FFFAEC)"
            id="path1392"
          />
          <path
            d={svgPaths.p433b980}
            fill="var(--fill-0, #FFFAEC)"
            id="path1394"
          />
          <path
            d={svgPaths.p4ae7480}
            fill="var(--fill-0, #FFFAEC)"
            id="path1396"
          />
          <path
            d={svgPaths.p2576fe00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1398"
          />
          <path
            d={svgPaths.p3a11d800}
            fill="var(--fill-0, #FFFAEC)"
            id="path1400"
          />
          <path
            d={svgPaths.p35a15180}
            fill="var(--fill-0, #FFFAEC)"
            id="path1402"
          />
          <path
            d={svgPaths.p31ce92c0}
            fill="var(--fill-0, #FFFAEC)"
            id="path1404"
          />
          <path
            d={svgPaths.p15e76900}
            fill="var(--fill-0, #FFFAEC)"
            id="path1406"
          />
          <path
            d={svgPaths.p7a76900}
            fill="var(--fill-0, #FFFAEC)"
            id="path1408"
          />
          <path
            d={svgPaths.p35026480}
            fill="var(--fill-0, #FFFAEC)"
            id="path1410"
          />
          <path
            d={svgPaths.p16fdd700}
            fill="var(--fill-0, #FFFAEC)"
            id="path1412"
          />
          <path
            d={svgPaths.pe3a0600}
            fill="var(--fill-0, #FFFAEC)"
            id="path1414"
          />
          <path
            d={svgPaths.p2a913b00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1416"
          />
          <path
            d={svgPaths.pe72ed00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1418"
          />
          <path
            d={svgPaths.p864fa00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1420"
          />
          <path
            d={svgPaths.p25b98300}
            fill="var(--fill-0, #FFFAEC)"
            id="path1422"
          />
          <path
            d={svgPaths.p3919200}
            fill="var(--fill-0, #FFFAEC)"
            id="path1424"
          />
          <path
            d={svgPaths.p1d7e0300}
            fill="var(--fill-0, #FFFAEC)"
            id="path1426"
          />
          <path
            d={svgPaths.p27d0b7f1}
            fill="var(--fill-0, #FFFAEC)"
            id="path1428"
          />
          <path
            d={svgPaths.p2fe70f00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1430"
          />
          <path
            d={svgPaths.p1f6c8e80}
            fill="var(--fill-0, #FFFAEC)"
            id="path1432"
          />
          <path
            d={svgPaths.p11949000}
            fill="var(--fill-0, #FFFAEC)"
            id="path1434"
          />
          <path
            d={svgPaths.p2b8c4a00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1436"
          />
          <path
            d={svgPaths.p72cac80}
            fill="var(--fill-0, #FFFAEC)"
            id="path1438"
          />
          <path
            d={svgPaths.p30e73f80}
            fill="var(--fill-0, #FFFAEC)"
            id="path1440"
          />
          <path
            d={svgPaths.p2eb782a0}
            fill="var(--fill-0, #FFFAEC)"
            id="path1442"
          />
          <path
            d={svgPaths.p305bee00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1444"
          />
          <path
            d={svgPaths.p16f67f80}
            fill="var(--fill-0, #FFFAEC)"
            id="path1446"
          />
          <path
            d={svgPaths.p1dbfbd80}
            fill="var(--fill-0, #FFFAEC)"
            id="path1448"
          />
          <path
            d={svgPaths.p26cf1600}
            fill="var(--fill-0, #FFFAEC)"
            id="path1450"
          />
          <path
            d={svgPaths.p365744c0}
            fill="var(--fill-0, #FFFAEC)"
            id="path1452"
          />
          <path
            d={svgPaths.p1f9b6000}
            fill="var(--fill-0, #FFFAEC)"
            id="path1454"
          />
          <path
            d={svgPaths.p24229880}
            fill="var(--fill-0, #FFFAEC)"
            id="path1456"
          />
          <path
            d={svgPaths.p1c43cf80}
            fill="var(--fill-0, #FFFAEC)"
            id="path1458"
          />
          <path
            d={svgPaths.p1c125f80}
            fill="var(--fill-0, #FFFAEC)"
            id="path1460"
          />
          <path
            d={svgPaths.p3424b600}
            fill="var(--fill-0, #FFFAEC)"
            id="path1462"
          />
          <path
            d={svgPaths.p29ce9e80}
            fill="var(--fill-0, #FFFAEC)"
            id="path1464"
          />
          <path
            d={svgPaths.p39eef400}
            fill="var(--fill-0, #FFFAEC)"
            id="path1466"
          />
          <path
            d={svgPaths.p3d80c300}
            fill="var(--fill-0, #FFFAEC)"
            id="path1468"
          />
          <path
            d={svgPaths.p145a4480}
            fill="var(--fill-0, #FFFAEC)"
            id="path1470"
          />
          <path
            d={svgPaths.p237a6b00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1472"
          />
          <path
            d={svgPaths.p2120a300}
            fill="var(--fill-0, #FFFAEC)"
            id="path1474"
          />
          <path
            d={svgPaths.p278e080}
            fill="var(--fill-0, #FFFAEC)"
            id="path1476"
          />
          <path
            d={svgPaths.p12238880}
            fill="var(--fill-0, #FFFAEC)"
            id="path1478"
          />
          <path
            d={svgPaths.p1a126b00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1480"
          />
          <path
            d={svgPaths.p2c707380}
            fill="var(--fill-0, #FFFAEC)"
            id="path1482"
          />
          <path
            d={svgPaths.p2c7e9d80}
            fill="var(--fill-0, #FFFAEC)"
            id="path1484"
          />
          <path
            d={svgPaths.p24dfff00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1486"
          />
          <path
            d={svgPaths.p28758580}
            fill="var(--fill-0, #FFFAEC)"
            id="path1488"
          />
          <path
            d={svgPaths.p385a8700}
            fill="var(--fill-0, #FFFAEC)"
            id="path1490"
          />
          <path
            d={svgPaths.p20f4c980}
            fill="var(--fill-0, #FFFAEC)"
            id="path1492"
          />
          <path
            d={svgPaths.p1e822a00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1494"
          />
          <path
            d={svgPaths.p2c57a1f0}
            fill="var(--fill-0, #FFFAEC)"
            id="path1496"
          />
          <path
            d={svgPaths.p3265100}
            fill="var(--fill-0, #FFFAEC)"
            id="path1498"
          />
          <path
            d={svgPaths.p27cb82f0}
            fill="var(--fill-0, #FFFAEC)"
            id="path1500"
          />
          <path
            d={svgPaths.pcfda200}
            fill="var(--fill-0, #FFFAEC)"
            id="path1502"
          />
          <path
            d={svgPaths.p3cac3300}
            fill="var(--fill-0, #FFFAEC)"
            id="path1504"
          />
          <path
            d={svgPaths.p7a92f00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1506"
          />
          <path
            d={svgPaths.p5f53500}
            fill="var(--fill-0, #FFFAEC)"
            id="path1508"
          />
          <path
            d={svgPaths.pe88fb00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1510"
          />
          <path
            d={svgPaths.pbe65b80}
            fill="var(--fill-0, #FFFAEC)"
            id="path1512"
          />
          <path
            d={svgPaths.p1cb0a500}
            fill="var(--fill-0, #FFFAEC)"
            id="path1514"
          />
          <path
            d={svgPaths.p28aee700}
            fill="var(--fill-0, #FFFAEC)"
            id="path1516"
          />
          <path
            d={svgPaths.p3cf56300}
            fill="var(--fill-0, #FFFAEC)"
            id="path1518"
          />
          <path
            d={svgPaths.p3c5a5b00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1520"
          />
          <path
            d={svgPaths.p28d8be00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1522"
          />
          <path
            d={svgPaths.pb71ccf2}
            fill="var(--fill-0, #FFFAEC)"
            id="path1524"
          />
          <path
            d={svgPaths.p4285e00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1526"
          />
          <path
            d={svgPaths.p35d6f900}
            fill="var(--fill-0, #FFFAEC)"
            id="path1528"
          />
          <path
            d={svgPaths.p37b19bc0}
            fill="var(--fill-0, #FFFAEC)"
            id="path1530"
          />
          <path
            d={svgPaths.p28e04e80}
            fill="var(--fill-0, #FFFAEC)"
            id="path1532"
          />
          <path
            d={svgPaths.p3e1c3100}
            fill="var(--fill-0, #FFFAEC)"
            id="path1534"
          />
          <path
            d={svgPaths.p3adeba00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1536"
          />
          <path
            d={svgPaths.p1e584200}
            fill="var(--fill-0, #FFFAEC)"
            id="path1538"
          />
          <path
            d={svgPaths.p27a4b680}
            fill="var(--fill-0, #FFFAEC)"
            id="path1540"
          />
          <path
            d={svgPaths.pba67300}
            fill="var(--fill-0, #FFFAEC)"
            id="path1542"
          />
          <path
            d={svgPaths.p35fbfa80}
            fill="var(--fill-0, #FFFAEC)"
            id="path1544"
          />
          <path
            d={svgPaths.p127d8550}
            fill="var(--fill-0, #FFFAEC)"
            id="path1546"
          />
          <path
            d={svgPaths.p27ace900}
            fill="var(--fill-0, #FFFAEC)"
            id="path1548"
          />
          <path
            d={svgPaths.p5456a00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1550"
          />
          <path
            d={svgPaths.p3cb4f9c0}
            fill="var(--fill-0, #FFFAEC)"
            id="path1552"
          />
          <path
            d={svgPaths.p3ced8e80}
            fill="var(--fill-0, #FFFAEC)"
            id="path1554"
          />
          <path
            d={svgPaths.p26c18a00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1556"
          />
          <path
            d={svgPaths.p17317700}
            fill="var(--fill-0, #FFFAEC)"
            id="path1558"
          />
          <path
            d={svgPaths.p313a6600}
            fill="var(--fill-0, #FFFAEC)"
            id="path1560"
          />
          <path
            d={svgPaths.p2fb47a00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1562"
          />
          <path
            d={svgPaths.p1ec74a80}
            fill="var(--fill-0, #FFFAEC)"
            id="path1564"
          />
          <path
            d={svgPaths.p2a7c2e00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1566"
          />
          <path
            d={svgPaths.p18bec400}
            fill="var(--fill-0, #FFFAEC)"
            id="path1568"
          />
          <path
            d={svgPaths.p257c0180}
            fill="var(--fill-0, #FFFAEC)"
            id="path1570"
          />
          <path
            d={svgPaths.p2478bc00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1572"
          />
          <path
            d={svgPaths.p3452be00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1574"
          />
          <path
            d={svgPaths.p165c9000}
            fill="var(--fill-0, #FFFAEC)"
            id="path1576"
          />
          <path
            d={svgPaths.p1dd1d3f0}
            fill="var(--fill-0, #FFFAEC)"
            id="path1578"
          />
          <path
            d={svgPaths.p12272800}
            fill="var(--fill-0, #FFFAEC)"
            id="path1580"
          />
          <path
            d={svgPaths.p19e8ec00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1582"
          />
          <path
            d={svgPaths.p21132c00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1584"
          />
          <path
            d={svgPaths.p97aa680}
            fill="var(--fill-0, #FFFAEC)"
            id="path1586"
          />
          <path
            d={svgPaths.p5b95900}
            fill="var(--fill-0, #FFFAEC)"
            id="path1588"
          />
          <path
            d={svgPaths.p2351880}
            fill="var(--fill-0, #FFFAEC)"
            id="path1590"
          />
          <path
            d={svgPaths.p1c87d780}
            fill="var(--fill-0, #FFFAEC)"
            id="path1592"
          />
          <path
            d={svgPaths.p3115200}
            fill="var(--fill-0, #FFFAEC)"
            id="path1594"
          />
          <path
            d={svgPaths.p36d12380}
            fill="var(--fill-0, #FFFAEC)"
            id="path1596"
          />
          <path
            d={svgPaths.p18b82200}
            fill="var(--fill-0, #FFFAEC)"
            id="path1598"
          />
          <path
            d={svgPaths.p35240280}
            fill="var(--fill-0, #FFFAEC)"
            id="path1600"
          />
          <path
            d={svgPaths.p3baf5780}
            fill="var(--fill-0, #FFFAEC)"
            id="path1602"
          />
          <path
            d={svgPaths.p15e18d00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1604"
          />
          <path
            d={svgPaths.p2c682180}
            fill="var(--fill-0, #FFFAEC)"
            id="path1606"
          />
          <path
            d={svgPaths.p70ddc00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1608"
          />
          <path
            d={svgPaths.p2d7d4580}
            fill="var(--fill-0, #FFFAEC)"
            id="path1610"
          />
          <path
            d={svgPaths.p23104400}
            fill="var(--fill-0, #FFFAEC)"
            id="path1612"
          />
          <path
            d={svgPaths.p2a6d3180}
            fill="var(--fill-0, #FFFAEC)"
            id="path1614"
          />
          <path
            d={svgPaths.p14dfd9c0}
            fill="var(--fill-0, #FFFAEC)"
            id="path1616"
          />
          <path
            d={svgPaths.p3525a700}
            fill="var(--fill-0, #FFFAEC)"
            id="path1618"
          />
          <path
            d={svgPaths.p29060800}
            fill="var(--fill-0, #FFFAEC)"
            id="path1620"
          />
          <path
            d={svgPaths.p26e6f900}
            fill="var(--fill-0, #FFFAEC)"
            id="path1622"
          />
          <path
            d={svgPaths.p299bff00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1624"
          />
          <path
            d={svgPaths.p3820a312}
            fill="var(--fill-0, #FFFAEC)"
            id="path1626"
          />
          <path
            d={svgPaths.p2d6c3900}
            fill="var(--fill-0, #FFFAEC)"
            id="path1628"
          />
          <path
            d={svgPaths.p3d38a380}
            fill="var(--fill-0, #FFFAEC)"
            id="path1630"
          />
          <path
            d={svgPaths.p3c591200}
            fill="var(--fill-0, #FFFAEC)"
            id="path1632"
          />
          <path
            d={svgPaths.p29f40650}
            fill="var(--fill-0, #FFFAEC)"
            id="path1634"
          />
          <path
            d={svgPaths.p29bb6740}
            fill="var(--fill-0, #FFFAEC)"
            id="path1636"
          />
          <path
            d={svgPaths.p2f7bac80}
            fill="var(--fill-0, #FFFAEC)"
            id="path1638"
          />
          <path
            d={svgPaths.p2f1ce780}
            fill="var(--fill-0, #FFFAEC)"
            id="path1640"
          />
          <path
            d={svgPaths.p1f2dcb00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1642"
          />
          <path
            d={svgPaths.p1f4fb000}
            fill="var(--fill-0, #FFFAEC)"
            id="path1644"
          />
          <path
            d={svgPaths.p6dbcac0}
            fill="var(--fill-0, #FFFAEC)"
            id="path1646"
          />
          <path
            d={svgPaths.pb62cf80}
            fill="var(--fill-0, #FFFAEC)"
            id="path1648"
          />
          <path
            d={svgPaths.p322b7f80}
            fill="var(--fill-0, #FFFAEC)"
            id="path1650"
          />
          <path
            d={svgPaths.p18c24680}
            fill="var(--fill-0, #FFFAEC)"
            id="path1652"
          />
          <path
            d={svgPaths.p7809800}
            fill="var(--fill-0, #FFFAEC)"
            id="path1654"
          />
          <path
            d={svgPaths.p2bf13f00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1656"
          />
          <path
            d={svgPaths.p2b499080}
            fill="var(--fill-0, #FFFAEC)"
            id="path1658"
          />
          <path
            d={svgPaths.p11433080}
            fill="var(--fill-0, #FFFAEC)"
            id="path1660"
          />
          <path
            d={svgPaths.p19e74f00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1662"
          />
          <path
            d={svgPaths.pf2cb200}
            fill="var(--fill-0, #FFFAEC)"
            id="path1664"
          />
          <path
            d={svgPaths.p6ed3d00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1666"
          />
          <path
            d={svgPaths.p1cb59300}
            fill="var(--fill-0, #FFFAEC)"
            id="path1668"
          />
          <path
            d={svgPaths.p18321d00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1670"
          />
          <path
            d={svgPaths.p34a22000}
            fill="var(--fill-0, #FFFAEC)"
            id="path1672"
          />
          <path
            d={svgPaths.p25628a80}
            fill="var(--fill-0, #FFFAEC)"
            id="path1674"
          />
          <path
            d={svgPaths.p68ac800}
            fill="var(--fill-0, #FFFAEC)"
            id="path1676"
          />
          <path
            d={svgPaths.pab2c80}
            fill="var(--fill-0, #FFFAEC)"
            id="path1678"
          />
          <path
            d={svgPaths.p2a9ac480}
            fill="var(--fill-0, #FFFAEC)"
            id="path1680"
          />
          <path
            d={svgPaths.p4325e00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1682"
          />
          <path
            d={svgPaths.p210f6000}
            fill="var(--fill-0, #FFFAEC)"
            id="path1684"
          />
          <path
            d={svgPaths.p3d9f2c80}
            fill="var(--fill-0, #FFFAEC)"
            id="path1686"
          />
          <path
            d={svgPaths.pf379700}
            fill="var(--fill-0, #FFFAEC)"
            id="path1688"
          />
          <path
            d={svgPaths.p3ca0d3f0}
            fill="var(--fill-0, #FFFAEC)"
            id="path1690"
          />
          <path
            d={svgPaths.p1c59d300}
            fill="var(--fill-0, #FFFAEC)"
            id="path1692"
          />
          <path
            d={svgPaths.p3a36d480}
            fill="var(--fill-0, #FFFAEC)"
            id="path1694"
          />
          <path
            d={svgPaths.p4d22d00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1696"
          />
          <path
            d={svgPaths.p6175d00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1698"
          />
          <path
            d={svgPaths.p32f26700}
            fill="var(--fill-0, #FFFAEC)"
            id="path1700"
          />
          <path
            d={svgPaths.p3b09a570}
            fill="var(--fill-0, #FFFAEC)"
            id="path1702"
          />
          <path
            d={svgPaths.pb2400}
            fill="var(--fill-0, #FFFAEC)"
            id="path1704"
          />
          <path
            d={svgPaths.p349f1f00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1706"
          />
          <path
            d={svgPaths.p132cfb00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1708"
          />
          <path
            d={svgPaths.p3e853b00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1710"
          />
          <path
            d={svgPaths.pc0a0d40}
            fill="var(--fill-0, #FFFAEC)"
            id="path1712"
          />
          <path
            d={svgPaths.p15b58500}
            fill="var(--fill-0, #FFFAEC)"
            id="path1714"
          />
          <path
            d={svgPaths.p3acc4580}
            fill="var(--fill-0, #FFFAEC)"
            id="path1716"
          />
          <path
            d={svgPaths.p176d6a00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1718"
          />
          <path
            d={svgPaths.p16e98c80}
            fill="var(--fill-0, #FFFAEC)"
            id="path1720"
          />
          <path
            d={svgPaths.p35fb6900}
            fill="var(--fill-0, #FFFAEC)"
            id="path1722"
          />
          <path
            d={svgPaths.pf30c800}
            fill="var(--fill-0, #FFFAEC)"
            id="path1724"
          />
          <path
            d={svgPaths.p39e8e100}
            fill="var(--fill-0, #FFFAEC)"
            id="path1726"
          />
          <path
            d={svgPaths.p31596500}
            fill="var(--fill-0, #FFFAEC)"
            id="path1728"
          />
          <path
            d={svgPaths.pd49c4b0}
            fill="var(--fill-0, #FFFAEC)"
            id="path1730"
          />
          <path
            d={svgPaths.p2c9b8a80}
            fill="var(--fill-0, #FFFAEC)"
            id="path1732"
          />
          <path
            d={svgPaths.p1a138830}
            fill="var(--fill-0, #FFFAEC)"
            id="path1734"
          />
          <path
            d={svgPaths.pb526b70}
            fill="var(--fill-0, #FFFAEC)"
            id="path1736"
          />
          <path
            d={svgPaths.p23fe0900}
            fill="var(--fill-0, #FFFAEC)"
            id="path1738"
          />
          <path
            d={svgPaths.p276ef5c0}
            fill="var(--fill-0, #FFFAEC)"
            id="path1740"
          />
          <path
            d={svgPaths.p8d7d400}
            fill="var(--fill-0, #FFFAEC)"
            id="path1742"
          />
          <path
            d={svgPaths.p374ca100}
            fill="var(--fill-0, #FFFAEC)"
            id="path1744"
          />
          <path
            d={svgPaths.p35d0bd80}
            fill="var(--fill-0, #FFFAEC)"
            id="path1746"
          />
          <path
            d={svgPaths.p20e9fc30}
            fill="var(--fill-0, #FFFAEC)"
            id="path1748"
          />
          <path
            d={svgPaths.p3e7b7000}
            fill="var(--fill-0, #FFFAEC)"
            id="path1750"
          />
          <path
            d={svgPaths.p38ff580}
            fill="var(--fill-0, #FFFAEC)"
            id="path1752"
          />
          <path
            d={svgPaths.p36023bf0}
            fill="var(--fill-0, #FFFAEC)"
            id="path1754"
          />
          <path
            d={svgPaths.p2b84c800}
            fill="var(--fill-0, #FFFAEC)"
            id="path1756"
          />
          <path
            d={svgPaths.p17c545c0}
            fill="var(--fill-0, #FFFAEC)"
            id="path1758"
          />
          <path
            d={svgPaths.p1de76600}
            fill="var(--fill-0, #FFFAEC)"
            id="path1760"
          />
          <path
            d={svgPaths.pdc84600}
            fill="var(--fill-0, #FFFAEC)"
            id="path1762"
          />
          <path
            d={svgPaths.pdcade00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1764"
          />
          <path
            d={svgPaths.p2314c6b0}
            fill="var(--fill-0, #FFFAEC)"
            id="path1766"
          />
          <path
            d={svgPaths.p3096d940}
            fill="var(--fill-0, #FFFAEC)"
            id="path1768"
          />
          <path
            d={svgPaths.p27403b40}
            fill="var(--fill-0, #FFFAEC)"
            id="path1770"
          />
          <path
            d={svgPaths.p3b3ad900}
            fill="var(--fill-0, #FFFAEC)"
            id="path1772"
          />
          <path
            d={svgPaths.p2c8a3b80}
            fill="var(--fill-0, #FFFAEC)"
            id="path1774"
          />
          <path
            d={svgPaths.p3bcb9500}
            fill="var(--fill-0, #FFFAEC)"
            id="path1776"
          />
          <path
            d={svgPaths.p3d9a3e00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1778"
          />
          <path
            d={svgPaths.p385cfc80}
            fill="var(--fill-0, #FFFAEC)"
            id="path1780"
          />
          <path
            d={svgPaths.pac0c000}
            fill="var(--fill-0, #FFFAEC)"
            id="path1782"
          />
          <path
            d={svgPaths.p18de6d00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1784"
          />
          <path
            d={svgPaths.p268c7200}
            fill="var(--fill-0, #FFFAEC)"
            id="path1786"
          />
          <path
            d={svgPaths.p27670500}
            fill="var(--fill-0, #FFFAEC)"
            id="path1788"
          />
          <path
            d={svgPaths.p2ea5b1f0}
            fill="var(--fill-0, #FFFAEC)"
            id="path1790"
          />
          <path
            d={svgPaths.p1bd49b80}
            fill="var(--fill-0, #FFFAEC)"
            id="path1792"
          />
          <path
            d={svgPaths.p1fbcfa80}
            fill="var(--fill-0, #FFFAEC)"
            id="path1794"
          />
          <path
            d={svgPaths.p3c03a800}
            fill="var(--fill-0, #FFFAEC)"
            id="path1796"
          />
          <path
            d={svgPaths.p7bb040}
            fill="var(--fill-0, #FFFAEC)"
            id="path1798"
          />
          <path
            d={svgPaths.p30a14600}
            fill="var(--fill-0, #FFFAEC)"
            id="path1800"
          />
          <path
            d={svgPaths.p358bb640}
            fill="var(--fill-0, #FFFAEC)"
            id="path1802"
          />
          <path
            d={svgPaths.pdfe6580}
            fill="var(--fill-0, #FFFAEC)"
            id="path1804"
          />
          <path
            d={svgPaths.p33a4b900}
            fill="var(--fill-0, #FFFAEC)"
            id="path1806"
          />
          <path
            d={svgPaths.p2d3d800}
            fill="var(--fill-0, #FFFAEC)"
            id="path1808"
          />
          <path
            d={svgPaths.p10c18200}
            fill="var(--fill-0, #FFFAEC)"
            id="path1810"
          />
          <path
            d={svgPaths.p387b1c0}
            fill="var(--fill-0, #FFFAEC)"
            id="path1812"
          />
          <path
            d={svgPaths.p2574da40}
            fill="var(--fill-0, #FFFAEC)"
            id="path1814"
          />
          <path
            d={svgPaths.pfa47900}
            fill="var(--fill-0, #FFFAEC)"
            id="path1816"
          />
          <path
            d={svgPaths.p3d7f3680}
            fill="var(--fill-0, #FFFAEC)"
            id="path1818"
          />
          <path
            d={svgPaths.p5ac3e00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1820"
          />
          <path
            d={svgPaths.p28bf9a00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1822"
          />
          <path
            d={svgPaths.p31f64900}
            fill="var(--fill-0, #FFFAEC)"
            id="path1824"
          />
          <path
            d={svgPaths.p148dcc00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1826"
          />
          <path
            d={svgPaths.p3469cc0}
            fill="var(--fill-0, #FFFAEC)"
            id="path1828"
          />
          <path
            d={svgPaths.p3988400}
            fill="var(--fill-0, #FFFAEC)"
            id="path1830"
          />
          <path
            d={svgPaths.p2fc5a300}
            fill="var(--fill-0, #FFFAEC)"
            id="path1832"
          />
          <path
            d={svgPaths.p2c0d74c0}
            fill="var(--fill-0, #FFFAEC)"
            id="path1834"
          />
          <path
            d={svgPaths.pfa51700}
            fill="var(--fill-0, #FFFAEC)"
            id="path1836"
          />
          <path
            d={svgPaths.p3a32a880}
            fill="var(--fill-0, #FFFAEC)"
            id="path1838"
          />
          <path
            d={svgPaths.p18afe100}
            fill="var(--fill-0, #FFFAEC)"
            id="path1840"
          />
          <path
            d={svgPaths.p5284d80}
            fill="var(--fill-0, #FFFAEC)"
            id="path1842"
          />
          <path
            d={svgPaths.p34f51880}
            fill="var(--fill-0, #FFFAEC)"
            id="path1844"
          />
          <path
            d={svgPaths.p1501440}
            fill="var(--fill-0, #FFFAEC)"
            id="path1846"
          />
          <path
            d={svgPaths.p391d1000}
            fill="var(--fill-0, #FFFAEC)"
            id="path1848"
          />
          <path
            d={svgPaths.pd0b6a00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1850"
          />
          <path
            d={svgPaths.p1a69f30}
            fill="var(--fill-0, #FFFAEC)"
            id="path1852"
          />
          <path
            d={svgPaths.p1871c600}
            fill="var(--fill-0, #FFFAEC)"
            id="path1854"
          />
          <path
            d={svgPaths.p5da1700}
            fill="var(--fill-0, #FFFAEC)"
            id="path1856"
          />
          <path
            d={svgPaths.p3f4b3200}
            fill="var(--fill-0, #FFFAEC)"
            id="path1858"
          />
          <path
            d={svgPaths.p26b8ff00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1860"
          />
          <path
            d={svgPaths.p2bd52d00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1862"
          />
          <path
            d={svgPaths.p2daf8200}
            fill="var(--fill-0, #FFFAEC)"
            id="path1864"
          />
          <path
            d={svgPaths.p16a35000}
            fill="var(--fill-0, #FFFAEC)"
            id="path1866"
          />
          <path
            d={svgPaths.p1a50f600}
            fill="var(--fill-0, #FFFAEC)"
            id="path1868"
          />
          <path
            d={svgPaths.p2c32f5a8}
            fill="var(--fill-0, #FFFAEC)"
            id="path1870"
          />
          <path
            d={svgPaths.p23060c80}
            fill="var(--fill-0, #FFFAEC)"
            id="path1872"
          />
          <path
            d={svgPaths.p24247600}
            fill="var(--fill-0, #FFFAEC)"
            id="path1874"
          />
          <path
            d={svgPaths.pc633780}
            fill="var(--fill-0, #FFFAEC)"
            id="path1876"
          />
          <path
            d={svgPaths.p32887f80}
            fill="var(--fill-0, #FFFAEC)"
            id="path1878"
          />
          <path
            d={svgPaths.p3bd08600}
            fill="var(--fill-0, #FFFAEC)"
            id="path1880"
          />
          <path
            d={svgPaths.p34e10a80}
            fill="var(--fill-0, #FFFAEC)"
            id="path1882"
          />
          <path
            d={svgPaths.pf48a900}
            fill="var(--fill-0, #FFFAEC)"
            id="path1884"
          />
          <path
            d={svgPaths.p5682c80}
            fill="var(--fill-0, #FFFAEC)"
            id="path1886"
          />
          <path
            d={svgPaths.p237ea7b0}
            fill="var(--fill-0, #FFFAEC)"
            id="path1888"
          />
          <path
            d={svgPaths.p2036f000}
            fill="var(--fill-0, #FFFAEC)"
            id="path1890"
          />
          <path
            d={svgPaths.p67a2400}
            fill="var(--fill-0, #FFFAEC)"
            id="path1892"
          />
          <path
            d={svgPaths.p74a2f30}
            fill="var(--fill-0, #FFFAEC)"
            id="path1894"
          />
          <path
            d={svgPaths.p3a0e5600}
            fill="var(--fill-0, #FFFAEC)"
            id="path1896"
          />
          <path
            d={svgPaths.p3f886200}
            fill="var(--fill-0, #FFFAEC)"
            id="path1898"
          />
          <path
            d={svgPaths.p3db76940}
            fill="var(--fill-0, #FFFAEC)"
            id="path1900"
          />
          <path
            d={svgPaths.p375ea400}
            fill="var(--fill-0, #FFFAEC)"
            id="path1902"
          />
          <path
            d={svgPaths.p3e93b100}
            fill="var(--fill-0, #FFFAEC)"
            id="path1904"
          />
          <path
            d={svgPaths.p217c1a00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1906"
          />
          <path
            d={svgPaths.p46f6500}
            fill="var(--fill-0, #FFFAEC)"
            id="path1908"
          />
          <path
            d={svgPaths.p29b99400}
            fill="var(--fill-0, #FFFAEC)"
            id="path1910"
          />
          <path
            d={svgPaths.p224da300}
            fill="var(--fill-0, #FFFAEC)"
            id="path1912"
          />
          <path
            d={svgPaths.p12ffa500}
            fill="var(--fill-0, #FFFAEC)"
            id="path1914"
          />
          <path
            d={svgPaths.p220aa240}
            fill="var(--fill-0, #FFFAEC)"
            id="path1916"
          />
          <path
            d={svgPaths.p194fee00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1918"
          />
          <path
            d={svgPaths.p330bcb00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1920"
          />
          <path
            d={svgPaths.p3c3ace00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1922"
          />
          <path
            d={svgPaths.p2687f980}
            fill="var(--fill-0, #FFFAEC)"
            id="path1924"
          />
          <path
            d={svgPaths.p3e9fdc00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1926"
          />
          <path
            d={svgPaths.pc988180}
            fill="var(--fill-0, #FFFAEC)"
            id="path1928"
          />
          <path
            d={svgPaths.p1766d600}
            fill="var(--fill-0, #FFFAEC)"
            id="path1930"
          />
          <path
            d={svgPaths.p308f30a0}
            fill="var(--fill-0, #FFFAEC)"
            id="path1932"
          />
          <path
            d={svgPaths.p211f3300}
            fill="var(--fill-0, #FFFAEC)"
            id="path1934"
          />
          <path
            d={svgPaths.p2a83f090}
            fill="var(--fill-0, #FFFAEC)"
            id="path1936"
          />
          <path
            d={svgPaths.p341d3b00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1938"
          />
          <path
            d={svgPaths.p21d75300}
            fill="var(--fill-0, #FFFAEC)"
            id="path1940"
          />
          <path
            d={svgPaths.p1048f100}
            fill="var(--fill-0, #FFFAEC)"
            id="path1942"
          />
          <path
            d={svgPaths.p10150400}
            fill="var(--fill-0, #FFFAEC)"
            id="path1944"
          />
          <path
            d={svgPaths.p12ca6300}
            fill="var(--fill-0, #FFFAEC)"
            id="path1946"
          />
          <path
            d={svgPaths.pe4bc140}
            fill="var(--fill-0, #FFFAEC)"
            id="path1948"
          />
          <path
            d={svgPaths.p118da200}
            fill="var(--fill-0, #FFFAEC)"
            id="path1950"
          />
          <path
            d={svgPaths.p2f1a0d10}
            fill="var(--fill-0, #FFFAEC)"
            id="path1952"
          />
          <path
            d={svgPaths.pe1d1000}
            fill="var(--fill-0, #FFFAEC)"
            id="path1954"
          />
          <path
            d={svgPaths.p2bc4b800}
            fill="var(--fill-0, #FFFAEC)"
            id="path1956"
          />
          <path
            d={svgPaths.p35060f80}
            fill="var(--fill-0, #FFFAEC)"
            id="path1958"
          />
          <path
            d={svgPaths.p2d173000}
            fill="var(--fill-0, #FFFAEC)"
            id="path1960"
          />
          <path
            d={svgPaths.p288cac00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1962"
          />
          <path
            d={svgPaths.p1b73e800}
            fill="var(--fill-0, #FFFAEC)"
            id="path1964"
          />
          <path
            d={svgPaths.p28898f00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1966"
          />
          <path
            d={svgPaths.p1c3a8580}
            fill="var(--fill-0, #FFFAEC)"
            id="path1968"
          />
          <path
            d={svgPaths.p2390bc00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1970"
          />
          <path
            d={svgPaths.p35a5a800}
            fill="var(--fill-0, #FFFAEC)"
            id="path1972"
          />
          <path
            d={svgPaths.p38f4aa00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1974"
          />
          <path
            d={svgPaths.p3d8f3570}
            fill="var(--fill-0, #FFFAEC)"
            id="path1976"
          />
          <path
            d={svgPaths.p6a2dc00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1978"
          />
          <path
            d={svgPaths.pb39f300}
            fill="var(--fill-0, #FFFAEC)"
            id="path1980"
          />
          <path
            d={svgPaths.pe35e00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1982"
          />
          <path
            d={svgPaths.p3d81d380}
            fill="var(--fill-0, #FFFAEC)"
            id="path1984"
          />
          <path
            d={svgPaths.p1a3c080}
            fill="var(--fill-0, #FFFAEC)"
            id="path1986"
          />
          <path
            d={svgPaths.pc90fb80}
            fill="var(--fill-0, #FFFAEC)"
            id="path1988"
          />
          <path
            d={svgPaths.p2f034900}
            fill="var(--fill-0, #FFFAEC)"
            id="path1990"
          />
          <path
            d={svgPaths.p3d8f9780}
            fill="var(--fill-0, #FFFAEC)"
            id="path1992"
          />
          <path
            d={svgPaths.pa771320}
            fill="var(--fill-0, #FFFAEC)"
            id="path1994"
          />
          <path
            d={svgPaths.pc223000}
            fill="var(--fill-0, #FFFAEC)"
            id="path1996"
          />
          <path
            d={svgPaths.p53e5e00}
            fill="var(--fill-0, #FFFAEC)"
            id="path1998"
          />
          <path
            d={svgPaths.p14082df0}
            fill="var(--fill-0, #FFFAEC)"
            id="path2000"
          />
          <path
            d={svgPaths.pce52380}
            fill="var(--fill-0, #FFFAEC)"
            id="path2002"
          />
          <path
            d={svgPaths.p15b33700}
            fill="var(--fill-0, #FFFAEC)"
            id="path2004"
          />
          <path
            d={svgPaths.p185f1f00}
            fill="var(--fill-0, #FFFAEC)"
            id="path2006"
          />
          <path
            d={svgPaths.p3ab46080}
            fill="var(--fill-0, #FFFAEC)"
            id="path2008"
          />
          <path
            d={svgPaths.p3b9600}
            fill="var(--fill-0, #FFFAEC)"
            id="path2010"
          />
          <path
            d={svgPaths.pc464f00}
            fill="var(--fill-0, #FFFAEC)"
            id="path2012"
          />
          <path
            d={svgPaths.p35aea280}
            fill="var(--fill-0, #FFFAEC)"
            id="path2014"
          />
          <path
            d={svgPaths.p3c062500}
            fill="var(--fill-0, #FFFAEC)"
            id="path2016"
          />
          <path
            d={svgPaths.p2fda0a00}
            fill="var(--fill-0, #FFFAEC)"
            id="path2018"
          />
          <path
            d={svgPaths.p1ba76000}
            fill="var(--fill-0, #FFFAEC)"
            id="path2020"
          />
          <path
            d={svgPaths.pf2de180}
            fill="var(--fill-0, #FFFAEC)"
            id="path2022"
          />
          <path
            d={svgPaths.p31d886f0}
            fill="var(--fill-0, #FFFAEC)"
            id="path2024"
          />
          <path
            d={svgPaths.p30f31900}
            fill="var(--fill-0, #FFFAEC)"
            id="path2026"
          />
          <path
            d={svgPaths.p1e807e00}
            fill="var(--fill-0, #FFFAEC)"
            id="path2028"
          />
          <path
            d={svgPaths.p156b1200}
            fill="var(--fill-0, #FFFAEC)"
            id="path2030"
          />
          <path
            d={svgPaths.p27805e00}
            fill="var(--fill-0, #FFFAEC)"
            id="path2032"
          />
          <path
            d={svgPaths.p1b5df480}
            fill="var(--fill-0, #FFFAEC)"
            id="path2034"
          />
          <path
            d={svgPaths.p32d3a680}
            fill="var(--fill-0, #FFFAEC)"
            id="path2036"
          />
          <path
            d={svgPaths.p1ce43a00}
            fill="var(--fill-0, #FFFAEC)"
            id="path2038"
          />
          <path
            d={svgPaths.p21d83870}
            fill="var(--fill-0, #FFFAEC)"
            id="path2040"
          />
          <path
            d={svgPaths.p306a1280}
            fill="var(--fill-0, #FFFAEC)"
            id="path2042"
          />
          <path
            d={svgPaths.p1e0d1c00}
            fill="var(--fill-0, #FFFAEC)"
            id="path2044"
          />
          <path
            d={svgPaths.p2cd02f00}
            fill="var(--fill-0, #FFFAEC)"
            id="path2046"
          />
        </g>
      </svg>
    </div>
  );
}

function Group1() {
  return (
    <div
      className="absolute inset-[17.65%_67.55%_80.13%_25.18%]"
      data-name="Group"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 104.753 150.608"
      >
        <g id="Group">
          <path
            d={svgPaths.pde6ccf0}
            fill="var(--fill-0, #1A1C21)"
            id="Vector"
          />
          <g id="Group_2">
            <path
              d={svgPaths.p21e7cd00}
              fill="var(--fill-0, white)"
              id="Vector_2"
            />
            <path
              d={svgPaths.p49f1100}
              fill="var(--fill-0, #1A1C21)"
              id="Vector_3"
            />
          </g>
          <path
            d={svgPaths.p181d02f0}
            fill="var(--fill-0, white)"
            id="Vector_4"
          />
        </g>
      </svg>
    </div>
  );
}

function Group3() {
  return (
    <div
      className="absolute inset-[17.67%_73.27%_80.99%_17.1%]"
      data-name="Group"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 138.656 91.0075"
      >
        <g id="Group">
          <g id="Group_2">
            <path
              d={svgPaths.p6a10b00}
              fill="var(--fill-0, white)"
              id="Vector"
            />
            <path
              d={svgPaths.p42be300}
              fill="var(--fill-0, #1A1C21)"
              id="Vector_2"
            />
          </g>
          <g id="Group_3">
            <path
              d={svgPaths.p247fb7c0}
              fill="var(--fill-0, white)"
              id="Vector_3"
            />
            <path
              d={svgPaths.p26ae0140}
              fill="var(--fill-0, #1A1C21)"
              id="Vector_4"
            />
          </g>
          <path
            d={svgPaths.p3a4ef480}
            fill="var(--fill-0, #1A1C21)"
            id="Vector_5"
          />
          <path
            d={svgPaths.p28471d00}
            fill="var(--fill-0, #1A1C21)"
            id="Vector_6"
          />
          <path
            d={svgPaths.p37c262f0}
            fill="var(--fill-0, #E0E2E7)"
            id="Vector_7"
          />
        </g>
      </svg>
    </div>
  );
}

function Group6() {
  return (
    <div
      className="absolute inset-[17.6%_79.9%_81.94%_17.89%]"
      data-name="Group"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 31.8042 31.7924"
      >
        <g id="Group">
          <path
            d={svgPaths.p20d68a80}
            fill="var(--fill-0, white)"
            id="Vector"
          />
          <path
            d={svgPaths.p1146cd00}
            fill="var(--fill-0, #7A1F36)"
            id="Vector_2"
          />
        </g>
      </svg>
    </div>
  );
}

function Group7() {
  return (
    <div
      className="absolute inset-[17.64%_80.13%_81.98%_18.12%]"
      data-name="Group"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 25.0937 25.0846"
      >
        <g id="Group">
          <path
            d={svgPaths.p1840c500}
            fill="var(--fill-0, white)"
            id="Vector"
          />
          <path
            d={svgPaths.p26529500}
            fill="var(--fill-0, #7A1F36)"
            id="Vector_2"
          />
        </g>
      </svg>
    </div>
  );
}

function Group5() {
  return (
    <div
      className="absolute contents inset-[17.6%_79.9%_81.94%_17.89%]"
      data-name="Group"
    >
      <Group6 />
      <Group7 />
    </div>
  );
}

function Group9() {
  return (
    <div
      className="absolute inset-[17.6%_80.56%_81.94%_17.23%]"
      data-name="Group"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 31.8041 31.7924"
      >
        <g id="Group">
          <path
            d={svgPaths.p337a2680}
            fill="var(--fill-0, white)"
            id="Vector"
          />
          <path
            d={svgPaths.p2358f200}
            fill="var(--fill-0, #7A1F36)"
            id="Vector_2"
          />
        </g>
      </svg>
    </div>
  );
}

function Group10() {
  return (
    <div
      className="absolute inset-[17.64%_80.79%_81.98%_17.47%]"
      data-name="Group"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 25.0937 25.0846"
      >
        <g id="Group">
          <path
            d={svgPaths.p1b8c7480}
            fill="var(--fill-0, white)"
            id="Vector"
          />
          <path
            d={svgPaths.p8fe8200}
            fill="var(--fill-0, #7A1F36)"
            id="Vector_2"
          />
        </g>
      </svg>
    </div>
  );
}

function Group8() {
  return (
    <div
      className="absolute contents inset-[17.6%_80.56%_81.94%_17.23%]"
      data-name="Group"
    >
      <Group9 />
      <Group10 />
    </div>
  );
}

function Group11() {
  return (
    <div
      className="absolute inset-[17.6%_81.23%_81.94%_16.59%]"
      data-name="Group"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 31.3864 31.3748"
      >
        <g id="Group">
          <path
            d={svgPaths.p12cc4180}
            fill="var(--fill-0, #7A1F36)"
            id="Vector"
          />
          <path
            d={svgPaths.p2546b780}
            fill="var(--fill-0, white)"
            id="Vector_2"
          />
          <g id="Group_2">
            <path
              d={svgPaths.p1b296dc0}
              fill="var(--fill-0, white)"
              id="Vector_3"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Group4() {
  return (
    <div
      className="absolute contents inset-[17.6%_79.9%_81.94%_16.59%]"
      data-name="Group"
    >
      <Group5 />
      <Group8 />
      <Group11 />
    </div>
  );
}

function Group2() {
  return (
    <div
      className="absolute contents inset-[17.52%_72.66%_80.84%_16.39%]"
      data-name="Group"
    >
      <div
        className="absolute inset-[17.52%_72.68%_80.84%_16.4%]"
        data-name="Vector"
      >
        <svg
          className="absolute block inset-0 size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 157.268 110.808"
        >
          <path
            d={svgPaths.p3c7b64d0}
            fill="var(--fill-0, white)"
            id="Vector"
          />
        </svg>
      </div>
      <div
        className="absolute inset-[17.52%_72.66%_80.84%_16.39%]"
        data-name="Vector"
      >
        <svg
          className="absolute block inset-0 size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 157.685 111.225"
        >
          <path
            d={svgPaths.p33ac7400}
            fill="var(--fill-0, #1A1C21)"
            id="Vector"
          />
        </svg>
      </div>
      <Group3 />
      <Group4 />
    </div>
  );
}

function Group15() {
  return (
    <div
      className="absolute inset-[18.13%_76.21%_81.8%_22.45%]"
      data-name="Group"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 19.3573 4.95287"
      >
        <g id="Group">
          <path
            d={svgPaths.pafc4a80}
            fill="var(--fill-0, #7A1F36)"
            id="Vector"
          />
          <path
            d={svgPaths.p1991b400}
            fill="var(--fill-0, #7A1F36)"
            id="Vector_2"
          />
          <path
            d={svgPaths.p9428b00}
            fill="var(--fill-0, #7A1F36)"
            id="Vector_3"
          />
        </g>
      </svg>
    </div>
  );
}

function Group14() {
  return (
    <div
      className="absolute contents inset-[18.13%_76.21%_81.8%_22.45%]"
      data-name="Group"
    >
      <Group15 />
    </div>
  );
}

function Group13() {
  return (
    <div
      className="absolute contents inset-[18.06%_66.72%_80.34%_21.76%]"
      data-name="Group"
    >
      <div
        className="absolute inset-[18.06%_66.72%_80.34%_21.76%]"
        data-name="Vector"
      >
        <svg
          className="absolute block inset-0 size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 165.965 108.4"
        >
          <path
            d={svgPaths.p5462880}
            fill="var(--fill-0, #1A1C21)"
            id="Vector"
          />
        </svg>
      </div>
      <div
        className="absolute inset-[18.26%_67%_81.74%_22.04%]"
        data-name="Vector"
      >
        <svg
          className="absolute block inset-0 size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 157.907 0.417749"
        >
          <path
            d={svgPaths.p3ee676f0}
            fill="var(--fill-0, #1A1C21)"
            id="Vector"
          />
        </svg>
      </div>
      <Group14 />
    </div>
  );
}

function Group17() {
  return (
    <div
      className="absolute inset-[18.65%_74.75%_81.09%_22.29%]"
      data-name="Group"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 42.544 17.8001"
      >
        <g id="Group">
          <path
            d={svgPaths.p101ec700}
            fill="var(--fill-0, #E0E2E7)"
            id="Vector"
          />
          <path
            d={svgPaths.p30c94c00}
            fill="var(--fill-0, #E0E2E7)"
            id="Vector_2"
          />
          <path
            d={svgPaths.p32e02c00}
            fill="var(--fill-0, #E0E2E7)"
            id="Vector_3"
          />
        </g>
      </svg>
    </div>
  );
}

function Group18() {
  return (
    <div
      className="absolute inset-[19.15%_74.75%_80.58%_22.29%]"
      data-name="Group"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 42.5441 17.8003"
      >
        <g id="Group">
          <path
            d={svgPaths.p8a44800}
            fill="var(--fill-0, #E0E2E7)"
            id="Vector"
          />
          <path
            d={svgPaths.p5b41100}
            fill="var(--fill-0, #E0E2E7)"
            id="Vector_2"
          />
          <path
            d={svgPaths.p3d8b6800}
            fill="var(--fill-0, #E0E2E7)"
            id="Vector_3"
          />
        </g>
      </svg>
    </div>
  );
}

function Group16() {
  return (
    <div
      className="absolute contents inset-[18.65%_74.75%_80.58%_22.29%]"
      data-name="Group"
    >
      <Group17 />
      <Group18 />
    </div>
  );
}

function Group19() {
  return (
    <div
      className="absolute inset-[18.64%_67.6%_80.48%_25.62%]"
      data-name="Group"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 97.5574 59.7278"
      >
        <g id="Group">
          <path
            d={svgPaths.p1c2c0400}
            fill="var(--fill-0, #1A1C21)"
            id="Vector"
          />
          <g id="Group_2">
            <path
              d={svgPaths.p26963200}
              fill="var(--fill-0, #E0E2E7)"
              id="Vector_2"
            />
            <path
              d={svgPaths.p3ef53400}
              fill="var(--fill-0, #7A1F36)"
              id="Vector_3"
            />
            <path
              d={svgPaths.p2a7f5172}
              fill="var(--fill-0, #7A1F36)"
              id="Vector_4"
            />
            <path
              d={svgPaths.p28a3ab00}
              fill="var(--fill-0, #E0E2E7)"
              id="Vector_5"
            />
            <path
              d={svgPaths.p332f2880}
              fill="var(--fill-0, #E0E2E7)"
              id="Vector_6"
            />
            <path
              d={svgPaths.p229c0300}
              fill="var(--fill-0, #E0E2E7)"
              id="Vector_7"
            />
            <path
              d={svgPaths.paa69300}
              fill="var(--fill-0, #7A1F36)"
              id="Vector_8"
            />
            <path
              d={svgPaths.p171cd580}
              fill="var(--fill-0, #7A1F36)"
              id="Vector_9"
            />
            <path
              d={svgPaths.p27d2e480}
              fill="var(--fill-0, #7A1F36)"
              id="Vector_10"
            />
            <path
              d={svgPaths.pb82e100}
              fill="var(--fill-0, #7A1F36)"
              id="Vector_11"
            />
            <path
              d={svgPaths.p354f5100}
              fill="var(--fill-0, #7A1F36)"
              id="Vector_12"
            />
            <path
              d={svgPaths.p1a450780}
              fill="var(--fill-0, #7A1F36)"
              id="Vector_13"
            />
            <path
              d={svgPaths.p73f6fc0}
              fill="var(--fill-0, #7A1F36)"
              id="Vector_14"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Group12() {
  return (
    <div
      className="absolute contents inset-[18.06%_66.72%_80.34%_21.76%]"
      data-name="Group"
    >
      <div
        className="absolute inset-[18.07%_66.73%_80.34%_21.77%]"
        data-name="Vector"
      >
        <svg
          className="absolute block inset-0 size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 165.547 107.982"
        >
          <path
            d={svgPaths.p1b630000}
            fill="var(--fill-0, white)"
            id="Vector"
          />
        </svg>
      </div>
      <Group13 />
      <div
        className="absolute inset-[18.38%_69.26%_81.5%_24.91%]"
        data-name="Vector"
      >
        <svg
          className="absolute block inset-0 size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 83.9152 8.42052"
        >
          <path
            d={svgPaths.p387f9e80}
            fill="var(--fill-0, #7A1F36)"
            id="Vector"
          />
        </svg>
      </div>
      <Group16 />
      <Group19 />
    </div>
  );
}

function FiaLogo() {
  return (
    <div className="relative shrink-0 size-[40px]" data-name="FIA Logo">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          alt=""
          className="absolute left-0 max-w-none size-full top-0"
          src={imgFiaLogo}
        />
      </div>
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex flex-col items-start leading-[0] relative shrink-0 whitespace-nowrap">
      <div
        className="flex flex-col font-['Roboto:Bold',sans-serif] font-bold justify-center relative shrink-0 text-[#7a1f36] text-[20px] uppercase"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="leading-[normal]">Cổng Một Cửa Đầu Tư Quốc Gia</p>
      </div>
      <div
        className="flex flex-col font-['Roboto:Medium',sans-serif] font-medium justify-center opacity-90 relative shrink-0 text-[#1d1d1d] text-[14px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="leading-[normal]">National Investment Gateway</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div
      className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex gap-[16px] items-center left-[calc(50%-491.5px)] top-[calc(50%-3296.5px)]"
      data-name="Container"
    >
      <FiaLogo />
      <Frame14 />
    </div>
  );
}

function LineNgang() {
  return (
    <div className="h-[1083px] relative w-[720px]" data-name="line ngang">
      <div className="absolute inset-[0_-0.28%_0_0]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 722 1083"
        >
          <g id="line ngang">
            <line
              id="Line 1"
              stroke="var(--stroke-0, #EBEBEB)"
              x1="0.5"
              x2="0.500047"
              y1="2"
              y2="1081"
            />
            <line
              id="Line 2"
              stroke="var(--stroke-0, #EBEBEB)"
              x1="90.5"
              x2="90.5001"
              y1="2"
              y2="1081"
            />
            <line
              id="Line 3"
              stroke="var(--stroke-0, #EBEBEB)"
              x1="180.5"
              x2="180.5"
              y1="2"
              y2="1081"
            />
            <line
              id="Line 4"
              stroke="var(--stroke-0, #EBEBEB)"
              x1="270.5"
              x2="270.5"
              y1="2"
              y2="1081"
            />
            <line
              id="Line 5"
              stroke="var(--stroke-0, #EBEBEB)"
              x1="360.5"
              x2="360.5"
              y1="0.5"
              y2="1082.5"
            />
            <line
              id="Line 6"
              stroke="var(--stroke-0, #EBEBEB)"
              x1="450.5"
              x2="450.5"
              y1="2"
              y2="1081"
            />
            <line
              id="Line 7"
              stroke="var(--stroke-0, #EBEBEB)"
              x1="540.5"
              x2="540.5"
              y1="2"
              y2="1081"
            />
            <line
              id="Line 8"
              stroke="var(--stroke-0, #EBEBEB)"
              x1="630.5"
              x2="630.5"
              y1="2"
              y2="1081"
            />
            <line
              id="Line 9"
              stroke="var(--stroke-0, #EBEBEB)"
              strokeWidth="2"
              x1="721"
              x2="721"
              y1="2"
              y2="1081"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}

function LineDc() {
  return (
    <div
      className="-translate-x-1/2 absolute h-[720px] left-[calc(50%-1px)] top-[158px] w-[1080px]"
      data-name="line dọc"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 1081 720"
      >
        <g id="line dá»c">
          <line
            id="Line 1"
            stroke="var(--stroke-0, #EBEBEB)"
            x1="0.5"
            x2="0.500031"
            y1="2.24481e-08"
            y2="720"
          />
          <line
            id="Line 2"
            stroke="var(--stroke-0, #EBEBEB)"
            x1="90.5"
            x2="90.5"
            y1="2.24481e-08"
            y2="720"
          />
          <line
            id="Line 3"
            stroke="var(--stroke-0, #EBEBEB)"
            x1="180.5"
            x2="180.5"
            y1="2.24481e-08"
            y2="720"
          />
          <line
            id="Line 4"
            stroke="var(--stroke-0, #EBEBEB)"
            x1="270.5"
            x2="270.5"
            y1="2.24481e-08"
            y2="720"
          />
          <line
            id="Line 5"
            stroke="var(--stroke-0, #EBEBEB)"
            x1="360.5"
            x2="360.5"
            y1="2.24481e-08"
            y2="720"
          />
          <line
            id="Line 6"
            stroke="var(--stroke-0, #EBEBEB)"
            x1="450.5"
            x2="450.5"
            y1="2.24481e-08"
            y2="720"
          />
          <line
            id="Line 7"
            stroke="var(--stroke-0, #EBEBEB)"
            x1="540.5"
            x2="540.5"
            y1="2.24481e-08"
            y2="720"
          />
          <line
            id="Line 8"
            stroke="var(--stroke-0, #EBEBEB)"
            x1="630.5"
            x2="630.5"
            y1="2.24481e-08"
            y2="720"
          />
          <line
            id="Line 9"
            stroke="var(--stroke-0, #EBEBEB)"
            x1="720.5"
            x2="720.5"
            y1="2.24481e-08"
            y2="720"
          />
          <line
            id="Line 10"
            stroke="var(--stroke-0, #EBEBEB)"
            x1="810.5"
            x2="810.5"
            y1="2.24481e-08"
            y2="720"
          />
          <line
            id="Line 11"
            stroke="var(--stroke-0, #EBEBEB)"
            x1="900.5"
            x2="900.5"
            y1="2.24481e-08"
            y2="720"
          />
          <line
            id="Line 12"
            stroke="var(--stroke-0, #EBEBEB)"
            x1="990.5"
            x2="990.5"
            y1="2.24481e-08"
            y2="720"
          />
          <line
            id="Line 13"
            stroke="var(--stroke-0, #EBEBEB)"
            x1="1080.5"
            x2="1080.5"
            y1="2.24481e-08"
            y2="720"
          />
        </g>
      </svg>
    </div>
  );
}

function Line() {
  return (
    <div
      className="-translate-x-1/2 absolute contents left-[calc(50%-0.5px)] top-[158px]"
      data-name="Line"
    >
      <div
        className="-translate-x-1/2 absolute flex h-[720px] items-center justify-center left-[calc(50%-0.5px)] top-[158px] w-[1083px]"
        style={
          {
            "--transform-inner-width": "1185",
            "--transform-inner-height": "21",
          } as React.CSSProperties
        }
      >
        <div className="flex-none rotate-90">
          <LineNgang />
        </div>
      </div>
      <LineDc />
    </div>
  );
}

function List() {
  return (
    <div
      className="-translate-x-1/2 absolute content-stretch flex font-['SVN-Neue_Montreal:Regular',sans-serif] gap-[20px] items-start leading-[0] left-[calc(50%+385px)] not-italic text-[#1a1c21] text-[14px] top-[84px] whitespace-nowrap"
      data-name="List"
    >
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[20px]">Giới thiệu</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[20px]">Lĩnh vực đầu tư</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[20px]">Bản đồ đầu tư</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[20px]">Chính sách đầu tư</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[20px]">Dịch vụ</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[20px]">Tin tức</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[20px]">Tra cứu</p>
      </div>
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex items-center justify-center pt-[5px] relative shrink-0">
      <div className="title-accent flex flex-col font-['SVN-Ivy_Presto_Display:Italic',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#7a1f36] text-[42px] text-center whitespace-nowrap">
        <p className="leading-[normal]">đầu tư</p>
      </div>
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
      <div className="flex flex-col font-['SVN-Neue_Montreal:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1c21] text-[42px] text-center whitespace-nowrap">
        <p className="leading-[normal]">Dịch vụ công về</p>
      </div>
      <Frame18 />
    </div>
  );
}

function Frame22() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex flex-col gap-[2px] items-center left-[calc(50%-0.5px)] top-[926px]">
      <Frame17 />
      <div className="flex flex-col font-['SVN-Neue_Montreal:Regular',sans-serif] justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#4d5464] text-[16px]">
        <p className="leading-[normal]">
          Nộp hồ sơ và theo dõi tiến độ xử lý thủ tục hành chính về đầu tư
        </p>
      </div>
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex items-center justify-center pt-[5px] relative shrink-0">
      <div className="title-accent flex flex-col font-['SVN-Ivy_Presto_Display:Italic',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#7a1f36] text-[42px] text-center whitespace-nowrap">
        <p className="leading-[normal]">Bản đồ</p>
      </div>
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
      <Frame20 />
      <div className="flex flex-col font-['SVN-Neue_Montreal:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1c21] text-[42px] text-center whitespace-nowrap">
        <p className="leading-[normal]">đầu tư</p>
      </div>
    </div>
  );
}

function Frame35() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex flex-col gap-[2px] items-center left-[calc(50%-0.5px)] top-[2121px]">
      <Frame19 />
      <div className="flex flex-col font-['SVN-Neue_Montreal:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4d5464] text-[16px] text-center whitespace-nowrap">
        <p className="leading-[normal]">{`Khám phá các khu công nghiệp và cơ hội đầu tư trên toàn quốc. `}</p>
      </div>
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex items-center justify-center pt-[5px] relative shrink-0">
      <div className="title-accent flex flex-col font-['SVN-Ivy_Presto_Display:Italic',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#7a1f36] text-[42px] text-center whitespace-nowrap">
        <p className="leading-[normal]">Văn bản</p>
      </div>
    </div>
  );
}

function Frame21() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex gap-[10px] items-center left-[calc(50%-346.5px)] top-[2874px]">
      <Frame23 />
      <div className="flex flex-col font-['SVN-Neue_Montreal:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1c21] text-[42px] text-center whitespace-nowrap">
        <p className="leading-[normal]">pháp luật</p>
      </div>
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-stretch flex items-center justify-center pt-[5px] relative shrink-0">
      <div className="title-accent flex flex-col font-['SVN-Ivy_Presto_Display:Italic',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#7a1f36] text-[42px] text-center whitespace-nowrap">
        <p className="leading-[normal]">Tin tức</p>
      </div>
    </div>
  );
}

function Frame46() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex gap-[10px] items-center left-[calc(50%-450px)] top-[3194px]">
      <Frame24 />
    </div>
  );
}

function Border() {
  return (
    <div
      className="absolute content-stretch flex flex-col gap-[3px] items-center left-[209px] px-px py-[4px] rounded-[4px] top-[2285px]"
      data-name="Border"
    >
      <div
        aria-hidden="true"
        className="absolute border border-[#e0e2e7] border-solid inset-0 pointer-events-none rounded-[4px]"
      />
      <div className="relative shrink-0 size-[20px]" data-name="lue/plus">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
          <div className="absolute inset-[16.67%]" data-name="Vector">
            <svg
              className="absolute block inset-0 size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 13.3333 13.3333"
            >
              <g id="Vector">
                <path d={svgPaths.p3830e9f0} fill="var(--fill-0, #333843)" />
                <path d={svgPaths.pa32cc80} fill="var(--fill-0, #333843)" />
              </g>
            </svg>
          </div>
        </div>
      </div>
      <div className="h-0 relative shrink-0 w-[26px]">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 26 1"
          >
            <line
              id="Line 26"
              stroke="var(--stroke-0, #E0E2E7)"
              x2="26"
              y1="0.5"
              y2="0.5"
            />
          </svg>
        </div>
      </div>
      <div className="relative shrink-0 size-[20px]" data-name="lue/minus">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
          <div className="absolute inset-[45.83%_16.67%]" data-name="Vector">
            <svg
              className="absolute block inset-0 size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 13.3333 1.66667"
            >
              <path
                d={svgPaths.p229dd400}
                fill="var(--fill-0, #333843)"
                id="Vector"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame25() {
  return (
    <div className="content-stretch flex items-center justify-center mb-[-4px] pt-[5px] relative shrink-0 w-full">
      <div className="flex flex-col font-['SVN-Ivy_Presto_Display:Italic',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[42px] text-center text-white whitespace-nowrap">
        <p className="leading-[normal]">Tổng quan</p>
      </div>
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <Frame25 />
      <div className="flex flex-col font-['SVN-Neue_Montreal:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[42px] text-white w-full">
        <p className="leading-[normal]">đầu tư</p>
      </div>
    </div>
  );
}

function Frame29() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-start left-[209px] top-[1596px] w-[255px]">
      <Frame28 />
      <div className="flex flex-col font-['SVN-Neue_Montreal:Regular',sans-serif] justify-center leading-[0] min-w-full not-italic opacity-70 relative shrink-0 text-[16px] text-white w-[min-content]">
        <p className="leading-[normal]">
          Số liệu thống kê đầu tư cập nhật đến tháng 12/2024
        </p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div
      className="absolute left-[209px] rounded-[400px] top-[1478px]"
      data-name="Button"
    >
      <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip pl-[24px] pr-[20px] py-[8px] relative rounded-[inherit] size-full">
        <p className="font-['SVN-Neue_Montreal:Medium',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#7a1f36] text-[16px] tracking-[-0.08px] whitespace-nowrap">
          Bắt đầu nộp hồ sơ
        </p>
        <div
          className="overflow-clip relative shrink-0 size-[20px]"
          data-name="lue/arrow-right"
        >
          <div className="absolute inset-[16.67%]" data-name="Vector">
            <svg
              className="absolute block inset-0 size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 13.3333 13.3331"
            >
              <g id="Vector">
                <path d={svgPaths.p37dd1f80} fill="var(--fill-0, #7A1F36)" />
                <path d={svgPaths.pa28a700} fill="var(--fill-0, #7A1F36)" />
              </g>
            </svg>
          </div>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute border border-[#7a1f36] border-solid inset-0 pointer-events-none rounded-[400px]"
      />
    </div>
  );
}

function Button1() {
  return (
    <div
      className="absolute left-[569px] rounded-[400px] top-[1478px]"
      data-name="Button"
    >
      <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip pl-[24px] pr-[20px] py-[8px] relative rounded-[inherit] size-full">
        <p className="font-['SVN-Neue_Montreal:Medium',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#7a1f36] text-[16px] tracking-[-0.08px] whitespace-nowrap">
          Bắt đầu nộp hồ sơ
        </p>
        <div
          className="overflow-clip relative shrink-0 size-[20px]"
          data-name="lue/arrow-right"
        >
          <div className="absolute inset-[16.67%]" data-name="Vector">
            <svg
              className="absolute block inset-0 size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 13.3333 13.3331"
            >
              <g id="Vector">
                <path d={svgPaths.p37dd1f80} fill="var(--fill-0, #7A1F36)" />
                <path d={svgPaths.pa28a700} fill="var(--fill-0, #7A1F36)" />
              </g>
            </svg>
          </div>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute border border-[#7a1f36] border-solid inset-0 pointer-events-none rounded-[400px]"
      />
    </div>
  );
}

function Button2() {
  return (
    <div
      className="absolute left-[929px] rounded-[400px] top-[1478px]"
      data-name="Button"
    >
      <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip pl-[24px] pr-[20px] py-[8px] relative rounded-[inherit] size-full">
        <p className="font-['SVN-Neue_Montreal:Medium',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#7a1f36] text-[16px] tracking-[-0.08px] whitespace-nowrap">
          Bắt đầu nộp hồ sơ
        </p>
        <div
          className="overflow-clip relative shrink-0 size-[20px]"
          data-name="lue/arrow-right"
        >
          <div className="absolute inset-[16.67%]" data-name="Vector">
            <svg
              className="absolute block inset-0 size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 13.3333 13.3331"
            >
              <g id="Vector">
                <path d={svgPaths.p37dd1f80} fill="var(--fill-0, #7A1F36)" />
                <path d={svgPaths.pa28a700} fill="var(--fill-0, #7A1F36)" />
              </g>
            </svg>
          </div>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute border border-[#7a1f36] border-solid inset-0 pointer-events-none rounded-[400px]"
      />
    </div>
  );
}

function GradientHighLabel() {
  return (
    <div
      className="absolute contents left-0 top-0"
      data-name="Gradient - High Label"
    >
      <div
        className="absolute h-[24px] left-[5.07px] top-0 w-[17.366px]"
        data-name="Doc Background"
      >
        <div className="absolute inset-[-0.65%_-2.25%_-2.6%_-2.25%]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 18.1462 24.7805"
          >
            <g filter="url(#filter0_d_3_3823)" id="Doc Background">
              <path d={svgPaths.p33a05300} fill="url(#paint0_linear_3_3823)" />
              <path
                d={svgPaths.p19c9e400}
                stroke="var(--stroke-0, #E5E5E5)"
                strokeWidth="0.0780488"
              />
            </g>
            <defs>
              <filter
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
                height="24.7805"
                id="filter0_d_3_3823"
                width="18.1462"
                x="-1.49012e-08"
                y="0"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  result="hardAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                />
                <feOffset dy="0.234146" />
                <feGaussianBlur stdDeviation="0.156098" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0"
                />
                <feBlend
                  in2="BackgroundImageFix"
                  mode="normal"
                  result="effect1_dropShadow_3_3823"
                />
                <feBlend
                  in="SourceGraphic"
                  in2="effect1_dropShadow_3_3823"
                  mode="normal"
                  result="shape"
                />
              </filter>
              <linearGradient
                gradientUnits="userSpaceOnUse"
                id="paint0_linear_3_3823"
                x1="8.81952"
                x2="8.81952"
                y1="0.156098"
                y2="24.1561"
              >
                <stop stopColor="#F7F7F7" />
                <stop offset="1" stopColor="white" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      <div
        className="absolute h-[6.01px] left-[16.86px] top-0 w-[5.561px]"
        data-name="Doc Border"
      >
        <div className="absolute inset-[-2.9%_-2.61%_-6.49%_-7.72%]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 6.13546 6.57392"
          >
            <g filter="url(#filter0_d_3_3684)" id="Doc Border">
              <path d={svgPaths.p33c89f0} fill="url(#paint0_linear_3_3684)" />
            </g>
            <defs>
              <filter
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
                height="6.57392"
                id="filter0_d_3_3684"
                width="6.13546"
                x="7.45058e-09"
                y="-3.72529e-09"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  result="hardAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                />
                <feOffset dx="-0.117073" dy="0.0780488" />
                <feGaussianBlur stdDeviation="0.156098" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                />
                <feBlend
                  in2="BackgroundImageFix"
                  mode="normal"
                  result="effect1_dropShadow_3_3684"
                />
                <feBlend
                  in="SourceGraphic"
                  in2="effect1_dropShadow_3_3684"
                  mode="normal"
                  result="shape"
                />
              </filter>
              <linearGradient
                gradientUnits="userSpaceOnUse"
                id="paint0_linear_3_3684"
                x1="3.21951"
                x2="3.21951"
                y1="0.174328"
                y2="6.18408"
              >
                <stop stopColor="#F6F6F6" />
                <stop offset="1" stopColor="white" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      <div
        className="absolute h-[11.083px] left-[8.08px] top-[10.38px] w-[11.395px]"
        data-name="PDF Ribbon"
      >
        <svg
          className="absolute block inset-0 size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 11.3951 11.0829"
        >
          <path
            d={svgPaths.p13455380}
            fill="var(--fill-0, #FF2116)"
            id="PDF Ribbon"
          />
        </svg>
      </div>
      <div
        className="absolute bg-gradient-to-t from-[#d0180e] from-[28.947%] h-[6.673px] left-0 rounded-[0.195px] shadow-[0px_0.234px_0.273px_0px_rgba(0,0,0,0.45)] to-[#ff2116] to-[116.67%] top-[1.76px] w-[14.985px]"
        data-name="Label"
      />
      <p
        className="-translate-x-1/2 absolute font-['Roboto:Medium',sans-serif] font-medium h-[5.151px] leading-[normal] left-[7.49px] text-[5.073px] text-center text-shadow-[0px_0.156px_0.156px_rgba(0,0,0,0.25)] text-white top-[2.26px] w-[9.99px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        PDF
      </p>
    </div>
  );
}

function Frame51() {
  return (
    <div className="relative shrink-0 size-[24px]">
      <GradientHighLabel />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex items-center p-[8px] relative rounded-[8px] shrink-0">
      <div
        aria-hidden="true"
        className="absolute border border-[#e0e2e7] border-solid inset-0 pointer-events-none rounded-[8px]"
      />
      <Frame51 />
    </div>
  );
}

function Frame47() {
  return (
    <div className="content-stretch flex flex-col items-start not-italic relative shrink-0 whitespace-nowrap">
      <p className="font-['SVN-Neue_Montreal:SemiBold',sans-serif] leading-[24px] relative shrink-0 text-[#1a1c21] text-[16px]">
        17/2026/QH16
      </p>
      <p className="font-['SVN-Neue_Montreal:Medium',sans-serif] leading-[normal] relative shrink-0 text-[#7a1f36] text-[12px] tracking-[0.6px]">
        NGHỊ QUYẾT (QH)
      </p>
    </div>
  );
}

function Frame48() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
      <Frame7 />
      <Frame47 />
    </div>
  );
}

function Container1() {
  return (
    <div
      className="content-stretch flex gap-[6px] items-center relative shrink-0"
      data-name="Container"
    >
      <div
        className="overflow-clip relative shrink-0 size-[16px]"
        data-name="lue/calendar-days"
      >
        <div className="absolute inset-[4.17%_8.33%]" data-name="Vector">
          <svg
            className="absolute block inset-0 size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 13.3333 14.6667"
          >
            <g id="Vector">
              <path d={svgPaths.p20852d00} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p2a339e80} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p1730a500} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p3ec18900} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p30f20a80} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p3ac2200} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p1add470} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p31643b00} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.pefaf300} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p25bd000} fill="var(--fill-0, #667085)" />
            </g>
          </svg>
        </div>
      </div>
      <p className="font-['SVN-Neue_Montreal:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#667085] text-[12px] whitespace-nowrap">
        08/04/2026
      </p>
    </div>
  );
}

function Frame55() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <p className="font-['SVN-Neue_Montreal:Regular',sans-serif] leading-[22px] min-w-full not-italic relative shrink-0 text-[#1a1c21] text-[14px] w-[min-content]">
        Phê chuẩn đề nghị của Thủ tướng Chính phủ về việc bổ nhiệm Bộ trưởng và
        thành viên khác của Chính phủ nhiệm kỳ 2026 - 2031
      </p>
      <Container1 />
    </div>
  );
}

function Item({ className }: { className?: string }) {
  return (
    <div
      className={
        className ||
        "absolute content-stretch flex flex-col gap-[16px] items-start left-[209px] top-[2990px] w-[300px]"
      }
      data-name="Item 1"
    >
      <Frame48 />
      <Frame55 />
    </div>
  );
}

function GradientHighLabel1() {
  return (
    <div
      className="absolute contents left-0 top-0"
      data-name="Gradient - High Label"
    >
      <div
        className="absolute h-[24px] left-[5.07px] top-0 w-[17.366px]"
        data-name="Doc Background"
      >
        <div className="absolute inset-[-0.65%_-2.25%_-2.6%_-2.25%]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 18.1462 24.7805"
          >
            <g filter="url(#filter0_d_3_3823)" id="Doc Background">
              <path d={svgPaths.p33a05300} fill="url(#paint0_linear_3_3823)" />
              <path
                d={svgPaths.p19c9e400}
                stroke="var(--stroke-0, #E5E5E5)"
                strokeWidth="0.0780488"
              />
            </g>
            <defs>
              <filter
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
                height="24.7805"
                id="filter0_d_3_3823"
                width="18.1462"
                x="-1.49012e-08"
                y="0"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  result="hardAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                />
                <feOffset dy="0.234146" />
                <feGaussianBlur stdDeviation="0.156098" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0"
                />
                <feBlend
                  in2="BackgroundImageFix"
                  mode="normal"
                  result="effect1_dropShadow_3_3823"
                />
                <feBlend
                  in="SourceGraphic"
                  in2="effect1_dropShadow_3_3823"
                  mode="normal"
                  result="shape"
                />
              </filter>
              <linearGradient
                gradientUnits="userSpaceOnUse"
                id="paint0_linear_3_3823"
                x1="8.81952"
                x2="8.81952"
                y1="0.156098"
                y2="24.1561"
              >
                <stop stopColor="#F7F7F7" />
                <stop offset="1" stopColor="white" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      <div
        className="absolute h-[6.01px] left-[16.86px] top-0 w-[5.561px]"
        data-name="Doc Border"
      >
        <div className="absolute inset-[-2.9%_-2.61%_-6.49%_-7.72%]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 6.13546 6.57392"
          >
            <g filter="url(#filter0_d_3_3684)" id="Doc Border">
              <path d={svgPaths.p33c89f0} fill="url(#paint0_linear_3_3684)" />
            </g>
            <defs>
              <filter
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
                height="6.57392"
                id="filter0_d_3_3684"
                width="6.13546"
                x="7.45058e-09"
                y="-3.72529e-09"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  result="hardAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                />
                <feOffset dx="-0.117073" dy="0.0780488" />
                <feGaussianBlur stdDeviation="0.156098" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                />
                <feBlend
                  in2="BackgroundImageFix"
                  mode="normal"
                  result="effect1_dropShadow_3_3684"
                />
                <feBlend
                  in="SourceGraphic"
                  in2="effect1_dropShadow_3_3684"
                  mode="normal"
                  result="shape"
                />
              </filter>
              <linearGradient
                gradientUnits="userSpaceOnUse"
                id="paint0_linear_3_3684"
                x1="3.21951"
                x2="3.21951"
                y1="0.174328"
                y2="6.18408"
              >
                <stop stopColor="#F6F6F6" />
                <stop offset="1" stopColor="white" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      <div
        className="absolute h-[11.083px] left-[8.08px] top-[10.38px] w-[11.395px]"
        data-name="PDF Ribbon"
      >
        <svg
          className="absolute block inset-0 size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 11.3951 11.0829"
        >
          <path
            d={svgPaths.p13455380}
            fill="var(--fill-0, #FF2116)"
            id="PDF Ribbon"
          />
        </svg>
      </div>
      <div
        className="absolute bg-gradient-to-t from-[#d0180e] from-[28.947%] h-[6.673px] left-0 rounded-[0.195px] shadow-[0px_0.234px_0.273px_0px_rgba(0,0,0,0.45)] to-[#ff2116] to-[116.67%] top-[1.76px] w-[14.985px]"
        data-name="Label"
      />
      <p
        className="-translate-x-1/2 absolute font-['Roboto:Medium',sans-serif] font-medium h-[5.151px] leading-[normal] left-[7.49px] text-[5.073px] text-center text-shadow-[0px_0.156px_0.156px_rgba(0,0,0,0.25)] text-white top-[2.26px] w-[9.99px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        PDF
      </p>
    </div>
  );
}

function Frame52() {
  return (
    <div className="relative shrink-0 size-[24px]">
      <GradientHighLabel1 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex items-center p-[8px] relative rounded-[8px] shrink-0">
      <div
        aria-hidden="true"
        className="absolute border border-[#e0e2e7] border-solid inset-0 pointer-events-none rounded-[8px]"
      />
      <Frame52 />
    </div>
  );
}

function Frame50() {
  return (
    <div className="content-stretch flex flex-col items-start not-italic relative shrink-0 whitespace-nowrap">
      <p className="font-['SVN-Neue_Montreal:SemiBold',sans-serif] leading-[24px] relative shrink-0 text-[#1a1c21] text-[16px]">
        18/2026/QH16-Test
      </p>
      <p className="font-['SVN-Neue_Montreal:Medium',sans-serif] leading-[normal] relative shrink-0 text-[#7a1f36] text-[12px] tracking-[0.6px]">
        NGHỊ QUYẾT (QH)
      </p>
    </div>
  );
}

function Frame49() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
      <Frame8 />
      <Frame50 />
    </div>
  );
}

function Container2() {
  return (
    <div
      className="content-stretch flex gap-[6px] items-center relative shrink-0"
      data-name="Container"
    >
      <div
        className="overflow-clip relative shrink-0 size-[16px]"
        data-name="lue/calendar-days"
      >
        <div className="absolute inset-[4.17%_8.33%]" data-name="Vector">
          <svg
            className="absolute block inset-0 size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 13.3333 14.6667"
          >
            <g id="Vector">
              <path d={svgPaths.p20852d00} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p2a339e80} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p1730a500} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p3ec18900} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p30f20a80} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p3ac2200} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p1add470} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p31643b00} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.pefaf300} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p25bd000} fill="var(--fill-0, #667085)" />
            </g>
          </svg>
        </div>
      </div>
      <p className="font-['SVN-Neue_Montreal:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#667085] text-[12px] whitespace-nowrap">
        08/04/2026
      </p>
    </div>
  );
}

function Frame56() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <p className="font-['SVN-Neue_Montreal:Regular',sans-serif] leading-[22px] min-w-full not-italic relative shrink-0 text-[#1a1c21] text-[14px] w-[min-content]">
        Phê chuẩn đề nghị của Thủ tướng Chính phủ về việc bổ nhiệm Bộ trưởng và
        thành viên khác của Chính phủ nhiệm kỳ 2026 - 2031
      </p>
      <Container2 />
    </div>
  );
}

function GradientHighLabel2() {
  return (
    <div
      className="absolute contents left-0 top-0"
      data-name="Gradient - High Label"
    >
      <div
        className="absolute h-[24px] left-[5.07px] top-0 w-[17.366px]"
        data-name="Doc Background"
      >
        <div className="absolute inset-[-0.65%_-2.25%_-2.6%_-2.25%]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 18.1462 24.7805"
          >
            <g filter="url(#filter0_d_3_3823)" id="Doc Background">
              <path d={svgPaths.p33a05300} fill="url(#paint0_linear_3_3823)" />
              <path
                d={svgPaths.p19c9e400}
                stroke="var(--stroke-0, #E5E5E5)"
                strokeWidth="0.0780488"
              />
            </g>
            <defs>
              <filter
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
                height="24.7805"
                id="filter0_d_3_3823"
                width="18.1462"
                x="-1.49012e-08"
                y="0"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  result="hardAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                />
                <feOffset dy="0.234146" />
                <feGaussianBlur stdDeviation="0.156098" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0"
                />
                <feBlend
                  in2="BackgroundImageFix"
                  mode="normal"
                  result="effect1_dropShadow_3_3823"
                />
                <feBlend
                  in="SourceGraphic"
                  in2="effect1_dropShadow_3_3823"
                  mode="normal"
                  result="shape"
                />
              </filter>
              <linearGradient
                gradientUnits="userSpaceOnUse"
                id="paint0_linear_3_3823"
                x1="8.81952"
                x2="8.81952"
                y1="0.156098"
                y2="24.1561"
              >
                <stop stopColor="#F7F7F7" />
                <stop offset="1" stopColor="white" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      <div
        className="absolute h-[6.01px] left-[16.86px] top-0 w-[5.561px]"
        data-name="Doc Border"
      >
        <div className="absolute inset-[-2.9%_-2.61%_-6.49%_-7.72%]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 6.13546 6.57392"
          >
            <g filter="url(#filter0_d_3_3684)" id="Doc Border">
              <path d={svgPaths.p33c89f0} fill="url(#paint0_linear_3_3684)" />
            </g>
            <defs>
              <filter
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
                height="6.57392"
                id="filter0_d_3_3684"
                width="6.13546"
                x="7.45058e-09"
                y="-3.72529e-09"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  result="hardAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                />
                <feOffset dx="-0.117073" dy="0.0780488" />
                <feGaussianBlur stdDeviation="0.156098" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                />
                <feBlend
                  in2="BackgroundImageFix"
                  mode="normal"
                  result="effect1_dropShadow_3_3684"
                />
                <feBlend
                  in="SourceGraphic"
                  in2="effect1_dropShadow_3_3684"
                  mode="normal"
                  result="shape"
                />
              </filter>
              <linearGradient
                gradientUnits="userSpaceOnUse"
                id="paint0_linear_3_3684"
                x1="3.21951"
                x2="3.21951"
                y1="0.174328"
                y2="6.18408"
              >
                <stop stopColor="#F6F6F6" />
                <stop offset="1" stopColor="white" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      <div
        className="absolute h-[11.083px] left-[8.08px] top-[10.38px] w-[11.395px]"
        data-name="PDF Ribbon"
      >
        <svg
          className="absolute block inset-0 size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 11.3951 11.0829"
        >
          <path
            d={svgPaths.p13455380}
            fill="var(--fill-0, #FF2116)"
            id="PDF Ribbon"
          />
        </svg>
      </div>
      <div
        className="absolute bg-gradient-to-t from-[#d0180e] from-[28.947%] h-[6.673px] left-0 rounded-[0.195px] shadow-[0px_0.234px_0.273px_0px_rgba(0,0,0,0.45)] to-[#ff2116] to-[116.67%] top-[1.76px] w-[14.985px]"
        data-name="Label"
      />
      <p
        className="-translate-x-1/2 absolute font-['Roboto:Medium',sans-serif] font-medium h-[5.151px] leading-[normal] left-[7.49px] text-[5.073px] text-center text-shadow-[0px_0.156px_0.156px_rgba(0,0,0,0.25)] text-white top-[2.26px] w-[9.99px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        PDF
      </p>
    </div>
  );
}

function Frame54() {
  return (
    <div className="relative shrink-0 size-[24px]">
      <GradientHighLabel2 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex items-center p-[8px] relative rounded-[8px] shrink-0">
      <div
        aria-hidden="true"
        className="absolute border border-[#e0e2e7] border-solid inset-0 pointer-events-none rounded-[8px]"
      />
      <Frame54 />
    </div>
  );
}

function Frame57() {
  return (
    <div className="content-stretch flex flex-col items-start not-italic relative shrink-0 whitespace-nowrap">
      <p className="font-['SVN-Neue_Montreal:SemiBold',sans-serif] leading-[24px] relative shrink-0 text-[#1a1c21] text-[16px]">
        128/2026/NĐ-CP-Test
      </p>
      <p className="font-['SVN-Neue_Montreal:Medium',sans-serif] leading-[normal] relative shrink-0 text-[#7a1f36] text-[12px] tracking-[0.6px]">
        NGHỊ QUYẾT (QH)
      </p>
    </div>
  );
}

function Frame53() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
      <Frame9 />
      <Frame57 />
    </div>
  );
}

function Container3() {
  return (
    <div
      className="content-stretch flex gap-[6px] items-center relative shrink-0"
      data-name="Container"
    >
      <div
        className="overflow-clip relative shrink-0 size-[16px]"
        data-name="lue/calendar-days"
      >
        <div className="absolute inset-[4.17%_8.33%]" data-name="Vector">
          <svg
            className="absolute block inset-0 size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 13.3333 14.6667"
          >
            <g id="Vector">
              <path d={svgPaths.p20852d00} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p2a339e80} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p1730a500} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p3ec18900} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p30f20a80} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p3ac2200} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p1add470} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p31643b00} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.pefaf300} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p25bd000} fill="var(--fill-0, #667085)" />
            </g>
          </svg>
        </div>
      </div>
      <p className="font-['SVN-Neue_Montreal:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#667085] text-[12px] whitespace-nowrap">
        08/04/2026
      </p>
    </div>
  );
}

function Frame58() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <p className="font-['SVN-Neue_Montreal:Regular',sans-serif] leading-[22px] min-w-full not-italic relative shrink-0 text-[#1a1c21] text-[14px] w-[min-content]">
        Phê chuẩn đề nghị của Thủ tướng Chính phủ về việc bổ nhiệm Bộ trưởng và
        thành viên khác của Chính phủ nhiệm kỳ 2026 - 2031
      </p>
      <Container3 />
    </div>
  );
}

function Container4() {
  return (
    <div
      className="content-stretch flex gap-[6px] items-center relative shrink-0"
      data-name="Container"
    >
      <div
        className="overflow-clip relative shrink-0 size-[16px]"
        data-name="lue/calendar-days"
      >
        <div className="absolute inset-[4.17%_8.33%]" data-name="Vector">
          <svg
            className="absolute block inset-0 size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 13.3333 14.6667"
          >
            <g id="Vector">
              <path d={svgPaths.p20852d00} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p2a339e80} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p1730a500} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p3ec18900} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p30f20a80} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p3ac2200} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p1add470} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p31643b00} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.pefaf300} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p25bd000} fill="var(--fill-0, #667085)" />
            </g>
          </svg>
        </div>
      </div>
      <p className="font-['SVN-Neue_Montreal:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#667085] text-[12px] whitespace-nowrap">
        08/04/2026
      </p>
    </div>
  );
}

function Text() {
  return (
    <div
      className="content-stretch flex flex-col gap-[8px] h-[70px] items-start relative shrink-0 w-full"
      data-name="Text"
    >
      <p className="font-['SVN-Neue_Montreal:SemiBold',sans-serif] leading-[24px] min-w-full not-italic relative shrink-0 text-[#1e2a37] text-[16px] w-[min-content]">
        Quyết tâm nâng hạng thị trường chứng khoán: Khơi thông dòng vốn tỷ đô
      </p>
      <Container4 />
    </div>
  );
}

function Frame60() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-end relative shrink-0 w-[300px]">
      <div className="h-[201px] relative shrink-0 w-full" data-name="image 27">
        <img
          alt=""
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          src={imgImage27}
        />
      </div>
      <Text />
    </div>
  );
}

function Container5() {
  return (
    <div
      className="content-stretch flex gap-[6px] items-center relative shrink-0"
      data-name="Container"
    >
      <div
        className="overflow-clip relative shrink-0 size-[16px]"
        data-name="lue/calendar-days"
      >
        <div className="absolute inset-[4.17%_8.33%]" data-name="Vector">
          <svg
            className="absolute block inset-0 size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 13.3333 14.6667"
          >
            <g id="Vector">
              <path d={svgPaths.p20852d00} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p2a339e80} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p1730a500} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p3ec18900} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p30f20a80} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p3ac2200} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p1add470} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p31643b00} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.pefaf300} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p25bd000} fill="var(--fill-0, #667085)" />
            </g>
          </svg>
        </div>
      </div>
      <p className="font-['SVN-Neue_Montreal:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#667085] text-[12px] whitespace-nowrap">
        08/04/2026
      </p>
    </div>
  );
}

function Text1() {
  return (
    <div
      className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[300px]"
      data-name="Text"
    >
      <p className="font-['SVN-Neue_Montreal:SemiBold',sans-serif] leading-[24px] min-w-full not-italic relative shrink-0 text-[#1e2a37] text-[16px] w-[min-content]">{`Nghệ thuật Đa dạng hóa Danh mục: Xây dựng "Pháo đài" Tài chính trước Biến động Thị trường`}</p>
      <Container5 />
    </div>
  );
}

function Container6() {
  return (
    <div
      className="content-stretch flex gap-[6px] items-center relative shrink-0"
      data-name="Container"
    >
      <div
        className="overflow-clip relative shrink-0 size-[16px]"
        data-name="lue/calendar-days"
      >
        <div className="absolute inset-[4.17%_8.33%]" data-name="Vector">
          <svg
            className="absolute block inset-0 size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 13.3333 14.6667"
          >
            <g id="Vector">
              <path d={svgPaths.p20852d00} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p2a339e80} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p1730a500} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p3ec18900} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p30f20a80} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p3ac2200} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p1add470} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p31643b00} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.pefaf300} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p25bd000} fill="var(--fill-0, #667085)" />
            </g>
          </svg>
        </div>
      </div>
      <p className="font-['SVN-Neue_Montreal:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#667085] text-[12px] whitespace-nowrap">
        08/04/2026
      </p>
    </div>
  );
}

function Text2() {
  return (
    <div
      className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[300px]"
      data-name="Text"
    >
      <p className="font-['SVN-Neue_Montreal:SemiBold',sans-serif] leading-[24px] min-w-full not-italic relative shrink-0 text-[#1e2a37] text-[16px] w-[min-content]">
        Mã đáo Thành công: NovaMart đạt Doanh số Kỷ lục trước Tết Bính Ngọ 2026
      </p>
      <Container6 />
    </div>
  );
}

function Frame61() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[20px] items-center left-[899px] top-[3287px] w-[360px]">
      <Frame60 />
      <div className="flex items-center justify-center relative shrink-0 w-full">
        <div className="flex-none rotate-180 w-full">
          <div className="h-0 relative w-full">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 360 1"
              >
                <line
                  id="Line 36"
                  stroke="var(--stroke-0, #EBEBEB)"
                  strokeDasharray="6 4"
                  x2="360"
                  y1="0.5"
                  y2="0.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Text1 />
      <div className="flex items-center justify-center relative shrink-0 w-full">
        <div className="flex-none rotate-180 w-full">
          <div className="h-0 relative w-full">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 360 1"
              >
                <line
                  id="Line 36"
                  stroke="var(--stroke-0, #EBEBEB)"
                  strokeDasharray="6 4"
                  x2="360"
                  y1="0.5"
                  y2="0.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Text2 />
    </div>
  );
}

function Group20() {
  return (
    <div className="absolute left-[168px] size-[22px] top-[148px]">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 22 22"
      >
        <g id="Group 1">
          <line
            id="Line 15"
            stroke="var(--stroke-0, #BABABA)"
            x1="4.37114e-08"
            x2="22"
            y1="10.4951"
            y2="10.4951"
          />
          <line
            id="Line 16"
            stroke="var(--stroke-0, #BABABA)"
            x1="11.5"
            x2="11.5"
            y1="2.18557e-08"
            y2="22"
          />
        </g>
      </svg>
    </div>
  );
}

function Group99() {
  return (
    <div className="absolute left-[1248px] size-[22px] top-[238px]">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 22 22"
      >
        <g id="Group 1">
          <line
            id="Line 15"
            stroke="var(--stroke-0, #BABABA)"
            x1="4.37114e-08"
            x2="22"
            y1="10.4951"
            y2="10.4951"
          />
          <line
            id="Line 16"
            stroke="var(--stroke-0, #BABABA)"
            x1="11.5"
            x2="11.5"
            y1="2.18557e-08"
            y2="22"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame130() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[20px]">
      <div
        aria-hidden="true"
        className="absolute border-[#7a1f36] border-[1.2px] border-solid inset-0 pointer-events-none rounded-[20px]"
      />
      <div
        className="overflow-clip relative shrink-0 size-[14px]"
        data-name="check"
      >
        <div
          className="absolute bottom-[29.17%] left-[16.67%] right-[16.67%] top-1/4"
          data-name="Icon"
        >
          <div className="absolute inset-[-9.35%_-6.43%]">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 10.5333 7.61667"
            >
              <path
                d={svgPaths.p16d29680}
                id="Icon"
                stroke="var(--stroke-0, #7A1F36)"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.2"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Overlay() {
  return (
    <div
      className="bg-[#fef0f0] content-stretch flex items-center justify-center relative rounded-[8px] shrink-0 size-[48px]"
      data-name="Overlay"
    >
      <Frame130 />
    </div>
  );
}

function Container9() {
  return (
    <div
      className="content-stretch flex flex-col items-start leading-[0] not-italic relative shrink-0"
      data-name="Container"
    >
      <div className="flex flex-col font-['SVN-Neue_Montreal:SemiBold',sans-serif] justify-center relative shrink-0 text-[#1a1c21] text-[18px] w-full">
        <p className="leading-[normal]">Cấp độ 4</p>
      </div>
      <div className="flex flex-col font-['SVN-Neue_Montreal:Regular',sans-serif] justify-center relative shrink-0 text-[#4d5464] text-[14px] w-full">
        <p className="leading-[normal]">Dịch vụ công toàn trình</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div
      className="content-stretch flex gap-[12px] items-start relative shrink-0"
      data-name="Container"
    >
      <Overlay />
      <Container9 />
    </div>
  );
}

function Shield() {
  return (
    <div
      className="overflow-clip relative shrink-0 size-[24px]"
      data-name="shield"
    >
      <div className="absolute inset-[8.33%_16.67%]" data-name="Icon">
        <div className="absolute inset-[-3%_-3.75%]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 17.2 21.2"
          >
            <path
              d={svgPaths.p38dd3400}
              id="Icon"
              stroke="var(--stroke-0, #7A1F36)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.2"
            />
          </svg>
        </div>
      </div>
      <div
        className="absolute aspect-[24/24] left-1/4 overflow-clip right-1/4 top-[5px]"
        data-name="check"
      >
        <div
          className="absolute bottom-[29.17%] left-[16.67%] right-[16.67%] top-1/4"
          data-name="Icon"
        >
          <div className="absolute inset-[-10.91%_-7.5%]">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 9.2 6.7"
            >
              <path
                d="M8.6 0.6L3.1 6.1L0.6 3.6"
                id="Icon"
                stroke="var(--stroke-0, #7A1F36)"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.2"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Overlay1() {
  return (
    <div
      className="bg-[#fef0f0] content-stretch flex items-center justify-center relative rounded-[8px] shrink-0 size-[48px]"
      data-name="Overlay"
    >
      <Shield />
    </div>
  );
}

function Container11() {
  return (
    <div
      className="content-stretch flex flex-col items-start leading-[0] not-italic relative shrink-0 whitespace-nowrap"
      data-name="Container"
    >
      <div className="flex flex-col font-['SVN-Neue_Montreal:SemiBold',sans-serif] justify-center relative shrink-0 text-[#1a1c21] text-[18px]">
        <p className="leading-[normal]">100%</p>
      </div>
      <div className="flex flex-col font-['SVN-Neue_Montreal:Regular',sans-serif] justify-center relative shrink-0 text-[#4d5464] text-[14px]">
        <p className="leading-[normal]">Bảo mật thông tin</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div
      className="content-stretch flex gap-[12px] items-start relative shrink-0"
      data-name="Container"
    >
      <Overlay1 />
      <Container11 />
    </div>
  );
}

function Overlay2() {
  return (
    <div
      className="bg-[#fef0f0] content-stretch flex items-center justify-center relative rounded-[8px] shrink-0 size-[48px]"
      data-name="Overlay"
    >
      <div
        className="overflow-clip relative shrink-0 size-[24px]"
        data-name="clock"
      >
        <div className="absolute inset-[8.33%]" data-name="Icon">
          <div className="absolute inset-[-3%]">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 21.2 21.2"
            >
              <path
                d={svgPaths.p7e58f00}
                id="Icon"
                stroke="var(--stroke-0, #7A1F36)"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.2"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div
      className="content-stretch flex flex-col items-start leading-[0] not-italic relative shrink-0 whitespace-nowrap"
      data-name="Container"
    >
      <div className="flex flex-col font-['SVN-Neue_Montreal:SemiBold',sans-serif] justify-center relative shrink-0 text-[#1a1c21] text-[18px]">
        <p className="leading-[normal]">24/7</p>
      </div>
      <div className="flex flex-col font-['SVN-Neue_Montreal:Regular',sans-serif] justify-center relative shrink-0 text-[#4d5464] text-[14px]">
        <p className="leading-[normal]">Hỗ trợ trực tuyến</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div
      className="content-stretch flex gap-[12px] items-start relative shrink-0"
      data-name="Container"
    >
      <Overlay2 />
      <Container13 />
    </div>
  );
}

function Container7() {
  return (
    <div
      className="-translate-x-1/2 absolute content-stretch flex gap-[56px] items-start left-[calc(50%+0.5px)] top-[1048px]"
      data-name="Container"
    >
      <Container8 />
      <Container10 />
      <Container12 />
    </div>
  );
}

function Container14() {
  return (
    <div
      className="content-stretch flex gap-[12px] items-center leading-[0] not-italic relative shrink-0 text-[13px] text-white"
      data-name="Container"
    >
      <div className="flex flex-col font-['SVN-Neue_Montreal:Medium',sans-serif] justify-center relative shrink-0 whitespace-nowrap">
        <p className="leading-[18px]">Tiếng Việt</p>
      </div>
      <div className="flex flex-col font-['SVN-Neue_Montreal:Regular',sans-serif] justify-center opacity-20 relative shrink-0 w-[2px]">
        <p className="leading-[18px]">|</p>
      </div>
      <div className="flex flex-col font-['SVN-Neue_Montreal:Regular',sans-serif] justify-center opacity-70 relative shrink-0 whitespace-nowrap">
        <p className="leading-[18px]">English</p>
      </div>
      <div className="flex flex-col font-['SVN-Neue_Montreal:Regular',sans-serif] justify-center opacity-20 relative shrink-0 w-[2px]">
        <p className="leading-[18px]">|</p>
      </div>
      <div className="flex flex-col font-['SVN-Neue_Montreal:Regular',sans-serif] justify-center opacity-70 relative shrink-0">
        <p className="leading-[18px]">中文</p>
      </div>
      <div className="flex flex-col font-['SVN-Neue_Montreal:Regular',sans-serif] justify-center opacity-20 relative shrink-0 w-[2px]">
        <p className="leading-[18px]">|</p>
      </div>
      <div className="flex flex-col font-['SVN-Neue_Montreal:Regular',sans-serif] justify-center opacity-70 relative shrink-0 whitespace-nowrap">
        <p className="leading-[18px]">日本語</p>
      </div>
      <div className="flex flex-col font-['SVN-Neue_Montreal:Regular',sans-serif] justify-center opacity-20 relative shrink-0 w-[2px]">
        <p className="leading-[18px]">|</p>
      </div>
      <div className="flex flex-col font-['SVN-Neue_Montreal:Regular',sans-serif] justify-center opacity-70 relative shrink-0 whitespace-nowrap">
        <p className="leading-[18px]">한국어</p>
      </div>
    </div>
  );
}

function Frame129() {
  return (
    <div className="absolute bg-[#1a1c21] content-stretch flex flex-col h-[32px] items-center justify-center left-0 py-[7px] top-0 w-[100vw] left-1/2 -translate-x-1/2">
      <Container14 />
    </div>
  );
}

function Frame26() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-start leading-[0] left-[209px] not-italic top-[1382px] w-[298px]">
      <div className="flex flex-col font-['SVN-Neue_Montreal:SemiBold',sans-serif] justify-center relative shrink-0 text-[#1a1c21] text-[20px] w-full">
        <p className="leading-[normal]">Đầu tư tại Việt Nam</p>
      </div>
      <div className="flex flex-col font-['SVN-Neue_Montreal:Regular',sans-serif] justify-center relative shrink-0 text-[#4d5464] text-[14px] w-full">
        <p className="leading-[20px]">
          Đơn giản hóa thủ tục, nâng cao hiệu quả đầu tư tại Việt Nam
        </p>
      </div>
    </div>
  );
}

function Frame27() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-start leading-[0] left-[569px] not-italic top-[1382px] w-[298px]">
      <div className="flex flex-col font-['SVN-Neue_Montreal:SemiBold',sans-serif] justify-center relative shrink-0 text-[#1a1c21] text-[20px] w-full">
        <p className="leading-[normal] text-nowrap">Đầu tư từ Việt Nam ra nước ngoài</p>
      </div>
      <div className="flex flex-col font-['SVN-Neue_Montreal:Regular',sans-serif] justify-center relative shrink-0 text-[#4d5464] text-[14px] w-full">
        <p className="leading-[20px]">
          Đồng hành cùng nhà đầu tư Việt Nam trong quá trình đầu tư ra nước
          ngoài
        </p>
      </div>
    </div>
  );
}

function Frame30() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-start leading-[0] left-[929px] not-italic top-[1380px] w-[298px]">
      <div className="flex flex-col font-['SVN-Neue_Montreal:SemiBold',sans-serif] justify-center relative shrink-0 text-[#1a1c21] text-[20px] w-full">
        <p className="leading-[normal]">Hỗ trợ đầu tư</p>
      </div>
      <div className="flex flex-col font-['SVN-Neue_Montreal:Regular',sans-serif] justify-center relative shrink-0 text-[#4d5464] text-[14px] w-full">
        <p className="leading-[20px]">
          Nơi nhà đầu tư thực hiện các thủ tục hỗ trợ chi phí đầu tư
        </p>
      </div>
    </div>
  );
}

function Frame31() {
  return (
    <div className="bg-[rgba(255,255,255,0.15)] content-stretch flex items-center justify-center px-[12px] py-[2px] relative rounded-[6px] shrink-0">
      <div className="flex flex-col font-['SVN-Neue_Montreal:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
        <p className="leading-[20px]">FDI</p>
      </div>
    </div>
  );
}

function Container16() {
  const countRef = useCountUp(2847, { separator: "." });
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start leading-[0] not-italic relative size-full">
        <div className="flex flex-col font-['SVN-Neue_Montreal:Medium',sans-serif] justify-center relative shrink-0 text-[#fef0f0] text-[30px] w-full">
          <p className="leading-[44px]" ref={countRef}>2.847</p>
        </div>
        <div className="flex flex-col font-['SVN-Neue_Montreal:Regular',sans-serif] justify-center opacity-70 relative shrink-0 text-[16px] text-white w-full">
          <p className="leading-[24px]">Tổng số dự án</p>
        </div>
      </div>
    </div>
  );
}

function OverlayBorderOverlayBlur() {
  return (
    <div
      className="backdrop-blur-[5px] content-stretch flex gap-[12px] items-center pr-[40px] relative shrink-0 w-[170px]"
      data-name="Overlay+Border+OverlayBlur"
    >
      <Container16 />
    </div>
  );
}

function Frame34() {
  return (
    <div className="content-stretch flex items-center justify-center pb-[5px] relative shrink-0">
      <div className="flex flex-col font-['SVN-Neue_Montreal:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">
        <p className="leading-[24px]">tỷ USD</p>
      </div>
    </div>
  );
}

function Frame33() {
  const countRef = useCountUp(456.8, { decimals: 1 });
  return (
    <div className="content-stretch flex gap-[6px] items-end relative shrink-0 w-full">
      <div className="flex flex-col font-['SVN-Neue_Montreal:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#fef0f0] text-[30px] whitespace-nowrap">
        <p className="leading-[44px]" ref={countRef}>456,8</p>
      </div>
      <Frame34 />
    </div>
  );
}

function Container17() {
  return (
    <div className="relative shrink-0 w-[135px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Frame33 />
        <div className="flex flex-col font-['SVN-Neue_Montreal:Regular',sans-serif] justify-center leading-[0] not-italic opacity-70 relative shrink-0 text-[16px] text-white w-full">
          <p className="leading-[24px]">Vốn đăng ký</p>
        </div>
      </div>
    </div>
  );
}

function OverlayBorderOverlayBlur1() {
  return (
    <div
      className="backdrop-blur-[5px] content-stretch flex gap-[12px] items-center pr-[40px] relative shrink-0 w-[170px]"
      data-name="Overlay+Border+OverlayBlur"
    >
      <Container17 />
    </div>
  );
}

function Frame37() {
  return (
    <div className="content-stretch flex items-center justify-center pb-[5px] relative shrink-0">
      <div className="flex flex-col font-['SVN-Neue_Montreal:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">
        <p className="leading-[24px]">tỷ USD</p>
      </div>
    </div>
  );
}

function Frame36() {
  const countRef = useCountUp(298.5, { decimals: 1 });
  return (
    <div className="content-stretch flex gap-[6px] items-end relative shrink-0 w-full">
      <div className="flex flex-col font-['SVN-Neue_Montreal:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#fef0f0] text-[30px] whitespace-nowrap">
        <p className="leading-[44px]" ref={countRef}>298,5</p>
      </div>
      <Frame37 />
    </div>
  );
}

function Container18() {
  return (
    <div className="relative shrink-0 w-[134px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Frame36 />
        <div className="flex flex-col font-['SVN-Neue_Montreal:Regular',sans-serif] justify-center leading-[0] not-italic opacity-70 relative shrink-0 text-[16px] text-white w-full">
          <p className="leading-[24px]">Vốn thực hiện</p>
        </div>
      </div>
    </div>
  );
}

function OverlayBorderOverlayBlur2() {
  return (
    <div
      className="backdrop-blur-[5px] content-stretch flex gap-[12px] items-center relative shrink-0 w-[170px]"
      data-name="Overlay+Border+OverlayBlur"
    >
      <Container18 />
    </div>
  );
}

function Container15() {
  return (
    <div
      className="content-stretch flex items-start justify-between relative shrink-0 w-full"
      data-name="Container"
    >
      <OverlayBorderOverlayBlur />
      <OverlayBorderOverlayBlur1 />
      <OverlayBorderOverlayBlur2 />
    </div>
  );
}

function Frame32() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] items-start left-[569px] top-[1600px] w-[660px]">
      <Frame31 />
      <Container15 />
    </div>
  );
}

function Frame39() {
  return (
    <div className="bg-[rgba(255,255,255,0.15)] content-stretch flex items-center justify-center px-[12px] py-[2px] relative rounded-[6px] shrink-0">
      <div className="flex flex-col font-['SVN-Neue_Montreal:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
        <p className="leading-[20px]">{`M&A`}</p>
      </div>
    </div>
  );
}

function Container20() {
  const countRef = useCountUp(1205, { separator: "." });
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start leading-[0] not-italic relative size-full">
        <div className="flex flex-col font-['SVN-Neue_Montreal:Medium',sans-serif] justify-center relative shrink-0 text-[#fef0f0] text-[30px] w-full">
          <p className="leading-[44px]" ref={countRef}>1205</p>
        </div>
        <div className="flex flex-col font-['SVN-Neue_Montreal:Regular',sans-serif] justify-center opacity-70 relative shrink-0 text-[16px] text-white w-full">
          <p className="leading-[24px]">Lượt góp vốn</p>
        </div>
      </div>
    </div>
  );
}

function OverlayBorderOverlayBlur3() {
  return (
    <div
      className="backdrop-blur-[5px] content-stretch flex gap-[12px] items-center pr-[40px] relative shrink-0 w-[170px]"
      data-name="Overlay+Border+OverlayBlur"
    >
      <Container20 />
    </div>
  );
}

function Frame41() {
  return (
    <div className="content-stretch flex items-center justify-center pb-[5px] relative shrink-0">
      <div className="flex flex-col font-['SVN-Neue_Montreal:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">
        <p className="leading-[24px]">tỷ USD</p>
      </div>
    </div>
  );
}

function Frame40() {
  const countRef = useCountUp(12.5, { decimals: 1 });
  return (
    <div className="content-stretch flex gap-[6px] items-end relative shrink-0 w-full">
      <div className="flex flex-col font-['SVN-Neue_Montreal:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#fef0f0] text-[30px] whitespace-nowrap">
        <p className="leading-[44px]" ref={countRef}>12,5</p>
      </div>
      <Frame41 />
    </div>
  );
}

function Container21() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Frame40 />
        <div className="flex flex-col font-['SVN-Neue_Montreal:Regular',sans-serif] justify-center leading-[0] not-italic opacity-70 relative shrink-0 text-[16px] text-white w-full">
          <p className="leading-[24px]">Giá trị góp vốn</p>
        </div>
      </div>
    </div>
  );
}

function OverlayBorderOverlayBlur4() {
  return (
    <div
      className="backdrop-blur-[5px] content-stretch flex gap-[12px] items-center pr-[40px] relative shrink-0 w-[170px]"
      data-name="Overlay+Border+OverlayBlur"
    >
      <Container21 />
    </div>
  );
}

function Frame43() {
  return (
    <div className="content-stretch flex items-center justify-center pb-[5px] relative shrink-0">
      <div className="flex flex-col font-['SVN-Neue_Montreal:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">
        <p className="leading-[24px]">tỷ USD</p>
      </div>
    </div>
  );
}

function Frame42() {
  const countRef = useCountUp(8.9, { decimals: 1 });
  return (
    <div className="content-stretch flex gap-[6px] items-end relative shrink-0 w-full">
      <div className="flex flex-col font-['SVN-Neue_Montreal:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#fef0f0] text-[30px] whitespace-nowrap">
        <p className="leading-[44px]" ref={countRef}>8,9</p>
      </div>
      <Frame43 />
    </div>
  );
}

function Container22() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Frame42 />
        <div className="flex flex-col font-['SVN-Neue_Montreal:Regular',sans-serif] justify-center leading-[0] not-italic opacity-70 relative shrink-0 text-[16px] text-white w-full">
          <p className="leading-[24px]">Vốn giải ngân</p>
        </div>
      </div>
    </div>
  );
}

function OverlayBorderOverlayBlur5() {
  return (
    <div
      className="backdrop-blur-[5px] content-stretch flex gap-[12px] items-center relative shrink-0 w-[170px]"
      data-name="Overlay+Border+OverlayBlur"
    >
      <Container22 />
    </div>
  );
}

function Container19() {
  return (
    <div
      className="content-stretch flex items-start justify-between relative shrink-0 w-full"
      data-name="Container"
    >
      <OverlayBorderOverlayBlur3 />
      <OverlayBorderOverlayBlur4 />
      <OverlayBorderOverlayBlur5 />
    </div>
  );
}

function Frame38() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] items-start left-[569px] top-[1780px] w-[660px]">
      <Frame39 />
      <Container19 />
    </div>
  );
}

function Frame45() {
  return (
    <div className="bg-[rgba(255,255,255,0.15)] content-stretch flex items-center justify-center px-[12px] py-[2px] relative rounded-[6px] shrink-0">
      <div className="flex flex-col font-['SVN-Neue_Montreal:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
        <p className="leading-[20px]">ODI</p>
      </div>
    </div>
  );
}

function Container24() {
  const countRef = useCountUp(142);
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start leading-[0] not-italic relative size-full">
        <div className="flex flex-col font-['SVN-Neue_Montreal:Medium',sans-serif] justify-center relative shrink-0 text-[#fef0f0] text-[30px] w-full">
          <p className="leading-[44px]" ref={countRef}>142</p>
        </div>
        <div className="flex flex-col font-['SVN-Neue_Montreal:Regular',sans-serif] justify-center opacity-70 relative shrink-0 text-[16px] text-white w-full">
          <p className="leading-[24px]">Dự án ra nước ngoài</p>
        </div>
      </div>
    </div>
  );
}

function OverlayBorderOverlayBlur6() {
  return (
    <div
      className="backdrop-blur-[5px] content-stretch flex gap-[12px] items-center pr-[0px] relative shrink-0 w-[170px]"
      data-name="Overlay+Border+OverlayBlur"
    >
      <Container24 />
    </div>
  );
}

function Frame62() {
  return (
    <div className="content-stretch flex items-center justify-center pb-[5px] relative shrink-0">
      <div className="flex flex-col font-['SVN-Neue_Montreal:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">
        <p className="leading-[24px]">tỷ USD</p>
      </div>
    </div>
  );
}

function Frame59() {
  const countRef = useCountUp(5.2, { decimals: 1 });
  return (
    <div className="content-stretch flex gap-[6px] items-end relative shrink-0 w-full">
      <div className="flex flex-col font-['SVN-Neue_Montreal:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#fef0f0] text-[30px] whitespace-nowrap">
        <p className="leading-[44px]" ref={countRef}>5,2</p>
      </div>
      <Frame62 />
    </div>
  );
}

function Container25() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Frame59 />
        <div className="flex flex-col font-['SVN-Neue_Montreal:Regular',sans-serif] justify-center leading-[0] not-italic opacity-70 relative shrink-0 text-[16px] text-white w-full">
          <p className="leading-[24px]">Tổng vốn đầu tư</p>
        </div>
      </div>
    </div>
  );
}

function OverlayBorderOverlayBlur7() {
  return (
    <div
      className="backdrop-blur-[5px] content-stretch flex gap-[12px] items-center pr-[40px] relative shrink-0 w-[170px]"
      data-name="Overlay+Border+OverlayBlur"
    >
      <Container25 />
    </div>
  );
}

function Frame64() {
  return (
    <div className="content-stretch flex items-center justify-center pb-[5px] relative shrink-0">
      <div className="flex flex-col font-['SVN-Neue_Montreal:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">
        <p className="leading-[24px]">tỷ USD</p>
      </div>
    </div>
  );
}

function Frame63() {
  const countRef = useCountUp(1.1, { decimals: 1 });
  return (
    <div className="content-stretch flex gap-[6px] items-end relative shrink-0 w-full">
      <div className="flex flex-col font-['SVN-Neue_Montreal:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#fef0f0] text-[30px] whitespace-nowrap">
        <p className="leading-[44px]" ref={countRef}>1,1</p>
      </div>
      <Frame64 />
    </div>
  );
}

function Container26() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Frame63 />
        <div className="flex flex-col font-['SVN-Neue_Montreal:Regular',sans-serif] justify-center leading-[0] not-italic opacity-70 relative shrink-0 text-[16px] text-white w-full">
          <p className="leading-[24px]">Vốn chuyển về</p>
        </div>
      </div>
    </div>
  );
}

function OverlayBorderOverlayBlur8() {
  return (
    <div
      className="backdrop-blur-[5px] content-stretch flex gap-[12px] items-center relative shrink-0 w-[170px]"
      data-name="Overlay+Border+OverlayBlur"
    >
      <Container26 />
    </div>
  );
}

function Container23() {
  return (
    <div
      className="content-stretch flex items-start justify-between relative shrink-0 w-full"
      data-name="Container"
    >
      <OverlayBorderOverlayBlur6 />
      <OverlayBorderOverlayBlur7 />
      <OverlayBorderOverlayBlur8 />
    </div>
  );
}

function Frame44() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] items-start left-[569px] top-[1960px] w-[660px]">
      <Frame45 />
      <Container23 />
    </div>
  );
}

function Frame67() {
  return (
    <div className="bg-[#7a1f36] relative rounded-[8px] shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[6px] items-center px-[16px] py-[10px] relative size-full">
          <div
            className="overflow-clip relative shrink-0 size-[20px]"
            data-name="lue/map-pin"
          >
            <div className="absolute inset-[4.17%_12.5%]" data-name="Vector">
              <svg
                className="absolute block inset-0 size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 15 18.3333"
              >
                <g id="Vector">
                  <path d={svgPaths.p1e6bca00} fill="var(--fill-0, white)" />
                  <path d={svgPaths.p3b83dc00} fill="var(--fill-0, white)" />
                </g>
              </svg>
            </div>
          </div>
          <div className="flex flex-col font-['SVN-Neue_Montreal:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">
            <p className="leading-[normal]">Hà Nội</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame70() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start leading-[0] not-italic relative shrink-0">
      <div className="flex flex-col font-['SVN-Neue_Montreal:SemiBold',sans-serif] justify-center relative shrink-0 text-[#1a1c21] text-[24px] whitespace-nowrap">
        <p className="leading-[30px]">9</p>
      </div>
      <div className="flex flex-col font-['SVN-Neue_Montreal:Regular',sans-serif] justify-center opacity-70 relative shrink-0 text-[#4d5464] text-[14px] w-[108px]">
        <p className="leading-[20px]">Khu CN</p>
      </div>
    </div>
  );
}

function Frame69() {
  return (
    <div className="flex-[1_0_0] min-w-px relative rounded-[8px]">
      <div
        aria-hidden="true"
        className="absolute border border-[#e0e2e7] border-solid inset-0 pointer-events-none rounded-[8px]"
      />
      <div className="content-stretch flex flex-col gap-[8px] items-start pb-[10px] pt-[12px] px-[12px] relative size-full">
        <div
          className="overflow-clip relative shrink-0 size-[24px]"
          data-name="package"
        >
          <div
            className="absolute inset-[8.34%_12.5%_8%_12.5%]"
            data-name="Icon"
          >
            <div className="absolute inset-[-2.99%_-3.33%]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 19.2 21.278"
              >
                <path
                  d={svgPaths.p9e6b900}
                  id="Icon"
                  stroke="var(--stroke-0, #7A1F36)"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.2"
                />
              </svg>
            </div>
          </div>
        </div>
        <Frame70 />
      </div>
    </div>
  );
}

function Frame72() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start leading-[0] not-italic relative shrink-0">
      <div className="flex flex-col font-['SVN-Neue_Montreal:SemiBold',sans-serif] justify-center relative shrink-0 text-[#1a1c21] text-[24px] whitespace-nowrap">
        <p className="leading-[30px]">7.200</p>
      </div>
      <div className="flex flex-col font-['SVN-Neue_Montreal:Regular',sans-serif] justify-center opacity-70 relative shrink-0 text-[#4d5464] text-[14px] w-[108px]">
        <p className="leading-[20px]">Dự án</p>
      </div>
    </div>
  );
}

function Frame71() {
  return (
    <div className="flex-[1_0_0] min-w-px relative rounded-[8px]">
      <div
        aria-hidden="true"
        className="absolute border border-[#e0e2e7] border-solid inset-0 pointer-events-none rounded-[8px]"
      />
      <div className="content-stretch flex flex-col gap-[8px] items-start pb-[10px] pt-[12px] px-[12px] relative size-full">
        <div
          className="overflow-clip relative shrink-0 size-[24px]"
          data-name="3-layers"
        >
          <div className="absolute inset-[8.33%]" data-name="Icon">
            <div className="absolute inset-[-3%]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 21.2003 21.2"
              >
                <path
                  d={svgPaths.p14cffb70}
                  id="Icon"
                  stroke="var(--stroke-0, #7A1F36)"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.2"
                />
              </svg>
            </div>
          </div>
        </div>
        <Frame72 />
      </div>
    </div>
  );
}

function Frame68() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-full">
      <Frame69 />
      <Frame71 />
    </div>
  );
}

function Frame75() {
  return (
    <div className="content-stretch flex gap-[4px] items-end relative shrink-0 whitespace-nowrap">
      <div className="flex flex-col font-['SVN-Neue_Montreal:SemiBold',sans-serif] justify-center relative shrink-0 text-[#1a1c21] text-[24px]">
        <p className="leading-[30px]">$ 42,1</p>
      </div>
      <div className="flex flex-col font-['SVN-Neue_Montreal:Regular',sans-serif] justify-center opacity-70 relative shrink-0 text-[#4d5464] text-[14px]">
        <p className="leading-[20px]">tỷ</p>
      </div>
    </div>
  );
}

function Frame74() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start leading-[0] not-italic relative shrink-0">
      <Frame75 />
      <div className="flex flex-col font-['SVN-Neue_Montreal:Regular',sans-serif] justify-center opacity-70 relative shrink-0 text-[#4d5464] text-[14px] w-[108px]">
        <p className="leading-[20px]">Tổng vốn đầu tư</p>
      </div>
    </div>
  );
}

function Frame73() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full">
      <div
        aria-hidden="true"
        className="absolute border border-[#e0e2e7] border-solid inset-0 pointer-events-none rounded-[8px]"
      />
      <div className="content-stretch flex flex-col gap-[8px] items-start pb-[10px] pt-[12px] px-[12px] relative size-full">
        <div
          className="overflow-clip relative shrink-0 size-[24px]"
          data-name="dollar-sign"
        >
          <div
            className="absolute bottom-[4.17%] left-1/4 right-1/4 top-[4.17%]"
            data-name="Icon"
          >
            <div className="absolute inset-[-2.73%_-5%]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 13.2 23.2"
              >
                <path
                  d={svgPaths.p22776330}
                  id="Icon"
                  stroke="var(--stroke-0, #7A1F36)"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.2"
                />
              </svg>
            </div>
          </div>
        </div>
        <Frame74 />
      </div>
    </div>
  );
}

function Frame77() {
  return (
    <div className="bg-[#f0f1f3] mb-[-1px] relative rounded-tl-[8px] rounded-tr-[8px] shrink-0 w-full">
      <div
        aria-hidden="true"
        className="absolute border border-[#e0e2e7] border-solid inset-0 pointer-events-none rounded-tl-[8px] rounded-tr-[8px]"
      />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[12px] py-[8px] relative size-full">
          <div className="flex flex-col font-['SVN-Neue_Montreal:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4d5464] text-[14px] uppercase whitespace-nowrap">
            <p className="leading-[20px]">Hạ tầng</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Background() {
  return (
    <div className="relative shrink-0 w-full" data-name="Background">
      <div
        aria-hidden="true"
        className="absolute border-[#e0e2e7] border-b border-solid inset-0 pointer-events-none"
      />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[9px] items-center pl-[12px] pr-[318.98px] py-[10px] relative size-full">
          <div
            className="overflow-clip relative shrink-0 size-[16px]"
            data-name="zap"
          >
            <div className="absolute inset-[8.33%_12.5%]" data-name="Icon">
              <div className="absolute inset-[-3.75%_-4.17%]">
                <svg
                  className="block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 13 14.3334"
                >
                  <path
                    d={svgPaths.p1b7d2a80}
                    id="Icon"
                    stroke="var(--stroke-0, #212529)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex flex-col font-['SVN-Neue_Montreal:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1c21] text-[14px] w-[34px]">
            <p className="leading-[20px]">Điện</p>
          </div>
          <div className="flex flex-col font-['SVN-Neue_Montreal:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4d5464] text-[14px] whitespace-nowrap">
            <p className="leading-[20px]">110kV - 500kV</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function WaterDropDropsRainRainyMeteorologyWaterPrecipitationWeather() {
  return (
    <div
      className="absolute inset-[12.01%_18.12%_10.96%_18.12%]"
      data-name="water-drop--drops-rain-rainy-meteorology-water-precipitation-weather"
    >
      <div className="absolute inset-[-5.07%_-4.9%_-4.06%_-4.9%]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 11.2 13.45"
        >
          <g id="water-drop--drops-rain-rainy-meteorology-water-precipitation-weather">
            <path
              d={svgPaths.p26fdcc00}
              id="Rectangle 2008"
              stroke="var(--stroke-0, black)"
            />
            <path
              d={svgPaths.p25445b00}
              id="Rectangle 919"
              stroke="var(--stroke-0, black)"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Background1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Background">
      <div
        aria-hidden="true"
        className="absolute border-[#e0e2e7] border-b border-solid inset-0 pointer-events-none"
      />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[9px] items-center pl-[12px] pr-[307.43px] py-[10px] relative size-full">
          <div
            className="overflow-clip relative shrink-0 size-[16px]"
            data-name="Water-Drop--Streamline-Sharp"
          >
            <WaterDropDropsRainRainyMeteorologyWaterPrecipitationWeather />
          </div>
          <div className="flex flex-col font-['SVN-Neue_Montreal:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1c21] text-[14px] w-[34px]">
            <p className="leading-[20px]">Nước</p>
          </div>
          <div className="flex flex-col font-['SVN-Neue_Montreal:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4d5464] text-[14px] whitespace-nowrap">
            <p className="leading-[20px]">50.000 m³/ngày</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PlaneFlightBoardTimeScheduleAirplaneListAirport() {
  return (
    <div
      className="absolute inset-[10.73%_14.58%_14.9%_14.58%]"
      data-name="plane-flight-board--time-schedule-airplane-list-airport"
    >
      <div className="absolute inset-[0_-4.41%_-4.2%_-4.41%]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 12.3333 12.4"
        >
          <g id="plane-flight-board--time-schedule-airplane-list-airport">
            <path
              d={svgPaths.p100f6c70}
              id="Vector"
              stroke="var(--stroke-0, black)"
            />
            <path
              d="M2.2 9.63337H5.6"
              id="Vector 2039"
              stroke="var(--stroke-0, black)"
            />
            <path
              d="M6.73333 9.63337H10.1333"
              id="Vector 2041"
              stroke="var(--stroke-0, black)"
            />
            <path
              d="M2.76667 3.25521e-05V1.70003"
              id="Vector 2288"
              stroke="var(--stroke-0, black)"
            />
            <path
              d="M9.56667 3.25521e-05V1.70003"
              id="Vector 2289"
              stroke="var(--stroke-0, black)"
            />
            <path
              d={svgPaths.p1bf34100}
              id="Union"
              stroke="var(--stroke-0, black)"
            />
            <path
              d="M6.73333 7.36668V4.8167"
              id="Union_2"
              stroke="var(--stroke-0, black)"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Background2() {
  return (
    <div
      className="relative rounded-bl-[8px] rounded-br-[10px] shrink-0 w-full"
      data-name="Background"
    >
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[9px] items-center pl-[12px] pr-[298.26px] py-[10px] relative size-full">
          <div
            className="overflow-clip relative shrink-0 size-[16px]"
            data-name="Plane-Flight-Board--Streamline-Sharp"
          >
            <PlaneFlightBoardTimeScheduleAirplaneListAirport />
          </div>
          <div className="flex flex-col font-['SVN-Neue_Montreal:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1c21] text-[14px] w-[34px]">
            <p className="leading-[20px]">Vị trí</p>
          </div>
          <div className="flex flex-col font-['SVN-Neue_Montreal:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4d5464] text-[14px] whitespace-nowrap">
            <p className="leading-[20px]">{`Gần cảng biển & sân bay`}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative rounded-bl-[8px] rounded-br-[8px] shrink-0 w-full"
      data-name="Container"
    >
      <div
        aria-hidden="true"
        className="absolute border border-[#e0e2e7] border-solid inset-0 pointer-events-none rounded-bl-[8px] rounded-br-[8px]"
      />
      <Background />
      <Background1 />
      <Background2 />
    </div>
  );
}

function Frame76() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[8px] shrink-0 w-full">
      <Frame77 />
      <Container27 />
    </div>
  );
}

function Frame66() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <Frame67 />
      <Frame68 />
      <Frame73 />
      <Frame76 />
    </div>
  );
}

function Frame78() {
  return (
    <div className="bg-[#fff0f2] relative rounded-[10px] shrink-0 w-full arrow-btn cursor-pointer">
      <div
        aria-hidden="true"
        className="absolute border-[#7a1f36] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[10px]"
      />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center px-[16px] py-[10px] relative size-full">
          <div className="flex flex-col font-['SVN-Neue_Montreal:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#7a1f36] text-[16px] whitespace-nowrap">
            <p className="leading-[normal]">Xem toàn bộ bản đồ</p>
          </div>
          <div
            className="overflow-clip relative shrink-0 size-[20px]"
            data-name="lue/arrow-right"
          >
            <div className="absolute inset-[16.67%]" data-name="Vector">
              <svg
                className="absolute block inset-0 size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 13.3333 13.3331"
              >
                <g id="Vector">
                  <path d={svgPaths.p37dd1f80} fill="var(--fill-0, #7A1F36)" />
                  <path d={svgPaths.pa28a700} fill="var(--fill-0, #7A1F36)" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame65() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] items-start left-[929px] top-[2285px] w-[300px]">
      <Frame66 />
      <Frame78 />
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 text-[56px] w-full whitespace-nowrap">
      <div className="flex flex-col font-['SVN-Ivy_Presto_Display:Italic',sans-serif] justify-center mb-[-8px] relative shrink-0 text-[#7a1f36]">
        <p className="leading-[normal]">Cổng một cửa</p>
      </div>
      <div className="flex flex-col font-['SVN-Neue_Montreal:SemiBold',sans-serif] justify-center relative shrink-0 text-[#1a1c21]">
        <p className="leading-[normal]">đầu tư Quốc Gia Việt Nam</p>
      </div>
    </div>
  );
}

function Frame80() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center leading-[0] not-italic relative shrink-0 text-center w-full">
      <Frame15 />
      <div className="flex flex-col font-['SVN-Neue_Montreal:Regular',sans-serif] justify-center relative shrink-0 text-[#4d5464] text-[20px] w-full">
        <p className="leading-[normal]">
          Kết nối nhà đầu tư với cơ hội đầu tư hấp dẫn tại Việt Nam
        </p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div
      className="bg-white relative rounded-[400px] shrink-0 w-[140px]"
      data-name="Button"
    >
      <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[20px] py-[12px] relative rounded-[inherit] size-full">
        <p className="font-['SVN-Neue_Montreal:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#1a1c21] text-[16px] tracking-[-0.08px] whitespace-nowrap">
          Đăng ký
        </p>
      </div>
      <div
        aria-hidden="true"
        className="absolute border border-[#e0e2e7] border-solid inset-0 pointer-events-none rounded-[400px]"
      />
    </div>
  );
}

function Button4() {
  return (
    <div
      className="bg-[#7a1f36] content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[24px] py-[12px] relative rounded-[400px] shadow-[0px_6px_24px_2px_rgba(138,25,29,0.25)] shrink-0 w-[140px]"
      data-name="Button"
    >
      <p className="font-['SVN-Neue_Montreal:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[16px] text-white tracking-[-0.08px] whitespace-nowrap">
        Đăng nhập
      </p>
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
      <Button3 />
      <Button4 />
    </div>
  );
}

function Frame79() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex flex-col gap-[24px] items-center left-1/2 top-[289px] w-[646px]">
      <Frame80 />
      <Frame16 />
    </div>
  );
}

function Group95() {
  return (
    <div className="absolute inset-[18.22%_41.67%_80.13%_41.46%]">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 242.902 111.627"
      >
        <g id="Group 34112">
          <path
            d={svgPaths.p1b7bba00}
            fill="var(--fill-0, white)"
            id="Vector"
          />
          <g id="Group">
            <path
              d={svgPaths.p3ce6d80}
              fill="var(--fill-0, #E0E2E7)"
              id="Vector_2"
            />
            <path
              d={svgPaths.p7a203f0}
              fill="var(--fill-0, #E0E2E7)"
              id="Vector_3"
            />
            <path
              d={svgPaths.p13f98000}
              fill="var(--fill-0, #E0E2E7)"
              id="Vector_4"
            />
            <path
              d={svgPaths.p1e748a80}
              fill="var(--fill-0, #E0E2E7)"
              id="Vector_5"
            />
            <path
              d={svgPaths.p2ccf900}
              fill="var(--fill-0, #E0E2E7)"
              id="Vector_6"
            />
          </g>
          <path
            d={svgPaths.p22126f00}
            fill="var(--fill-0, #1A1C21)"
            id="Vector_7"
          />
        </g>
      </svg>
    </div>
  );
}

function Group21() {
  return (
    <div className="absolute inset-[4.12%_0_0_0]" data-name="Group">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 158.066 119.011"
      >
        <g id="Group">
          <g id="Group_2">
            <path
              d={svgPaths.p2cbb4600}
              fill="var(--fill-0, #1A1C21)"
              id="Vector"
            />
            <path
              d={svgPaths.p4a18280}
              fill="var(--fill-0, #1A1C21)"
              id="Vector_2"
            />
          </g>
          <g id="Group_3">
            <path
              d={svgPaths.p21a70b80}
              fill="var(--fill-0, white)"
              id="Vector_3"
            />
            <path
              d={svgPaths.pbc4f500}
              fill="var(--fill-0, #1A1C21)"
              id="Vector_4"
            />
          </g>
          <path
            d={svgPaths.p2c82d00}
            fill="var(--fill-0, white)"
            id="Vector_5"
          />
          <path
            d={svgPaths.p4bb2500}
            fill="var(--fill-0, #1A1C21)"
            id="Vector_6"
          />
          <g id="Group_4">
            <path
              d={svgPaths.pf687000}
              fill="var(--fill-0, white)"
              id="Vector_7"
            />
            <path
              d={svgPaths.pd23b400}
              fill="var(--fill-0, #1A1C21)"
              id="Vector_8"
            />
          </g>
          <path
            d={svgPaths.p14c5d570}
            fill="var(--fill-0, #1A1C21)"
            id="Vector_9"
          />
          <path
            d={svgPaths.p769b400}
            fill="var(--fill-0, #1A1C21)"
            id="Vector_10"
          />
          <path
            d={svgPaths.p13d1f471}
            fill="var(--fill-0, #1A1C21)"
            id="Vector_11"
          />
        </g>
      </svg>
    </div>
  );
}

function Group24() {
  return (
    <div
      className="absolute inset-[46.97%_13.85%_12.75%_53.96%]"
      data-name="Group"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 50.8817 50.0049"
      >
        <g id="Group">
          <g id="Group_2">
            <path
              d={svgPaths.p39b9b370}
              fill="var(--fill-0, white)"
              id="Vector"
            />
            <path
              d={svgPaths.p28651900}
              fill="var(--fill-0, #1A1C21)"
              id="Vector_2"
            />
          </g>
          <path
            d={svgPaths.p6fd500}
            fill="var(--fill-0, #7A1F36)"
            id="Vector_3"
          />
          <g id="Group_3">
            <path
              d={svgPaths.p3aecc600}
              fill="var(--fill-0, white)"
              id="Vector_4"
            />
            <path
              d={svgPaths.p14ba1780}
              fill="var(--fill-0, #1A1C21)"
              id="Vector_5"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Group25() {
  return (
    <div
      className="absolute inset-[82.94%_0.1%_4.06%_69.24%]"
      data-name="Group"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 48.458 16.1381"
      >
        <g id="Group">
          <g id="Group_2">
            <path
              d={svgPaths.p4944d80}
              fill="var(--fill-0, #7A1F36)"
              id="Vector"
            />
            <path
              d={svgPaths.p1653f00}
              fill="var(--fill-0, #7A1F36)"
              id="Vector_2"
            />
            <path
              d={svgPaths.p3aba07f0}
              fill="var(--fill-0, #7A1F36)"
              id="Vector_3"
            />
          </g>
          <path
            d={svgPaths.p16f0ee80}
            fill="var(--fill-0, #1A1C21)"
            id="Vector_4"
          />
        </g>
      </svg>
    </div>
  );
}

function Group23() {
  return (
    <div
      className="absolute contents inset-[46.97%_0.1%_4.06%_53.96%]"
      data-name="Group"
    >
      <Group24 />
      <Group25 />
    </div>
  );
}

function Group26() {
  return (
    <div
      className="absolute inset-[15.71%_10.46%_56.14%_53.46%]"
      data-name="Group"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 57.035 34.9456"
      >
        <g id="Group">
          <path
            d={svgPaths.p2dfc2d80}
            fill="var(--fill-0, #1A1C21)"
            id="Vector"
          />
          <path
            d={svgPaths.p3a535700}
            fill="var(--fill-0, #E0E2E7)"
            id="Vector_2"
          />
          <path
            d={svgPaths.pfecc200}
            fill="var(--fill-0, #7A1F36)"
            id="Vector_3"
          />
          <path
            d={svgPaths.p123fde80}
            fill="var(--fill-0, #E0E2E7)"
            id="Vector_4"
          />
          <path
            d={svgPaths.p23644d00}
            fill="var(--fill-0, #E0E2E7)"
            id="Vector_5"
          />
          <path
            d={svgPaths.p196cc00}
            fill="var(--fill-0, #7A1F36)"
            id="Vector_6"
          />
          <path
            d={svgPaths.p3d89dd00}
            fill="var(--fill-0, #E0E2E7)"
            id="Vector_7"
          />
          <path
            d={svgPaths.p356cddc0}
            fill="var(--fill-0, #7A1F36)"
            id="Vector_8"
          />
          <path
            d={svgPaths.p13410700}
            fill="var(--fill-0, #E0E2E7)"
            id="Vector_9"
          />
        </g>
      </svg>
    </div>
  );
}

function Group27() {
  return (
    <div className="absolute inset-[0_45.87%_66.86%_12.32%]" data-name="Group">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 66.0882 41.139"
      >
        <g id="Group">
          <path
            d={svgPaths.p38b2e880}
            fill="var(--fill-0, #E0E2E7)"
            id="Vector"
          />
          <g id="Group_2">
            <path
              d={svgPaths.p125ee600}
              fill="var(--fill-0, #1A1C21)"
              id="Vector_2"
            />
            <path
              d={svgPaths.p12bd6c00}
              fill="var(--fill-0, #1A1C21)"
              id="Vector_3"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Group30() {
  return (
    <div
      className="absolute inset-[43.06%_53.38%_34.64%_29.2%]"
      data-name="Group"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 27.5224 27.6746"
      >
        <g id="Group">
          <path
            d={svgPaths.p155c6100}
            fill="var(--fill-0, white)"
            id="Vector"
          />
          <path
            d={svgPaths.p3a5e3a80}
            fill="var(--fill-0, #7A1F36)"
            id="Vector_2"
          />
        </g>
      </svg>
    </div>
  );
}

function Group31() {
  return (
    <div
      className="absolute inset-[45.41%_55.22%_37%_31.04%]"
      data-name="Group"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 21.712 21.8328"
      >
        <g id="Group">
          <path
            d={svgPaths.p33ba0300}
            fill="var(--fill-0, white)"
            id="Vector"
          />
          <path
            d={svgPaths.p61b3ac0}
            fill="var(--fill-0, #7A1F36)"
            id="Vector_2"
          />
        </g>
      </svg>
    </div>
  );
}

function Group29() {
  return (
    <div
      className="absolute contents inset-[43.06%_53.38%_34.64%_29.2%]"
      data-name="Group"
    >
      <Group30 />
      <Group31 />
    </div>
  );
}

function Group33() {
  return (
    <div
      className="absolute inset-[43.06%_58.56%_34.64%_24.02%]"
      data-name="Group"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 27.5224 27.6746"
      >
        <g id="Group">
          <path
            d={svgPaths.p155c6100}
            fill="var(--fill-0, white)"
            id="Vector"
          />
          <path
            d={svgPaths.p1e05d600}
            fill="var(--fill-0, #7A1F36)"
            id="Vector_2"
          />
        </g>
      </svg>
    </div>
  );
}

function Group34() {
  return (
    <div className="absolute inset-[45.41%_60.4%_37%_25.86%]" data-name="Group">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 21.712 21.8328"
      >
        <g id="Group">
          <path
            d={svgPaths.p33ba0300}
            fill="var(--fill-0, white)"
            id="Vector"
          />
          <path
            d={svgPaths.p2097c000}
            fill="var(--fill-0, #7A1F36)"
            id="Vector_2"
          />
        </g>
      </svg>
    </div>
  );
}

function Group32() {
  return (
    <div
      className="absolute contents inset-[43.06%_58.56%_34.64%_24.02%]"
      data-name="Group"
    >
      <Group33 />
      <Group34 />
    </div>
  );
}

function Group35() {
  return (
    <div
      className="absolute inset-[43.2%_63.85%_34.78%_18.95%]"
      data-name="Group"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 27.1762 27.3263"
      >
        <g id="Group">
          <path
            d={svgPaths.p7fd3980}
            fill="var(--fill-0, #7A1F36)"
            id="Vector"
          />
          <path
            d={svgPaths.p32eb8280}
            fill="var(--fill-0, white)"
            id="Vector_2"
          />
          <path
            d={svgPaths.pa8a8880}
            fill="var(--fill-0, white)"
            id="Vector_3"
          />
        </g>
      </svg>
    </div>
  );
}

function Group28() {
  return (
    <div
      className="absolute contents inset-[43.06%_53.38%_34.64%_18.95%]"
      data-name="Group"
    >
      <Group29 />
      <Group32 />
      <Group35 />
    </div>
  );
}

function Group22() {
  return (
    <div
      className="absolute contents inset-[0_0.1%_4.06%_12.32%]"
      data-name="Group"
    >
      <Group23 />
      <Group26 />
      <Group27 />
      <Group28 />
    </div>
  );
}

function Illustration1() {
  return (
    <div
      className="absolute h-[124.13px] left-[666.66px] overflow-clip top-[1214.62px] w-[158.065px]"
      data-name="Illustration"
    >
      <Group21 />
      <Group22 />
    </div>
  );
}

function Group38() {
  return (
    <div
      className="absolute inset-[17.62%_51.68%_81.57%_42.45%]"
      data-name="Group"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 84.5403 54.8857"
      >
        <g id="Group">
          <path d={svgPaths.p92b7900} fill="var(--fill-0, white)" id="Vector" />
          <path
            d={svgPaths.p1dcb19f0}
            fill="var(--fill-0, #1A1C21)"
            id="Vector_2"
          />
        </g>
      </svg>
    </div>
  );
}

function Group40() {
  return (
    <div
      className="absolute inset-[18.14%_56.03%_81.77%_42.8%]"
      data-name="Group"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16.8056 5.77416"
      >
        <g id="Group">
          <path d={svgPaths.pf0f9400} fill="var(--fill-0, white)" id="Vector" />
          <path
            d={svgPaths.p3da79500}
            fill="var(--fill-0, #1A1C21)"
            id="Vector_2"
          />
        </g>
      </svg>
    </div>
  );
}

function Group41() {
  return (
    <div
      className="absolute inset-[18.14%_54.7%_81.77%_44.14%]"
      data-name="Group"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16.8052 5.77402"
      >
        <g id="Group">
          <path
            d={svgPaths.p31ada780}
            fill="var(--fill-0, white)"
            id="Vector"
          />
          <path
            d={svgPaths.p18942000}
            fill="var(--fill-0, #1A1C21)"
            id="Vector_2"
          />
        </g>
      </svg>
    </div>
  );
}

function Group42() {
  return (
    <div
      className="absolute inset-[18.14%_53.36%_81.77%_45.47%]"
      data-name="Group"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16.8056 5.77416"
      >
        <g id="Group">
          <path
            d={svgPaths.p3746aaf0}
            fill="var(--fill-0, white)"
            id="Vector"
          />
          <path
            d={svgPaths.p18705070}
            fill="var(--fill-0, #1A1C21)"
            id="Vector_2"
          />
        </g>
      </svg>
    </div>
  );
}

function Group43() {
  return (
    <div
      className="absolute inset-[18.14%_52.03%_81.77%_46.8%]"
      data-name="Group"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16.8055 5.77402"
      >
        <g id="Group">
          <path
            d={svgPaths.p32c4e100}
            fill="var(--fill-0, white)"
            id="Vector"
          />
          <path
            d={svgPaths.p9f03e00}
            fill="var(--fill-0, #1A1C21)"
            id="Vector_2"
          />
        </g>
      </svg>
    </div>
  );
}

function Group39() {
  return (
    <div
      className="absolute contents inset-[18.14%_52.03%_81.77%_42.8%]"
      data-name="Group"
    >
      <Group40 />
      <Group41 />
      <Group42 />
      <Group43 />
    </div>
  );
}

function Group37() {
  return (
    <div
      className="absolute contents inset-[17.62%_51.68%_81.57%_42.45%]"
      data-name="Group"
    >
      <Group38 />
      <div
        className="absolute inset-[17.88%_52.05%_81.94%_46.82%]"
        data-name="Vector"
      >
        <svg
          className="absolute block inset-0 size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 16.3574 12.1047"
        >
          <path
            d={svgPaths.p71c9780}
            fill="var(--fill-0, #E0E2E7)"
            id="Vector"
          />
        </svg>
      </div>
      <Group39 />
      <div
        className="absolute inset-[18.32%_54.7%_81.68%_42.8%]"
        data-name="Vector"
      >
        <svg
          className="absolute block inset-0 size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 35.9915 0.415089"
        >
          <path
            d={svgPaths.p3f3f5d80}
            fill="var(--fill-0, #1A1C21)"
            id="Vector"
          />
        </svg>
      </div>
    </div>
  );
}

function Group44() {
  return (
    <div
      className="absolute inset-[17.52%_51.19%_82.23%_47.62%]"
      data-name="Group"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 17.0464 17.0466"
      >
        <g id="Group">
          <path
            d={svgPaths.p2a81e300}
            fill="var(--fill-0, #7A1F36)"
            id="Vector"
          />
          <path
            d={svgPaths.p30ce9180}
            fill="var(--fill-0, white)"
            id="Vector_2"
          />
        </g>
      </svg>
    </div>
  );
}

function Group36() {
  return (
    <div
      className="absolute contents inset-[17.52%_51.19%_81.57%_42.45%]"
      data-name="Group"
    >
      <Group37 />
      <Group44 />
    </div>
  );
}

function Group96() {
  return (
    <div className="-translate-x-1/2 absolute contents left-[calc(50%-2px)] top-[1186px]">
      <Illustration1 />
      <Group36 />
    </div>
  );
}

function Group94() {
  return (
    <div className="-translate-x-1/2 absolute contents left-[calc(50%-1.55px)] top-[1186px]">
      <Group95 />
      <Group96 />
    </div>
  );
}

function Group46() {
  return (
    <div
      className="absolute inset-[17.58%_31.07%_81.2%_65.66%]"
      data-name="Group"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 47.0815 82.2169"
      >
        <g id="Group">
          <path
            d={svgPaths.p35bccd00}
            fill="var(--fill-0, #1A1C21)"
            id="Vector"
          />
          <path
            d={svgPaths.p4809df0}
            fill="var(--fill-0, #1A1C21)"
            id="Vector_2"
          />
          <path
            d={svgPaths.p8d23b00}
            fill="var(--fill-0, #1A1C21)"
            id="Vector_3"
          />
          <g id="Group_2">
            <path
              d={svgPaths.pc5e1000}
              fill="var(--fill-0, #E0E2E7)"
              id="Vector_4"
            />
            <path
              d={svgPaths.p1a292380}
              fill="var(--fill-0, #E0E2E7)"
              id="Vector_5"
            />
          </g>
          <g id="Group_3">
            <path
              d={svgPaths.p30610600}
              fill="var(--fill-0, #E0E2E7)"
              id="Vector_6"
            />
            <path
              d={svgPaths.p1c2e3000}
              fill="var(--fill-0, #E0E2E7)"
              id="Vector_7"
            />
          </g>
          <g id="Group_4">
            <path
              d={svgPaths.p1dc3f6a0}
              fill="var(--fill-0, #E0E2E7)"
              id="Vector_8"
            />
            <path
              d={svgPaths.p3ef19f80}
              fill="var(--fill-0, #E0E2E7)"
              id="Vector_9"
            />
          </g>
          <g id="Group_5">
            <path
              d={svgPaths.p5c2f700}
              fill="var(--fill-0, #E0E2E7)"
              id="Vector_10"
            />
            <path
              d={svgPaths.p1b46ff00}
              fill="var(--fill-0, #E0E2E7)"
              id="Vector_11"
            />
          </g>
          <g id="Group_6">
            <path
              d={svgPaths.p353a0f00}
              fill="var(--fill-0, #E0E2E7)"
              id="Vector_12"
            />
            <path
              d={svgPaths.p851e200}
              fill="var(--fill-0, #E0E2E7)"
              id="Vector_13"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Group48() {
  return (
    <div
      className="absolute inset-[18.24%_30.51%_81.56%_69.23%]"
      data-name="Group"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 3.61921 13.5723"
      >
        <g id="Group">
          <path
            d={svgPaths.p6041480}
            fill="var(--fill-0, #1A1C21)"
            id="Vector"
          />
          <path
            d={svgPaths.p18c07c00}
            fill="var(--fill-0, #7A1F36)"
            id="Vector_2"
          />
        </g>
      </svg>
    </div>
  );
}

function Group49() {
  return (
    <div
      className="absolute inset-[18.13%_30.07%_81.61%_69.68%]"
      data-name="Group"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 3.61921 17.6912"
      >
        <g id="Group">
          <path
            d={svgPaths.p39257f00}
            fill="var(--fill-0, #1A1C21)"
            id="Vector"
          />
          <path
            d={svgPaths.p2f346200}
            fill="var(--fill-0, #7A1F36)"
            id="Vector_2"
          />
        </g>
      </svg>
    </div>
  );
}

function Group50() {
  return (
    <div
      className="absolute inset-[18.13%_29.62%_81.73%_70.13%]"
      data-name="Group"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 3.61921 9.13627"
      >
        <g id="Group">
          <path
            d={svgPaths.p29d6c370}
            fill="var(--fill-0, #1A1C21)"
            id="Vector"
          />
          <path
            d={svgPaths.p2095d080}
            fill="var(--fill-0, #7A1F36)"
            id="Vector_2"
          />
        </g>
      </svg>
    </div>
  );
}

function Group51() {
  return (
    <div
      className="absolute inset-[18.17%_29.18%_81.61%_70.57%]"
      data-name="Group"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 3.61921 14.9664"
      >
        <g id="Group">
          <path
            d={svgPaths.p24fc7300}
            fill="var(--fill-0, #1A1C21)"
            id="Vector"
          />
          <path
            d={svgPaths.p363dce00}
            fill="var(--fill-0, #7A1F36)"
            id="Vector_2"
          />
        </g>
      </svg>
    </div>
  );
}

function Group52() {
  return (
    <div
      className="absolute inset-[18.1%_28.73%_81.75%_71.02%]"
      data-name="Group"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 3.61921 10.3697"
      >
        <g id="Group">
          <path
            d={svgPaths.p3e568340}
            fill="var(--fill-0, #1A1C21)"
            id="Vector"
          />
          <path
            d={svgPaths.p249f2c0}
            fill="var(--fill-0, #7A1F36)"
            id="Vector_2"
          />
        </g>
      </svg>
    </div>
  );
}

function Group53() {
  return (
    <div
      className="absolute inset-[17.92%_28.29%_81.85%_71.46%]"
      data-name="Group"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 3.61922 15.3849"
      >
        <g id="Group">
          <path
            d={svgPaths.p3c60dc80}
            fill="var(--fill-0, #1A1C21)"
            id="Vector"
          />
          <path
            d={svgPaths.p3abc8e70}
            fill="var(--fill-0, #7A1F36)"
            id="Vector_2"
          />
        </g>
      </svg>
    </div>
  );
}

function Group54() {
  return (
    <div
      className="absolute inset-[17.85%_27.84%_81.9%_71.91%]"
      data-name="Group"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 3.61921 17.3456"
      >
        <g id="Group">
          <path
            d={svgPaths.p35aee480}
            fill="var(--fill-0, #1A1C21)"
            id="Vector"
          />
          <path
            d={svgPaths.pdc86f00}
            fill="var(--fill-0, #7A1F36)"
            id="Vector_2"
          />
        </g>
      </svg>
    </div>
  );
}

function Group55() {
  return (
    <div
      className="absolute inset-[18.01%_27.4%_81.72%_72.34%]"
      data-name="Group"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 3.61921 18.8887"
      >
        <g id="Group">
          <path
            d={svgPaths.p1e046780}
            fill="var(--fill-0, #1A1C21)"
            id="Vector"
          />
          <path
            d={svgPaths.p9259b80}
            fill="var(--fill-0, #7A1F36)"
            id="Vector_2"
          />
        </g>
      </svg>
    </div>
  );
}

function Group56() {
  return (
    <div
      className="absolute inset-[17.85%_26.96%_81.79%_72.79%]"
      data-name="Group"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 3.61921 24.6787"
      >
        <g id="Group">
          <path
            d={svgPaths.p5c15a00}
            fill="var(--fill-0, #1A1C21)"
            id="Vector"
          />
          <path
            d={svgPaths.p162b4800}
            fill="var(--fill-0, #7A1F36)"
            id="Vector_2"
          />
        </g>
      </svg>
    </div>
  );
}

function Group57() {
  return (
    <div
      className="absolute inset-[17.86%_26.51%_81.96%_73.24%]"
      data-name="Group"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 3.61922 12.6538"
      >
        <g id="Group">
          <path
            d={svgPaths.p3608d800}
            fill="var(--fill-0, #1A1C21)"
            id="Vector"
          />
          <path
            d={svgPaths.p335e4000}
            fill="var(--fill-0, #7A1F36)"
            id="Vector_2"
          />
        </g>
      </svg>
    </div>
  );
}

function Group58() {
  return (
    <div
      className="absolute inset-[17.91%_26.07%_81.78%_73.68%]"
      data-name="Group"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 3.61922 20.8494"
      >
        <g id="Group">
          <path
            d={svgPaths.p14742e00}
            fill="var(--fill-0, #1A1C21)"
            id="Vector"
          />
          <path
            d={svgPaths.p30b97700}
            fill="var(--fill-0, #7A1F36)"
            id="Vector_2"
          />
        </g>
      </svg>
    </div>
  );
}

function Group59() {
  return (
    <div
      className="absolute inset-[18.1%_25.62%_81.75%_74.13%]"
      data-name="Group"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 3.61922 10.3697"
      >
        <g id="Group">
          <path
            d={svgPaths.p24c88380}
            fill="var(--fill-0, #1A1C21)"
            id="Vector"
          />
          <path
            d={svgPaths.p249f2c0}
            fill="var(--fill-0, #7A1F36)"
            id="Vector_2"
          />
        </g>
      </svg>
    </div>
  );
}

function Group60() {
  return (
    <div
      className="absolute inset-[17.92%_25.18%_81.85%_74.57%]"
      data-name="Group"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 3.61922 15.3849"
      >
        <g id="Group">
          <path
            d={svgPaths.p7326d00}
            fill="var(--fill-0, #1A1C21)"
            id="Vector"
          />
          <path
            d={svgPaths.p79e8170}
            fill="var(--fill-0, #7A1F36)"
            id="Vector_2"
          />
        </g>
      </svg>
    </div>
  );
}

function Group61() {
  return (
    <div
      className="absolute inset-[17.78%_24.73%_81.97%_75.02%]"
      data-name="Group"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 3.61922 17.3456"
      >
        <g id="Group">
          <path
            d={svgPaths.p10010cf0}
            fill="var(--fill-0, #1A1C21)"
            id="Vector"
          />
          <path
            d={svgPaths.p12122300}
            fill="var(--fill-0, #7A1F36)"
            id="Vector_2"
          />
        </g>
      </svg>
    </div>
  );
}

function Group62() {
  return (
    <div
      className="absolute inset-[17.68%_24.29%_82.04%_75.46%]"
      data-name="Group"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 3.6192 18.8887"
      >
        <g id="Group">
          <path
            d={svgPaths.p3120db80}
            fill="var(--fill-0, #1A1C21)"
            id="Vector"
          />
          <path
            d={svgPaths.p19569580}
            fill="var(--fill-0, #7A1F36)"
            id="Vector_2"
          />
        </g>
      </svg>
    </div>
  );
}

function Group63() {
  return (
    <div
      className="absolute inset-[17.63%_23.84%_82.01%_75.91%]"
      data-name="Group"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 3.6192 24.6787"
      >
        <g id="Group">
          <path
            d={svgPaths.p16bacc00}
            fill="var(--fill-0, #1A1C21)"
            id="Vector"
          />
          <path
            d={svgPaths.p1c180c80}
            fill="var(--fill-0, #7A1F36)"
            id="Vector_2"
          />
        </g>
      </svg>
    </div>
  );
}

function Group64() {
  return (
    <div
      className="absolute inset-[17.79%_23.4%_82.03%_76.35%]"
      data-name="Group"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 3.61922 12.6538"
      >
        <g id="Group">
          <path
            d={svgPaths.pcf7d0f0}
            fill="var(--fill-0, #1A1C21)"
            id="Vector"
          />
          <path
            d={svgPaths.p4f22600}
            fill="var(--fill-0, #7A1F36)"
            id="Vector_2"
          />
        </g>
      </svg>
    </div>
  );
}

function Group65() {
  return (
    <div
      className="absolute inset-[17.8%_22.95%_81.93%_76.8%]"
      data-name="Group"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 3.61921 18.2556"
      >
        <g id="Group">
          <path
            d={svgPaths.p2c91a200}
            fill="var(--fill-0, #1A1C21)"
            id="Vector"
          />
          <path
            d={svgPaths.p2df8ec00}
            fill="var(--fill-0, #7A1F36)"
            id="Vector_2"
          />
        </g>
      </svg>
    </div>
  );
}

function Group66() {
  return (
    <div
      className="absolute inset-[17.82%_22.5%_82.03%_77.24%]"
      data-name="Group"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 3.61922 10.3697"
      >
        <g id="Group">
          <path
            d={svgPaths.p1c64fe00}
            fill="var(--fill-0, #1A1C21)"
            id="Vector"
          />
          <path
            d={svgPaths.p12374700}
            fill="var(--fill-0, #7A1F36)"
            id="Vector_2"
          />
        </g>
      </svg>
    </div>
  );
}

function Group67() {
  return (
    <div
      className="absolute inset-[17.7%_22.06%_82.08%_77.69%]"
      data-name="Group"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 3.61922 15.385"
      >
        <g id="Group">
          <path
            d={svgPaths.p2a5cc00}
            fill="var(--fill-0, #1A1C21)"
            id="Vector"
          />
          <path
            d={svgPaths.p1e5fc000}
            fill="var(--fill-0, #7A1F36)"
            id="Vector_2"
          />
        </g>
      </svg>
    </div>
  );
}

function Group68() {
  return (
    <div
      className="absolute inset-[17.61%_21.61%_82.14%_78.14%]"
      data-name="Group"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 3.61921 17.3456"
      >
        <g id="Group">
          <path
            d={svgPaths.p1c443d00}
            fill="var(--fill-0, #1A1C21)"
            id="Vector"
          />
          <path
            d={svgPaths.p230c3700}
            fill="var(--fill-0, #7A1F36)"
            id="Vector_2"
          />
        </g>
      </svg>
    </div>
  );
}

function Group47() {
  return (
    <div
      className="absolute contents inset-[17.61%_21.61%_81.56%_69.23%]"
      data-name="Group"
    >
      <Group48 />
      <Group49 />
      <Group50 />
      <Group51 />
      <Group52 />
      <Group53 />
      <Group54 />
      <Group55 />
      <Group56 />
      <Group57 />
      <Group58 />
      <Group59 />
      <Group60 />
      <Group61 />
      <Group62 />
      <Group63 />
      <Group64 />
      <Group65 />
      <Group66 />
      <Group67 />
      <Group68 />
    </div>
  );
}

function Group69() {
  return (
    <div
      className="absolute inset-[17.61%_25.29%_82.28%_69.47%]"
      data-name="Group"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 75.5117 7.73055"
      >
        <g id="Group">
          <path
            d={svgPaths.p33bb9c00}
            fill="var(--fill-0, #1A1C21)"
            id="Vector"
          />
          <path
            d={svgPaths.p5339400}
            fill="var(--fill-0, #1A1C21)"
            id="Vector_2"
          />
        </g>
      </svg>
    </div>
  );
}

function Group45() {
  return (
    <div
      className="absolute contents inset-[17.49%_21.04%_81.11%_65.21%]"
      data-name="Group"
    >
      <Group46 />
      <div
        className="absolute inset-[17.49%_21.04%_81.11%_65.21%]"
        data-name="Vector"
      >
        <svg
          className="absolute block inset-0 size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 197.999 94.5155"
        >
          <path
            d={svgPaths.p389e0400}
            fill="var(--fill-0, #1A1C21)"
            id="Vector"
          />
        </svg>
      </div>
      <Group47 />
      <Group69 />
    </div>
  );
}

function Group71() {
  return (
    <div
      className="absolute inset-[18.51%_18.06%_80.16%_74.17%]"
      data-name="Group"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 111.932 89.865"
      >
        <g id="Group">
          <path
            d={svgPaths.p3e222fc0}
            fill="var(--fill-0, white)"
            id="Vector"
          />
          <path
            d={svgPaths.p697c5b2}
            fill="var(--fill-0, #1A1C21)"
            id="Intersect"
          />
          <path
            d={svgPaths.p34ce3800}
            fill="var(--fill-0, #1A1C21)"
            id="Vector_2"
          />
        </g>
      </svg>
    </div>
  );
}

function Group73() {
  return (
    <div
      className="absolute inset-[18.79%_18.83%_80.25%_74.94%]"
      data-name="Group"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 89.7352 64.458"
      >
        <g id="Group">
          <path
            d={svgPaths.p12188600}
            fill="var(--fill-0, #1A1C21)"
            id="Vector"
          />
          <path
            d={svgPaths.p38ae4580}
            fill="var(--fill-0, #E0E2E7)"
            id="Vector_2"
          />
          <path
            d={svgPaths.p32ac0580}
            fill="var(--fill-0, #E0E2E7)"
            id="Vector_3"
          />
          <path
            d={svgPaths.p22c75b00}
            fill="var(--fill-0, #E0E2E7)"
            id="Vector_4"
          />
          <path
            d={svgPaths.p19596330}
            fill="var(--fill-0, #E0E2E7)"
            id="Vector_5"
          />
          <path
            d={svgPaths.p27f0c800}
            fill="var(--fill-0, #E0E2E7)"
            id="Vector_6"
          />
          <path
            d={svgPaths.p18cbfc00}
            fill="var(--fill-0, #E0E2E7)"
            id="Vector_7"
          />
          <path
            d={svgPaths.p16dfb300}
            fill="var(--fill-0, #E0E2E7)"
            id="Vector_8"
          />
          <path
            d={svgPaths.p57e1e00}
            fill="var(--fill-0, #E0E2E7)"
            id="Vector_9"
          />
        </g>
      </svg>
    </div>
  );
}

function Group74() {
  return (
    <div
      className="absolute inset-[18.86%_19%_80.35%_75.42%]"
      data-name="Group"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 80.4773 53.1561"
      >
        <g id="Group">
          <path
            d={svgPaths.pf2a5080}
            fill="var(--fill-0, #1A1C21)"
            id="Vector"
          />
          <g id="Group_2">
            <path
              d={svgPaths.p228e2c00}
              fill="var(--fill-0, white)"
              id="Vector_2"
            />
            <path
              d={svgPaths.p34c8200}
              fill="var(--fill-0, #1A1C21)"
              id="Vector_3"
            />
          </g>
          <g id="Group_3">
            <path
              d={svgPaths.p42d4500}
              fill="var(--fill-0, white)"
              id="Vector_4"
            />
            <path
              d={svgPaths.p35c0fc00}
              fill="var(--fill-0, #1A1C21)"
              id="Vector_5"
            />
          </g>
          <path
            d={svgPaths.p133e8700}
            fill="var(--fill-0, #7A1F36)"
            id="Vector_6"
          />
          <g id="Group_4">
            <path
              d={svgPaths.p1619ef80}
              fill="var(--fill-0, white)"
              id="Vector_7"
            />
            <path
              d={svgPaths.p18c03e70}
              fill="var(--fill-0, #1A1C21)"
              id="Vector_8"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Group72() {
  return (
    <div
      className="absolute contents inset-[18.79%_18.83%_80.25%_74.94%]"
      data-name="Group"
    >
      <Group73 />
      <Group74 />
    </div>
  );
}

function Group75() {
  return (
    <div
      className="absolute inset-[18.57%_18.34%_81.34%_80.08%]"
      data-name="Group"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 22.6786 6.03095"
      >
        <g id="Group">
          <path d={svgPaths.p8696b80} fill="var(--fill-0, white)" id="Vector" />
          <path
            d={svgPaths.p2d16300}
            fill="var(--fill-0, white)"
            id="Vector_2"
          />
          <path
            d={svgPaths.p20087b90}
            fill="var(--fill-0, white)"
            id="Vector_3"
          />
        </g>
      </svg>
    </div>
  );
}

function Group70() {
  return (
    <div
      className="absolute contents inset-[18.51%_18.06%_80.16%_74.17%]"
      data-name="Group"
    >
      <Group71 />
      <Group72 />
      <Group75 />
    </div>
  );
}

function Group78() {
  return (
    <div
      className="absolute inset-[18.17%_20.19%_17.82%_50.09%]"
      data-name="Group"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 36.2673 26.2459"
      >
        <g id="Group">
          <path
            d={svgPaths.p315fe000}
            fill="var(--fill-0, white)"
            id="Vector"
          />
          <path
            d={svgPaths.p18520200}
            fill="var(--fill-0, #1A1C21)"
            id="Vector_2"
          />
        </g>
      </svg>
    </div>
  );
}

function Group79() {
  return (
    <div
      className="absolute inset-[-80.49%_-48.04%_-0.29%_71.26%]"
      data-name="Group"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 93.6756 74.1176"
      >
        <g id="Group">
          <path
            d={svgPaths.p15c43400}
            fill="var(--fill-0, #7A1F36)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Group77() {
  return (
    <div
      className="absolute contents inset-[-80.49%_-48.04%_-0.29%_50.09%]"
      data-name="Group"
    >
      <Group78 />
      <Group79 />
    </div>
  );
}

function Group76() {
  return (
    <div
      className="absolute contents inset-[-80.49%_-48.04%_-0.29%_50.09%]"
      data-name="Group"
    >
      <Group77 />
    </div>
  );
}

function Group81() {
  return (
    <div
      className="absolute inset-[17.93%_36.99%_2.06%_26.48%]"
      data-name="Group"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 44.5707 32.8012"
      >
        <g id="Group">
          <path
            d={svgPaths.p1a7b5f00}
            fill="var(--fill-0, white)"
            id="Vector"
          />
          <path
            d={svgPaths.p9d10000}
            fill="var(--fill-0, #1A1C21)"
            id="Vector_2"
          />
        </g>
      </svg>
    </div>
  );
}

function Group82() {
  return (
    <div
      className="absolute inset-[50.11%_54.92%_31.76%_36.35%]"
      data-name="Group"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 10.6418 7.43464"
      >
        <g id="Group">
          <path
            d={svgPaths.p29758b40}
            fill="var(--fill-0, white)"
            id="Vector"
          />
          <path
            d={svgPaths.pbe86480}
            fill="var(--fill-0, #1A1C21)"
            id="Vector_2"
          />
        </g>
      </svg>
    </div>
  );
}

function Group83() {
  return (
    <div
      className="absolute inset-[59.49%_53.07%_22.38%_38.2%]"
      data-name="Group"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 10.6417 7.43451"
      >
        <g id="Group">
          <path
            d={svgPaths.p21fa9b80}
            fill="var(--fill-0, white)"
            id="Vector"
          />
          <path
            d={svgPaths.p8d35300}
            fill="var(--fill-0, #1A1C21)"
            id="Vector_2"
          />
        </g>
      </svg>
    </div>
  );
}

function Group84() {
  return (
    <div
      className="absolute inset-[68.87%_50.95%_13%_40.32%]"
      data-name="Group"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 10.6417 7.4348"
      >
        <g id="Group">
          <path
            d={svgPaths.p11641100}
            fill="var(--fill-0, white)"
            id="Vector"
          />
          <path
            d={svgPaths.p2c84600}
            fill="var(--fill-0, #1A1C21)"
            id="Vector_2"
          />
        </g>
      </svg>
    </div>
  );
}

function Group85() {
  return (
    <div
      className="absolute inset-[78.4%_49.4%_6.45%_43.34%]"
      data-name="Group"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 8.85411 6.2103"
      >
        <g id="Group">
          <path
            d={svgPaths.p1bdb8400}
            fill="var(--fill-0, white)"
            id="Vector"
          />
          <path
            d={svgPaths.p2f28ea80}
            fill="var(--fill-0, #1A1C21)"
            id="Vector_2"
          />
        </g>
      </svg>
    </div>
  );
}

function Group86() {
  return (
    <div
      className="absolute inset-[29.37%_34.19%_45.38%_46.84%]"
      data-name="Group"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 23.1459 10.354"
      >
        <g id="Group">
          <path d={svgPaths.p7e3c840} fill="var(--fill-0, white)" id="Vector" />
          <path
            d={svgPaths.p22ef2d00}
            fill="var(--fill-0, #1A1C21)"
            id="Vector_2"
          />
        </g>
      </svg>
    </div>
  );
}

function Group88() {
  return (
    <div
      className="absolute inset-[-62.66%_66.19%_18.69%_-28.68%]"
      data-name="Group"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 76.2371 59.0268"
      >
        <g id="Group">
          <path
            d={svgPaths.p34d09f80}
            fill="var(--fill-0, white)"
            id="Vector"
          />
          <path
            d={svgPaths.p5e78b00}
            fill="var(--fill-0, #1A1C21)"
            id="Vector_2"
          />
        </g>
      </svg>
    </div>
  );
}

function Group89() {
  return (
    <div
      className="absolute inset-[16.02%_66%_18.13%_-15.85%]"
      data-name="Group"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 60.8133 26.9984"
      >
        <g id="Group">
          <path
            d={svgPaths.p3310b080}
            fill="var(--fill-0, #1A1C21)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Group87() {
  return (
    <div
      className="absolute contents inset-[-62.66%_66%_18.13%_-28.68%]"
      data-name="Group"
    >
      <Group88 />
      <Group89 />
    </div>
  );
}

function Group80() {
  return (
    <div
      className="absolute contents inset-[-62.66%_34.19%_2.06%_-28.68%]"
      data-name="Group"
    >
      <Group81 />
      <Group82 />
      <Group83 />
      <Group84 />
      <Group85 />
      <Group86 />
      <Group87 />
    </div>
  );
}

function Frame81() {
  return (
    <div className="absolute h-[41px] left-[946px] overflow-clip top-[1289px] w-[122px]">
      <Group76 />
      <Group80 />
    </div>
  );
}

function Group97() {
  return (
    <div className="absolute contents left-[939px] top-[1184px]">
      <Group45 />
      <Group70 />
      <Frame81 />
    </div>
  );
}

function Group100() {
  return (
    <div className="absolute contents left-[939px] top-[1184px]">
      <div className="absolute bg-[#1a1c21] h-[9px] left-[946px] top-[1190.5px] w-[46.5px]" />
      <Group97 />
    </div>
  );
}

function Button5() {
  return (
    <div
      className="absolute content-stretch flex gap-[8px] items-center justify-center left-[1123px] overflow-clip rounded-[400px] top-[2906px]"
      data-name="Button"
    >
      <p className="font-['SVN-Neue_Montreal:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#7a1f36] text-[14px] tracking-[-0.07px] whitespace-nowrap">
        XEM TẤT CẢ
      </p>
      <div
        className="overflow-clip relative shrink-0 size-[20px]"
        data-name="lue/arrow-right"
      >
        <div className="absolute inset-[16.67%]" data-name="Vector">
          <svg
            className="absolute block inset-0 size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 13.3333 13.3331"
          >
            <g id="Vector">
              <path d={svgPaths.p37dd1f80} fill="var(--fill-0, #7A1F36)" />
              <path d={svgPaths.pa28a700} fill="var(--fill-0, #7A1F36)" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div
      className="absolute content-stretch flex gap-[8px] items-center justify-center left-[1123px] overflow-clip rounded-[400px] top-[3215px]"
      data-name="Button"
    >
      <p className="font-['SVN-Neue_Montreal:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#7a1f36] text-[14px] tracking-[-0.07px] whitespace-nowrap">
        XEM TẤT CẢ
      </p>
      <div
        className="overflow-clip relative shrink-0 size-[20px]"
        data-name="lue/arrow-right"
      >
        <div className="absolute inset-[16.67%]" data-name="Vector">
          <svg
            className="absolute block inset-0 size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 13.3333 13.3331"
          >
            <g id="Vector">
              <path d={svgPaths.p37dd1f80} fill="var(--fill-0, #7A1F36)" />
              <path d={svgPaths.pa28a700} fill="var(--fill-0, #7A1F36)" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button7() {
  return (
    <div
      className="absolute content-stretch flex gap-[8px] items-center justify-center left-[1123px] overflow-clip rounded-[400px] top-[5455px]"
      data-name="Button"
    >
      <p className="font-['SVN-Neue_Montreal:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#7a1f36] text-[14px] tracking-[-0.07px] whitespace-nowrap">
        XEM TẤT CẢ
      </p>
      <div
        className="overflow-clip relative shrink-0 size-[20px]"
        data-name="lue/arrow-right"
      >
        <div className="absolute inset-[16.67%]" data-name="Vector">
          <svg
            className="absolute block inset-0 size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 13.3333 13.3331"
          >
            <g id="Vector">
              <path d={svgPaths.p37dd1f80} fill="var(--fill-0, #7A1F36)" />
              <path d={svgPaths.pa28a700} fill="var(--fill-0, #7A1F36)" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function LutSaDiBSungMtSDiuCaLutThuGiaTrGiaTangToThunLiChoKinhDoanh() {
  return (
    <div
      className="h-[440px] relative shrink-0 w-[660px]"
      data-name="image"
    >
      <img
        alt=""
        className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
        src={imgLutSaDiBSungMtSDiuCaLutThuGiaTrGiaTangToThunLiChoKinhDoanh}
        
      />
    </div>
  );
}

function Frame83() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start not-italic relative shrink-0 w-full">
      <p className="font-['SVN-Neue_Montreal:SemiBold',sans-serif] h-[56px] leading-[28px] relative shrink-0 text-[#1e2a37] text-[20px] w-full">
        Luật Sửa đổi, bổ sung một số điều của Luật Thuế giá trị gia tăng tạo
        thuận lợi cho kinh doanh
      </p>
      <p className="font-['SVN-Neue_Montreal:Regular',sans-serif] leading-[22px] relative shrink-0 text-[#4d5464] text-[14px] w-full">
        Chiều 9-12, Quốc hội đã tiến hành thảo luận tại hội trường về dự án Luật
        Sửa đổi, bổ sung một số điều của Luật Thuế giá trị gia tăng (GTGT).
        Phiên họp do Chủ tịch Quốc hội Trần Thanh Mẫn chủ tọa, Phó Chủ tịch Quốc
        hội...
      </p>
    </div>
  );
}

function Frame82() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[20px] items-start left-[209px] top-[3287px] w-[660px]">
      <LutSaDiBSungMtSDiuCaLutThuGiaTrGiaTangToThunLiChoKinhDoanh />
      <Frame83 />
    </div>
  );
}

function Frame86() {
  return (
    <div className="content-stretch flex items-center justify-center pt-[5px] relative shrink-0">
      <div className="title-accent flex flex-col font-['SVN-Ivy_Presto_Display:Italic',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#7a1f36] text-[42px] text-center whitespace-nowrap">
        <p className="leading-[normal]">Mạng lưới</p>
      </div>
    </div>
  );
}

function Frame85() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
      <Frame86 />
      <div className="flex flex-col font-['SVN-Neue_Montreal:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1c21] text-[42px] text-center whitespace-nowrap">
        <p className="leading-[normal]">hỗ trợ</p>
      </div>
    </div>
  );
}

function Frame84() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex flex-col gap-[2px] items-center left-[calc(50%-0.5px)] top-[6014px]">
      <Frame85 />
      <div className="flex flex-col font-['SVN-Neue_Montreal:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4d5464] text-[16px] text-center whitespace-nowrap">
        <p className="leading-[normal]">
          Cập nhật mới nhất về môi trường đầu tư và chính sách ưu đãi
        </p>
      </div>
    </div>
  );
}

function Frame88() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center justify-center not-italic relative shrink-0 w-full">
      <p className="font-['SVN-Neue_Montreal:Regular',sans-serif] leading-[normal] min-w-full relative shrink-0 text-[#667085] text-[12px] text-center w-[min-content]">
        Hotline 24/7
      </p>
      <div className="flex flex-col font-['SVN-Neue_Montreal:Medium',sans-serif] justify-center leading-[0] relative shrink-0 text-[#1a1c21] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">+84 (24) 3936 1234</p>
      </div>
      <p className="font-['SVN-Neue_Montreal:Regular',sans-serif] leading-[normal] relative shrink-0 text-[#7a1f36] text-[12px] text-center whitespace-nowrap">
        Hỗ trợ khẩn cấp mọi lúc
      </p>
    </div>
  );
}

function Frame87() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] items-center left-[234px] top-[6178px] w-[160px]">
      <div
        className="overflow-clip relative shrink-0 size-[24px]"
        data-name="phone-call"
      >
        <div
          className="absolute inset-[4.17%_4.16%_8.63%_8.8%]"
          data-name="Icon"
        >
          <div className="absolute inset-[-2.39%]">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 21.8882 21.9282"
            >
              <path
                d={svgPaths.p3a464e00}
                id="Icon"
                stroke="var(--stroke-0, #212529)"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
      <Frame88 />
    </div>
  );
}

function MailSendEnvelopeEnvelopeEmailMessageUnopenedSealedClose() {
  return (
    <div
      className="absolute inset-[18.12%_11.04%_18.13%_11.04%]"
      data-name="mail-send-envelope--envelope-email-message-unopened-sealed-close"
    >
      <div className="absolute inset-[-3.27%_-2.67%]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 19.7 16.3"
        >
          <g id="mail-send-envelope--envelope-email-message-unopened-sealed-close">
            <path
              d="M0.5 0.5H19.2V15.8H0.5V0.5Z"
              id="Rectangle 846"
              stroke="var(--stroke-0, #1A1C21)"
            />
            <path
              d={svgPaths.p19b9c250}
              id="Vector 2539"
              stroke="var(--stroke-0, #1A1C21)"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Frame90() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center justify-center not-italic relative shrink-0 w-full">
      <p className="font-['SVN-Neue_Montreal:Regular',sans-serif] leading-[normal] min-w-full relative shrink-0 text-[#667085] text-[12px] text-center w-[min-content]">
        Email
      </p>
      <div className="flex flex-col font-['SVN-Neue_Montreal:Medium',sans-serif] justify-center leading-[0] relative shrink-0 text-[#1a1c21] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">support@investment.gov.vn</p>
      </div>
      <p className="font-['SVN-Neue_Montreal:Regular',sans-serif] leading-[normal] relative shrink-0 text-[#7a1f36] text-[12px] text-center whitespace-nowrap">
        Phản hồi trong 24h
      </p>
    </div>
  );
}

function Frame89() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] items-center left-[504px] top-[6178px] w-[160px]">
      <div
        className="overflow-clip relative shrink-0 size-[24px]"
        data-name="Mail-Send-Envelope--Streamline-Sharp"
      >
        <MailSendEnvelopeEnvelopeEmailMessageUnopenedSealedClose />
      </div>
      <Frame90 />
    </div>
  );
}

function ChatTwoBubblesOvalMessagesMessageBubbleChatOvalConversation() {
  return (
    <div
      className="absolute inset-[13.98%]"
      data-name="chat-two-bubbles-oval--messages-message-bubble-chat-oval-conversation"
    >
      <div className="absolute inset-[-2.89%]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 18.2886 18.2888"
        >
          <g id="chat-two-bubbles-oval--messages-message-bubble-chat-oval-conversation">
            <path
              d={svgPaths.p386c5b00}
              id="Union"
              stroke="var(--stroke-0, #1A1C21)"
            />
            <path
              d={svgPaths.p3e0ac580}
              id="Union_2"
              stroke="var(--stroke-0, #1A1C21)"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Frame91() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center justify-center not-italic relative shrink-0 w-full">
      <p className="font-['SVN-Neue_Montreal:Regular',sans-serif] leading-[normal] min-w-full relative shrink-0 text-[#667085] text-[12px] text-center w-[min-content]">
        Live Chat
      </p>
      <div className="flex flex-col font-['SVN-Neue_Montreal:Medium',sans-serif] justify-center leading-[0] relative shrink-0 text-[#1a1c21] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Trò chuyện ngay</p>
      </div>
      <p className="font-['SVN-Neue_Montreal:Regular',sans-serif] leading-[normal] relative shrink-0 text-[#7a1f36] text-[12px] text-center whitespace-nowrap">
        Online: 8:00 - 22:00
      </p>
    </div>
  );
}

function Frame111() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] items-center left-[774px] top-[6178px] w-[160px]">
      <div
        className="overflow-clip relative shrink-0 size-[24px]"
        data-name="Chat-Two-Bubbles-Oval--Streamline-Sharp"
      >
        <ChatTwoBubblesOvalMessagesMessageBubbleChatOvalConversation />
      </div>
      <Frame91 />
    </div>
  );
}

function Frame92() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center justify-center not-italic relative shrink-0 w-full">
      <p className="font-['SVN-Neue_Montreal:Regular',sans-serif] leading-[normal] min-w-full relative shrink-0 text-[#667085] text-[12px] text-center w-[min-content]">
        Văn phòng đại diện
      </p>
      <div className="flex flex-col font-['SVN-Neue_Montreal:Medium',sans-serif] justify-center leading-[0] relative shrink-0 text-[#1a1c21] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">15+ quốc gia</p>
      </div>
      <p className="font-['SVN-Neue_Montreal:Regular',sans-serif] leading-[normal] relative shrink-0 text-[#7a1f36] text-[12px] text-center whitespace-nowrap">
        Hỗ trợ tại chỗ
      </p>
    </div>
  );
}

function Frame112() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] items-center left-[1037px] top-[6178px] w-[160px]">
      <div
        className="overflow-clip relative shrink-0 size-[24px]"
        data-name="home"
      >
        <div className="absolute inset-[8.33%_12.5%]" data-name="Icon">
          <div className="absolute inset-[-2.5%_-2.78%]">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 19 21"
            >
              <path
                d={svgPaths.p1e2f9400}
                id="Icon"
                stroke="var(--stroke-1, #1A1C21)"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
      <Frame92 />
    </div>
  );
}

function Frame95() {
  return (
    <div className="content-stretch flex items-center justify-center pt-[5px] relative shrink-0">
      <div className="title-accent flex flex-col font-['SVN-Ivy_Presto_Display:Italic',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#7a1f36] text-[42px] text-center whitespace-nowrap">
        <p className="leading-[normal]">Câu chuyện</p>
      </div>
    </div>
  );
}

function Frame94() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
      <Frame95 />
      <div className="flex flex-col font-['SVN-Neue_Montreal:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1c21] text-[42px] text-center whitespace-nowrap">
        <p className="leading-[normal]">thành công</p>
      </div>
    </div>
  );
}

function Frame93() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex flex-col gap-[2px] items-start left-[calc(50%-265.5px)] top-[5430px]">
      <Frame94 />
      <div className="flex flex-col font-['SVN-Neue_Montreal:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4d5464] text-[16px] text-center whitespace-nowrap">
        <p className="leading-[normal]">
          Hơn 35.000 dự án FDI đã lựa chọn Việt Nam làm điểm đến đầu tư
        </p>
      </div>
    </div>
  );
}

function Frame97() {
  return (
    <div className="content-stretch flex items-center justify-center pt-[5px] relative shrink-0">
      <div className="flex flex-col font-['SVN-Ivy_Presto_Display:Italic',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[42px] text-center text-white whitespace-nowrap">
        <p className="leading-[normal]">Kết nối</p>
      </div>
    </div>
  );
}

function Frame96() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
      <Frame97 />
      <div className="flex flex-col font-['SVN-Neue_Montreal:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[42px] text-center text-white whitespace-nowrap">
        <p className="leading-[normal]">đối tác</p>
      </div>
    </div>
  );
}

function Frame109() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex flex-col gap-[2px] items-center left-1/2 top-[3935px] w-[538px]">
      <Frame96 />
      <div className="flex flex-col font-['SVN-Neue_Montreal:Regular',sans-serif] justify-center leading-[0] min-w-full not-italic opacity-70 relative shrink-0 text-[16px] text-white w-[min-content]">
        <p className="leading-[normal]">
          Nền tảng kết nối thông minh dựa trên profile của bạn. Chúng tôi phân
          tích nhu cầu đầu tư, ngành nghề, quy mô vốn để gợi ý đối tác tiềm năng
          phù hợp nhất.
        </p>
      </div>
    </div>
  );
}

function Frame103() {
  return (
    <div className="content-stretch flex gap-[10px] items-center opacity-80 relative shrink-0">
      <div
        className="overflow-clip relative shrink-0 size-[16px]"
        data-name="share-2"
      >
        <div className="absolute inset-[8.33%_12.5%]" data-name="Icon">
          <div className="absolute inset-[-3.75%_-4.17%]">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 13 14.3333"
            >
              <path
                d={svgPaths.p182b0e00}
                id="Icon"
                stroke="var(--stroke-0, white)"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
      <p className="font-['SVN-Neue_Montreal:Medium',sans-serif] leading-[26px] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">
        Kết nối thông minh
      </p>
    </div>
  );
}

function Frame104() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] items-start left-[235px] top-[4241px] w-[252px]">
      <Frame103 />
      <p className="font-['SVN-Neue_Montreal:Regular',sans-serif] leading-[20px] min-w-full not-italic opacity-70 relative shrink-0 text-[14px] text-white w-[min-content]">
        Thuật toán AI phân tích profile để gợi ý đối tác phù hợp nhất
      </p>
    </div>
  );
}

function Frame105() {
  return (
    <div className="content-stretch flex gap-[10px] items-center opacity-80 relative shrink-0">
      <div
        className="overflow-clip relative shrink-0 size-[16px]"
        data-name="check-square"
      >
        <div
          className="absolute inset-[12.5%_8.33%_12.5%_12.5%]"
          data-name="Icon"
        >
          <div className="absolute inset-[-4.17%_-3.95%]">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 13.6667 13"
            >
              <path
                d={svgPaths.p3a21709d}
                id="Icon"
                stroke="var(--stroke-0, white)"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
      <p className="font-['SVN-Neue_Montreal:Medium',sans-serif] leading-[26px] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">
        Đối tác chính xác
      </p>
    </div>
  );
}

function Frame106() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex flex-col gap-[12px] h-[74px] items-start left-[calc(50%+6px)] top-[4241px] w-[264px]">
      <Frame105 />
      <p className="flex-[1_0_0] font-['SVN-Neue_Montreal:Regular',sans-serif] leading-[20px] min-h-px not-italic opacity-70 relative text-[14px] text-white w-[230px]">
        Lọc theo ngành nghề, quy mô vốn, địa điểm đầu tư mong muốn
      </p>
    </div>
  );
}

function Frame107() {
  return (
    <div className="content-stretch flex gap-[10px] items-center opacity-80 relative shrink-0 w-full">
      <div
        className="overflow-clip relative shrink-0 size-[16px]"
        data-name="globe"
      >
        <div className="absolute inset-[8.33%]" data-name="Icon">
          <div className="absolute inset-[-3.75%]">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 14.3333 14.3333"
            >
              <path
                d={svgPaths.p28c37000}
                id="Icon"
                stroke="var(--stroke-0, white)"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
      <p className="font-['SVN-Neue_Montreal:Medium',sans-serif] leading-[26px] not-italic relative shrink-0 text-[16px] text-white w-[260px]">
        Cơ hội độc quyền
      </p>
    </div>
  );
}

function Frame108() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] items-start left-[954px] top-[4241px] w-[252px]">
      <Frame107 />
      <p className="font-['SVN-Neue_Montreal:Regular',sans-serif] leading-[20px] not-italic opacity-70 relative shrink-0 text-[14px] text-white w-full">
        Tiếp cận nhà đầu tư và dự án chưa công bố trên thị trường
      </p>
    </div>
  );
}

function Frame98() {
  const countRef = useCountUp(5000, { suffix: "+", separator: "." });
  return (
    <div className="absolute content-stretch flex flex-col items-start leading-[0] left-[235px] not-italic text-center text-white top-[4097px] whitespace-nowrap">
      <div className="flex flex-col font-['SVN-Neue_Montreal:SemiBold',sans-serif] justify-center relative shrink-0 text-[40px]">
        <p className="leading-[60px]" ref={countRef}>5.000+</p>
      </div>
      <div className="flex flex-col font-['SVN-Neue_Montreal:Regular',sans-serif] justify-center opacity-80 relative shrink-0 text-[12px] tracking-[0.24px]">
        <p className="leading-[normal]">Doanh nghiệp Việt Nam</p>
      </div>
    </div>
  );
}

function Frame99() {
  const countRef = useCountUp(2500, { suffix: "+", separator: "." });
  return (
    <div className="absolute content-stretch flex flex-col items-start leading-[0] left-[596px] not-italic text-center text-white top-[4097px] whitespace-nowrap">
      <div className="flex flex-col font-['SVN-Neue_Montreal:SemiBold',sans-serif] justify-center relative shrink-0 text-[40px]">
        <p className="leading-[60px]" ref={countRef}>2.500+</p>
      </div>
      <div className="flex flex-col font-['SVN-Neue_Montreal:Regular',sans-serif] justify-center opacity-80 relative shrink-0 text-[12px] tracking-[0.24px]">
        <p className="leading-[normal]">Nhà đầu tư FDI</p>
      </div>
    </div>
  );
}

function Frame100() {
  const countRef = useCountUp(800, { suffix: "+" });
  return (
    <div className="absolute content-stretch flex flex-col items-start leading-[0] left-[954px] not-italic text-center text-white top-[4097px] whitespace-nowrap">
      <div className="flex flex-col font-['SVN-Neue_Montreal:SemiBold',sans-serif] justify-center relative shrink-0 text-[40px]">
        <p className="leading-[60px]" ref={countRef}>800+</p>
      </div>
      <div className="flex flex-col font-['SVN-Neue_Montreal:Regular',sans-serif] justify-center opacity-80 relative shrink-0 text-[12px] tracking-[0.24px]">
        <p className="leading-[normal]">Kết nối thành công</p>
      </div>
    </div>
  );
}

function Group98() {
  return (
    <div className="absolute contents left-[420px] top-[3935px]">
      <Frame109 />
      <div
        className="absolute flex h-[290px] items-center justify-center left-[539px] top-[4070px] w-0"
        style={
          {
            "--transform-inner-width": "1185",
            "--transform-inner-height": "21",
          } as React.CSSProperties
        }
      >
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[290px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 290 1"
              >
                <line
                  id="Line 41"
                  opacity="0.1"
                  stroke="var(--stroke-0, #EBEBEB)"
                  x2="290"
                  y1="0.5"
                  y2="0.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div
        className="absolute flex h-[290px] items-center justify-center left-[899px] top-[4070px] w-0"
        style={
          {
            "--transform-inner-width": "1185",
            "--transform-inner-height": "21",
          } as React.CSSProperties
        }
      >
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[290px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 290 1"
              >
                <line
                  id="Line 41"
                  opacity="0.1"
                  stroke="var(--stroke-0, #EBEBEB)"
                  x2="290"
                  y1="0.5"
                  y2="0.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-0 items-center justify-center left-[179px] top-[4069px] w-[1080px]">
        <div className="flex-none rotate-180">
          <div className="h-0 relative w-[1080px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 1080 1"
              >
                <line
                  id="Line 42"
                  opacity="0.1"
                  stroke="var(--stroke-0, #EBEBEB)"
                  x2="1080"
                  y1="0.5"
                  y2="0.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Frame104 />
      <Frame106 />
      <Frame108 />
      <div className="absolute flex h-0 items-center justify-center left-[179px] top-[4201px] w-[1080px]">
        <div className="flex-none rotate-180">
          <div className="h-0 relative w-[1080px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 1080 1"
              >
                <line
                  id="Line 42"
                  opacity="0.1"
                  stroke="var(--stroke-0, #EBEBEB)"
                  x2="1080"
                  y1="0.5"
                  y2="0.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Frame98 />
      <Frame99 />
      <Frame100 />
    </div>
  );
}

function Group90() {
  return (
    <div
      className="absolute inset-[14.71%_5.87%_5.88%_5.88%]"
      data-name="Group"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 15.002 13.5"
      >
        <g id="Group">
          <path
            d={svgPaths.p20e41600}
            fill="var(--fill-0, white)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Image3() {
  return (
    <div
      className="overflow-clip relative shrink-0 size-[17px]"
      data-name="image (2) 1"
      data-step-icon="1"
    >
      <Group90 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="bg-[#7a1f36] content-stretch flex items-center justify-center relative rounded-[256px] shrink-0 size-[28px]" data-step-circle="1">
      <div
        aria-hidden="true"
        className="absolute border-4 border-[rgba(122,31,54,0.1)] border-solid inset-[-4px] pointer-events-none rounded-[260px]"
      />
      <Image3 />
    </div>
  );
}

function Frame113() {
  return (
    <div className="content-stretch flex gap-[32px] items-center relative shrink-0">
      <div className="flex flex-col font-['SVN-Ivy_Presto_Display:Italic',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1c21] text-[24px] text-right w-[70px] text-nowrap">
        <p className="leading-[normal]">Bước 1</p>
      </div>
      <Frame10 />
      <p className="font-['SVN-Neue_Montreal:SemiBold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#1e2a37] text-[20px] whitespace-nowrap">
        Tạo profile đầu tư của bạn
      </p>
    </div>
  );
}

function Frame117() {
  return (
    <div className="content-stretch flex gap-[62px] items-start relative shrink-0 w-full" data-step="1">
      <Frame113 />
      <div className="h-[220px] relative rounded-[10px] shrink-0 w-[322px]">
        <img
          alt=""
          className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[10px] size-full"
          src={imgRectangle12}
        />
      </div>
    </div>
  );
}

function Group91() {
  return (
    <div
      className="absolute inset-[14.71%_5.87%_5.88%_5.88%]"
      data-name="Group"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 15.002 13.5"
      >
        <g id="Group">
          <path
            d={svgPaths.p20e41600}
            fill="var(--fill-0, white)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Image4() {
  return (
    <div
      className="overflow-clip relative shrink-0 size-[17px]"
      data-name="image (2) 1"
      data-step-icon="2"
    >
      <Group91 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="bg-[#7a1f36] content-stretch flex items-center justify-center relative rounded-[256px] shrink-0 size-[28px]" data-step-circle="2">
      <div
        aria-hidden="true"
        className="absolute border-4 border-[rgba(122,31,54,0.1)] border-solid inset-[-4px] pointer-events-none rounded-[260px]"
      />
      <Image4 />
    </div>
  );
}

function Frame114() {
  return (
    <div className="content-stretch flex gap-[32px] items-center relative shrink-0">
      <div className="flex flex-col font-['SVN-Ivy_Presto_Display:Italic',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1c21] text-[24px] text-right w-[70px]">
        <p className="leading-[normal] text-nowrap">Bước 2</p>
      </div>
      <Frame11 />
      <p className="font-['SVN-Neue_Montreal:SemiBold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#1e2a37] text-[20px] whitespace-nowrap">
        AI phân tích và gợi ý đối tác
      </p>
    </div>
  );
}

function Frame115() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-step="2">
      <Frame114 />
      <div className="h-[220px] relative rounded-[10px] shrink-0 w-[322px]">
        <img
          alt=""
          className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[10px] size-full"
          src={imgRectangle13}
        />
      </div>
    </div>
  );
}

function Group92() {
  return (
    <div
      className="absolute inset-[14.71%_5.87%_5.88%_5.88%]"
      data-name="Group"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 15.002 13.5"
      >
        <g id="Group">
          <path
            d={svgPaths.p20e41600}
            fill="var(--fill-0, white)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Image5() {
  return (
    <div
      className="overflow-clip relative shrink-0 size-[17px]"
      data-name="image (2) 1"
      data-step-icon="3"
    >
      <Group92 />
    </div>
  );
}

function Frame12() {
  return (
    <div className="bg-[#7a1f36] content-stretch flex items-center justify-center relative rounded-[256px] shrink-0 size-[28px]" data-step-circle="3">
      <div
        aria-hidden="true"
        className="absolute border-4 border-[rgba(122,31,54,0.1)] border-solid inset-[-4px] pointer-events-none rounded-[260px]"
      />
      <Image5 />
    </div>
  );
}

function Frame119() {
  return (
    <div className="content-stretch flex gap-[32px] items-center relative shrink-0">
      <div className="flex flex-col font-['SVN-Ivy_Presto_Display:Italic',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1c21] text-[24px] text-right w-[70px]">
        <p className="leading-[normal] text-nowrap">Bước 3</p>
      </div>
      <Frame12 />
      <p className="font-['SVN-Neue_Montreal:SemiBold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#1e2a37] text-[20px] whitespace-nowrap">
        Kết nối trực tiếp qua nền tảng
      </p>
    </div>
  );
}

function Frame116() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-step="3">
      <Frame119 />
      <div className="h-[220px] relative rounded-[10px] shrink-0 w-[322px]">
        <img
          alt=""
          className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[10px] size-full"
          src={imgRectangle14}
        />
      </div>
    </div>
  );
}

function Group93() {
  return (
    <div
      className="absolute inset-[14.71%_5.87%_5.88%_5.88%]"
      data-name="Group"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 15.002 13.5"
      >
        <g id="Group">
          <path
            d={svgPaths.p20e41600}
            fill="var(--fill-0, white)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Image6() {
  return (
    <div
      className="overflow-clip relative shrink-0 size-[17px]"
      data-name="image (2) 1"
      data-step-icon="4"
    >
      <Group93 />
    </div>
  );
}

function Frame13() {
  return (
    <div className="bg-[#7a1f36] content-stretch flex items-center justify-center relative rounded-[256px] shrink-0 size-[28px]" data-step-circle="4">
      <div
        aria-hidden="true"
        className="absolute border-4 border-[rgba(122,31,54,0.1)] border-solid inset-[-4px] pointer-events-none rounded-[260px]"
      />
      <Image6 />
    </div>
  );
}

function Frame121() {
  return (
    <div className="content-stretch flex gap-[32px] items-center relative shrink-0">
      <div className="flex flex-col font-['SVN-Ivy_Presto_Display:Italic',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1c21] text-[24px] text-right w-[70px]">
        <p className="leading-[normal] text-nowrap">Bước 4</p>
      </div>
      <Frame13 />
      <p className="font-['SVN-Neue_Montreal:SemiBold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#1e2a37] text-[20px] whitespace-nowrap">{`Hỗ trợ đàm phán & hợp tác`}</p>
    </div>
  );
}

function Frame120() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-step="4">
      <Frame121 />
      <div className="h-[220px] relative rounded-[12px] shrink-0 w-[322px]">
        <img
          alt=""
          className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[12px] size-full"
          src={imgRectangle15}
        />
      </div>
    </div>
  );
}

function Frame118() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] items-start left-[423px] top-[4409px] w-[778px]">
      <Frame117 />
      <Frame115 />
      <Frame116 />
      <Frame120 />
    </div>
  );
}

function Frame128() {
  return (
    <div className="absolute content-stretch flex font-['SVN-Neue_Montreal:Regular',sans-serif] gap-[12px] items-center leading-[normal] left-[1189px] not-italic text-[12px] text-white top-[393px] whitespace-nowrap">
      <p
        className="relative shrink-0"
        style={{ fontFeatureSettings: "'salt', 'liga' 0" }}
      >
        Sơ đồ trang web
      </p>
      <p
        className="relative shrink-0"
        style={{ fontFeatureSettings: "'salt', 'liga' 0" }}
      >
        Điều khoản
      </p>
      <p
        className="relative shrink-0"
        style={{ fontFeatureSettings: "'salt', 'liga' 0" }}
      >
        Bảo mật
      </p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex gap-[20px] items-start relative shrink-0">
      <div
        className="overflow-clip relative shrink-0 size-[24px]"
        data-name="map-pin"
      >
        <div className="absolute inset-[4.17%_12.5%]" data-name="Icon">
          <div className="absolute inset-[-2.27%_-2.78%]">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 19 23"
            >
              <g id="Icon">
                <path
                  d={svgPaths.p25e76900}
                  stroke="var(--stroke-0, #E0E2E7)"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d={svgPaths.p296e5880}
                  stroke="var(--stroke-0, #E0E2E7)"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
          </div>
        </div>
      </div>
      <p className="font-['SVN-Neue_Montreal:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[14px] text-white w-[304px]">
        Số 6-8 Phan Huy Chú, Phường Phan Chu Trinh, Thành phố Hà Nội
      </p>
    </div>
  );
}

function Headset() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Headset">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="Headset">
          <g id="Vector" />
          <path
            d={svgPaths.p24f239c0}
            id="Vector_2"
            stroke="var(--stroke-0, #E5E7E9)"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={svgPaths.p16ee5280}
            id="Vector_3"
            stroke="var(--stroke-0, #E5E7E9)"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex gap-[20px] items-center relative shrink-0">
      <Headset />
      <p className="font-['SVN-Neue_Montreal:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
        1900 1234
      </p>
    </div>
  );
}

function EnvelopeOpen() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="EnvelopeOpen">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="EnvelopeOpen">
          <g id="Vector" />
          <path
            d={svgPaths.p39d254f0}
            id="Vector_2"
            stroke="var(--stroke-0, #E5E7E9)"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={svgPaths.p1a6ae900}
            id="Vector_3"
            stroke="var(--stroke-0, #E5E7E9)"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={svgPaths.p197aca80}
            id="Vector_4"
            stroke="var(--stroke-0, #E5E7E9)"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={svgPaths.p11efc200}
            id="Vector_5"
            stroke="var(--stroke-0, #E5E7E9)"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex gap-[20px] items-center relative shrink-0">
      <EnvelopeOpen />
      <p className="font-['SVN-Neue_Montreal:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
        Tonghop.dtnn@mpi.gov.vn
      </p>
    </div>
  );
}

function Frame102() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0">
      <Frame4 />
      <Frame5 />
      <Frame6 />
    </div>
  );
}

function Col() {
  return (
    <div
      className="absolute content-stretch flex flex-col gap-[16px] items-start left-[40px] overflow-clip top-[64px]"
      data-name="Col 1"
    >
      <p
        className="font-['SVN-Neue_Montreal:Medium',sans-serif] leading-[normal] not-italic opacity-70 relative shrink-0 text-[12px] text-white tracking-[1.2px] uppercase whitespace-nowrap"
        style={{ fontFeatureSettings: "'salt', 'liga' 0" }}
      >
        thông tin liên hệ
      </p>
      <Frame102 />
    </div>
  );
}

function ListItems() {
  return (
    <div
      className="content-stretch flex flex-col font-['SVN-Neue_Montreal:Regular',sans-serif] gap-[12px] items-start justify-center leading-[24px] overflow-clip relative shrink-0 text-[16px] w-full"
      data-name="List Items"
    >
      <p
        className="relative shrink-0 w-[255px]"
        style={{ fontFeatureSettings: "'salt', 'liga' 0" }}
      >
        Chính sách đầu tư
      </p>
      <p
        className="relative shrink-0 whitespace-nowrap"
        style={{ fontFeatureSettings: "'salt', 'liga' 0" }}
      >
        Tin tức dịch vụ công
      </p>
      <p
        className="relative shrink-0 w-[255px]"
        style={{ fontFeatureSettings: "'salt', 'liga' 0" }}
      >
        Tin tức
      </p>
      <p
        className="relative shrink-0 w-[255px]"
        style={{ fontFeatureSettings: "'salt', 'liga' 0" }}
      >
        Câu chuyện thành công
      </p>
      <p
        className="relative shrink-0 w-[255px]"
        style={{ fontFeatureSettings: "'salt', 'liga' 0" }}
      >
        Liên hệ
      </p>
    </div>
  );
}

function Col1() {
  return (
    <div
      className="absolute content-stretch flex flex-col gap-[16px] items-start left-[476px] not-italic overflow-clip text-white top-[64px] w-[240px]"
      data-name="Col 6"
    >
      <p
        className="font-['SVN-Neue_Montreal:Medium',sans-serif] leading-[normal] opacity-70 relative shrink-0 text-[12px] tracking-[1.2px] uppercase whitespace-nowrap"
        style={{ fontFeatureSettings: "'salt', 'liga' 0" }}
      >
        về chúng tôi
      </p>
      <ListItems />
    </div>
  );
}

function ListItems1() {
  return (
    <div
      className="content-stretch flex flex-col font-['SVN-Neue_Montreal:Regular',sans-serif] gap-[12px] items-start justify-center leading-[24px] overflow-clip relative shrink-0 text-[16px] w-full"
      data-name="List Items"
    >
      <p
        className="relative shrink-0 w-[255px]"
        style={{ fontFeatureSettings: "'salt', 'liga' 0" }}
      >
        Đầu tư tại Việt Nam
      </p>
      <p
        className="relative shrink-0 whitespace-nowrap"
        style={{ fontFeatureSettings: "'salt', 'liga' 0" }}
      >
        Đầu tư từ Việt Nam ra nước ngoài
      </p>
      <p
        className="relative shrink-0 w-[255px]"
        style={{ fontFeatureSettings: "'salt', 'liga' 0" }}
      >
        Hỗ trợ đầu tư
      </p>
      <p
        className="relative shrink-0 w-[255px]"
        style={{ fontFeatureSettings: "'salt', 'liga' 0" }}
      >
        Báo cáo đầu tư
      </p>
      <p
        className="relative shrink-0 w-[255px]"
        style={{ fontFeatureSettings: "'salt', 'liga' 0" }}
      >
        Kết nối đối tác
      </p>
      <p
        className="relative shrink-0 w-[255px]"
        style={{ fontFeatureSettings: "'salt', 'liga' 0" }}
      >
        Phản ánh kiến nghị
      </p>
    </div>
  );
}

function Col2() {
  return (
    <div
      className="absolute content-stretch flex flex-col gap-[16px] items-start left-[805px] not-italic overflow-clip text-white top-[64px] w-[240px]"
      data-name="Col 7"
    >
      <p
        className="font-['SVN-Neue_Montreal:Medium',sans-serif] leading-[normal] opacity-70 relative shrink-0 text-[12px] tracking-[1.2px] uppercase whitespace-nowrap"
        style={{ fontFeatureSettings: "'salt', 'liga' 0" }}
      >
        dịch vụ
      </p>
      <ListItems1 />
    </div>
  );
}

function ListItems2() {
  return (
    <div
      className="content-stretch flex flex-col font-['SVN-Neue_Montreal:Regular',sans-serif] gap-[12px] items-start justify-center leading-[24px] overflow-clip relative shrink-0 text-[16px] w-full"
      data-name="List Items"
    >
      <p
        className="relative shrink-0"
        style={{ fontFeatureSettings: "'salt', 'liga' 0" }}
      >
        Văn bản pháp luật
      </p>
      <p
        className="relative shrink-0"
        style={{ fontFeatureSettings: "'salt', 'liga' 0" }}
      >
        Hướng dẫn sử dụng
      </p>
      <p
        className="relative shrink-0"
        style={{ fontFeatureSettings: "'salt', 'liga' 0" }}
      >
        Câu hỏi thường gặp
      </p>
      <p
        className="relative shrink-0"
        style={{ fontFeatureSettings: "'salt', 'liga' 0" }}
      >
        Câu chuyện thành công
      </p>
    </div>
  );
}

function Col3() {
  return (
    <div
      className="absolute content-stretch flex flex-col gap-[16px] items-start left-[1160px] not-italic overflow-clip text-white top-[64px] w-[240px] whitespace-nowrap"
      data-name="Col 8"
    >
      <p
        className="font-['SVN-Neue_Montreal:Medium',sans-serif] leading-[normal] opacity-70 relative shrink-0 text-[12px] tracking-[1.2px] uppercase"
        style={{ fontFeatureSettings: "'salt', 'liga' 0" }}
      >
        tài nguyên
      </p>
      <ListItems2 />
    </div>
  );
}

function FiaLogo1() {
  return (
    <div
      className="max-w-[1090.5px] relative shrink-0 size-[45px]"
      data-name="FIA Logo"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          alt=""
          className="absolute left-0 max-w-none size-full top-0"
          src={imgFiaLogo}
        />
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div
      className="absolute content-stretch flex flex-col items-start left-[0.25px] right-[58.38px] top-[-3.35px]"
      data-name="Heading 2"
    >
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-white uppercase whitespace-nowrap">
        <p className="leading-[21.6px]">CỔNG ĐẦU TƯ QUỐC GIA</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div
      className="absolute content-stretch flex flex-col items-start left-[0.25px] opacity-80 right-[58.38px] top-[15.34px]"
      data-name="Container"
    >
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white tracking-[0.5px] whitespace-nowrap">
        <p className="leading-[18px]">National Investment Gateway</p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="h-[31px] relative shrink-0 w-[226px]" data-name="Container">
      <Heading />
      <Container30 />
    </div>
  );
}

function Container28() {
  return (
    <div
      className="-translate-x-1/2 absolute bg-[#0b0d17] content-stretch flex gap-[11.25px] items-center left-[calc(50%+0.13px)] min-w-[260px] p-[8px] top-[342px]"
      data-name="Container"
    >
      <FiaLogo1 />
      <Container29 />
    </div>
  );
}

function SocialIcons() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Social Icons">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="Social Icons">
          <path
            clipRule="evenodd"
            d={svgPaths.ped68152}
            fill="var(--fill-0, white)"
            fillRule="evenodd"
            id="BG"
            opacity="0.1"
          />
          <path
            d={svgPaths.p139ec4f0}
            fill="var(--fill-0, white)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function SocialLinks() {
  return (
    <div
      className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0"
      data-name="Social Links"
    >
      <div className="relative shrink-0 size-[24px]" data-name="Social Icons">
        <svg
          className="absolute block inset-0 size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 24 24"
        >
          <path
            clipRule="evenodd"
            d={svgPaths.ped68152}
            fill="var(--fill-0, white)"
            fillRule="evenodd"
            id="BG"
            opacity="0.1"
          />
        </svg>
        <div className="absolute inset-[23.33%]" data-name="Path">
          <svg
            className="absolute block inset-0 size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 12.8 12.8001"
          >
            <path
              clipRule="evenodd"
              d={svgPaths.p5cd6b00}
              fill="var(--fill-0, white)"
              fillRule="evenodd"
              id="Path"
            />
          </svg>
        </div>
      </div>
      <SocialIcons />
      <div className="relative shrink-0 size-[24px]" data-name="Social Icons">
        <svg
          className="absolute block inset-0 size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 24 24"
        >
          <path
            clipRule="evenodd"
            d={svgPaths.ped68152}
            fill="var(--fill-0, white)"
            fillRule="evenodd"
            id="BG"
            opacity="0.1"
          />
        </svg>
        <div
          className="absolute bottom-[24.54%] left-[23.33%] right-[23.8%] top-1/4"
          data-name="Path"
        >
          <svg
            className="absolute block inset-0 size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 12.6877 12.11"
          >
            <g id="Path">
              <path d={svgPaths.p3867ba00} fill="var(--fill-0, white)" />
              <path d={svgPaths.p15061100} fill="var(--fill-0, white)" />
              <path d={svgPaths.p845e500} fill="var(--fill-0, white)" />
            </g>
          </svg>
        </div>
      </div>
      <div className="relative shrink-0 size-[24px]" data-name="Social Icons">
        <svg
          className="absolute block inset-0 size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 24 24"
        >
          <path
            clipRule="evenodd"
            d={svgPaths.ped68152}
            fill="var(--fill-0, white)"
            fillRule="evenodd"
            id="BG"
            opacity="0.1"
          />
        </svg>
        <div
          className="absolute inset-[23.33%_23.33%_23.41%_23.33%]"
          data-name="Path"
        >
          <svg
            className="absolute block inset-0 size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 12.8 12.7822"
          >
            <path
              clipRule="evenodd"
              d={svgPaths.p153d7d00}
              fill="var(--fill-0, white)"
              fillRule="evenodd"
              id="Path"
            />
          </svg>
        </div>
      </div>
      <div className="relative shrink-0 size-[24px]" data-name="Social Icons">
        <svg
          className="absolute block inset-0 size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 24 24"
        >
          <path
            clipRule="evenodd"
            d={svgPaths.ped68152}
            fill="var(--fill-0, white)"
            fillRule="evenodd"
            id="BG"
            opacity="0.1"
          />
        </svg>
        <div
          className="absolute inset-[31.67%_23.33%_30%_23.33%]"
          data-name="Path"
        >
          <svg
            className="absolute block inset-0 size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 12.8 9.2"
          >
            <path
              clipRule="evenodd"
              d={svgPaths.p36ffb000}
              fill="var(--fill-0, white)"
              fillRule="evenodd"
              id="Path"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame101() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] items-start left-[39px] top-[244px]">
      <p className="font-['SVN-Neue_Montreal:Medium',sans-serif] leading-[normal] not-italic opacity-70 relative shrink-0 text-[12px] text-white tracking-[1.2px] uppercase whitespace-nowrap">
        Theo dõi chúng tôi
      </p>
      <SocialLinks />
    </div>
  );
}

function FooterBig() {
  return (
    <div
      className="absolute bg-[#0a0a0a] h-[432px] left-1/2 -translate-x-1/2 top-[6337px] w-[100vw]"
      data-name="Footer / Big / 8"
    >
      <div className="w-[1440px] h-full mx-auto relative">
        <div
          className="-translate-x-1/2 -translate-y-1/2 absolute h-px left-1/2 top-[calc(50%+156.5px)] w-[1360px]"
          data-name="Divider"
        >
          <svg
            className="absolute block inset-0 size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 1360 1"
          >
            <path
              clipRule="evenodd"
              d="M1360 1H0V0H1360V1Z"
              fill="var(--fill-0, white)"
              fillRule="evenodd"
              id="Divider"
              opacity="0.2"
            />
          </svg>
        </div>
        <p
          className="absolute font-['SVN-Neue_Montreal:Regular',sans-serif] leading-[normal] left-[calc(50%-680px)] not-italic text-[12px] text-white bottom-[50px] whitespace-nowrap"
          style={{ fontFeatureSettings: "'salt', 'liga' 0" }}
        >
          © 2025 Cổng Một Cửa Đầu Tư Quốc Gia. Cục đầu tư nước ngoài - Bộ Tài
          chính
        </p>
        <Frame128 />
        <Col />
        <Col1 />
        <Col2 />
        <Col3 />
        <Container28 />
        <Frame101 />
      </div>
    </div>
  );
}

function Image() {
  return (
    <div className="h-[240px] relative shrink-0 w-full" data-name="image">
      <img
        alt=""
        className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
        src={imgImage}
      />
      <div className="flex flex-col justify-end size-full">
        <div className="relative size-full" />
      </div>
    </div>
  );
}

function Frame122() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start not-italic relative shrink-0 w-full">
      <p className="font-['SVN-Neue_Montreal:SemiBold',sans-serif] leading-[24px] relative shrink-0 text-[#1e2a37] text-[16px] w-full">
        Jack Ma - Tỷ phú, doanh nhân thương mại điện tử nổi tiếng người Trung
        Quốc.
      </p>
      <p className="font-['SVN-Neue_Montreal:Regular',sans-serif] h-[46px] leading-[22px] overflow-hidden relative shrink-0 text-[#4d5464] text-[14px] text-ellipsis w-full">
        Ông được biết đến là người sáng lập và chủ tịch điều hành của Tập đoàn
        Alibaba, một gia đình của các doanh nghiệp dựa trên Internet rất thành
        công.
      </p>
    </div>
  );
}

function Container31() {
  return (
    <div
      className="content-stretch flex gap-[6px] items-center relative shrink-0"
      data-name="Container"
    >
      <div
        className="overflow-clip relative shrink-0 size-[16px]"
        data-name="Eye"
      >
        <div className="absolute inset-[20.84%_8.33%]" data-name="Vector">
          <div className="absolute inset-[-6.96%_-4.87%]">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 14.634 10.6325"
            >
              <path
                d={svgPaths.p15e10900}
                id="Vector"
                stroke="var(--stroke-0, #667085)"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.3"
              />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[37.5%]" data-name="Vector">
          <div className="absolute inset-[-16.25%]">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 5.3 5.3"
            >
              <path
                d={svgPaths.pdbe68f0}
                id="Vector"
                stroke="var(--stroke-0, #667085)"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.3"
              />
            </svg>
          </div>
        </div>
      </div>
      <p className="font-['SVN-Neue_Montreal:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#667085] text-[12px] whitespace-nowrap">
        10
      </p>
    </div>
  );
}

function Container32() {
  return (
    <div
      className="content-stretch flex gap-[6px] items-center relative shrink-0"
      data-name="Container"
    >
      <div
        className="overflow-clip relative shrink-0 size-[16px]"
        data-name="lue/calendar-days"
      >
        <div className="absolute inset-[4.17%_8.33%]" data-name="Vector">
          <svg
            className="absolute block inset-0 size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 13.3333 14.6667"
          >
            <g id="Vector">
              <path d={svgPaths.p20852d00} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p2a339e80} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p1730a500} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p3ec18900} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p30f20a80} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p3ac2200} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p1add470} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p31643b00} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.pefaf300} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p25bd000} fill="var(--fill-0, #667085)" />
            </g>
          </svg>
        </div>
      </div>
      <p className="font-['SVN-Neue_Montreal:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#667085] text-[12px] whitespace-nowrap">
        08/04/2026
      </p>
    </div>
  );
}

function Frame123() {
  return (
    <div className="content-stretch flex gap-[20px] items-start relative shrink-0 w-full">
      <Container31 />
      <Container32 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Frame">
      <div className="content-stretch flex flex-col gap-[12px] items-start pb-[24px] pt-[20px] px-[30px] relative size-full">
        <p className="font-['SVN-Neue_Montreal:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#7a1f36] text-[12px] text-center whitespace-nowrap">
          Câu chuyện
        </p>
        <Frame122 />
        <Frame123 />
      </div>
    </div>
  );
}

function Frame({ className }: { className?: string }) {
  return (
    <div
      className={
        className ||
        "content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative"
      }
      data-name="Frame"
    >
      <Image />
      <Frame1 />
    </div>
  );
}

function Image1() {
  return (
    <div className="h-[240px] relative shrink-0 w-full" data-name="image">
      <img
        alt=""
        className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
        src={imgImage1}
      />
      <div className="flex flex-col justify-end size-full">
        <div className="relative size-full" />
      </div>
    </div>
  );
}

function Frame124() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start not-italic relative shrink-0 w-full">
      <p className="font-['SVN-Neue_Montreal:SemiBold',sans-serif] leading-[24px] relative shrink-0 text-[#1e2a37] text-[16px] w-full">
        Bill Gates - Tỷ phú có khối tài sản “khổng lồ” nhất thế giới
      </p>
      <p className="font-['SVN-Neue_Montreal:Regular',sans-serif] h-[46px] leading-[22px] overflow-hidden relative shrink-0 text-[#4d5464] text-[14px] text-ellipsis w-full">
        Câu chuyện thành công của Bill Gates từ con số 0 tới tỷ phú có khối tài
        sản nhiều nhất thế giới.
      </p>
    </div>
  );
}

function Container33() {
  return (
    <div
      className="content-stretch flex gap-[6px] items-center relative shrink-0"
      data-name="Container"
    >
      <div
        className="overflow-clip relative shrink-0 size-[16px]"
        data-name="Eye"
      >
        <div className="absolute inset-[20.84%_8.33%]" data-name="Vector">
          <div className="absolute inset-[-6.96%_-4.87%]">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 14.634 10.6325"
            >
              <path
                d={svgPaths.p15e10900}
                id="Vector"
                stroke="var(--stroke-0, #667085)"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.3"
              />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[37.5%]" data-name="Vector">
          <div className="absolute inset-[-16.25%]">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 5.3 5.3"
            >
              <path
                d={svgPaths.pdbe68f0}
                id="Vector"
                stroke="var(--stroke-0, #667085)"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.3"
              />
            </svg>
          </div>
        </div>
      </div>
      <p className="font-['SVN-Neue_Montreal:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#667085] text-[12px] whitespace-nowrap">
        10
      </p>
    </div>
  );
}

function Container34() {
  return (
    <div
      className="content-stretch flex gap-[6px] items-center relative shrink-0"
      data-name="Container"
    >
      <div
        className="overflow-clip relative shrink-0 size-[16px]"
        data-name="lue/calendar-days"
      >
        <div className="absolute inset-[4.17%_8.33%]" data-name="Vector">
          <svg
            className="absolute block inset-0 size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 13.3333 14.6667"
          >
            <g id="Vector">
              <path d={svgPaths.p20852d00} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p2a339e80} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p1730a500} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p3ec18900} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p30f20a80} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p3ac2200} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p1add470} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p31643b00} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.pefaf300} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p25bd000} fill="var(--fill-0, #667085)" />
            </g>
          </svg>
        </div>
      </div>
      <p className="font-['SVN-Neue_Montreal:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#667085] text-[12px] whitespace-nowrap">
        08/04/2026
      </p>
    </div>
  );
}

function Frame125() {
  return (
    <div className="content-stretch flex gap-[20px] items-start relative shrink-0 w-full">
      <Container33 />
      <Container34 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Frame">
      <div className="content-stretch flex flex-col gap-[12px] items-start pb-[24px] pt-[20px] px-[30px] relative size-full">
        <p className="font-['SVN-Neue_Montreal:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#7a1f36] text-[12px] text-center whitespace-nowrap">
          Câu chuyện
        </p>
        <Frame124 />
        <Frame125 />
      </div>
    </div>
  );
}

function Image2() {
  return (
    <div className="h-[240px] relative shrink-0 w-full" data-name="image">
      <img
        alt=""
        className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
        src={imgImage2}
      />
      <div className="flex flex-col justify-end size-full">
        <div className="relative size-full" />
      </div>
    </div>
  );
}

function Frame126() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start not-italic relative shrink-0 w-full">
      <p className="font-['SVN-Neue_Montreal:SemiBold',sans-serif] leading-[24px] relative shrink-0 text-[#1e2a37] text-[16px] w-full">
        “Gã nghiện giày” Phil Knight - cha đẻ của hãng giày Nike
      </p>
      <p className="font-['SVN-Neue_Montreal:Regular',sans-serif] h-[46px] leading-[22px] overflow-hidden relative shrink-0 text-[#4d5464] text-[14px] text-ellipsis w-full">
        Với tài sản 21,6 tỷ USD, Phil Knight cũng là một trong những tỷ phú tự
        thân giàu nhất thế giới. Cho dù ông có thể nghỉ hưu và không đảm nhiệm
        vị trí chủ tịch
      </p>
    </div>
  );
}

function Container35() {
  return (
    <div
      className="content-stretch flex gap-[6px] items-center relative shrink-0"
      data-name="Container"
    >
      <div
        className="overflow-clip relative shrink-0 size-[16px]"
        data-name="Eye"
      >
        <div className="absolute inset-[20.84%_8.33%]" data-name="Vector">
          <div className="absolute inset-[-6.96%_-4.87%]">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 14.634 10.6325"
            >
              <path
                d={svgPaths.p15e10900}
                id="Vector"
                stroke="var(--stroke-0, #667085)"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.3"
              />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[37.5%]" data-name="Vector">
          <div className="absolute inset-[-16.25%]">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 5.3 5.3"
            >
              <path
                d={svgPaths.pdbe68f0}
                id="Vector"
                stroke="var(--stroke-0, #667085)"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.3"
              />
            </svg>
          </div>
        </div>
      </div>
      <p className="font-['SVN-Neue_Montreal:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#667085] text-[12px] whitespace-nowrap">
        10
      </p>
    </div>
  );
}

function Container36() {
  return (
    <div
      className="content-stretch flex gap-[6px] items-center relative shrink-0"
      data-name="Container"
    >
      <div
        className="overflow-clip relative shrink-0 size-[16px]"
        data-name="lue/calendar-days"
      >
        <div className="absolute inset-[4.17%_8.33%]" data-name="Vector">
          <svg
            className="absolute block inset-0 size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 13.3333 14.6667"
          >
            <g id="Vector">
              <path d={svgPaths.p20852d00} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p2a339e80} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p1730a500} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p3ec18900} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p30f20a80} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p3ac2200} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p1add470} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p31643b00} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.pefaf300} fill="var(--fill-0, #667085)" />
              <path d={svgPaths.p25bd000} fill="var(--fill-0, #667085)" />
            </g>
          </svg>
        </div>
      </div>
      <p className="font-['SVN-Neue_Montreal:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#667085] text-[12px] whitespace-nowrap">
        08/04/2026
      </p>
    </div>
  );
}

function Frame127() {
  return (
    <div className="content-stretch flex gap-[20px] items-start relative shrink-0 w-full">
      <Container35 />
      <Container36 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Frame">
      <div className="content-stretch flex flex-col gap-[12px] items-start pb-[24px] pt-[20px] px-[30px] relative size-full">
        <p className="font-['SVN-Neue_Montreal:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#7a1f36] text-[12px] text-center whitespace-nowrap">
          Câu chuyện
        </p>
        <Frame126 />
        <Frame127 />
      </div>
    </div>
  );
}

function PostFeed4Column() {
  return (
    <div
      className="absolute content-stretch flex items-start left-[179px] top-[5544px] w-[1080px]"
      data-name="Post Feed - 4 Column"
    >
      <Frame />
      <div
        className="flex items-center justify-center relative self-stretch shrink-0 w-0"
        style={
          {
            containerType: "size",
            "--transform-inner-width": "1185",
            "--transform-inner-height": "21",
          } as React.CSSProperties
        }
      >
        <div className="flex-none rotate-90 w-[100cqh]">
          <div className="h-0 relative w-full">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 446 1"
              >
                <line
                  id="Line 33"
                  stroke="var(--stroke-0, #EBEBEB)"
                  strokeDasharray="6 4"
                  x2="446"
                  y1="0.5"
                  y2="0.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div
        className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative"
        data-name="Frame"
      >
        <Image1 />
        <Frame2 />
      </div>
      <div
        className="flex items-center justify-center relative self-stretch shrink-0 w-0"
        style={
          {
            containerType: "size",
            "--transform-inner-width": "1185",
            "--transform-inner-height": "21",
          } as React.CSSProperties
        }
      >
        <div className="flex-none rotate-90 w-[100cqh]">
          <div className="h-0 relative w-full">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 446 1"
              >
                <line
                  id="Line 33"
                  stroke="var(--stroke-0, #EBEBEB)"
                  strokeDasharray="6 4"
                  x2="446"
                  y1="0.5"
                  y2="0.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div
        className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative"
        data-name="Frame"
      >
        <Image2 />
        <Frame3 />
      </div>
    </div>
  );
}

function VuesaxLinearMessageQuestion() {
  return (
    <div
      className="absolute contents inset-0"
      data-name="vuesax/linear/message-question"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="message-question">
          <path
            d={svgPaths.p203ac400}
            id="Vector"
            stroke="var(--stroke-0, white)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="1.3"
          />
          <path
            d={svgPaths.pa6c3a00}
            id="Vector_2"
            stroke="var(--stroke-0, white)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.3"
          />
          <g id="Vector_3" opacity="0" />
          <path
            d="M11.9955 13.75H12.0045"
            id="Vector_4"
            stroke="var(--stroke-0, white)"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </div>
  );
}

function Container37() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(el, { x: 80 }, { x: 0, duration: 0.5, ease: "power2.out", delay: 1 });
  }, []);
  return (
    <div
      ref={ref}
      className="fixed bg-[#7a1f36] content-stretch flex flex-col gap-[16px] items-center justify-center pl-[12px] pr-[10px] py-[12px] right-0 rounded-bl-[12px] rounded-tl-[12px] top-[248px] translate-x-[80px]"
      data-name="Container"
    >
      <div
        className="overflow-clip relative shrink-0 size-[24px]"
        data-name="phone"
      >
        <div
          className="absolute inset-[8.33%_8.33%_8.63%_8.8%]"
          data-name="Icon"
        >
          <div className="absolute inset-[-3.26%_-3.27%]">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 21.1887 21.2282"
            >
              <path
                d={svgPaths.p377b45c0}
                id="Icon"
                stroke="var(--stroke-0, white)"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.3"
              />
            </svg>
          </div>
        </div>
      </div>
      <div
        className="relative shrink-0 size-[24px]"
        data-name="message-question"
      >
        <VuesaxLinearMessageQuestion />
      </div>
      <div
        className="overflow-clip relative shrink-0 size-[24px]"
        data-name="search"
      >
        <div className="absolute inset-[12.5%]" data-name="Icon">
          <div className="absolute inset-[-3.61%]">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 19.3 19.3"
            >
              <path
                d={svgPaths.p26878900}
                id="Icon"
                stroke="var(--stroke-0, white)"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.3"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScrollToTop() {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.set(el, { opacity: 0, y: 20, pointerEvents: "none" });

    let wasVisible = false;

    const onScroll = () => {
      const shouldShow = window.scrollY > 1000;
      if (shouldShow !== wasVisible) {
        wasVisible = shouldShow;
        gsap.to(el, {
          opacity: shouldShow ? 1 : 0,
          y: shouldShow ? 0 : 20,
          pointerEvents: shouldShow ? "auto" : "none",
          duration: shouldShow ? 0.3 : 0.2,
          ease: shouldShow ? "power2.out" : "power2.in",
          overwrite: "auto",
        });
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      ref={ref}
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="fixed bottom-[40px] right-[40px] z-10 bg-[#7a1f36] rounded-full shadow-[0px_6px_24px_2px_rgba(138,25,29,0.25)] cursor-pointer"
    >
      <div className="flex items-center justify-center size-[40px]">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 16V4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M3 11L10 4L17 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </button>
  );
}

export default function Landingpage() {
  useArrowAnimation();
  useTitleReveal();
  useProcessSection();
  return (
    <div
      className="bg-white relative w-full max-w-[1440px] mx-auto h-[6769px]"
      data-name="Landingpage"
    >
      <div className="absolute bg-[#0a0a0a] h-[460px] left-[180px] top-[3899px] w-[1080px]" />
      <Frame110 />
      <Container />
      <Line />
      <List />
      <div className="-translate-x-1/2 absolute bg-white h-[359px] left-[calc(50%-0.5px)] top-[249px] w-[899px]" />
      <Frame22 />
      <Frame35 />
      <Frame21 />
      <Frame46 />
      <div className="-translate-y-1/2 absolute flex flex-col font-['SVN-Neue_Montreal:SemiBold',sans-serif] justify-center leading-[0] left-[209px] not-italic text-[#7a1f36] text-[26px] top-[4421px] whitespace-nowrap" data-name="process-title">
        <p className="leading-[normal]">Quy trình kết nối</p>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['SVN-Neue_Montreal:Regular',sans-serif] justify-center leading-[0] left-[299.5px] not-italic text-[#4d5464] text-[12px] text-center top-[2256px] whitespace-nowrap">
        <p className="leading-[normal]">Nhấn vào từng vùng để xem chi tiết.</p>
      </div>
      <Border />
      <img
        alt=""
        className="absolute h-[539px] left-[180px] top-[1562px] w-[1079px]"
        src={imgIllustration3}
      />
      <Frame29 />
      <Button />
      <Button1 />
      <Button2 />
      <div
        className="absolute flex h-[5459px] items-center justify-center left-[179px] top-[878px] w-0"
        style={
          {
            "--transform-inner-width": "1185",
            "--transform-inner-height": "21",
          } as React.CSSProperties
        }
      >
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[5459px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 5459 1"
              >
                <line
                  id="Line 14"
                  stroke="var(--stroke-0, #EBEBEB)"
                  x2="5459"
                  y1="0.5"
                  y2="0.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div
        className="absolute flex h-[541px] items-center justify-center left-[539px] top-[1560px] w-0"
        style={
          {
            "--transform-inner-width": "1185",
            "--transform-inner-height": "21",
          } as React.CSSProperties
        }
      >
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[541px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 541 1"
              >
                <line
                  id="Line 15"
                  opacity="0.2"
                  stroke="var(--stroke-0, white)"
                  x2="541"
                  y1="0.5"
                  y2="0.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div
        className="absolute flex h-[424px] items-center justify-center left-[899px] top-[1136px] w-0"
        style={
          {
            "--transform-inner-width": "1185",
            "--transform-inner-height": "21",
          } as React.CSSProperties
        }
      >
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[424px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 424 1"
              >
                <line
                  id="Line 16"
                  stroke="var(--stroke-0, #EBEBEB)"
                  strokeDasharray="6 4"
                  x2="424"
                  y1="0.5"
                  y2="0.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div
        className="absolute flex h-[216px] items-center justify-center left-[899px] top-[2958px] w-0"
        style={
          {
            "--transform-inner-width": "1185",
            "--transform-inner-height": "21",
          } as React.CSSProperties
        }
      >
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[216px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 216 1"
              >
                <line
                  id="Line 30"
                  stroke="var(--stroke-0, #EBEBEB)"
                  strokeDasharray="6 4"
                  x2="216"
                  y1="0.5"
                  y2="0.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div
        className="absolute flex h-[633px] items-center justify-center left-[899px] top-[3267px] w-0"
        style={
          {
            "--transform-inner-width": "1185",
            "--transform-inner-height": "21",
          } as React.CSSProperties
        }
      >
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[633px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 633 1"
              >
                <line
                  id="Line 39"
                  stroke="var(--stroke-0, #EBEBEB)"
                  strokeDasharray="6 4"
                  x2="633"
                  y1="0.5"
                  y2="0.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div
        className="absolute flex h-[483px] items-center justify-center left-[899px] top-[4360px] w-0"
        style={
          {
            "--transform-inner-width": "1185",
            "--transform-inner-height": "21",
          } as React.CSSProperties
        }
      >
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[483px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 483 1"
              >
                <line
                  id="Line 45"
                  stroke="var(--stroke-0, #EBEBEB)"
                  strokeDasharray="6 4"
                  x2="483"
                  y1="0.5"
                  y2="0.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div
        className="absolute flex h-[424px] items-center justify-center left-[539px] top-[1136px] w-0"
        style={
          {
            "--transform-inner-width": "1185",
            "--transform-inner-height": "21",
          } as React.CSSProperties
        }
      >
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[424px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 424 1"
              >
                <line
                  id="Line 16"
                  stroke="var(--stroke-0, #EBEBEB)"
                  strokeDasharray="6 4"
                  x2="424"
                  y1="0.5"
                  y2="0.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div
        className="absolute flex h-[216px] items-center justify-center left-[539px] top-[2958px] w-0"
        style={
          {
            "--transform-inner-width": "1185",
            "--transform-inner-height": "21",
          } as React.CSSProperties
        }
      >
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[216px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 216 1"
              >
                <line
                  id="Line 27"
                  stroke="var(--stroke-0, #EBEBEB)"
                  strokeDasharray="6 4"
                  x2="216"
                  y1="0.5"
                  y2="0.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div
        className="absolute flex h-[1046px] items-center justify-center left-[539px] top-[4360px] w-0"
        data-name="progress-track"
        style={
          {
            "--transform-inner-width": "1185",
            "--transform-inner-height": "21",
          } as React.CSSProperties
        }
      >
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[1046px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 1046 1"
              >
                <line
                  id="Line 46"
                  stroke="var(--stroke-0, #EBEBEB)"
                  strokeDasharray="6 4"
                  x2="1046"
                  y1="0.5"
                  y2="0.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div
        className="absolute flex h-[726px] items-center justify-center left-[539px] top-[4430px] w-0"
        data-name="progress-active"
        style={
          {
            "--transform-inner-width": "1185",
            "--transform-inner-height": "21",
          } as React.CSSProperties
        }
      >
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[726px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 726 1"
              >
                <line
                  id="Line 47"
                  stroke="var(--stroke-0, #7A1F36)"
                  x2="726"
                  y1="0.5"
                  y2="0.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-0 items-center justify-center left-[179px] top-[1136px] w-[1080px]">
        <div className="flex-none rotate-180">
          <div className="h-0 relative w-[1080px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 1080 1"
              >
                <line
                  id="Line 18"
                  stroke="var(--stroke-0, #EBEBEB)"
                  strokeDasharray="6 4"
                  x2="1080"
                  y1="0.5"
                  y2="0.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-0 items-center justify-center left-[179px] top-[2231px] w-[1080px]">
        <div className="flex-none rotate-180">
          <div className="h-0 relative w-[1080px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 1080 1"
              >
                <line
                  id="Line 18"
                  stroke="var(--stroke-0, #EBEBEB)"
                  strokeDasharray="6 4"
                  x2="1080"
                  y1="0.5"
                  y2="0.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-0 items-center justify-center left-[179px] top-[2958px] w-[1080px]">
        <div className="flex-none rotate-180">
          <div className="h-0 relative w-[1080px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 1080 1"
              >
                <line
                  id="Line 18"
                  stroke="var(--stroke-0, #EBEBEB)"
                  strokeDasharray="6 4"
                  x2="1080"
                  y1="0.5"
                  y2="0.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-0 items-center justify-center left-[179px] top-[3267px] w-[1080px]">
        <div className="flex-none rotate-180">
          <div className="h-0 relative w-[1080px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 1080 1"
              >
                <line
                  id="Line 18"
                  stroke="var(--stroke-0, #EBEBEB)"
                  strokeDasharray="6 4"
                  x2="1080"
                  y1="0.5"
                  y2="0.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Item />
      <div
        className="-translate-x-1/2 absolute content-stretch flex flex-col gap-[16px] items-start left-[calc(50%-1px)] top-[2990px] w-[300px]"
        data-name="Item 2"
      >
        <Frame49 />
        <Frame56 />
      </div>
      <div
        className="-translate-x-1/2 absolute content-stretch flex flex-col gap-[16px] items-start left-[calc(50%+359px)] top-[2990px] w-[300px]"
        data-name="Item 3"
      >
        <Frame53 />
        <Frame58 />
      </div>
      <div className="absolute flex h-0 items-center justify-center left-[540px] top-[1740px] w-[719px]">
        <div className="flex-none rotate-180">
          <div className="h-0 relative w-[719px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 719 1"
              >
                <line
                  id="Line 20"
                  opacity="0.2"
                  stroke="var(--stroke-0, white)"
                  strokeDasharray="6 4"
                  x2="719"
                  y1="0.5"
                  y2="0.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-0 items-center justify-center left-[540px] top-[1920px] w-[719px]">
        <div className="flex-none rotate-180">
          <div className="h-0 relative w-[719px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 719 1"
              >
                <line
                  id="Line 20"
                  opacity="0.2"
                  stroke="var(--stroke-0, white)"
                  strokeDasharray="6 4"
                  x2="719"
                  y1="0.5"
                  y2="0.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-0 items-center justify-center left-[179px] top-[2101px] w-[1080px]">
        <div className="flex-none rotate-180">
          <div className="h-0 relative w-[1080px]">
            <div className="absolute inset-[-2px_0_0_0]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 1080 2"
              >
                <line
                  id="Line 22"
                  stroke="var(--stroke-0, #EBEBEB)"
                  strokeWidth="2"
                  x2="1080"
                  y1="1"
                  y2="1"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute flex h-0 items-center justify-center left-1/2 top-[2854px] w-[1080px]">
        <div className="flex-none rotate-180">
          <div className="h-0 relative w-[1080px]">
            <div className="absolute inset-[-2px_0_0_0]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 1080 2"
              >
                <line
                  id="Line 22"
                  stroke="var(--stroke-0, #EBEBEB)"
                  strokeWidth="2"
                  x2="1080"
                  y1="1"
                  y2="1"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute flex h-0 items-center justify-center left-1/2 top-[3174px] w-[1080px]">
        <div className="flex-none rotate-180">
          <div className="h-0 relative w-[1080px]">
            <div className="absolute inset-[-2px_0_0_0]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 1080 2"
              >
                <line
                  id="Line 31"
                  stroke="var(--stroke-0, #EBEBEB)"
                  strokeWidth="2"
                  x2="1080"
                  y1="1"
                  y2="1"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Frame61 />
      <div
        className="absolute flex h-[5561px] items-center justify-center left-[1259px] top-[878px] w-0"
        style={
          {
            "--transform-inner-width": "1185",
            "--transform-inner-height": "21",
          } as React.CSSProperties
        }
      >
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[5561px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 5561 1"
              >
                <line
                  id="Line 17"
                  stroke="var(--stroke-0, #EBEBEB)"
                  x2="5561"
                  y1="0.5"
                  y2="0.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Group20 />
      <Group99 />
      <Container7 />
      <Frame129 />
      <div className="absolute left-[209px] top-[1186px] w-[244px] h-[159px]">
        <img
          alt=""
          className="absolute inset-0 max-w-none object-contain size-full"
          src={imgIllustration0}
        />
      </div>
      <div className="absolute left-[569px] top-[1186px] w-[243px] h-[159px]">
        <img
          alt=""
          className="absolute inset-0 max-w-none object-contain size-full"
          src={imgIllustration1}
        />
      </div>
      <div className="absolute left-[929px] top-[1186px] w-[241px] h-[159px]">
        <img
          alt=""
          className="absolute inset-0 max-w-none object-contain size-full"
          src={imgIllustration2}
        />
      </div>
      <Frame26 />
      <Frame27 />
      <Frame30 />
      
      <Frame32 />
      <Frame38 />
      <Frame44 />
      <div
        className="absolute h-[497px] left-[330px] top-[2309px] w-[418px]"
        data-name="Hanoi_blank_map.svg 1"
      >
        <img
          alt=""
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          src={imgHanoiBlankMapSvg1}
        />
      </div>
      <Frame65 />
      <div
        className="absolute flex h-[623px] items-center justify-center left-[897px] top-[2231px] w-0"
        style={
          {
            "--transform-inner-width": "1185",
            "--transform-inner-height": "21",
          } as React.CSSProperties
        }
      >
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[623px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 623 1"
              >
                <line
                  id="Line 30"
                  stroke="var(--stroke-0, #EBEBEB)"
                  strokeDasharray="6 4"
                  x2="623"
                  y1="0.5"
                  y2="0.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div
        className="-translate-x-1/2 absolute h-[298px] left-[calc(50%-0.5px)] opacity-90 top-[580px] w-[757px]"
        data-name="ảnh 1 1"
      >
        <img
          alt=""
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          src={imgAnh11}
        />
      </div>
      <div
        className="absolute h-[607px] left-[180px] opacity-10 top-[271px] w-[1079px]"
        data-name="87733bdd-9595-4fb7-9df6-7aba4b0ab350 1"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
        >
          <img
            alt=""
            className="absolute max-w-none object-cover size-full"
            src={img87733Bdd95954Fb79Df67Aba4B0Ab3501}
          />
          <div className="absolute bg-gradient-to-b from-[45%] from-white inset-0 to-[rgba(255,255,255,0)]" />
        </div>
      </div>
      <Frame79 />
      <div className="-translate-x-1/2 absolute left-1/2 size-[32px] top-[232px]">
        <img
          alt=""
          className="absolute block inset-0 max-w-none size-full"
          height="32"
          src={imgEllipse5}
          width="32"
        />
      </div>
      <Button5 />
      <Button6 />
      <Button7 />
      <Frame82 />
      <Frame84 />
      <div
        className="absolute flex h-[208px] items-center justify-center left-[989px] top-[6129px] w-0"
        style={
          {
            "--transform-inner-width": "1185",
            "--transform-inner-height": "21",
          } as React.CSSProperties
        }
      >
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[208px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 208 1"
              >
                <line
                  id="Line 32"
                  stroke="var(--stroke-0, #EBEBEB)"
                  strokeDasharray="6 4"
                  x2="208"
                  y1="0.5"
                  y2="0.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div
        className="absolute flex h-[208px] items-center justify-center left-[449px] top-[6129px] w-0"
        style={
          {
            "--transform-inner-width": "1185",
            "--transform-inner-height": "21",
          } as React.CSSProperties
        }
      >
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[208px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 208 1"
              >
                <line
                  id="Line 32"
                  stroke="var(--stroke-0, #EBEBEB)"
                  strokeDasharray="6 4"
                  x2="208"
                  y1="0.5"
                  y2="0.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div
        className="absolute flex h-[208px] items-center justify-center left-[719px] top-[6129px] w-0"
        style={
          {
            "--transform-inner-width": "1185",
            "--transform-inner-height": "21",
          } as React.CSSProperties
        }
      >
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[208px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 208 1"
              >
                <line
                  id="Line 32"
                  stroke="var(--stroke-0, #EBEBEB)"
                  strokeDasharray="6 4"
                  x2="208"
                  y1="0.5"
                  y2="0.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-0 items-center justify-center left-[179px] top-[6128px] w-[1080px]">
        <div className="flex-none rotate-180">
          <div className="h-0 relative w-[1080px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 1080 1"
              >
                <line
                  id="Line 18"
                  stroke="var(--stroke-0, #EBEBEB)"
                  strokeDasharray="6 4"
                  x2="1080"
                  y1="0.5"
                  y2="0.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Frame87 />
      <Frame89 />
      <Frame111 />
      <Frame112 />
      <Frame93 />
      <Group98 />
      <Frame118 />
      <div className="-translate-x-1/2 absolute flex h-0 items-center justify-center left-1/2 top-[5544px] w-[1080px]">
        <div className="flex-none rotate-180">
          <div className="h-0 relative w-[1080px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 1080 1"
              >
                <line
                  id="Line 18"
                  stroke="var(--stroke-0, #EBEBEB)"
                  strokeDasharray="6 4"
                  x2="1080"
                  y1="0.5"
                  y2="0.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <FooterBig />
      <PostFeed4Column />
      <div className="-translate-x-1/2 absolute flex h-0 items-center justify-center left-1/2 top-[5406px] w-[1080px]">
        <div className="flex-none rotate-180">
          <div className="h-0 relative w-[1080px]">
            <div className="absolute inset-[-2px_0_0_0]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 1080 2"
              >
                <line
                  id="Line 22"
                  stroke="var(--stroke-0, #EBEBEB)"
                  strokeWidth="2"
                  x2="1080"
                  y1="1"
                  y2="1"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute flex h-0 items-center justify-center left-1/2 top-[5990px] w-[1080px]">
        <div className="flex-none rotate-180">
          <div className="h-0 relative w-[1080px]">
            <div className="absolute inset-[-2px_0_0_0]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 1080 2"
              >
                <line
                  id="Line 22"
                  stroke="var(--stroke-0, #EBEBEB)"
                  strokeWidth="2"
                  x2="1080"
                  y1="1"
                  y2="1"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Container37 />
      <ScrollToTop />
    </div>
  );
}
